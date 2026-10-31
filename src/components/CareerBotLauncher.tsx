import { MessageCircle } from 'lucide-react';
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
      className="chatter-launcher"
      aria-label="Open Chatter assistant"
    >
      <MessageCircle size={21} /><span>Chatter</span>
    </button>
  );
};

export default CareerBotLauncher;
