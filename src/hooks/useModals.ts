/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, ReactElement } from 'react';

const MOUNT_DELAY = 300;
const DISMOUNT_DELAY = 300;

export type TModal = {
    id: number;
    component: TModalComponent;
    mountDelay?: number;
    dismountDelay?: number;
}

export type TModalComponent = ReactElement;

export interface IUseModals {
    get: Record<string, TModal>;
    modalIds: number[];
    add: (modalComponent: TModalComponent) => number | false;
    kill: (id: number) => void;
    killAll: any;
    remove: (id: number) => void;
    closeCurrent: () => void;
}

export default function useModals(): IUseModals {
    const [ modals, setModals ] = useState<Record<string, TModal>>({});
    const [ modalIds, setModalIds ] = useState<number[]>([]);

    const [ isChangingState, setIsChangingState ] = useState<boolean>(false);

    function add(modalComponent: TModalComponent) {
        if (isChangingState) return false;
        setIsChangingState(true);

        const id = Object.values(modals).length;
        const ModalWithId = React.cloneElement(modalComponent, { id });

        setModals(prev => {
            return {
                ...prev,
                [id.toString()]: {
                    id,
                    component: ModalWithId,
                    mountDelay: modalComponent.props.mountDelay ?? MOUNT_DELAY,
                    dismountDelay: modalComponent.props.dismountDelay ?? DISMOUNT_DELAY
                }
            }
        });

        setModalIds(prev => [...prev, id]);

        setTimeout(() => {
            setIsChangingState(false);
        }, 300);
        return id;
    }

    function kill(id: number) {
        setModals(prev => {
            const newModals = { ...prev };
            delete newModals[id];
            return newModals;
        });

        setTimeout(() => {
            setIsChangingState(false);
        }, 300);
    }
    
    function unplugLifeSupport(id: number) {
        if (isChangingState) return false;

        setIsChangingState(true);
        setModalIds((prev) => prev.filter((i) => i !== id));
    }

    function closeCurrent() {
        unplugLifeSupport(modalIds[modalIds.length -1]);
    }

    function killAll() {
        setModals({});
        setModalIds([]);
    }

    return {
        get: modals,
        killAll,
        modalIds,
        add,
        kill,
        remove: unplugLifeSupport,
        closeCurrent
    }
}
