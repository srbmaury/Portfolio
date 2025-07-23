import { createContext } from 'react';

interface ModalContextType {
  isProjectModalOpen: boolean;
  setIsProjectModalOpen: (isOpen: boolean) => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined); 