import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Your Portfolio",
  description: "Learn more about my background, skills, and experience",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About Me</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Background</h2>
            <p className="text-muted-foreground mb-6">
              I&apos;m a passionate full-stack developer with expertise in modern web technologies. 
              I love creating innovative solutions and bringing ideas to life through code.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">Skills</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-2">Frontend</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>React / Next.js</li>
                  <li>TypeScript</li>
                  <li>Tailwind CSS</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">Backend</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Node.js</li>
                  <li>PostgreSQL</li>
                  <li>API Design</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Experience</h2>
            <div className="space-y-6">
              <div className="border-l-2 border-primary pl-4">
                <h3 className="font-medium">Senior Developer</h3>
                <p className="text-sm text-muted-foreground">Company Name • 2023 - Present</p>
                <p className="text-sm mt-2">
                  Leading development of scalable web applications and mentoring junior developers.
                </p>
              </div>
              
              <div className="border-l-2 border-muted pl-4">
                <h3 className="font-medium">Full Stack Developer</h3>
                <p className="text-sm text-muted-foreground">Previous Company • 2021 - 2023</p>
                <p className="text-sm mt-2">
                  Developed and maintained multiple client projects using React and Node.js.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
