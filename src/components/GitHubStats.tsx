import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Building, Calendar, Github, MapPin } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';
import portfolioProfile from '../config/profile.json';

interface GitHubUser {
  login: string;
  name: string;
  bio: string;
  avatar_url: string;
  followers: number;
  location: string;
  company: string;
  created_at: string;
}

interface GitHubStatsResponse {
  user: GitHubUser;
  stats: { totalStars: number; totalRepos: number };
}

interface GitHubStatsProps {
  username: string;
  className?: string;
}

const profileFallback: GitHubStatsResponse = {
  user: {
    login: portfolioProfile.githubSnapshot.username,
    name: portfolioProfile.personalInfo.name,
    bio: portfolioProfile.personalInfo.bio,
    avatar_url: portfolioProfile.githubSnapshot.avatarUrl,
    followers: portfolioProfile.githubSnapshot.followers,
    location: portfolioProfile.personalInfo.hometown,
    company: portfolioProfile.githubSnapshot.company,
    created_at: portfolioProfile.githubSnapshot.joinedAt,
  },
  stats: { totalStars: portfolioProfile.githubSnapshot.totalStars, totalRepos: portfolioProfile.githubSnapshot.repositories },
};

const GitHubStats: React.FC<GitHubStatsProps> = ({ username, className = '' }) => {
  const [data, setData] = useState<GitHubStatsResponse | null>(null);
  const profile = data || profileFallback;
  const joinedDate = new Date(profile.user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  useEffect(() => {
    let ignore = false;

    const fetchGitHubData = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.githubStats(username));
        if (!response.ok) throw new Error(`Request failed (${response.status})`);
        const responseData = await response.json() as GitHubStatsResponse;
        if (!ignore) setData(responseData);
      } catch {
        if (!ignore) setData(null);
      }
    };

    fetchGitHubData();
    return () => { ignore = true; };
  }, [username]);

  return (
    <section id="github" className={`section ${className}`} style={{ backgroundColor: 'var(--bg-secondary)' }} aria-label="GitHub and open source">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <h2 className="section-title">GitHub Statistics</h2>
          <p className="section-subtitle">
            A concise snapshot of my public engineering activity and GitHub profile.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="card max-w-5xl mx-auto"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            {profile.user.avatar_url ? (
              <img src={profile.user.avatar_url} alt={`${profile.user.name || username} on GitHub`} className="w-20 h-20 rounded-full border-4 flex-shrink-0 object-cover" style={{ borderColor: 'var(--primary-color)' }} />
            ) : (
              <div className="w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--tag-bg)' }} aria-hidden="true">
                <Github size={34} style={{ color: 'var(--primary-color)' }} />
              </div>
            )}

            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold gradient-text mb-1">{profile.user.name || username}</h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {profile.user.bio}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                {profile.user.location && <span className="inline-flex items-center gap-1"><MapPin size={15} />{profile.user.location}</span>}
                {profile.user.company && <span className="inline-flex items-center gap-1"><Building size={15} />{profile.user.company}</span>}
                <span className="inline-flex items-center gap-1"><Calendar size={15} />Joined {joinedDate}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-5 text-center flex-shrink-0" aria-label={data ? 'Live GitHub statistics' : 'Recent GitHub statistics snapshot'}>
              <div><strong className="block text-xl" style={{ color: 'var(--primary-color)' }}>{profile.stats.totalRepos}</strong><span className="text-xs" style={{ color: 'var(--text-secondary)' }}>Repositories</span></div>
              <div><strong className="block text-xl" style={{ color: '#22c55e' }}>{profile.user.followers}</strong><span className="text-xs" style={{ color: 'var(--text-secondary)' }}>Followers</span></div>
              <div><strong className="block text-xl" style={{ color: '#f59e0b' }}>{profile.stats.totalStars}</strong><span className="text-xs" style={{ color: 'var(--text-secondary)' }}>Total Stars</span></div>
            </div>

            <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary whitespace-nowrap" aria-label={`View ${username}'s full GitHub profile`}>
              <Github size={18} /> GitHub Profile
            </a>
          </div>
          <p className="mt-4 text-center text-xs" style={{ color: 'var(--text-secondary)' }}>
            {data ? 'Live data from GitHub' : 'Recent snapshot · Live data temporarily unavailable'}
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default GitHubStats;
