import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  Award, 
  Code, 
  GraduationCap, 
  Briefcase, 
  Star, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward,
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
  const [showChoices, setShowChoices] = useState(false);
  const [selectedPath, setSelectedPath] = useState<string[]>([]);
  const [achievements, setAchievements] = useState<string[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const timelineData: TimelineMilestone[] = [
    {
      id: 'education-start',
      year: '2020',
      title: 'Computer Science Journey Begins',
      subtitle: 'Bachelor of Technology',
      description: 'Started my journey in Computer Science, learning the fundamentals of programming, data structures, and algorithms.',
      location: 'University',
      type: 'education',
      icon: <GraduationCap size={24} />,
      color: 'bg-blue-500',
      gradient: 'from-blue-500 to-cyan-500',
      achievements: [
        'Started learning programming fundamentals',
        'Completed first coding project',
        'Joined coding clubs and communities'
      ],
      skills: ['Programming Fundamentals', 'Data Structures', 'Algorithms'],
      choices: [
        {
          label: 'Focus on Web Development',
          nextMilestone: 'web-dev',
          description: 'Dive deep into HTML, CSS, and JavaScript'
        },
        {
          label: 'Explore Data Science',
          nextMilestone: 'data-science',
          description: 'Learn Python, statistics, and machine learning'
        }
      ]
    },
    {
      id: 'web-dev',
      year: '2021',
      title: 'Web Development Discovery',
      subtitle: 'Frontend & Backend Learning',
      description: 'Discovered my passion for web development, building responsive websites and learning modern frameworks.',
      location: 'Self-Learning',
      type: 'project',
      icon: <Code size={24} />,
      color: 'bg-green-500',
      gradient: 'from-green-500 to-emerald-500',
      image: '/images/web-dev.jpg',
      achievements: [
        'Built first responsive website',
        'Learned React and Node.js',
        'Created portfolio projects'
      ],
      skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
      choices: [
        {
          label: 'Build Real Projects',
          nextMilestone: 'first-projects',
          description: 'Create portfolio projects to showcase skills'
        },
        {
          label: 'Learn Advanced Concepts',
          nextMilestone: 'advanced-dev',
          description: 'Study advanced topics like state management'
        }
      ]
    },
    {
      id: 'first-projects',
      year: '2022',
      title: 'First Portfolio Projects',
      subtitle: 'Building Real Applications',
      description: 'Created my first portfolio projects including a chat application, store management system, and various web apps.',
      location: 'Personal Projects',
      type: 'project',
      icon: <Code size={24} />,
      color: 'bg-purple-500',
      gradient: 'from-purple-500 to-pink-500',
      image: '/images/projects.jpg',
      achievements: [
        'Built MERN Chat Application',
        'Created Store Management System',
        'Developed multiple web applications',
        'Learned deployment and hosting'
      ],
      skills: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Socket.io'],
      choices: [
        {
          label: 'Apply for Internships',
          nextMilestone: 'razorpay-internship',
          description: 'Start professional journey with internships'
        },
        {
          label: 'Continue Building',
          nextMilestone: 'more-projects',
          description: 'Create more advanced projects'
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
      image: '/images/razorpay.jpg',
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
          nextMilestone: 'fullstack-growth',
          description: 'Develop full-stack development skills'
        },
        {
          label: 'Explore DevOps',
          nextMilestone: 'devops-learning',
          description: 'Learn infrastructure and deployment'
        }
      ]
    },
    {
      id: 'fullstack-growth',
      year: '2023-2024',
      title: 'Full-Stack Development Growth',
      subtitle: 'Advanced Projects & Skills',
      description: 'Expanded my full-stack development skills, building complex applications with modern technologies.',
      location: 'Personal & Professional',
      type: 'project',
      icon: <Code size={24} />,
      color: 'bg-indigo-500',
      gradient: 'from-indigo-500 to-purple-500',
      image: '/images/fullstack.jpg',
      achievements: [
        'Built Kanban Board with drag-and-drop',
        'Created Magic Notes with rich text editing',
        'Developed Quiz Application',
        'Mastered TypeScript and advanced React'
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
      image: '/images/salesforce.jpg',
      achievements: [
        'Engineered interactive dependency graphs using D3.js',
        'Developed AI-driven test data generators',
        'Automated frontend testing achieving 90% test coverage',
        'Working with enterprise-scale applications'
      ],
      skills: ['SOQL', 'Java', 'Apex', 'Git', 'UTAM', 'Selenium', 'LWC', 'Salesforce DB'],
      choices: [
        {
          label: 'Continue Growing',
          nextMilestone: 'future-goals',
          description: 'Set future career goals and aspirations'
        },
        {
          label: 'Explore Leadership',
          nextMilestone: 'leadership-path',
          description: 'Develop leadership and mentoring skills'
        }
      ]
    },
    {
      id: 'future-goals',
      year: '2024+',
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
    setShowChoices(false);
  };

  const handleChoice = (choice: any) => {
    playSound('achievement');
    setSelectedPath(prev => [...prev, choice.label]);
    setAchievements(prev => [...prev, choice.description]);
    setShowChoices(false);
    
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
            className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
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
              <div className="w-80 bg-gray-50 p-6 overflow-y-auto border-r border-gray-200">
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
                          : 'bg-white hover:bg-gray-100 border border-gray-200'
                      }`}
                      onClick={() => handleMilestoneChange(index)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${milestone.color} text-white`}>
                          {milestone.icon}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold">{milestone.year}</div>
                          <div className="text-sm opacity-80">{milestone.title}</div>
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
                      <h3 className="text-3xl font-bold text-gray-900 mb-2">{currentMilestoneData.title}</h3>
                      <p className="text-xl text-gray-600 mb-1">{currentMilestoneData.subtitle}</p>
                      <div className="flex items-center justify-center space-x-2 text-gray-500">
                        <MapPin size={16} />
                        <span>{currentMilestoneData.location}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <p className="text-lg text-gray-700 leading-relaxed">{currentMilestoneData.description}</p>
                    </div>

                    {/* Achievements */}
                    <div>
                      <h4 className="text-xl font-semibold mb-4 flex items-center space-x-2">
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
                            className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border border-green-200"
                          >
                            <Star size={16} className="text-green-500 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">{achievement}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Skills */}
                    <div>
                      <h4 className="text-xl font-semibold mb-4 flex items-center space-x-2">
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
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Choices */}
                    {currentMilestoneData.choices && (
                      <div>
                        <h4 className="text-xl font-semibold mb-4">Choose Your Path</h4>
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
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Journey Progress</span>
                        <span className="text-sm text-gray-500">{currentMilestone + 1} of {timelineData.length}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
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
            <div className="bg-gray-100 p-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handlePrevious}
                    disabled={currentMilestone === 0}
                    className="p-2 bg-white rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={handlePlayPause}
                    className="p-2 bg-white rounded-lg hover:bg-gray-50"
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={currentMilestone === timelineData.length - 1}
                    className="p-2 bg-white rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 bg-white rounded-lg hover:bg-gray-50"
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