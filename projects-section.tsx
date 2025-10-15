import { Box, ExternalLink, Download, Play, ChartBar, Gamepad2, Bot, Route, Globe, Swords, Languages } from "lucide-react";
import chineseTypingIcon from "@assets/icon_1756456133830.png";
import knightIcon from "@assets/knight_1756456147514.png";
import snakeIcon from "@assets/icon_1756456176916.png";
import earthballIcon from "@assets/ball_1756456201103.png";
import findTheWayIcon from "@assets/icon_image_1756456257186.jpg";
import robotRunIcon from "@assets/RobotRun_1756462300118.jpeg";
import chineseTypingImage from "@assets/chintyping_preview.png";
import knightImage from "@assets/knight_preview.png";
import snakeImage from "@assets/snake_preview.png";
import earthballImage from "@assets/ball_preview.png";
import findTheWayImage from "@assets/findtheway_preview.png";
import robotRunImage from "@assets/robotrun_preview.png";
import e from "express";

export default function ProjectsSection() {
  const unityProjects = [
    {
      id: 'robot-run',
      title: 'Robot Run',
      description: 'Run, jump, dodge! Help our little robot friend navigate through obstacles in this fast-paced runner that will test your reflexes.',
      image: robotRunImage,
      playUrl: 'https://play.unity.com/en/games/db98a001-3548-4364-8363-06624d5b02d4/robotrun',
      iconImage: robotRunIcon
    },
    {
      id: 'find-the-way',
      title: 'Find the Way',
      description: 'Lost in a maze? No problem! Guide your character through tricky puzzles and discover hidden paths in this brain-teasing adventure.',
      image: findTheWayImage,
      playUrl: 'https://play.unity.com/en/games/c7b19ad1-7ed3-4ddd-a36a-9dd2feb14b30/find-the-way',
      iconImage: findTheWayIcon
    }
  ];

  const pythonGames = [
    {
      id: 'chinese-typing',
      title: 'Chinese Typing',
      description: 'Practice Chinese character typing with this educational game designed to improve language skills.',
      image: chineseTypingImage,
      downloadUrl: 'https://github.com/xperimentalone/game/blob/main/chityping.exe',
      iconImage: chineseTypingIcon
    },
    {
      id: 'knights-path',
      title: "Knight's Path",
      description: "Solve the classic Knight's Tour problem in this strategic puzzle game with multiple difficulty levels.",
      image: knightImage,
      downloadUrl: 'https://github.com/xperimentalone/game/blob/main/knightpath.exe',
      onlineUrl: 'https://xperimentalone.github.io/knight_online/',
      iconImage: knightIcon
    },
    {
      id: 'snake',
      title: 'Snake',
      description: 'The classic Snake game reimagined with modern Python graphics and smooth gameplay mechanics.',
      image: snakeImage,
      downloadUrl: 'https://github.com/xperimentalone/game/blob/main/snake.exe',
      onlineUrl: 'https://xperimentalone.github.io/snake_online/',
      iconImage: snakeIcon
    },
    {
      id: 'earthball',
      title: 'Earthball',
      description: 'A physics-based ball game featuring Earth-themed levels with realistic gravity simulation.',
      image: earthballImage,
      downloadUrl: 'https://github.com/xperimentalone/game/blob/main/earthball.exe',
      onlineUrl: 'https://xperimentalone.github.io/ball_online/',
      iconImage: earthballIcon
    }
  ];

  const applications = [
    {
      id: 'stock-dashboard',
      title: 'Stock Analysis Dashboard',
      description: 'A comprehensive financial analysis tool built with Streamlit, featuring real-time stock data visualization, technical indicators, and interactive charts for informed investment decisions.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      appUrl: 'https://stockview-xperimentalone.streamlit.app/',
      technologies: ['Streamlit', 'Python', 'Data Analysis', 'Finance'],
      icon: ChartBar
    }, 
    {
      id: 'insight-quest',
      title: 'Insight Quest',
      description: 'A platform encouraging users to read news and stay informed through interactive and engaging content.',
      image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      appUrl: 'https://xperimentalone.github.io/insight-quest/',
      technologies: ['Web', 'News', 'Education'],
      icon: Globe 
    }
  ];

  return (
    <section id="projects" className="py-20 relative">
      <div className="section-divider"></div>
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-glow" data-testid="projects-title">
            Experimental Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto" data-testid="projects-subtitle">
            Discover the results of countless hours of experimentation across different platforms and technologies
          </p>
        </div>

        {/* Python Games */}
        <div className="mb-20">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 gray-gradient rounded-lg flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-accent-foreground" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.26-.02.2-.01h4.4l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09z"/>
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-primary" data-testid="python-games-title">Python Games</h3>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pythonGames.map((game) => (
              <div key={game.id} className="project-card rounded-lg p-6 hover-lift" data-testid={`python-game-${game.id}`}>
                <div className="mb-4">
                  <img 
                    src={game.image}
                    alt={game.title}
                    className="w-full h-32 object-cover rounded-lg"
                    data-testid={`image-${game.id}`}
                  />
                </div>
                <div className="flex items-center mb-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-2 overflow-hidden">
                    <img src={game.iconImage} alt={game.title} className="w-full h-full object-cover" />
                  </div>
                  <h4 className="text-lg font-bold" data-testid={`title-${game.id}`}>{game.title}</h4>
                </div>
                <p className="text-muted-foreground text-sm mb-4" data-testid={`description-${game.id}`}>
                  {game.description}
                </p>
                <div className="flex flex-col gap-2">
                  <a 
                    href={game.downloadUrl}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-primary text-accent-foreground rounded font-semibold text-sm hover:bg-primary/80 transition-all"
                    data-testid={`download-button-${game.id}`}
                  >
                    <Download className="w-3 h-3 mr-1" />
                    Download
                  </a>
                  {game.onlineUrl && (
                    <a 
                      href={game.onlineUrl}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-secondary text-foreground rounded font-semibold text-sm hover:bg-secondary/80 transition-all"
                      data-testid={`play-online-button-${game.id}`}
                    >
                      <Play className="w-3 h-3 mr-1" />
                      Play Online
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Unity Projects */}
        <div className="mb-20">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 cyan-gradient rounded-lg flex items-center justify-center mr-4">
              <Box className="w-6 h-6 text-foreground" />
            </div>
            <h3 className="text-3xl font-bold text-secondary" data-testid="unity-projects-title">Unity Projects</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {unityProjects.map((project) => (
              <div key={project.id} className="project-card rounded-lg p-6 hover-lift" data-testid={`unity-project-${project.id}`}>
                <div className="mb-4">
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-lg"
                    data-testid={`image-${project.id}`}
                  />
                </div>
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-3 overflow-hidden">
                    <img src={project.iconImage} alt={project.title} className="w-full h-full object-cover" />
                  </div>
                  <h4 className="text-xl font-bold" data-testid={`title-${project.id}`}>{project.title}</h4>
                </div>
                <p className="text-muted-foreground mb-4" data-testid={`description-${project.id}`}>
                  {project.description}
                </p>
                <a 
                  href={project.playUrl}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 cyan-gradient text-accent-foreground rounded-lg font-semibold hover-lift transition-all"
                  data-testid={`play-button-${project.id}`}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Play on Unity
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Applications */}
        <div className="mb-20">
          <div className="flex items-center mb-8">
            {/* Optional: Add an icon and heading for Applications */}
            <div className="w-12 h-12 gray-gradient rounded-lg flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-primary">Applications</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {applications.map((app) => (
              <div key={app.id} className="project-card rounded-lg p-6 hover-lift" data-testid={`application-${app.id}`}>
                <div className="mb-4">
                  <img 
                    src={app.image}
                    alt={app.title}
                    className="w-full h-32 object-cover rounded-lg"
                    data-testid={`image-${app.id}`}
                  />
                </div>
                <div className="flex items-center mb-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-2 overflow-hidden">
                    {/* If you have an icon image, use <img src={app.iconImage} ... /> */}
                    {app.icon && <app.icon className="w-4 h-4 text-white" />}
                  </div>
                  <h4 className="text-lg font-bold" data-testid={`title-${app.id}`}>{app.title}</h4>
                </div>
                <p className="text-muted-foreground text-sm mb-4" data-testid={`description-${app.id}`}>
                  {app.description}
                </p>
                <div className="flex flex-col gap-2">
                  <a 
                    href={app.appUrl}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-primary text-accent-foreground rounded font-semibold text-sm hover:bg-primary/80 transition-all"
                    data-testid={`app-link-${app.id}`}
                  >
                    Visit
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
