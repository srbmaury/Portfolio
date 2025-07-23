import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { ModalContext } from './ModalContextDef';

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ isProjectModalOpen, setIsProjectModalOpen }}>
      {children}
    </ModalContext.Provider>
  );
}; 