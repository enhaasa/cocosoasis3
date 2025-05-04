import { ReactNode } from 'react';

// Contexts
import ModalContext from './ModalContext';

// Hooks
import useModals from './useModals';

interface ModalProviderProps {
  children: ReactNode;
}

function ModalProvider({ children }: ModalProviderProps) {
  const modals = useModals();

  return (
    <ModalContext.Provider value={modals}>
      {children}
    </ModalContext.Provider>
  );
}

export default ModalProvider;
