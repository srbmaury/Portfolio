import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, HelpCircle, Play, Palette, Settings, Zap } from 'lucide-react';
import MatrixRain from './MatrixRain';
import CareerTimeline from './CareerTimeline';

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCareerBot?: () => void;
}

interface CommandHistory {
  command: string;
  output: string | React.ReactNode;
  timestamp: Date;
}

// Theme definitions
interface TerminalTheme {
  name: string;
  background: string;
  text: string;
  cursor: string;
  selection: string;
  prompt: string;
  border: string;
  headerBg: string;
  headerText: string;
  footerBg: string;
  footerText: string;
}

const terminalThemes: Record<string, TerminalTheme> = {
  'matrix': {
    name: 'Matrix',
    background: '#000000',
    text: '#00ff00',
    cursor: '#00ff00',
    selection: '#00ff00',
    prompt: '#00ff00',
    border: '#00ff00',
    headerBg: '#001100',
    headerText: '#00ff00',
    footerBg: '#001100',
    footerText: '#00aa00'
  },
  'dracula': {
    name: 'Dracula',
    background: '#282a36',
    text: '#f8f8f2',
    cursor: '#f8f8f2',
    selection: '#44475a',
    prompt: '#ff79c6',
    border: '#6272a4',
    headerBg: '#44475a',
    headerText: '#f8f8f2',
    footerBg: '#44475a',
    footerText: '#6272a4'
  },
  'github': {
    name: 'GitHub',
    background: '#ffffff',
    text: '#24292e',
    cursor: '#24292e',
    selection: '#c8e1ff',
    prompt: '#0366d6',
    border: '#e1e4e8',
    headerBg: '#f6f8fa',
    headerText: '#24292e',
    footerBg: '#f6f8fa',
    footerText: '#586069'
  },
  'cyberpunk': {
    name: 'Cyberpunk',
    background: '#0a0a0a',
    text: '#ff0080',
    cursor: '#ff0080',
    selection: '#ff0080',
    prompt: '#00ffff',
    border: '#ff0080',
    headerBg: '#1a1a1a',
    headerText: '#ff0080',
    footerBg: '#1a1a1a',
    footerText: '#00ffff'
  },
  'ocean': {
    name: 'Ocean',
    background: '#0f1419',
    text: '#e6e1cf',
    cursor: '#e6e1cf',
    selection: '#5c6773',
    prompt: '#39d353',
    border: '#39d353',
    headerBg: '#1a1f2c',
    headerText: '#39d353',
    footerBg: '#1a1f2c',
    footerText: '#5c6773'
  },
  'sunset': {
    name: 'Sunset',
    background: '#2d1b69',
    text: '#ff6b6b',
    cursor: '#ff6b6b',
    selection: '#ff8e53',
    prompt: '#feca57',
    border: '#ff6b6b',
    headerBg: '#1e0f4a',
    headerText: '#ff6b6b',
    footerBg: '#1e0f4a',
    footerText: '#ff8e53'
  }
};

// Plugin interface
interface TerminalPlugin {
  name: string;
  description: string;
  command: string;
  execute: (args: string[]) => string | React.ReactNode;
  examples?: string[];
  enabled?: boolean;
}

const Terminal: React.FC<TerminalProps> = ({ isOpen, onClose, onOpenCareerBot }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([]);
  const [currentDirectory, setCurrentDirectory] = useState('~');
  const [commandIndex, setCommandIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isDemoRunning, setIsDemoRunning] = useState(false);
  const [isMatrixActive, setIsMatrixActive] = useState(false);
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [suggestionIndex, setSuggestionIndex] = useState(-1);
  
  // New customizable features
  const [currentTheme, setCurrentTheme] = useState('matrix');
  const [aliases, setAliases] = useState<Record<string, string>>({
    'me': 'whoami',
    'list': 'projects --list',
    'about': 'cd about',
    'skills': 'cd skills',
    'contact': 'cd contact',
    'github': 'cd github',
    'info': 'whoami',
    'quote': 'fortune',
    'joke': 'joke',
    'motivate': 'motivate',
    'calc': 'calc',
    'time': 'time',
    'clear': 'clear',
    'help': 'help',
    'tutorial': 'tutorial',
    'demo': 'demo',
    'matrix': 'matrix',
    'ai': 'ai',
    'timeline': 'timeline',
    'home': 'cd ~',
    'root': 'cd ~',
    'ls': 'ls',
    'pwd': 'pwd',
    'date': 'date'
  });
  const [plugins, setPlugins] = useState<TerminalPlugin[]>([
    {
      name: 'Joke',
      description: 'Tell a programming joke',
      command: 'joke',
      execute: () => {
        const jokes = [
          'Why do programmers prefer dark mode? Because light attracts bugs! 🐛',
          'Why did the developer go broke? Because he used up all his cache! 💰',
          'What do you call a programmer from Finland? Nerdic! 🇫🇮',
          'Why do Java developers wear glasses? Because they can\'t C#! 👓',
          'How many programmers does it take to change a light bulb? None, that\'s a hardware problem! 💡'
        ];
        return jokes[Math.floor(Math.random() * jokes.length)];
      },
      examples: ['joke'],
      enabled: true
    },
    {
      name: 'Motivation',
      description: 'Get a motivational quote',
      command: 'motivate',
      execute: () => {
        const quotes = [
          '💪 "The only way to do great work is to love what you do." - Steve Jobs',
          '🚀 "Code is like humor. When you have to explain it, it\'s bad." - Cory House',
          '🎯 "First, solve the problem. Then, write the code." - John Johnson',
          '🔥 "The best error message is the one that never shows up." - Thomas Fuchs',
          '⚡ "It\'s not a bug – it\'s an undocumented feature." - Anonymous'
        ];
        return quotes[Math.floor(Math.random() * quotes.length)];
      },
      examples: ['motivate'],
      enabled: true
    },

    {
      name: 'Time',
      description: 'Show time in different timezones',
      command: 'time',
      execute: (args) => {
        const timezone = args[0] || 'local';
        const now = new Date();
        if (timezone === 'local') {
          return `🕐 Local time: ${now.toLocaleString()}\n🌍 UTC: ${now.toUTCString()}`;
        } else {
          return `🕐 Time in ${timezone}: ${now.toLocaleString('en-US', { timeZone: timezone })}\n💡 Try: time Asia/Kolkata, time America/New_York`;
        }
      },
      examples: ['time', 'time Asia/Kolkata'],
      enabled: true
    },
    {
      name: 'Calculator',
      description: 'Simple calculator',
      command: 'calc',
      execute: (args) => {
        const expression = args.join(' ');
        try {
          // Safe evaluation - only allow basic math
          const sanitized = expression.replace(/[^0-9+\-*/().\s]/g, '');
          const result = eval(sanitized);
          return `🧮 ${expression} = ${result}`;
        } catch {
          return `❌ Invalid expression: ${expression}\n💡 Try: calc 2 + 2, calc 10 * 5`;
        }
      },
      examples: ['calc 2 + 2', 'calc 10 * 5'],
      enabled: true
    }
  ]);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Demo commands sequence
  const demoCommands = [
    'whoami',
    'ls',
    'cd projects',
    'projects --list',
    'fortune',
    'date',
    'pwd',
    'cd about',
    'matrix'
  ];

  // Auto-typing function
  const autoType = async (text: string, speed: number = 50) => {
    setIsTyping(true);
    let currentText = '';
    for (let i = 0; i < text.length; i++) {
      currentText += text[i];
      setInput(currentText);
      await new Promise(resolve => setTimeout(resolve, speed));
    }
    setIsTyping(false);
  };

  // Auto-demo function
  const runAutoDemo = async () => {
    setIsDemoRunning(true);
    
    for (const command of demoCommands) {
      // Auto-type the command
      await autoType(command, 80);
      
      // Wait a moment
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Execute the command
      const output = executeCommand(command);
      const newEntry: CommandHistory = {
        command: command,
        output: output,
        timestamp: new Date()
      };
      
      setHistory(prev => [...prev, newEntry]);
      setInput('');
      
      // Wait before next command
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Scroll to bottom
      setTimeout(() => {
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
      }, 100);
    }
    
    setIsDemoRunning(false);
    
    // Add completion message
    const completionEntry: CommandHistory = {
      command: '',
      output: '\n🎉 Demo completed! Try these commands yourself:\n• help - See all commands\n• tutorial - Interactive guide\n• whoami - Learn about me\n• projects --list - View projects\n• fortune - Random quotes',
      timestamp: new Date()
    };
    setHistory(prev => [...prev, completionEntry]);
  };

  // Available sections
  const sections = ['about', 'skills', 'projects', 'contact', 'github'];
  
  // Project data
  const projects = [
    'MERN Chat Application',
    'Store Management System', 
    'Kanban Board',
    'Magic Notes',
    'Quiz Application',
    'Tic Tac Toe Game',
    'Dictionary Application',
    'Flappy Bird Game'
  ];

  // Project URLs mapping
  const projectsData: Record<string, { github: string; live: string; demo?: string }> = {
    'MERN Chat Application': {
      github: 'https://github.com/srbmaury/MERN-Chat-App',
      live: 'https://mern-chat-app-xlr3.onrender.com/',
      demo: 'https://mern-chat-app-xlr3.onrender.com/'
    },
    'Store Management System': {
      github: 'https://github.com/srbmaury/store-management',
      live: 'https://store-management-frontend-x0e2.onrender.com/',
      demo: 'https://store-management-frontend-x0e2.onrender.com/'
    },
    'Kanban Board': {
      github: 'https://github.com/srbmaury/saurabh-kanban-board',
      live: 'https://saurabh-kanban-board.netlify.app/',
      demo: 'https://saurabh-kanban-board.netlify.app/'
    },
    'Magic Notes': {
      github: 'https://github.com/srbmaury/notes',
      live: 'https://srbmaury.github.io/notes/',
      demo: 'https://srbmaury.github.io/notes/'
    },
    'Quiz Application': {
      github: 'https://github.com/srbmaury/quiz1',
      live: 'https://srbmaury.github.io/quiz1/',
      demo: 'https://srbmaury.github.io/quiz1/'
    },
    'Tic Tac Toe Game': {
      github: 'https://github.com/srbmaury/tic-tac-toe',
      live: 'https://tic-tac-toe-silk-sigma.vercel.app/',
      demo: 'https://tic-tac-toe-silk-sigma.vercel.app/'
    },
    'Dictionary Application': {
      github: 'https://github.com/srbmaury/dictionary',
      live: 'https://srbmaury.github.io/dictionary/',
      demo: 'https://srbmaury.github.io/dictionary/'
    },
    'Flappy Bird Game': {
      github: 'https://github.com/srbmaury/flappyBird',
      live: 'https://srbmaury.github.io/flappyBird/',
      demo: 'https://srbmaury.github.io/flappyBird/'
    }
  };

  // Helper function to find project by name (case-insensitive, partial match)
  const findProject = (searchName: string): string | null => {
    const normalizedSearch = searchName.toLowerCase();
    const found = projects.find(project => 
      project.toLowerCase().includes(normalizedSearch) ||
      normalizedSearch.includes(project.toLowerCase())
    );
    return found || null;
  };

  // Helper function to resolve aliases
  const resolveAlias = (command: string): string => {
    return aliases[command] || command;
  };

  // Helper function to get enabled plugins
  const getEnabledPlugins = () => plugins.filter(plugin => plugin.enabled);

  // Command definitions
  const commands: Record<string, {
    description: string;
    usage: string;
    examples?: string[];
    execute: (args: string[]) => string | null;
  }> = {
    // Theme management commands
    theme: {
      description: 'Manage terminal themes',
      usage: 'theme [list|set|random|current] [theme-name]',
      examples: ['theme list', 'theme set dracula', 'theme random'],
      execute: (args: string[]) => {
        const action = args[0];
        
        if (!action || action === 'list') {
          return `Available themes:\n${Object.entries(terminalThemes).map(([key, theme]) => 
            `  ${key}${key === currentTheme ? ' (current)' : ''} - ${theme.name}`
          ).join('\n')}\n\nUsage: theme set <theme-name>`;
        }
        
        if (action === 'set') {
          const themeName = args[1];
          if (!themeName) {
            return 'Usage: theme set <theme-name>\nType "theme list" to see available themes';
          }
          if (terminalThemes[themeName]) {
            setCurrentTheme(themeName);
            return `Theme changed to "${themeName}"! 🎨`;
          }
          return `Theme "${themeName}" not found. Type "theme list" to see available themes.`;
        }
        
        if (action === 'random') {
          const themeNames = Object.keys(terminalThemes);
          const randomTheme = themeNames[Math.floor(Math.random() * themeNames.length)];
          setCurrentTheme(randomTheme);
          return `Random theme applied: "${randomTheme}"! 🎲`;
        }
        
        if (action === 'current') {
          return `Current theme: "${currentTheme}" (${terminalThemes[currentTheme]?.name})`;
        }
        
        return `Unknown action: ${action}\nUsage: theme [list|set|random|current] [theme-name]`;
      }
    },
    
    // Alias management commands
    alias: {
      description: 'Manage command aliases',
      usage: 'alias [list|set|remove] [alias] [command]',
      examples: ['alias list', 'alias set me whoami', 'alias remove me'],
      execute: (args: string[]) => {
        const action = args[0];
        
        if (!action || action === 'list') {
          const aliasList = Object.entries(aliases).map(([alias, command]) => 
            `  ${alias} -> ${command}`
          ).join('\n');
          return `Current aliases:\n${aliasList}\n\nUsage: alias set <alias> <command>`;
        }
        
        if (action === 'set') {
          const alias = args[1];
          const command = args.slice(2).join(' ');
          if (!alias || !command) {
            return 'Usage: alias set <alias> <command>\nExample: alias set me whoami';
          }
          setAliases(prev => ({ ...prev, [alias]: command }));
          return `Alias "${alias}" set to "${command}"! ⚡`;
        }
        
        if (action === 'remove') {
          const alias = args[1];
          if (!alias) {
            return 'Usage: alias remove <alias>\nExample: alias remove me';
          }
          if (aliases[alias]) {
            setAliases(prev => {
              const newAliases = { ...prev };
              delete newAliases[alias];
              return newAliases;
            });
            return `Alias "${alias}" removed! 🗑️`;
          }
          return `Alias "${alias}" not found.`;
        }
        
        return `Unknown action: ${action}\nUsage: alias [list|set|remove] [alias] [command]`;
      }
    },
    
    // Plugin management commands
    plugin: {
      description: 'Manage terminal plugins',
      usage: 'plugin [list|enable|disable|info] [plugin-name]',
      examples: ['plugin list', 'plugin enable joke', 'plugin disable weather'],
      execute: (args: string[]) => {
        const action = args[0];
        
        if (!action || action === 'list') {
          const pluginList = plugins.map(plugin => 
            `  ${plugin.command}${plugin.enabled ? ' ✅' : ' ❌'} - ${plugin.description}`
          ).join('\n');
          return `Available plugins:\n${pluginList}\n\nUsage: plugin enable <plugin-name>`;
        }
        
        if (action === 'enable') {
          const pluginName = args[1];
          if (!pluginName) {
            return 'Usage: plugin enable <plugin-name>\nType "plugin list" to see available plugins';
          }
          const plugin = plugins.find(p => p.command === pluginName);
          if (plugin) {
            setPlugins(prev => prev.map(p => 
              p.command === pluginName ? { ...p, enabled: true } : p
            ));
            return `Plugin "${pluginName}" enabled! ✅`;
          }
          return `Plugin "${pluginName}" not found. Type "plugin list" to see available plugins.`;
        }
        
        if (action === 'disable') {
          const pluginName = args[1];
          if (!pluginName) {
            return 'Usage: plugin disable <plugin-name>\nType "plugin list" to see available plugins';
          }
          const plugin = plugins.find(p => p.command === pluginName);
          if (plugin) {
            setPlugins(prev => prev.map(p => 
              p.command === pluginName ? { ...p, enabled: false } : p
            ));
            return `Plugin "${pluginName}" disabled! ❌`;
          }
          return `Plugin "${pluginName}" not found. Type "plugin list" to see available plugins.`;
        }
        
        if (action === 'info') {
          const pluginName = args[1];
          if (!pluginName) {
            return 'Usage: plugin info <plugin-name>\nType "plugin list" to see available plugins';
          }
          const plugin = plugins.find(p => p.command === pluginName);
          if (plugin) {
            return `Plugin: ${plugin.name}
Command: ${plugin.command}
Description: ${plugin.description}
Status: ${plugin.enabled ? 'Enabled ✅' : 'Disabled ❌'}
${plugin.examples ? `Examples:\n${plugin.examples.map(ex => `  ${ex}`).join('\n')}` : ''}`;
          }
          return `Plugin "${pluginName}" not found. Type "plugin list" to see available plugins.`;
        }
        
        return `Unknown action: ${action}\nUsage: plugin [list|enable|disable|info] [plugin-name]`;
      }
    },
    
    // Navigation commands
    cd: {
      description: 'Change directory to portfolio sections',
      usage: 'cd <section>',
      examples: ['cd about', 'cd projects', 'cd skills'],
      execute: (args: string[]) => {
        const section = args[0];
        if (!section) {
          return 'Usage: cd <section>\nAvailable sections: about, skills, projects, contact, github';
        }
        if (sections.includes(section)) {
          setCurrentDirectory(`~/${section}`);
          // Scroll to section
          const element = document.querySelector(`#${section}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
          return `Changed directory to ~/${section}`;
        }
        return `Section '${section}' not found. Available sections: ${sections.join(', ')}`;
      }
    },
    ls: {
      description: 'List all portfolio sections',
      usage: 'ls',
      execute: () => {
        return sections.map(section => `${section}/`).join('  ');
      }
    },
    pwd: {
      description: 'Print working directory',
      usage: 'pwd',
      execute: () => currentDirectory
    },
    
    // Project commands
    projects: {
      description: 'Manage and view projects',
      usage: 'projects [--list|--demo|--github|--live|--help] [project-name]',
      examples: ['projects --list', 'projects --demo "MERN Chat Application"', 'projects --help'],
      execute: (args: string[]) => {
        const flag = args[0];
        const projectName = args.slice(1).join(' ');
        
        // Handle --help flag
        if (flag === '--help') {
          return `PROJECTS COMMAND HELP:

Description: Manage and view portfolio projects
Usage: projects [--list|--demo|--github|--live|--help] [project-name]

FLAGS:
  --list              - Show all available projects
  --demo [project]    - Open project demo (requires project name)
  --github [project]  - Open GitHub repository (requires project name)
  --live [project]    - Open live site (requires project name)
  --help              - Show this help message

EXAMPLES:
  projects --list                    # List all projects
  projects --demo "MERN Chat"        # Open MERN Chat demo
  projects --github "Store Management" # Open Store Management GitHub
  projects --live "Kanban Board"     # Open Kanban Board live site

AVAILABLE PROJECTS:
${projects.map((project, index) => `  ${index + 1}. ${project}`).join('\n')}`;
        }
        
        if (!flag || flag === '--list') {
          return projects.map((project, index) => `${index + 1}. ${project}`).join('\n');
        }
        
        if (flag === '--demo') {
          if (!projectName) {
            return `Usage: projects --demo <project-name>

Available projects for demo:
${projects.map((project, index) => `  ${index + 1}. ${project}`).join('\n')}

Example: projects --demo "MERN Chat Application"`;
          }
          
          // Use fuzzy matching to find the project
          const foundProject = findProject(projectName);
          if (foundProject) {
            const projectUrl = projectsData[foundProject]?.demo || projectsData[foundProject]?.live;
            if (projectUrl) {
              window.open(projectUrl, '_blank');
              return `Opening demo for "${foundProject}" in a new tab...`;
            }
          }
          return `Project '${projectName}' not found or does not have a demo URL.`;
        }
        
        if (flag === '--github') {
          if (!projectName) {
            return `Usage: projects --github <project-name>

Available projects:
${projects.map((project, index) => `  ${index + 1}. ${project}`).join('\n')}

Example: projects --github "MERN Chat Application"`;
          }
          
          // Use fuzzy matching to find the project
          const foundProject = findProject(projectName);
          if (foundProject) {
            const projectUrl = projectsData[foundProject]?.github;
            if (projectUrl) {
              window.open(projectUrl, '_blank');
              return `Opening GitHub repository for "${foundProject}" in a new tab...`;
            }
          }
          return `Project '${projectName}' not found or does not have a GitHub repository URL.`;
        }
        
        if (flag === '--live') {
          if (!projectName) {
            return `Usage: projects --live <project-name>

Available projects:
${projects.map((project, index) => `  ${index + 1}. ${project}`).join('\n')}

Example: projects --live "MERN Chat Application"`;
          }
          
          // Use fuzzy matching to find the project
          const foundProject = findProject(projectName);
          if (foundProject) {
            const projectUrl = projectsData[foundProject]?.live;
            if (projectUrl) {
              window.open(projectUrl, '_blank');
              return `Opening live site for "${foundProject}" in a new tab...`;
            }
          }
          return `Project '${projectName}' not found or does not have a live site URL.`;
        }
        
        return `Unknown flag: ${flag}

Usage: projects [--list|--demo|--github|--live|--help] [project-name]
Type 'projects --help' for detailed information.`;
      }
    },
    
    // Information commands
    whoami: {
      description: 'Show information about me',
      usage: 'whoami',
      execute: () => {
        return `Saurabh Maurya
Full Stack Engineer
Location: Hyderabad, India
Experience: 2+ years
Current: Associate Member of Technical Staff @ Salesforce
Skills: React, Node.js, TypeScript, Python, Java, Salesforce`;
      }
    },
    date: {
      description: 'Show current date and time',
      usage: 'date',
      execute: () => new Date().toLocaleString()
    },

    
    // Fun commands
    matrix: {
      description: 'Activate Matrix rain effect',
      usage: 'matrix',
      execute: () => {
        setIsMatrixActive(true);
        return 'Matrix rain effect activated! 🌊\nEntering the digital realm...\nPress ESC or click "Exit Matrix" to return.';
      }
    },
    fortune: {
      description: 'Show random developer quote',
      usage: 'fortune',
      execute: () => {
        const quotes = [
          '"The best error message is the one that never shows up." - Thomas Fuchs',
          '"Code is like humor. When you have to explain it, it\'s bad." - Cory House',
          '"First, solve the problem. Then, write the code." - John Johnson',
          '"It\'s not a bug – it\'s an undocumented feature." - Anonymous',
          '"The only way to learn a new programming language is by writing programs in it." - Dennis Ritchie'
        ];
        return quotes[Math.floor(Math.random() * quotes.length)];
      }
    },
    cowsay: {
      description: 'Display ASCII art with message',
      usage: 'cowsay <message>',
      examples: ['cowsay "Hello World"'],
      execute: (args: string[]) => {
        const message = args.join(' ') || 'Hello World!';
        const length = message.length;
        return ` ${'─'.repeat(length + 2)}
< ${message} >
 ${'─'.repeat(length + 2)}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`;
      }
    },
    
    // System commands
    clear: {
      description: 'Clear terminal screen',
      usage: 'clear',
      execute: () => {
        setHistory([]);
        return 'Terminal cleared! 🧹';
      }
    },
    help: {
      description: 'Show help information',
      usage: 'help [command]',
      examples: ['help', 'help cd', 'help projects'],
      execute: (args: string[]) => {
        if (args.length === 0) {
          const enabledPlugins = getEnabledPlugins();
          const pluginCommands = enabledPlugins.map(p => `  ${p.command}           - ${p.description}`).join('\n');
          
          return `Available Commands:

🎨 CUSTOMIZATION:
  theme [action]   - Manage terminal themes
  alias [action]   - Manage command aliases
  plugin [action]  - Manage plugins

NAVIGATION:
  cd <section>     - Navigate to portfolio sections
  ls               - List all sections
  pwd              - Show current location

PROJECTS:
  projects --list  - Show all projects
  projects --demo  - Open project demos
  projects --help  - More project commands

ABOUT ME:
  whoami           - Show my information
  date             - Show current date/time

FUN STUFF:
  matrix           - Activate Matrix effect
  fortune          - Random developer quotes
  cowsay <text>    - ASCII art messages
  ai               - Open AI bot
  timeline         - Open Career Timeline

${enabledPlugins.length > 0 ? `🔌 PLUGINS:\n${pluginCommands}\n` : ''}
SYSTEM:
  clear            - Clear terminal
  help [command]   - Show help
  tutorial         - Interactive tutorial
  demo             - Auto-demo mode

💡 TIPS:
• Type 'theme list' to see available themes
• Type 'alias list' to see your aliases
• Type 'plugin list' to see available plugins
• Use aliases like 'me' for 'whoami'

Type 'help <command>' for detailed help
Type 'tutorial' for interactive guide`;
        }
        
        // Check built-in commands first
        const command = commands[args[0]];
        if (command) {
          return `${args[0].toUpperCase()} COMMAND:
Description: ${command.description}
Usage: ${command.usage}
${command.examples ? `Examples:\n${(command.examples as string[]).map((ex: string) => `  ${ex}`).join('\n')}` : ''}`;
        }
        
        // Check plugins
        const enabledPlugins = getEnabledPlugins();
        const plugin = enabledPlugins.find(p => p.command === args[0]);
        if (plugin) {
          return `${args[0].toUpperCase()} PLUGIN:
Description: ${plugin.description}
Usage: ${plugin.command} [args]
${plugin.examples ? `Examples:\n${plugin.examples.map(ex => `  ${ex}`).join('\n')}` : ''}`;
        }
        
        return `Command '${args[0]}' not found. Type 'help' to see all commands.`;
      }
    },
    tutorial: {
      description: 'Start interactive tutorial',
      usage: 'tutorial',
      execute: () => {
        return `Starting interactive tutorial...

Step 1: Let's explore the portfolio
Type: ls
[This will show you all available sections]

Step 2: Navigate to About section  
Type: cd about
[This will take you to the About section]

Step 3: Learn about me
Type: whoami
[This will show my information]

Step 4: View projects
Type: projects --list
[This will show all my projects]

Step 5: Try something fun
Type: fortune
[This will show a random developer quote]

Try these commands now! Type 'help' anytime for assistance.`;
      }
    },
    demo: {
      description: 'Run automatic demo mode',
      usage: 'demo',
      execute: () => {
        if (isDemoRunning) {
          return 'Demo is already running...';
        }
        
        // Start the auto-demo
        runAutoDemo();
        
        return 'Starting auto-demo mode...\nWatch as I demonstrate the terminal features!';
      }
    },
    ai: {
      description: 'Open the AI bot',
      usage: 'ai',
      execute: () => {
        onOpenCareerBot?.(); // Trigger the callback to open the CareerBot
        return 'Opening AI bot...';
      }
    },
    timeline: {
      description: 'Open the Career Timeline',
      usage: 'timeline',
      execute: () => {
        setIsTimelineOpen(true);
        return 'Opening Career Timeline...';
      }
    }
  };

  // Execute command
  const executeCommand = (commandLine: string) => {
    const parts = commandLine.trim().split(' ');
    const command = parts[0];
    const args = parts.slice(1);

    if (!command) return '';

    // First, check if it's an alias
    const resolvedCommand = resolveAlias(command);
    const actualCommand = resolvedCommand.split(' ')[0];
    const aliasArgs = resolvedCommand.split(' ').slice(1);
    const allArgs = [...aliasArgs, ...args];

    // Check built-in commands first
    const commandFunc = commands[actualCommand as keyof typeof commands];
    if (commandFunc) {
      return commandFunc.execute(allArgs);
    }

    // Check enabled plugins
    const enabledPlugins = getEnabledPlugins();
    const plugin = enabledPlugins.find(p => p.command === actualCommand);
    if (plugin) {
      return plugin.execute(allArgs);
    }

    return `Command '${command}' not found. Type 'help' to see available commands.`;
  };

  // Handle command submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping || isDemoRunning) return;

    const output = executeCommand(input);
    
    // Special handling for clear command
    if (input.trim() === 'clear') {
      setHistory([]);
      setInput('');
      setCommandIndex(-1);
      setSuggestions([]);
      setSuggestionIndex(-1);
      return;
    }
    
    const newEntry: CommandHistory = {
      command: input,
      output: output,
      timestamp: new Date()
    };

    setHistory(prev => [...prev, newEntry]);
    setInput('');
    setCommandIndex(-1);
    setSuggestions([]);
    setSuggestionIndex(-1);
    
    // Scroll to bottom
    setTimeout(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    }, 100);
  };

  // Tab autocomplete function
  const handleTabComplete = () => {
    const words = input.trim().split(' ');
    const currentWord = words[words.length - 1] || '';
    const isFirstWord = words.length === 1;
    
    // Get all possible completions
    let completions: string[] = [];
    
    if (isFirstWord) {
      // First word - complete commands, aliases, and plugins
      const allCommands = Object.keys(commands);
      const allAliases = Object.keys(aliases);
      const enabledPlugins = getEnabledPlugins().map(p => p.command);
      
      completions = [...allCommands, ...allAliases, ...enabledPlugins];
    } else {
      // Subsequent words - context-aware completion
      const command = words[0];
      
      if (command === 'cd') {
        completions = sections;
      } else if (command === 'projects') {
        completions = ['--list', '--demo', '--github', '--live', '--help', ...projects];
      } else if (command === 'theme') {
        completions = ['list', 'set', 'random', 'current', ...Object.keys(terminalThemes)];
      } else if (command === 'alias') {
        completions = ['list', 'set', 'remove', ...Object.keys(aliases)];
      } else if (command === 'plugin') {
        completions = ['list', 'enable', 'disable', 'info', ...plugins.map(p => p.command)];
      } else if (command === 'time') {
        completions = ['local', 'Asia/Kolkata', 'America/New_York', 'Europe/London', 'UTC'];
      } else if (command === 'cowsay') {
        completions = ['Hello World!', 'Welcome!', 'Hello from Terminal!'];
      }
    }
    
    // Filter completions based on current input
    const filteredCompletions = completions.filter(completion => 
      completion.toLowerCase().startsWith(currentWord.toLowerCase())
    );
    
    if (filteredCompletions.length === 1) {
      // Single match - complete it
      const completion = filteredCompletions[0];
      if (isFirstWord) {
        setInput(completion + ' ');
      } else {
        const newWords = [...words.slice(0, -1), completion];
        setInput(newWords.join(' ') + ' ');
      }
      setSuggestions([]);
      setSuggestionIndex(-1);
    } else if (filteredCompletions.length > 1) {
      // Multiple matches - show suggestions
      setSuggestions(filteredCompletions);
      setSuggestionIndex(0);
    } else {
      // No matches - clear suggestions
      setSuggestions([]);
      setSuggestionIndex(-1);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isTyping || isDemoRunning) {
      e.preventDefault();
      return;
    }
    
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const commands = history.map(h => h.command).reverse();
      if (commandIndex < commands.length - 1) {
        setCommandIndex(prev => prev + 1);
        setInput(commands[commandIndex + 1] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandIndex > 0) {
        setCommandIndex(prev => prev - 1);
        const commands = history.map(h => h.command).reverse();
        setInput(commands[commandIndex - 1] || '');
      } else if (commandIndex === 0) {
        setCommandIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestions.length > 0) {
        // Cycle through suggestions
        const nextIndex = (suggestionIndex + 1) % suggestions.length;
        setSuggestionIndex(nextIndex);
        
        const words = input.trim().split(' ');
        const isFirstWord = words.length === 1;
        const selectedSuggestion = suggestions[nextIndex];
        
        if (isFirstWord) {
          setInput(selectedSuggestion + ' ');
        } else {
          const newWords = [...words.slice(0, -1), selectedSuggestion];
          setInput(newWords.join(' ') + ' ');
        }
      } else {
        handleTabComplete();
      }
    }
  };

  // Focus input when terminal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Welcome message
  useEffect(() => {
    if (showWelcome && isOpen) {
      const welcomeEntry: CommandHistory = {
        command: '',
        output: `Welcome to Saurabh's Portfolio Terminal! 🚀

Type 'help' to see all available commands
Type 'tutorial' to start an interactive guide  
Type 'demo' to see a quick demonstration

visitor@portfolio:~$ `,
        timestamp: new Date()
      };
      setHistory([welcomeEntry]);
      setShowWelcome(false);
    }
  }, [isOpen, showWelcome]);

  // Get current theme
  const currentThemeData = terminalThemes[currentTheme];

  return (
    <>
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
              className="rounded-lg shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden border"
              style={{
                backgroundColor: currentThemeData.background,
                color: currentThemeData.text,
                borderColor: currentThemeData.border
              }}
            >
              {/* Terminal Header */}
              <div 
                className="flex items-center justify-between p-3 border-b"
                style={{
                  backgroundColor: currentThemeData.headerBg,
                  borderColor: currentThemeData.border
                }}
              >
                <div className="flex items-center space-x-2">
                  <TerminalIcon size={16} style={{ color: currentThemeData.headerText }} />
                  <span className="text-sm font-mono" style={{ color: currentThemeData.headerText }}>
                    Portfolio Terminal - {currentThemeData.name}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      const output = commands.theme.execute(['list']);
                      setHistory([{
                        command: 'theme list',
                        output: output,
                        timestamp: new Date()
                      }]);
                    }}
                    className="p-1 rounded transition-colors"
                    style={{ 
                      color: currentThemeData.headerText,
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${currentThemeData.headerText}20`}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    title="Themes"
                  >
                    <Palette size={14} />
                  </button>
                  <button
                    onClick={() => {
                      const output = commands.plugin.execute(['list']);
                      setHistory([{
                        command: 'plugin list',
                        output: output,
                        timestamp: new Date()
                      }]);
                    }}
                    className="p-1 rounded transition-colors"
                    style={{ 
                      color: currentThemeData.headerText,
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${currentThemeData.headerText}20`}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    title="Plugins"
                  >
                    <Zap size={14} />
                  </button>
                  <button
                    onClick={() => {
                      const output = commands.alias.execute(['list']);
                      setHistory([{
                        command: 'alias list',
                        output: output,
                        timestamp: new Date()
                      }]);
                    }}
                    className="p-1 rounded transition-colors"
                    style={{ 
                      color: currentThemeData.headerText,
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${currentThemeData.headerText}20`}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    title="Aliases"
                  >
                    <Settings size={14} />
                  </button>
                  <button
                    onClick={() => setHistory([{
                      command: '',
                      output: commands.help.execute([]),
                      timestamp: new Date()
                    }])}
                    className="p-1 rounded transition-colors"
                    style={{ 
                      color: currentThemeData.headerText,
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${currentThemeData.headerText}20`}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    title="Help"
                  >
                    <HelpCircle size={14} />
                  </button>
                  <button
                    onClick={() => setHistory([{
                      command: '',
                      output: commands.tutorial.execute([]),
                      timestamp: new Date()
                    }])}
                    className="p-1 rounded transition-colors"
                    style={{ 
                      color: currentThemeData.headerText,
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${currentThemeData.headerText}20`}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    title="Tutorial"
                  >
                    <Play size={14} />
                  </button>
                  <button
                    onClick={onClose}
                    className="p-1 rounded transition-colors"
                    style={{ 
                      color: currentThemeData.headerText,
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ef444420'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    title="Close"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>

              {/* Terminal Body */}
              <div 
                ref={terminalRef}
                className="p-4 h-96 overflow-y-auto font-mono text-sm"
                style={{ color: currentThemeData.text }}
              >
                {history.map((entry, index) => (
                  <div key={index} className="mb-2">
                    {entry.command && (
                      <div className="flex items-center mb-1">
                        <span style={{ color: currentThemeData.prompt }}>visitor@portfolio:{currentDirectory}$</span>
                        <span className="ml-2">{entry.command}</span>
                      </div>
                    )}
                    {entry.output && (
                      <div className="whitespace-pre-wrap mb-2" style={{ color: currentThemeData.text }}>
                        {entry.output}
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Current input line */}
                <form onSubmit={handleSubmit} className="flex items-center">
                  <span style={{ color: currentThemeData.prompt }}>visitor@portfolio:{currentDirectory}$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value);
                      // Clear suggestions when input changes
                      setSuggestions([]);
                      setSuggestionIndex(-1);
                    }}
                    onKeyDown={handleKeyDown}
                    className="ml-2 bg-transparent outline-none flex-1"
                    style={{ 
                      color: currentThemeData.text,
                      caretColor: currentThemeData.cursor
                    }}
                    placeholder={isTyping ? "Typing..." : isDemoRunning ? "Demo running..." : "Type a command..."}
                    autoComplete="off"
                    spellCheck="false"
                    disabled={isTyping || isDemoRunning}
                  />
                  <div 
                    className="w-2 h-4 ml-1 animate-pulse"
                    style={{ 
                      backgroundColor: isTyping ? '#fbbf24' : isDemoRunning ? '#3b82f6' : currentThemeData.cursor 
                    }}
                  ></div>
                </form>
                
                {/* Tab completion suggestions */}
                {suggestions.length > 0 && (
                  <div className="mt-2 p-2 rounded border" style={{ 
                    backgroundColor: currentThemeData.selection + '20',
                    borderColor: currentThemeData.border,
                    color: currentThemeData.text
                  }}>
                    <div className="text-xs mb-1" style={{ color: currentThemeData.prompt }}>
                      Tab completion suggestions ({suggestions.length}):
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {suggestions.map((suggestion, index) => (
                        <span
                          key={index}
                          className={`px-2 py-1 rounded text-xs cursor-pointer transition-colors ${
                            index === suggestionIndex ? 'font-bold' : ''
                          }`}
                          style={{
                            backgroundColor: index === suggestionIndex 
                              ? currentThemeData.prompt 
                              : currentThemeData.selection + '40',
                            color: index === suggestionIndex 
                              ? currentThemeData.background
                              : currentThemeData.prompt
                          }}
                          onClick={() => {
                            const words = input.trim().split(' ');
                            const isFirstWord = words.length === 1;
                            
                            if (isFirstWord) {
                              setInput(suggestion + ' ');
                            } else {
                              const newWords = [...words.slice(0, -1), suggestion];
                              setInput(newWords.join(' ') + ' ');
                            }
                            setSuggestions([]);
                            setSuggestionIndex(-1);
                          }}
                        >
                          {suggestion}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Terminal Footer */}
              <div 
                className="p-2 text-xs border-t"
                style={{
                  backgroundColor: currentThemeData.footerBg,
                  borderColor: currentThemeData.border,
                  color: currentThemeData.footerText
                }}
              >
                <div className="flex justify-between items-center">
                  <span>
                    {isTyping ? 'Typing...' : isDemoRunning ? 'Demo running...' : "Press 'help' for commands • 'tutorial' for guide • 'demo' for auto-demo"}
                  </span>
                  <span>Ctrl+T: Focus • ↑↓: History • Tab: Auto-complete</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Matrix Rain Effect */}
      <MatrixRain 
        isActive={isMatrixActive} 
        onClose={() => setIsMatrixActive(false)} 
      />

      {/* Career Timeline */}
      <CareerTimeline 
        isOpen={isTimelineOpen} 
        onClose={() => setIsTimelineOpen(false)} 
      />
    </>
  );
};

export default Terminal; 
