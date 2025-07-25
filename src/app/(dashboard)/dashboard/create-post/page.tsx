"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Eye } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { createBlogPost, type BlogPostData } from "@/lib/actions/blog"

// Simple slug generator
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

// Simple Markdown preview renderer (basic)
function renderMarkdownPreview(content: string): string {
  return content
    .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold mb-4">$1</h1>')
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-semibold mb-3">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-medium mb-2">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-sm">$1</code>')
    .replace(/\n\n/g, '</p><p class="mb-4">')
    .replace(/^(?!<[h|p])/gm, '<p class="mb-4">')
    .replace(/(?<!>)$/gm, '</p>')
}

export default function CreateBlogPostPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<BlogPostData>({
    title: "",
    slug: "",
    tags: "",
    content: ""
  })

  const handleInputChange = (field: keyof BlogPostData, value: string) => {
    setFormData((prev: BlogPostData) => ({
      ...prev,
      [field]: value,
      // Auto-generate slug when title changes
      ...(field === 'title' && { slug: generateSlug(value) })
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await createBlogPost(formData)
      
      if (result.success) {
        toast.success(result.message)
        router.push('/dashboard') // Navigate back to dashboard
      } else {
        toast.error(result.error)
      }
    } catch {
      toast.error("An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = formData.title.trim() && formData.slug.trim() && formData.content.trim()

  const parsedTags = formData.tags
    ? formData.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean)
    : []

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Create New Blog Post</h1>
            <p className="text-muted-foreground">Write and publish a new blog post</p>
          </div>
        </div>
        <Button 
          onClick={handleSubmit} 
          disabled={!isFormValid || isSubmitting}
          className="gap-2"
        >
          <Save className="h-4 w-4" />
          {isSubmitting ? "Publishing..." : "Publish Post"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Post Details</CardTitle>
              <CardDescription>Enter the basic information for your blog post</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter your blog post title..."
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  placeholder="url-friendly-slug"
                  value={formData.slug}
                  onChange={(e) => handleInputChange('slug', e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  URL: /blog/{formData.slug || 'your-slug'}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  placeholder="react, nextjs, typescript (comma-separated)"
                  value={formData.tags}
                  onChange={(e) => handleInputChange('tags', e.target.value)}
                />
                {parsedTags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {parsedTags.map((tag: string, index: number) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Content Editor */}
          <Card>
            <CardHeader>
              <CardTitle>Content *</CardTitle>
              <CardDescription>Write your blog post content in Markdown</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="write" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="write">Write</TabsTrigger>
                  <TabsTrigger value="preview">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="write" className="mt-4">
                  <Textarea
                    placeholder="# Your Blog Post Title&#10;&#10;Write your content here using Markdown syntax...&#10;&#10;## Section Heading&#10;&#10;You can use **bold**, *italic*, `code`, and more!"
                    value={formData.content}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                    className="min-h-[400px] font-mono"
                  />
                </TabsContent>
                
                <TabsContent value="preview" className="mt-4">
                  <div className="border rounded-md p-4 min-h-[400px] bg-background">
                    {formData.content ? (
                      <div 
                        className="prose prose-sm max-w-none dark:prose-invert"
                        dangerouslySetInnerHTML={{ 
                          __html: renderMarkdownPreview(formData.content) 
                        }}
                      />
                    ) : (
                      <p className="text-muted-foreground italic">
                        Start writing to see the preview...
                      </p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Publishing Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Status</Label>
                <p className="text-sm text-muted-foreground">Draft</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Date</Label>
                <p className="text-sm text-muted-foreground">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium">File Location</Label>
                <p className="text-sm text-muted-foreground font-mono">
                  content/blog/{formData.slug || 'slug'}.mdx
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Markdown Guide</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div>
                  <code className="bg-muted px-1 rounded"># Heading 1</code>
                </div>
                <div>
                  <code className="bg-muted px-1 rounded">## Heading 2</code>
                </div>
                <div>
                  <code className="bg-muted px-1 rounded">**Bold text**</code>
                </div>
                <div>
                  <code className="bg-muted px-1 rounded">*Italic text*</code>
                </div>
                <div>
                  <code className="bg-muted px-1 rounded">`Code`</code>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
