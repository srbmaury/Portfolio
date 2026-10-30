import { Github, Linkedin, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import profile from '../config/profile.json';
const links = [{label:'Home',href:'#home'},{label:'About',href:'#about'},{label:'Projects',href:'#projects'},{label:'Experience',href:'#experience'},{label:'Toolkit',href:'#skills'},{label:'GitHub',href:'#github'},{label:'Contact',href:'#contact'}];
export default function Footer(){
return <footer className="portfolio-footer">
  <div className="container">
    <div className="footer-main">
      <div className="footer-identity"><h2>{profile.personalInfo.name}</h2><p>Software engineer interested in backend systems, developer tools, and useful products.</p><span>{profile.personalInfo.location}</span></div>
      <nav className="footer-links" aria-label="Footer navigation"><h3>Explore</h3><div>{links.map(link=><Link key={link.href} to={'/'+link.href}>{link.label}</Link>)}</div></nav>
      <div className="footer-connect"><h3>Get in touch</h3><a className="footer-email" href={'mailto:'+profile.personalInfo.email}>{profile.personalInfo.email}<ArrowUpRight size={17}/></a><div className="footer-social"><a href={profile.personalInfo.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={20}/></a><a href={profile.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={20}/></a></div></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} {profile.personalInfo.name}</span><span>Open to thoughtful conversations and collaboration.</span></div>
  </div>
</footer>
}