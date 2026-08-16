import { Bot } from 'lucide-react';
import { useModal } from '../hooks/useModal';
import { trackCareerBotEvent } from '../utils/analytics';

interface CareerBotLauncherProps {
  onOpen: () => void;
}

const CareerBotLauncher = ({ onOpen }: CareerBotLauncherProps) => {
  const { isProjectModalOpen } = useModal();

  if (isProjectModalOpen) return null;

  return (
    <button
      type="button"
      onClick={() => {
        trackCareerBotEvent('open');
        onOpen();
      }}
      className="fixed bottom-4 right-4 z-50 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 p-3 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:from-blue-700 hover:to-purple-700 sm:bottom-6 sm:right-6 sm:p-4"
      aria-label="Open career bot"
    >
      <Bot size={24} />
    </button>
  );
};

export default CareerBotLauncher;
