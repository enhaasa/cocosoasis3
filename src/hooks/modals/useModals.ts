/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactElement, useReducer } from 'react';

// Constants
import { DEFAULT_MOUNT_DELAY, DEFAULT_DISMOUNT_DELAY } from './modalDefaults';

export type TModal = {
    id: number;
    component: TModalComponent;
    isRemoving: boolean;
    mountDelay: number;
    dismountDelay: number;
}
type TModals = Record<string, TModal>;

type State = {
    modals: TModals;
    isChangingState: boolean;
}

type Action = 
    | { type: 'ADD_MODAL'; modal: TModalComponent }
    | { type: 'BEGIN_REMOVAL'; id: number }
    | { type: 'KILL_MODAL'; id: number }
    | { type: 'KILL_ALL'}
    | { type: 'UNLOCK' }

export type TModalComponent = ReactElement;

export interface IUseModals {
    get: TModals;
    add: (modalComponent: TModalComponent) => number | false;
    killAll: any;
    remove: (id: number) => void;
    closeCurrent: () => void;
}

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'ADD_MODAL': {
            const id = Object.values(state.modals).length;

            const props = action.modal.props;
            const mountDelay = props.mountDelay ?? DEFAULT_DISMOUNT_DELAY;
            const dismountDelay = props.dismountDelay ?? DEFAULT_DISMOUNT_DELAY;

            const ModalWithId = React.cloneElement(action.modal, {
                ...props,
                id,
                mountDelay,
                dismountDelay,
            });

            return {
                ...state,
                modals: {
                  ...state.modals,
                  [id]: {
                    id,
                    component: ModalWithId,
                    isRemoving: false,
                    mountDelay,
                    dismountDelay,
                  }
                },
                isChangingState: true,
            };
        }

        case 'BEGIN_REMOVAL': {
            if (state.isChangingState) return state;

            const modal = state.modals[action.id];
            if (!modal) return state;

            return {
                ...state,
                modals: {
                    ...state.modals,
                    [action.id]: {
                        ...modal,
                        isRemoving: true
                    }
                },
                isChangingState: true
            };
        }

        case 'KILL_MODAL': {
            if (!state.modals[action.id]) return state;

            const newModals = { ...state.modals };
            delete newModals[action.id];

            return {
                ...state,
                modals: newModals,
                isChangingState: false
            }
        }

        case 'KILL_ALL': {
            return {
                ...state,
                modals: {},
                isChangingState: false
            }
        }

        case 'UNLOCK': {
            return {
                ...state,
                isChangingState: false
            }
        }

        default: 
            return state;
    }
}

export default function useModals(): IUseModals {
    const [ state, dispatch ] = useReducer(reducer, {
        modals: {},
        isChangingState: false
    })

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
