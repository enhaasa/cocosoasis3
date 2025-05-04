/* eslint-disable @typescript-eslint/no-explicit-any */
import { useReducer } from 'react';

// Constants
import { DEFAULT_MOUNT_DELAY } from './modalDefaults';

// Utils
import reducer from './modalReducer';

// Types
import type { TModals, TModalComponent,  } from './types';

export interface IUseModals {
    get: TModals;
    add: (modalComponent: TModalComponent) => number | false;
    killAll: any;
    remove: (id: number) => void;
    closeCurrent: () => void;
}

export default function useModals(): IUseModals {
    const [ state, dispatch ] = useReducer(reducer, {
        modals: {},
        isChangingState: false
    });

    function add(modalComponent: TModalComponent) {
        if (state.isChangingState) return false;

        dispatch({ type: 'ADD_MODAL', modal: modalComponent });

        const props = modalComponent.props;
        const delay = props.mountDelay ?? DEFAULT_MOUNT_DELAY;
    
        setTimeout(() => {
            dispatch({ type: 'UNLOCK' });
        }, delay);
      
        return Object.values(state.modals).length;
    }

    function beginRemoval(id: number) {
        if (state.isChangingState) return;

        const modal = state.modals[id];
        if (!modal) return;

        dispatch({ type: 'BEGIN_REMOVAL', id})

        setTimeout(() => {
            dispatch({ type: 'KILL_MODAL', id });
        }, modal.dismountDelay);
    }

    function closeCurrent() {
        const modalArray = Object.values(state.modals);
        if (!modalArray.length) return;
        
        beginRemoval(modalArray[modalArray.length -1].id);
    }

    function killAll() {
        dispatch({ type: 'KILL_ALL' });
    }

    return {
        get: state.modals,
        killAll,
        add,
        remove: beginRemoval,
        closeCurrent
    }
}
