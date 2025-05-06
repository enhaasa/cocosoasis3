import { createContext } from 'react';

// Hooks
import { IUseModals } from './useModals';

const ModalContext = createContext<IUseModals>({} as IUseModals);

export default ModalContext;
