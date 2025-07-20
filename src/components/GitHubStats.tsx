import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Star, GitFork, Calendar, MapPin, Building } from 'lucide-react';

interface GitHubUser {
  login: string;
  name: string;
  bio: string;
  avatar_url: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  location: string;
  company: string;
  blog: string;
  created_at: string;
  updated_at: string;
}

interface GitHubStats {
  totalStars: number;
}

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
  topics: string[];
}

interface GitHubStatsProps {
  username: string;
  className?: string;
}

const GitHubStats: React.FC<GitHubStatsProps> = ({ username, className = '' }) => {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [stats, setStats] = useState<GitHubStats>({ totalStars: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch user data
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        if (!userResponse.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData: GitHubUser = await userResponse.json();

        // Fetch all repositories to calculate total stars
        const allReposResponse = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100&type=owner`
        );
        if (!allReposResponse.ok) {
          throw new Error('Failed to fetch repositories');
        }
        const allReposData: Repository[] = await allReposResponse.json();

        // Calculate total stars
        const totalStars = allReposData.reduce((sum, repo) => sum + repo.stargazers_count, 0);

        // Get top 6 repositories for display
        const topRepos = allReposData
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 6);

        setUser(userData);
        setRepos(topRepos);
        setStats({ totalStars });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, [username]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  };

  if (loading) {
    return (
      <section className={`section ${className}`} style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: 'var(--primary-color)' }}></div>
            <p className="mt-4" style={{ color: 'var(--text-secondary)' }}>Loading GitHub statistics...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={`section ${className}`} style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="text-center">
            <p style={{ color: '#ef4444' }}>Error loading GitHub data: {error}</p>
            <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
              This might be due to rate limiting or network issues.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <section id="github" className={`section ${className}`} style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">GitHub Statistics</h2>
          <p className="section-subtitle">
            Real-time data from my GitHub profile and repositories
          </p>
        </motion.div>

        {/* User Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="card max-w-4xl mx-auto mb-12"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <img
                src={user.avatar_url}
                alt={user.name || user.login}
                className="w-24 h-24 rounded-full border-4"
                style={{ borderColor: 'var(--primary-color)' }}
              />
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <Github size={20} style={{ color: 'var(--text-secondary)' }} />
                <h3 className="text-2xl font-bold gradient-text">
                  {user.name || user.login}
                </h3>
              </div>
              
              {user.bio && (
                <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>{user.bio}</p>
              )}

              {/* User Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold" style={{ color: 'var(--primary-color)' }}>{user.public_repos}</div>
                  <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Repositories</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold" style={{ color: '#22c55e' }}>{user.followers}</div>
                  <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold" style={{ color: 'var(--accent-color)' }}>{user.following}</div>
                  <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Following</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold" style={{ color: '#f59e0b' }}>{stats.totalStars}</div>
                  <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Total Stars</div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="flex flex-wrap gap-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
                {user.location && (
                  <div className="flex items-center gap-1">
                    <MapPin size={16} />
                    <span>{user.location}</span>
                  </div>
                )}
                {user.company && (
                  <div className="flex items-center gap-1">
                    <Building size={16} />
                    <span>{user.company}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span>Joined {formatDate(user.created_at)}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Top Repositories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-center mb-8 gradient-text">Top Repositories</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo, index) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                viewport={{ once: true }}
                className="card group"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {repo.name}
                  </h4>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <Github size={16} style={{ color: 'var(--primary-color)' }} />
                  </a>
                </div>
                
                {repo.description && (
                  <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {repo.description}
                  </p>
                )}

                {/* Repository Stats */}
                <div className="flex items-center justify-between text-sm mb-3">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star size={14} style={{ color: '#f59e0b' }} />
                      <span style={{ color: 'var(--text-secondary)' }}>{repo.stargazers_count}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork size={14} style={{ color: 'var(--text-secondary)' }} />
                      <span style={{ color: 'var(--text-secondary)' }}>{repo.forks_count}</span>
                    </div>
                  </div>
                  <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    {getTimeAgo(repo.updated_at)}
                  </span>
                </div>

                {/* Language and Topics */}
                <div className="space-y-2">
                  {repo.language && (
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--primary-color)' }}></div>
                      <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{repo.language}</span>
                    </div>
                  )}
                  
                  {repo.topics && repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {repo.topics.slice(0, 3).map((topic) => (
                        <span
                          key={topic}
                          className="px-2 py-1 text-xs rounded-full"
                          style={{
                            backgroundColor: 'var(--tag-bg)',
                            color: 'var(--text-secondary)'
                          }}
                        >
                          {topic}
                        </span>
                      ))}
                      {repo.topics.length > 3 && (
                        <span
                          className="px-2 py-1 text-xs rounded-full"
                          style={{
                            backgroundColor: 'var(--tag-bg)',
                            color: 'var(--text-secondary)'
                          }}
                        >
                          +{repo.topics.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg transition-colors duration-300"
            style={{ 
              backgroundColor: 'var(--primary-color)', 
              color: 'white' 
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--secondary-color)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--primary-color)';
            }}
          >
            <Github size={20} />
            View Full Profile on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubStats; 