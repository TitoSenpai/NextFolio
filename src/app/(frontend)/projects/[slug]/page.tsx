import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";

// This would typically come from a database or API
const projects = [
  {
    id: "1",
    slug: "ecommerce-platform",
    title: "E-commerce Platform",
    description: "A full-stack e-commerce solution built with Next.js and PostgreSQL",
    longDescription: `This comprehensive e-commerce platform features a modern, responsive design with full shopping cart functionality, user authentication, payment processing, and an admin dashboard for inventory management. Built with performance and scalability in mind, it handles high traffic loads while maintaining fast page speeds and excellent user experience.`,
    image: "/projects/ecommerce.jpg",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "Stripe", "NextAuth.js"],
    github: "https://github.com/yourusername/ecommerce",
    demo: "https://ecommerce-demo.com",
    featured: true,
    challenges: [
      "Implementing secure payment processing with Stripe",
      "Optimizing database queries for large product catalogs",
      "Creating a responsive admin dashboard",
    ],
    features: [
      "User authentication and authorization",
      "Shopping cart and checkout process",
      "Payment processing with Stripe",
      "Admin dashboard for inventory management",
      "Responsive design for all devices",
      "SEO optimization",
    ],
  },
  // Add more projects here...
];

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);
  
  if (!project) {
    return {
      title: "Project Not Found",
    };
  }
  
  return {
    title: `${project.title} - Your Portfolio`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);
  
  if (!project) {
    notFound();
  }
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <Button asChild variant="ghost" className="mb-8">
          <Link href="/projects">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>
        </Button>
        
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">{project.title}</h1>
            <p className="text-xl text-muted-foreground">{project.description}</p>
            
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="outline">
                  {tech}
                </Badge>
              ))}
            </div>
            
            <div className="flex gap-4">
              <Button asChild>
                <Link href={project.github} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  View Code
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live Demo
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <span className="text-muted-foreground">Project Screenshot/Video</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Overview</h2>
              <p className="text-muted-foreground">{project.longDescription}</p>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
              <ul className="space-y-2">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Challenges & Solutions</h2>
            <ul className="space-y-3">
              {project.challenges.map((challenge, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span className="text-muted-foreground">{challenge}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
