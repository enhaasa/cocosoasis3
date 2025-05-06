import React from 'react';

import { DEFAULT_DISMOUNT_DELAY } from './modalDefaults';

// Types
import { TModals, TModalComponent } from './types';

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

export default function modalReducer(state: State, action: Action): State {
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