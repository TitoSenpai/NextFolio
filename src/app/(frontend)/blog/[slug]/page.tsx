import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { getBlogPost } from "@/lib/blog";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const post = await getBlogPost(slug);
    
    if (!post) {
      return {
        title: "Post Not Found",
        description: "The blog post you're looking for doesn't exist.",
      };
    }

    return {
      title: `${post.title} - Paul's Blog`,
      description: post.excerpt || post.content.substring(0, 160) + "...",
      openGraph: {
        title: post.title,
        description: post.excerpt || post.content.substring(0, 160) + "...",
        type: "article",
        publishedTime: post.date,
        tags: post.tags,
      },
    };
  } catch {
    return {
      title: "Post Not Found",
      description: "The blog post you're looking for doesn't exist.",
    };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  let post;
  
  try {
    post = await getBlogPost(slug);
    if (!post) {
      notFound();
    }
  } catch (error) {
    console.error('Error loading blog post:', error);
    notFound();
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
              <Link href="/blog">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Link>
            </Button>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.date)}</span>
              <span>•</span>
              <Clock className="h-4 w-4" />
              <span>{getReadingTime(post.content)}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <article className="max-w-4xl mx-auto">
          {/* Post Header */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {post.title}
            </h1>
            
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </header>

          {/* Post Content */}
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <div className="whitespace-pre-wrap leading-relaxed">
              {post.content}
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-12 pt-8 border-t">
            <div className="flex justify-between items-center">
              <Button variant="outline" asChild>
                <Link href="/blog">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Blog
                </Link>
              </Button>
              
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  Published on {formatDate(post.date)}
                </span>
              </div>
            </div>
          </footer>
        </article>
      </main>
    </div>
  );
}
