import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Folder, ExternalLink } from "lucide-react"

export default function ProjectsPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">Manage your projects and portfolios</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Folder className="h-5 w-5 text-primary" />
              <CardTitle>Portfolio Website</CardTitle>
            </div>
            <CardDescription>
              Personal portfolio showcasing web development projects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">React, Next.js</span>
              <Button size="sm" variant="outline" className="gap-2">
                <ExternalLink className="h-3 w-3" />
                View
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Folder className="h-5 w-5 text-primary" />
              <CardTitle>Blog Platform</CardTitle>
            </div>
            <CardDescription>
              Content management system for blog posts and articles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Next.js, MDX</span>
              <Button size="sm" variant="outline" className="gap-2">
                <ExternalLink className="h-3 w-3" />
                View
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Plus className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="font-semibold mb-2">Create New Project</h3>
            <p className="text-sm text-muted-foreground text-center mb-4">
              Start a new project to organize your work
            </p>
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
