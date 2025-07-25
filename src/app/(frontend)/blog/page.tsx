import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { getBlogPosts, type BlogPost } from "@/lib/blog";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Paul's Portfolio",
  description: "Thoughts, insights, and experiences from my journey in full-stack development and gaming",
  openGraph: {
    title: "Blog - Paul's Portfolio",
    description: "Thoughts, insights, and experiences from my journey in full-stack development and gaming",
  },
};

export default async function BlogPage() {
  let posts: BlogPost[] = [];
  
  try {
    posts = await getBlogPosts();
  } catch (error) {
    console.error('Error loading blog posts:', error);
    posts = [];
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <div className="h-6 w-px bg-border" />
            <h1 className="text-2xl font-bold">Blog</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              My Blog
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Thoughts, insights, and experiences from my journey in full-stack development and gaming
            </p>
          </div>

          {/* Blog Posts */}
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No blog posts yet</h3>
              <p className="text-muted-foreground mb-6">
                I haven&apos;t published any blog posts yet, but stay tuned for exciting content!
              </p>
              <Button asChild>
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-8">
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <Card 
                    className="hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] group cursor-pointer"
                  >
                    <CardHeader>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(post.date)}</span>
                        <span>•</span>
                        <Clock className="h-4 w-4" />
                        <span>{getReadingTime(post.content)}</span>
                      </div>
                      <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {post.excerpt || 'Click to read more about this topic...'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                        <span>Read More</span>
                        <ArrowLeft className="h-4 w-4 rotate-180 transition-transform group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
