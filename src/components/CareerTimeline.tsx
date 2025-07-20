import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Award, 
  Code, 
  GraduationCap, 
  Briefcase, 
  Star, 
  Play, 
  Pause, 
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';

interface TimelineMilestone {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  location: string;
  type: 'education' | 'work' | 'achievement' | 'project';
  icon: React.ReactNode;
  color: string;
  gradient: string;
  image?: string;
  video?: string;
  achievements: string[];
  skills: string[];
  links?: {
    label: string;
    url: string;
  }[];
  choices?: {
    label: string;
    nextMilestone: string;
    description: string;
  }[];
}

interface CareerTimelineProps {
  isOpen: boolean;
  onClose: () => void;
}

const CareerTimeline: React.FC<CareerTimelineProps> = ({ isOpen, onClose }) => {
  const [currentMilestone, setCurrentMilestone] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const timelineData: TimelineMilestone[] = [
    {
      id: 'education-start',
      year: '2021',
      title: 'Programming Journey Begins',
      subtitle: 'First Coding Projects',
      description: 'Started my programming journey with basic projects, learning fundamentals of web development and JavaScript.',
      location: 'Self-Learning',
      type: 'education',
      icon: <GraduationCap size={24} />,
      color: 'bg-blue-500',
      gradient: 'from-blue-500 to-cyan-500',
      achievements: [
        'Created interactive quiz applications',
        'Built classic games like Tic Tac Toe and Flappy Bird',
        'Developed basic web applications',
        'Started learning HTML, CSS, and JavaScript'
      ],
      skills: ['HTML', 'CSS', 'JavaScript', 'Game Development', 'DOM Manipulation'],
      choices: [
        {
          label: 'Focus on Web Development',
          nextMilestone: 'web-dev',
          description: 'Dive deep into modern web technologies'
        },
        {
          label: 'Explore More Games',
          nextMilestone: 'game-dev',
          description: 'Create more interactive games'
        }
      ]
    },
    {
      id: 'web-dev',
      year: '2021-2022',
      title: 'Web Development Growth',
      subtitle: 'Building Interactive Applications',
      description: 'Expanded my web development skills, creating dictionary applications and learning modern frameworks.',
      location: 'Personal Projects',
      type: 'project',
      icon: <Code size={24} />,
      color: 'bg-green-500',
      gradient: 'from-green-500 to-emerald-500',
      achievements: [
        'Built dictionary and reference applications',
        'Created productivity tools and todo lists',
        'Learned React and modern JavaScript',
        'Started exploring backend development'
      ],
      skills: ['React', 'JavaScript', 'API Integration', 'Responsive Design', 'Local Storage'],
      choices: [
        {
          label: 'Build Real Applications',
          nextMilestone: 'mern-projects',
          description: 'Create full-stack applications with MERN stack'
        },
        {
          label: 'Learn Backend Development',
          nextMilestone: 'backend-dev',
          description: 'Focus on server-side development'
        }
      ]
    },
    {
      id: 'mern-projects',
      year: '2022',
      title: 'MERN Stack Development',
      subtitle: 'Full-Stack Applications',
      description: 'Started building full-stack applications using the MERN stack, including chat applications and real-time features.',
      location: 'Personal Projects',
      type: 'project',
      icon: <Code size={24} />,
      color: 'bg-purple-500',
      gradient: 'from-purple-500 to-pink-500',
      achievements: [
        'Built real-time chat applications',
        'Created multiple communication platforms',
        'Learned Socket.io for real-time communication',
        'Mastered MongoDB and Express.js'
      ],
      skills: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Socket.io', 'JWT'],
      choices: [
        {
          label: 'Apply for Internships',
          nextMilestone: 'razorpay-internship',
          description: 'Start professional journey with internships'
        },
        {
          label: 'Continue Building',
          nextMilestone: 'advanced-projects',
          description: 'Create more advanced applications'
        }
      ]
    },
    {
      id: 'razorpay-internship',
      year: '2023',
      title: 'Razorpay Internship',
      subtitle: 'Software Development Intern',
      description: 'Joined Razorpay as a Software Development Intern, working on payment monitoring systems and Grafana dashboards.',
      location: 'Bengaluru, India',
      type: 'work',
      icon: <Briefcase size={24} />,
      color: 'bg-orange-500',
      gradient: 'from-orange-500 to-red-500',
      achievements: [
        'Crafted 20+ Interactive Grafana Dashboards',
        'Configured dynamic alert rules',
        'Implemented metrics integration into Prometheus',
        'Learned payment processing systems'
      ],
      skills: ['Grafana', 'PromQL', 'Prometheus', 'AlertManager', 'PHP'],
      choices: [
        {
          label: 'Focus on Full-Stack',
          nextMilestone: 'advanced-projects',
          description: 'Develop advanced full-stack skills'
        },
        {
          label: 'Explore DevOps',
          nextMilestone: 'devops-learning',
          description: 'Learn infrastructure and deployment'
        }
      ]
    },
    {
      id: 'advanced-projects',
      year: '2023-2024',
      title: 'Advanced Project Development',
      subtitle: 'Complex Applications & New Technologies',
      description: 'Built advanced applications including Kanban boards, notes apps, and explored new technologies like Go and Flask.',
      location: 'Personal & Professional',
      type: 'project',
      icon: <Code size={24} />,
      color: 'bg-indigo-500',
      gradient: 'from-indigo-500 to-purple-500',
      achievements: [
        'Built project management tools with drag-and-drop',
        'Created note-taking and productivity applications',
        'Explored Go programming language',
        'Developed API projects with Flask',
        'Created browser extensions and utilities'
      ],
      skills: ['TypeScript', 'React', 'Tailwind CSS', 'Advanced JavaScript'],
      choices: [
        {
          label: 'Apply for Full-Time Roles',
          nextMilestone: 'salesforce-role',
          description: 'Start professional full-time career'
        },
        {
          label: 'Specialize in Frontend',
          nextMilestone: 'frontend-specialist',
          description: 'Become a frontend specialist'
        }
      ]
    },
    {
      id: 'salesforce-role',
      year: '2024',
      title: 'Salesforce - Associate Member of Technical Staff',
      subtitle: 'Full-Stack Engineer',
      description: 'Joined Salesforce as a full-time engineer, working on interactive dependency graphs, AI-driven tools, and automated testing.',
      location: 'Hyderabad, India',
      type: 'work',
      icon: <Briefcase size={24} />,
      color: 'bg-blue-600',
      gradient: 'from-blue-600 to-cyan-600',
      achievements: [
        'Engineered interactive dependency graphs using D3.js',
        'Developed AI-driven test data generators',
        'Automated frontend testing achieving 90% test coverage',
        'Working with enterprise-scale applications'
      ],
      skills: ['SOQL', 'Java', 'Apex', 'Git', 'UTAM', 'Selenium', 'LWC', 'Salesforce DB'],
      choices: [
        {
          label: 'Continue Building Projects',
          nextMilestone: 'store-management-2025',
          description: 'Create new innovative projects'
        },
        {
          label: 'Explore Leadership',
          nextMilestone: 'leadership-path',
          description: 'Develop leadership and mentoring skills'
        }
      ]
    },
    {
      id: 'store-management-2025',
      year: '2025',
      title: 'Business Management Applications',
      subtitle: 'Advanced Full-Stack Projects',
      description: 'Built comprehensive business management applications with inventory tracking, sales management, and reporting features using modern technologies.',
      location: 'Personal Projects',
      type: 'project',
      icon: <Code size={24} />,
      color: 'bg-emerald-500',
      gradient: 'from-emerald-500 to-teal-500',
      achievements: [
        'Created comprehensive inventory management systems',
        'Implemented sales tracking and reporting features',
        'Built responsive UI with modern design',
        'Integrated with backend APIs and databases'
      ],
      skills: ['JavaScript', 'HTML', 'CSS', 'Bootstrap', 'Local Storage', 'Responsive Design'],
      choices: [
        {
          label: 'Continue Growing',
          nextMilestone: 'future-goals',
          description: 'Set future career goals and aspirations'
        },
        {
          label: 'Explore New Technologies',
          nextMilestone: 'tech-exploration',
          description: 'Learn emerging technologies'
        }
      ]
    },
    {
      id: 'future-goals',
      year: '2025+',
      title: 'Future Aspirations',
      subtitle: 'Continuous Learning & Growth',
      description: 'Looking forward to continuous learning, building innovative solutions, and contributing to impactful projects.',
      location: 'Future',
      type: 'achievement',
      icon: <Star size={24} />,
      color: 'bg-yellow-500',
      gradient: 'from-yellow-500 to-orange-500',
      image: '/images/future.jpg',
      achievements: [
        'Master advanced technologies',
        'Contribute to open-source projects',
        'Mentor junior developers',
        'Build innovative solutions'
      ],
      skills: ['Continuous Learning', 'Innovation', 'Leadership', 'Mentoring'],
      choices: [
        {
          label: 'Explore New Technologies',
          nextMilestone: 'tech-exploration',
          description: 'Learn emerging technologies like AI/ML'
        },
        {
          label: 'Focus on Architecture',
          nextMilestone: 'architecture-focus',
          description: 'Develop system design and architecture skills'
        }
      ]
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && isOpen) {
      intervalRef.current = setInterval(() => {
        setCurrentMilestone(prev => {
          if (prev < timelineData.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, 4000); // 4 seconds per milestone
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, isOpen, timelineData.length]);

  // Sound effects
  const playSound = (type: 'click' | 'transition' | 'achievement') => {
    if (isMuted || !audioRef.current) return;
    
    // Simulate different sound effects
    const audio = new Audio();
    audio.volume = 0.3;
    
    switch (type) {
      case 'click':
        audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT';
        break;
      case 'transition':
        audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT';
        break;
      case 'achievement':
        audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT';
        break;
    }
    
    audio.play().catch(() => {}); // Ignore audio errors
  };

  const handleMilestoneChange = (index: number) => {
    setCurrentMilestone(index);
    playSound('transition');
  };

  const handleChoice = (choice: { label: string; nextMilestone: string; description: string }) => {
    playSound('achievement');
    
    // Find next milestone
    const nextIndex = timelineData.findIndex(m => m.id === choice.nextMilestone);
    if (nextIndex !== -1) {
      setCurrentMilestone(nextIndex);
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    playSound('click');
  };

  const handlePrevious = () => {
    if (currentMilestone > 0) {
      handleMilestoneChange(currentMilestone - 1);
    }
  };

  const handleNext = () => {
    if (currentMilestone < timelineData.length - 1) {
      handleMilestoneChange(currentMilestone + 1);
    }
  };

  const currentMilestoneData = timelineData[currentMilestone];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
            style={{ backgroundColor: 'var(--card-bg)' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold">Career Journey</h2>
                  <p className="text-blue-100 mt-1">Interactive Timeline of Saurabh's Professional Growth</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="flex h-[calc(90vh-120px)]">
              {/* Timeline Navigation */}
              <div className="w-80 p-6 overflow-y-auto border-r" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                <div className="space-y-4">
                  {timelineData.map((milestone, index) => (
                    <motion.div
                      key={milestone.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`cursor-pointer p-4 rounded-lg transition-all duration-200 ${
                        currentMilestone === index
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                          : 'hover:bg-gray-100 border'
                      }`}
                      style={{
                        backgroundColor: currentMilestone === index ? undefined : 'var(--card-bg)',
                        borderColor: currentMilestone === index ? undefined : 'var(--border-color)'
                      }}
                      onClick={() => handleMilestoneChange(index)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${milestone.color} text-white`}>
                          {milestone.icon}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold" style={{ color: currentMilestone === index ? 'white' : 'var(--text-primary)' }}>{milestone.year}</div>
                          <div className="text-sm opacity-80" style={{ color: currentMilestone === index ? 'white' : 'var(--text-secondary)' }}>{milestone.title}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 p-6 overflow-y-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentMilestone}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {/* Milestone Header */}
                    <div className="text-center">
                      <div className={`inline-flex items-center space-x-3 p-4 rounded-full bg-gradient-to-r ${currentMilestoneData.gradient} text-white mb-4`}>
                        {currentMilestoneData.icon}
                        <span className="text-2xl font-bold">{currentMilestoneData.year}</span>
                      </div>
                      <h3 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{currentMilestoneData.title}</h3>
                      <p className="text-xl mb-1" style={{ color: 'var(--text-secondary)' }}>{currentMilestoneData.subtitle}</p>
                      <div className="flex items-center justify-center space-x-2" style={{ color: 'var(--text-secondary)' }}>
                        <MapPin size={16} />
                        <span>{currentMilestoneData.location}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="p-6 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                      <p className="text-lg leading-relaxed" style={{ color: 'var(--text-primary)' }}>{currentMilestoneData.description}</p>
                    </div>

                    {/* Achievements */}
                    <div>
                      <h4 className="text-xl font-semibold mb-4 flex items-center space-x-2" style={{ color: 'var(--text-primary)' }}>
                        <Award size={20} className="text-yellow-500" />
                        <span>Key Achievements</span>
                      </h4>
                      <div className="grid gap-3">
                        {currentMilestoneData.achievements.map((achievement, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start space-x-3 p-3 rounded-lg border"
                            style={{ backgroundColor: 'var(--tag-bg)', borderColor: 'var(--border-color)' }}
                          >
                            <Star size={16} className="text-green-500 mt-1 flex-shrink-0" />
                            <span style={{ color: 'var(--text-primary)' }}>{achievement}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Skills */}
                    <div>
                      <h4 className="text-xl font-semibold mb-4 flex items-center space-x-2" style={{ color: 'var(--text-primary)' }}>
                        <Code size={20} className="text-blue-500" />
                        <span>Skills Developed</span>
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {currentMilestoneData.skills.map((skill, index) => (
                          <motion.span
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="px-3 py-1 rounded-full text-sm font-medium"
                            style={{ backgroundColor: 'var(--tag-bg)', color: 'var(--primary-color)' }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Choices */}
                    {currentMilestoneData.choices && (
                      <div>
                        <h4 className="text-xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Choose Your Path</h4>
                        <div className="grid gap-3">
                          {currentMilestoneData.choices.map((choice, index) => (
                            <motion.button
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              onClick={() => handleChoice(choice)}
                              className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 text-left"
                            >
                              <div className="font-semibold">{choice.label}</div>
                              <div className="text-sm opacity-90">{choice.description}</div>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Progress */}
                    <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--tag-bg)' }}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Journey Progress</span>
                        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{currentMilestone + 1} of {timelineData.length}</span>
                      </div>
                      <div className="w-full rounded-full h-2" style={{ backgroundColor: 'var(--border-color)' }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${((currentMilestone + 1) / timelineData.length) * 100}%` }}
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                        />
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Controls */}
            <div className="p-4 border-t" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handlePrevious}
                    disabled={currentMilestone === 0}
                    className="p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: 'var(--card-bg)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--card-bg)';
                    }}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={handlePlayPause}
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: 'var(--card-bg)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--card-bg)';
                    }}
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={currentMilestone === timelineData.length - 1}
                    className="p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: 'var(--card-bg)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--card-bg)';
                    }}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: 'var(--card-bg)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--card-bg)';
                    }}
                  >
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Hidden audio element for sound effects */}
            <audio ref={audioRef} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CareerTimeline; 