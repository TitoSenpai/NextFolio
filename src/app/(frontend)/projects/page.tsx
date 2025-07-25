import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

export const metadata: Metadata = {
  title: "Projects - Your Portfolio",
  description: "Explore my latest projects and work",
};

// This would typically come from a database or API
const projects = [
  {
    id: "1",
    title: "E-commerce Platform",
    description: "A full-stack e-commerce solution built with Next.js and PostgreSQL",
    image: "/projects/ecommerce.jpg",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    github: "https://github.com/yourusername/ecommerce",
    demo: "https://ecommerce-demo.com",
    featured: true,
  },
  {
    id: "2",
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates",
    image: "/projects/taskmanager.jpg",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
    github: "https://github.com/yourusername/taskmanager",
    demo: "https://taskmanager-demo.com",
    featured: true,
  },
  {
    id: "3",
    title: "Weather Dashboard",
    description: "A responsive weather dashboard with interactive charts",
    image: "/projects/weather.jpg",
    technologies: ["React", "Chart.js", "OpenWeather API", "CSS Modules"],
    github: "https://github.com/yourusername/weather-dashboard",
    demo: "https://weather-dashboard-demo.com",
    featured: false,
  },
];

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">My Projects</h1>
        <p className="text-xl text-muted-foreground mb-12">
          A showcase of my recent work and personal projects
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <div className="aspect-video bg-muted relative">
                {/* Placeholder for project image */}
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  Project Screenshot
                </div>
              </div>
              
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  {project.featured && (
                    <Badge variant="secondary">Featured</Badge>
                  )}
                </div>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Button asChild size="sm" variant="outline">
                    <Link href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Demo
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
