# 🖥️ Portfolio Terminal - Complete Command Reference

Welcome to the interactive terminal in my portfolio! This terminal provides a command-line interface to explore my projects, skills, and information with a modern, customizable experience.

## 🚀 Quick Start

1. **Open Terminal**: Click the terminal icon in the navigation
2. **Type `help`**: See all available commands
3. **Type `tutorial`**: Start interactive guide
4. **Type `demo`**: Watch automatic demonstration

## 🎨 Customization Features

### Theme System
The terminal comes with 6 beautiful themes:

```bash
theme list                    # Show all themes
theme set matrix             # Matrix (default) - Green on black
theme set dracula            # Dracula - Purple/blue theme
theme set github             # GitHub - Light theme
theme set cyberpunk          # Cyberpunk - Pink/cyan theme
theme set ocean              # Ocean - Green/blue theme
theme set sunset             # Sunset - Orange/purple theme
theme random                 # Apply random theme
theme current                # Show current theme
```

### Command Aliases
Create shortcuts for frequently used commands:

```bash
alias list                   # Show all aliases
alias set me whoami          # Create alias
alias set list projects --list
alias set about cd about
alias set skills cd skills
alias set contact cd contact
alias set github cd github
alias remove me              # Remove alias
```

### Plugin System
Extend terminal functionality with plugins:

```bash
plugin list                  # Show all plugins
plugin enable joke           # Enable joke plugin
plugin enable motivate       # Enable motivation plugin
plugin enable time           # Enable time plugin
plugin enable calc           # Enable calculator plugin
plugin disable joke          # Disable plugin
plugin info joke             # Show plugin information
```

## 🧭 Navigation Commands

Navigate through portfolio sections:

```bash
cd about                     # Navigate to About section
cd skills                    # Navigate to Skills section
cd projects                  # Navigate to Projects section
cd contact                   # Navigate to Contact section
cd github                    # Navigate to GitHub section
ls                          # List all sections
pwd                         # Show current directory
```

## 🎯 Project Management

Explore and interact with projects:

### List Projects
```bash
projects --list              # Show all projects
projects --help              # Detailed help
```

### Open Project Demos
```bash
projects --demo "MERN Chat Application"
projects --demo "Store Management System"
projects --demo "Kanban Board"
projects --demo "Magic Notes"
projects --demo "Quiz Application"
projects --demo "Tic Tac Toe Game"
projects --demo "Dictionary Application"
projects --demo "Flappy Bird Game"
```

### Open GitHub Repositories
```bash
projects --github "MERN Chat Application"
projects --github "Store Management System"
projects --github "Kanban Board"
projects --github "Magic Notes"
projects --github "Quiz Application"
projects --github "Tic Tac Toe Game"
projects --github "Dictionary Application"
projects --github "Flappy Bird Game"
```

### Open Live Sites
```bash
projects --live "MERN Chat Application"
projects --live "Store Management System"
projects --live "Kanban Board"
projects --live "Magic Notes"
projects --live "Quiz Application"
projects --live "Tic Tac Toe Game"
projects --live "Dictionary Application"
projects --live "Flappy Bird Game"
```

## ℹ️ Information Commands

Get information about me and current status:

```bash
whoami                       # Show personal information
date                         # Show current date and time
```

## 🎮 Fun & Interactive Commands

### Visual Effects
```bash
matrix                       # Activate Matrix rain effect
```

### Quotes & Messages
```bash
fortune                      # Show random developer quote
cowsay "Hello World"         # Display ASCII art
cowsay "Welcome to my portfolio"
cowsay "Hello from Terminal"
```

### AI & Timeline
```bash
ai                          # Open AI career bot
timeline                     # Open career timeline
```

## 🔌 Plugin Commands

### Joke Plugin
```bash
joke                        # Tell a programming joke
```

### Motivation Plugin
```bash
motivate                    # Get motivational quote
```

### Time Plugin
```bash
time                        # Show local time
time Asia/Kolkata           # Show time in specific timezone
time America/New_York
time Europe/London
time UTC
time Asia/Tokyo
time Australia/Sydney
time America/Toronto
time India/Kolkata
```

### Calculator Plugin
```bash
calc 2 + 2                  # Basic arithmetic
calc 10 * 5
calc 100 / 4
calc 15 - 7
calc 3.14 * 2               # Decimal calculations
calc (5 + 3) * 2            # Parentheses support
calc 2^3                    # Power calculations
```

## ⚡ Alias Commands (Shortcuts)

Use these shortcuts for faster navigation:

```bash
me                          # Alias for whoami
list                        # Alias for projects --list
about                       # Alias for cd about
skills                      # Alias for cd skills
contact                     # Alias for cd contact
github                      # Alias for cd github
info                        # Alias for whoami
quote                       # Alias for fortune
home                        # Alias for cd ~
root                        # Alias for cd ~
```

## ⚙️ System Commands

### Help System
```bash
help                        # Show general help
help theme                   # Show theme help
help alias                   # Show alias help
help plugin                  # Show plugin help
help cd                      # Show cd help
help projects                # Show projects help
help whoami                  # Show whoami help
help matrix                  # Show matrix help
help fortune                 # Show fortune help
help cowsay                  # Show cowsay help
help clear                   # Show clear help
help tutorial                # Show tutorial help
help demo                    # Show demo help
help ai                      # Show ai help
help timeline                # Show timeline help
```

### Terminal Management
```bash
clear                       # Clear terminal screen
tutorial                     # Start interactive tutorial
demo                         # Run automatic demo mode
```

## 🎯 Advanced Features

### Tab Completion
- Press `Tab` to auto-complete commands
- Context-aware suggestions
- Clickable suggestion list
- Supports command arguments

### Command History
- Use `↑/↓` arrow keys to navigate history
- Persistent during session
- Quick access to previous commands

### Keyboard Shortcuts
- `Tab` - Auto-complete
- `↑/↓` - Navigate command history
- `Enter` - Execute command
- `Ctrl+C` - Cancel current command

### UI Features
- **Header Toolbar**: Quick access to themes, plugins, aliases, help, tutorial, and close
- **Animated Cursor**: Blinking cursor with different states
- **Responsive Design**: Works on all screen sizes
- **Smooth Animations**: Framer Motion powered
- **Real-time Feedback**: Status messages in footer

## 🎨 Theme Details

### Matrix Theme (Default)
- Background: Black (#000000)
- Text: Green (#00ff00)
- Perfect for that hacker aesthetic

### Dracula Theme
- Background: Dark purple (#282a36)
- Text: Light gray (#f8f8f2)
- Inspired by Dracula color scheme

### GitHub Theme
- Background: White (#ffffff)
- Text: Dark gray (#24292e)
- Clean, professional look

### Cyberpunk Theme
- Background: Very dark (#0a0a0a)
- Text: Hot pink (#ff0080)
- Futuristic neon aesthetic

### Ocean Theme
- Background: Dark blue (#0f1419)
- Text: Light beige (#e6e1cf)
- Calming ocean vibes

### Sunset Theme
- Background: Dark purple (#2d1b69)
- Text: Coral (#ff6b6b)
- Warm sunset colors

## 🔧 Customization Examples

### Create Custom Aliases
```bash
alias set dev "cd projects && projects --list"
alias set intro "whoami && fortune"
alias set explore "ls && cd about"
```

### Theme Switching
```bash
theme set matrix && fortune
theme random && cowsay "New theme applied!"
```

### Command Chaining
```bash
clear && help
cd projects && projects --list
whoami && fortune && date
theme set matrix && fortune
matrix && cowsay "Welcome to the Matrix!"
```

**Note**: Commands are executed sequentially. Use `Ctrl+C` to cancel a running command.

## 🎮 Fun Combinations

### Matrix Experience
```bash
matrix && fortune
```

### Portfolio Tour
```bash
whoami && cd about && cd skills && cd projects && projects --list
```

### Developer Vibes
```bash
theme set cyberpunk && joke && motivate
```

### Time Travel
```bash
time && date && fortune
```

## 💡 Pro Tips

1. **Use Tab Completion**: Start typing and press Tab for suggestions
2. **Create Personal Aliases**: Set up shortcuts for your favorite commands
3. **Explore Themes**: Try different themes to match your mood
4. **Use Command History**: Arrow keys to quickly repeat commands
5. **Combine Commands**: Chain multiple commands for efficiency
6. **Try the Demo**: Run `demo` to see all features in action
7. **Interactive Tutorial**: Start with `tutorial` for guided exploration

## 🚀 Getting Started Workflow

1. **First Time**: Type `tutorial` for guided tour
2. **Explore**: Use `ls` and `cd` to navigate sections
3. **Learn About Me**: Try `whoami` and `fortune`
4. **View Projects**: Use `projects --list` and explore demos
5. **Customize**: Try `theme list` and `alias list`
6. **Have Fun**: Experiment with `matrix`, `joke`, and `cowsay`

## 🔍 Command Categories Summary

| Category | Commands | Description |
|----------|----------|-------------|
| **Themes** | 9 | Customize terminal appearance |
| **Aliases** | 8 | Manage command shortcuts |
| **Plugins** | 8 | Extend functionality |
| **Navigation** | 7 | Move between sections |
| **Projects** | 24 | Explore and open projects |
| **Information** | 2 | Get personal info |
| **Fun** | 3 | Entertainment commands |
| **System** | 15 | Help and management |
| **Tutorial** | 2 | Learning guides |
| **AI/Timeline** | 2 | Special features |
| **Plugin Commands** | 10 | Extended functionality |
| **Alias Shortcuts** | 10 | Quick access commands |

**Total: 100+ Commands** with unlimited combinations! 🎉

---

*This terminal is designed to provide an engaging, interactive way to explore my portfolio. Feel free to experiment and discover all the features!* 