import { useEffect, useState } from 'react';
import { Download, FileText, X } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

interface ResumeViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

const resumeUrl = import.meta.env.VITE_RESUME_URL ?? '';
const googleDriveFileId = resumeUrl.match(/drive\.google\.com\/file\/d\/([^/?]+)/)?.[1];
const resumeDownloadUrl = googleDriveFileId
  ? `https://drive.google.com/uc?export=download&id=${googleDriveFileId}`
  : resumeUrl;

const ResumeViewer = ({ isOpen, onClose }: ResumeViewerProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return;

    setIsLoading(true);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  const handleDownload = () => {
    trackEvent('resume', 'download', 'Resume PDF');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="resume-viewer-title">
      <div className="absolute inset-0 backdrop-blur-sm" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }} onClick={onClose} />
      <div className="relative flex h-[90vh] w-[90vw] max-w-6xl flex-col rounded-lg shadow-2xl" style={{ backgroundColor: 'var(--card-bg)' }}>
        <div className="flex items-center justify-between rounded-t-lg border-b bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white" style={{ borderColor: 'var(--border-color)' }}>
          <div className="flex items-center space-x-2">
            <FileText size={20} />
            <h2 id="resume-viewer-title" className="text-lg font-semibold">Saurabh Maurya — Resume</h2>
          </div>
          <div className="flex items-center space-x-2">
            {resumeUrl && <a href={resumeDownloadUrl} onClick={handleDownload} className="flex items-center space-x-1 rounded-md px-3 py-1.5 transition-colors hover:bg-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
              <Download size={16} />
              <span className="text-sm">Download</span>
            </a>}
            <button type="button" onClick={onClose} className="rounded-md p-1.5 transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400" title="Close" aria-label="Close resume viewer">
              <X size={20} />
            </button>
          </div>
        </div>
        <div className="relative flex-1">
          {!resumeUrl ? (
            <div className="flex h-full items-center justify-center p-6 text-center" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
              The resume is temporarily unavailable. Please use the contact section to request a copy.
            </div>
          ) : (
            <>
              {isLoading && <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: 'var(--bg-secondary)' }}><span style={{ color: 'var(--text-secondary)' }}>Loading resume…</span></div>}
              <iframe src={resumeUrl} className="h-full w-full rounded-b-lg" onLoad={() => setIsLoading(false)} title="Saurabh Maurya Resume" style={{ backgroundColor: 'var(--bg-primary)' }} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeViewer;
