import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, GitFork, Star } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';
import portfolioProfile from '../config/profile.json';
import { trackSocialEvent } from '../utils/analytics';

interface GitHubUser { login: string; name: string; bio: string; avatar_url: string; location: string; company: string; created_at: string; }
interface GitHubRepository { id?: number; name: string; description?: string | null; html_url: string; stars?: number; forks?: number; language?: string | null; }
interface GitHubStatsResponse { user: GitHubUser; stats: { totalStars: number; totalRepos: number }; repos: GitHubRepository[]; }
interface GitHubStatsProps { username: string; className?: string; }

const selectedRepositoryNames = ['Chess-Coach', 'YAML-Visualizer', 'Ecommerce-Search'];

const selectedRepositoryFallbacks: GitHubRepository[] = [
  {
    name: 'Chess-Coach',
    description: 'Personalized chess training with Stockfish, browser-side analysis, hosted persistence, adaptive puzzles, and player-specific modelling.',
    html_url: 'https://github.com/srbmaury/Chess-Coach',
    language: 'Python',
  },
  {
    name: 'YAML-Visualizer',
    description: 'Collaborative YAML visualization with large-tree rendering, realtime workflows, diffing, versioning, and GitHub integration.',
    html_url: 'https://github.com/srbmaury/YAML-Visualizer',
    language: 'JavaScript',
  },
  {
    name: 'Ecommerce-Search',
    description: 'Search and recommendation system with PostgreSQL retrieval, Redis caching, personalization, and LightGBM ranking.',
    html_url: 'https://github.com/srbmaury/Ecommerce-Search',
    language: 'Python',
  },
];

const profileFallback: GitHubStatsResponse = {
  user: {
    login: portfolioProfile.githubSnapshot.username,
    name: portfolioProfile.personalInfo.name,
    bio: portfolioProfile.personalInfo.bio,
    avatar_url: portfolioProfile.githubSnapshot.avatarUrl,
    location: portfolioProfile.personalInfo.hometown,
    company: portfolioProfile.githubSnapshot.company,
    created_at: portfolioProfile.githubSnapshot.joinedAt,
  },
  stats: { totalStars: portfolioProfile.githubSnapshot.totalStars, totalRepos: portfolioProfile.githubSnapshot.repositories },
  repos: selectedRepositoryFallbacks,
};

const GitHubStats: React.FC<GitHubStatsProps> = ({ username, className = '' }) => {
  const [data, setData] = useState<GitHubStatsResponse | null>(null);
  const profile = data || profileFallback;
  const liveSelected = data?.repos.filter((repo) => selectedRepositoryNames.includes(repo.name)) || [];
  const selectedRepos = liveSelected.length >= 2 ? liveSelected : selectedRepositoryFallbacks;

  useEffect(() => {
    let ignore = false;
    const load = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.githubStats(username));
        if (!response.ok) throw new Error('GitHub request failed');
        const result = await response.json() as GitHubStatsResponse;
        if (!ignore) setData(result);
      } catch {
        if (!ignore) setData(null);
      }
    };
    void load();
    return () => { ignore = true; };
  }, [username]);

  return (
    <section id="github" className={`section ${className}`} style={{ backgroundColor: 'var(--bg-secondary)' }} aria-label="Current engineering work on GitHub">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <h2 className="section-title">What I’m Building</h2>
          <p className="section-subtitle">
            A few public repositories that best represent what I’m actively exploring and improving.
          </p>
        </motion.div>

        <div className="mx-auto max-w-5xl">
          <div className="mb-6 flex flex-col gap-4 rounded-xl border p-5 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}>
            <div className="flex items-center gap-4">
              <img src={profile.user.avatar_url} alt={profile.user.name || username} className="h-14 w-14 rounded-full object-cover" />
              <div>
                <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{profile.user.name || username}</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Open source, experiments, and ongoing engineering work.</p>
              </div>
            </div>
            <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer" className="btn btn-secondary whitespace-nowrap" onClick={() => trackSocialEvent('GitHub')}>
              <Github size={18} /> View GitHub
            </a>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {selectedRepos.map((repo, index) => (
              <motion.a key={repo.html_url} href={repo.html_url} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: index * 0.06 }} viewport={{ once: true }} onClick={() => trackSocialEvent('GitHub')} className="rounded-xl border p-5 transition-transform hover:-translate-y-1" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}>
                <div className="mb-3 flex items-start justify-between gap-3">
                  <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{repo.name}</h3>
                  <Github size={17} style={{ color: 'var(--primary-color)' }} />
                </div>
                <p className="min-h-[5.25rem] text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{repo.description}</p>
                <div className="mt-4 flex flex-wrap gap-3 text-xs" style={{ color: 'var(--text-secondary)' }}>
                  {repo.language && <span>{repo.language}</span>}
                  {typeof repo.stars === 'number' && repo.stars > 0 && <span className="inline-flex items-center gap-1"><Star size={12} />{repo.stars}</span>}
                  {typeof repo.forks === 'number' && repo.forks > 0 && <span className="inline-flex items-center gap-1"><GitFork size={12} />{repo.forks}</span>}
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubStats;
