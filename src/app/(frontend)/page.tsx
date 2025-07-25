"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Github, Linkedin, Mail, Menu, X } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

interface Section {
  id: string;
  label: string;
  isExternal?: boolean;
  href?: string;
}

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const sections = useMemo<Section[]>(
    () => [
      { id: "hero", label: "Home" },
      { id: "skills", label: "Skills" },
      { id: "projects", label: "Projects" },
      { id: "blog", label: "Blog", isExternal: true, href: "/blog" },
      { id: "contact", label: "Contact" },
    ],
  []);

  const scrollToSection = (sectionId: string, href?: string) => {
    // Handle external links
    if (href) {
      window.location.href = href;
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      // Show/hide scroll to top button based on scroll position
      setShowScrollTop(window.scrollY > 300);
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  // Intersection observer hooks for animations
  const skillsObserver = useIntersectionObserver({ threshold: 0.2 });
  const projectsObserver = useIntersectionObserver({ threshold: 0.1 });
  const contactObserver = useIntersectionObserver({ threshold: 0.3 });

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b z-50 transition-all duration-300">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <button 
              onClick={() => scrollToSection("hero")}
              className="text-xl font-bold text-primary hover:text-primary/80 transition-colors"
            >
              TitoSenpai
            </button>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id, section.href)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === section.id ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {section.label}
                </button>
              ))}
              <Button asChild size="sm" className="ml-4">
                <Link href="/dashboard">
                  Login
                </Link>
              </Button>
            </div>

            {/* Mobile Navigation Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t bg-background/95 backdrop-blur-md">
              <div className="py-4 space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id, section.href)}
                    className={`block w-full text-left px-4 py-2 text-sm font-medium transition-colors hover:text-primary ${
                      activeSection === section.id ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
                <div className="px-4 pt-2">
                  <Button asChild size="sm" className="w-full">
                    <Link href="/dashboard">
                      Login
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="container mx-auto px-4 py-24 mt-16 min-h-screen flex items-center">
        <div className="max-w-4xl mx-auto text-center w-full">
          <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-1000">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Hi, I&apos;m <span className="text-primary">Paul</span>
            </h1>
          </div>
          <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 delay-200">
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Full-Stack Hobbyist & Gaming Enthusiast
            </p>
          </div>
          <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 delay-300">
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              I’m a full-stack hobbyist who crafts sleek web apps for fun and battles bosses after dark. Whether it’s wrangling APIs or ranking up in-game, I’m all about clean code, smooth UI, and leveling up everything I touch.
            </p>
          </div>
          
          <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 delay-500">
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                onClick={() => scrollToSection("projects")}
                size="lg"
                className="group"
              >
                View My Work
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                onClick={() => scrollToSection("contact")}
                variant="outline" 
                size="lg"
                className="group"
              >
                Get In Touch
                <Mail className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
          
          <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 delay-700">
            <div className="flex justify-center space-x-4">
              <Button variant="ghost" size="icon" asChild className="hover:scale-110 transition-transform">
                <Link href="https://github.com/yourusername" target="_blank">
                  <Github className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild className="hover:scale-110 transition-transform">
                <Link href="https://linkedin.com/in/yourusername" target="_blank">
                  <Linkedin className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section 
        id="skills" 
        ref={skillsObserver.ref}
        className="bg-muted/30 py-20 min-h-screen flex items-center"
      >
        <div className="container mx-auto px-4 w-full">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className={`text-3xl font-bold mb-4 transition-all duration-1000 ${
                skillsObserver.isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}>
                Technologies I Work With
              </h2>
              <div className={`w-20 h-1 bg-primary mx-auto transition-all duration-1000 delay-200 ${
                skillsObserver.isVisible 
                  ? 'opacity-100 scale-x-100' 
                  : 'opacity-0 scale-x-0'
              }`}></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "React", "Next.js", "TypeScript", "Node.js",
                "PostgreSQL", "Tailwind CSS", "Docker", "AWS"
              ].map((tech, index) => (
                <div 
                  key={tech} 
                  className={`text-center group transition-all duration-1000 ${
                    skillsObserver.isVisible 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{ 
                    transitionDelay: skillsObserver.isVisible ? `${index * 100 + 400}ms` : '0ms'
                  }}
                >
                  <Badge 
                    variant="secondary" 
                    className="text-sm py-2 px-4 hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform group-hover:scale-105 cursor-default"
                  >
                    {tech}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section 
        id="projects" 
        ref={projectsObserver.ref}
        className="py-20 min-h-screen flex items-center"
      >
        <div className="container mx-auto px-4 w-full">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className={`text-3xl font-bold mb-4 transition-all duration-1000 ${
                projectsObserver.isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}>
                Featured Projects
              </h2>
              <div className={`w-20 h-1 bg-primary mx-auto transition-all duration-1000 delay-200 ${
                projectsObserver.isVisible 
                  ? 'opacity-100 scale-x-100' 
                  : 'opacity-0 scale-x-0'
              }`}></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "E-commerce Platform",
                  description: "A full-stack e-commerce solution with payment processing",
                  tech: ["Next.js", "PostgreSQL", "Stripe"],
                },
                {
                  title: "Task Management App",
                  description: "Collaborative task management with real-time updates",
                  tech: ["React", "Node.js", "Socket.io"],
                },
                {
                  title: "Weather Dashboard",
                  description: "Interactive weather dashboard with charts",
                  tech: ["React", "Chart.js", "API"],
                },
              ].map((project, index) => (
                <Card 
                  key={index} 
                  className={`hover:shadow-lg transition-all duration-700 transform hover:scale-105 group ${
                    projectsObserver.isVisible 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{ 
                    transitionDelay: projectsObserver.isVisible ? `${index * 200 + 400}ms` : '0ms'
                  }}
                >
                  <CardHeader>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="group/btn w-full">
                      <span>View Details</span>
                      <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className={`text-center mt-12 transition-all duration-1000 ${
              projectsObserver.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            style={{ 
              transitionDelay: projectsObserver.isVisible ? '1000ms' : '0ms'
            }}>
              <Button size="lg" className="group">
                <span>View All Projects</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contact" 
        ref={contactObserver.ref}
        className="bg-primary/5 py-20 min-h-screen flex items-center"
      >
        <div className="container mx-auto px-4 w-full">
          <div className="max-w-4xl mx-auto text-center">
            <div className={`transition-all duration-1000 ${
              contactObserver.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}>
              <h2 className="text-3xl font-bold mb-4">Ready to Work Together?</h2>
              <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            </div>
            <div className={`transition-all duration-1000 ${
              contactObserver.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            style={{ 
              transitionDelay: contactObserver.isVisible ? '300ms' : '0ms'
            }}>
              <p className="text-xl text-muted-foreground mb-8">
                I&apos;m always interested in new opportunities and exciting projects.
              </p>
            </div>
            <div className={`transition-all duration-1000 ${
              contactObserver.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            style={{ 
              transitionDelay: contactObserver.isVisible ? '600ms' : '0ms'
            }}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button asChild size="lg" className="group">
                  <Link href="mailto:your.email@example.com">
                    Let&apos;s Connect
                    <Mail className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="group">
                  <Link href="/resume.pdf" target="_blank">
                    Download Resume
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      <button
        onClick={() => scrollToSection("hero")}
        className={`fixed bottom-8 right-8 bg-primary text-primary-foreground rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-40 ${
          showScrollTop 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowRight className="h-5 w-5 -rotate-90" />
      </button>
    </div>
  );
}
