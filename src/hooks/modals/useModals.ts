/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, ReactElement } from 'react';

// Constants
import { DEFAULT_MOUNT_DELAY, DEFAULT_DISMOUNT_DELAY } from './modalDefaults';

export type TModal = {
    id: number;
    component: TModalComponent;
    isRemoving: boolean;
    mountDelay: number;
    dismountDelay: number;
}

export type TModalComponent = ReactElement;

export interface IUseModals {
    get: Record<string, TModal>;
    add: (modalComponent: TModalComponent) => number | false;
    kill: (id: number) => void;
    killAll: any;
    remove: (id: number) => void;
    closeCurrent: () => void;
}

export default function useModals(): IUseModals {
    const [ modals, setModals ] = useState<Record<string, TModal>>({});
    const [ isChangingState, setIsChangingState ] = useState<boolean>(false);

    function add(modalComponent: TModalComponent) {
        if (isChangingState) return false;
        setIsChangingState(true);

        const id = Object.values(modals).length;

        const props = modalComponent.props;
        const mountDelay = props.mountDelay ?? DEFAULT_MOUNT_DELAY;
        const dismountDelay = props.dismountDelay ?? DEFAULT_DISMOUNT_DELAY;
        
        const ModalWithId = React.cloneElement(modalComponent, {
            ...props,
            id,
            mountDelay,
            dismountDelay,
        });
        
        setModals(prev => {
            return {
                ...prev,
                [id.toString()]: {
                    id,
                    component: ModalWithId,
                    isRemoving: false,
                    mountDelay: ModalWithId.props.mountDelay,
                    dismountDelay: ModalWithId.props.dismountDelay
                }
            }
        });

        const delay = ModalWithId.props.mountDelay;

        setTimeout(() => {
            setIsChangingState(false);
        }, delay);
        return id;
    }

    function kill(id: number) {
        setModals(prev => {
            const newModals = { ...prev };
            delete newModals[id];
            return newModals;
        });
        
        setIsChangingState(false);
    }
    
    function beginRemoval(id: number) {
        if (isChangingState) return false;

        const delay = modals[id].dismountDelay;

        setModals(prev => ({...prev, [id]: {
            ...prev[id],
            isRemoving: true
        }}));

        setTimeout(() => {
            kill(id);
        }, delay);

        setIsChangingState(true);
    }

    function closeCurrent() {
        const modalArray = Object.values(modals);
        beginRemoval(modalArray[modalArray.length -1].id);
    }

    function killAll() {
        setModals({});
    }

    return {
        get: modals,
        killAll,
        add,
        kill,
        remove: beginRemoval,
        closeCurrent
    }
}
