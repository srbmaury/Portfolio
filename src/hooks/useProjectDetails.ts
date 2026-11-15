import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { Project } from '../types/project';
import { useModal } from './useModal';

const projectSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '');

export const useProjectDetails = (projects: Project[]) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setIsProjectModalOpen } = useModal();
  const params = new URLSearchParams(location.search);
  const project = projects.find(item => projectSlug(item.title) === params.get('project')) ?? null;
  const isOpen = Boolean(project);

  useEffect(() => {
    setIsProjectModalOpen(isOpen);
    return () => setIsProjectModalOpen(false);
  }, [isOpen, setIsProjectModalOpen]);

  const projectLink = (item: Project) => {
    const next = new URLSearchParams(location.search);
    next.set('project', projectSlug(item.title));
    return { pathname: location.pathname, search: next.toString(), hash: location.hash };
  };

  const closeDetails = () => {
    if (location.state?.openedProject) {
      void navigate(-1);
      return;
    }
    params.delete('project');
    void navigate({ pathname: location.pathname, search: params.toString(), hash: location.hash }, { replace: true });
  };

  return { project, isOpen, projectLink, closeDetails };
};
