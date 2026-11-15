import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, RotateCcw, X, ZoomIn, ZoomOut } from 'lucide-react';
import type { ProjectModalProps } from '../types/project';
import { trackProjectEvent } from '../utils/analytics';

const ProjectModal = ({ isOpen, onClose, project }: ProjectModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [zoom, setZoom] = useState(1);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !isOpen) return;

    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected && previousFocus !== document.body) previousFocus.focus();
    };
  }, [isOpen]);

  if (!isOpen || !project) return null;

  const zoomIn = () => setZoom(current => Math.min(3, current + 0.25));
  const zoomOut = () => setZoom(current => Math.max(0.5, current - 0.25));
  const hasImage = Boolean(project.image && !imageFailed);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="project-modal-title"
      className="case-study-modal fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-4xl overflow-hidden rounded-xl p-0 shadow-2xl backdrop:bg-black/75"
      style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-primary)' }}
      onCancel={event => {
        event.preventDefault();
        onClose();
      }}
      onClick={event => {
        if (event.target === event.currentTarget) onClose();
      }}
      onKeyDown={event => {
        if (!hasImage || event.ctrlKey || event.metaKey || event.altKey) return;
        switch (event.key) {
          case '+':
          case '=':
            event.preventDefault();
            zoomIn();
            break;
          case '-':
            event.preventDefault();
            zoomOut();
            break;
          case '0':
            event.preventDefault();
            setZoom(1);
            break;
        }
      }}
    >
      <div className="flex max-h-[90dvh] flex-col">
        <header className="flex items-start justify-between gap-2 border-b p-4 sm:p-6" style={{ borderColor: 'var(--border-color)' }}>
          <div>
            <h2 id="project-modal-title" className="text-xl font-bold sm:text-2xl">{project.title}</h2>
            <p className="mt-1 text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>{project.description}</p>
          </div>
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Close project modal" className="grid size-11 shrink-0 place-items-center rounded-lg hover:bg-[var(--tag-bg)]">
            <X size={22} />
          </button>
        </header>

        <div className="min-h-0 space-y-6 overflow-auto overscroll-contain p-4 sm:p-6">
          {(project.liveUrl || project.githubUrl) && (
            <div>
              <div className="flex flex-wrap gap-2">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" onClick={() => trackProjectEvent('live_demo_click', project.title)}>
                    <ExternalLink size={16} /> Live demo
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" onClick={() => trackProjectEvent('github_click', project.title)}>
                    <Github size={16} /> Source code
                  </a>
                )}
              </div>
              {project.liveNote && <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>{project.liveNote}</p>}
            </div>
          )}

          {hasImage && (
            <section>
              <div className="mb-2 flex flex-wrap items-center justify-between gap-x-4">
                <h3 className="text-lg font-semibold">Project screenshot</h3>
                <div className="flex items-center gap-1" role="group" aria-label="Screenshot zoom">
                  <button type="button" onClick={zoomOut} disabled={zoom === 0.5} aria-label="Zoom out" className="grid size-11 place-items-center rounded-lg hover:bg-[var(--tag-bg)] disabled:opacity-40"><ZoomOut size={18} /></button>
                  <span className="min-w-11 text-center text-sm" aria-live="polite">{Math.round(zoom * 100)}%</span>
                  <button type="button" onClick={zoomIn} disabled={zoom === 3} aria-label="Zoom in" className="grid size-11 place-items-center rounded-lg hover:bg-[var(--tag-bg)] disabled:opacity-40"><ZoomIn size={18} /></button>
                  <button type="button" onClick={() => setZoom(1)} disabled={zoom === 1} aria-label="Reset zoom" className="grid size-11 place-items-center rounded-lg hover:bg-[var(--tag-bg)] disabled:opacity-40"><RotateCcw size={18} /></button>
                </div>
              </div>
              <div className="max-h-[min(48dvh,25rem)] overflow-auto rounded-lg bg-[var(--bg-secondary)]" tabIndex={zoom > 1 ? 0 : undefined} aria-label="Screenshot viewer">
                <img
                  src={project.image}
                  alt={`${project.title} interface screenshot`}
                  onError={() => setImageFailed(true)}
                  className="mx-auto block h-auto w-auto object-contain"
                  style={{ maxWidth: `${zoom * 100}%`, maxHeight: `min(${48 * zoom}dvh, ${25 * zoom}rem)` }}
                />
              </div>
              {project.imageCaption && <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>{project.imageCaption}</p>}
            </section>
          )}

          {project.demoType === 'video' && project.demoUrl && <video src={project.demoUrl} className="w-full rounded-lg" controls />}
          {imageFailed && <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>The project screenshot could not load.</p>}

          {project.systemFlow && (
            <section>
              <h3 className="mb-3 text-lg font-semibold">How it works</h3>
              <ol className="flex flex-wrap gap-2 text-sm">
                {project.systemFlow.map((step, index) => (
                  <li key={step} className="inline-flex items-center gap-2">
                    {index > 0 && <span aria-hidden="true" style={{ color: 'var(--primary-color)' }}>→</span>}
                    <span className="rounded-full bg-[var(--tag-bg)] px-3 py-1">{step}</span>
                  </li>
                ))}
              </ol>
            </section>
          )}

          <section>
            <h3 className="mb-3 text-lg font-semibold">Technology stack</h3>
            <ul className="flex flex-wrap gap-2">
              {project.technologies.map(tech => <li key={tech} className="rounded-full bg-[var(--tag-bg)] px-3 py-1 text-sm">{tech}</li>)}
            </ul>
          </section>

          {Boolean(project.highlights?.length) && (
            <section>
              <h3 className="mb-3 text-lg font-semibold">Engineering decisions & implementation</h3>
              <ul className="list-disc space-y-2 pl-5" style={{ color: 'var(--text-secondary)' }}>
                {project.highlights?.map(highlight => <li key={highlight}>{highlight}</li>)}
              </ul>
            </section>
          )}
        </div>
      </div>
    </dialog>
  );
};

export default ProjectModal;
