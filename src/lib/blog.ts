import { readdir, readFile } from 'fs/promises'
import { join } from 'path'
import matter from 'gray-matter'

export interface BlogPost {
  slug: string
  title: string
  date: string
  tags: string[]
  draft: boolean
  content: string
  excerpt?: string
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const contentDir = join(process.cwd(), 'content', 'blog')
    const files = await readdir(contentDir)
    const mdxFiles = files.filter(file => file.endsWith('.mdx'))
    
    const posts = await Promise.all(
      mdxFiles.map(async (file) => {
        const filePath = join(contentDir, file)
        const fileContent = await readFile(filePath, 'utf8')
        const { data, content } = matter(fileContent)
        
        return {
          slug: file.replace('.mdx', ''),
          title: data.title || 'Untitled',
          date: data.date || new Date().toISOString(),
          tags: data.tags || [],
          draft: data.draft || false,
          content,
          excerpt: content.slice(0, 200) + '...',
        } as BlogPost
      })
    )
    
    // Sort by date (newest first)
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error('Error reading blog posts:', error)
    return []
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = join(process.cwd(), 'content', 'blog', `${slug}.mdx`)
    const fileContent = await readFile(filePath, 'utf8')
    const { data, content } = matter(fileContent)
    
    return {
      slug,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString(),
      tags: data.tags || [],
      draft: data.draft || false,
      content,
    } as BlogPost
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error)
    return null
  }
}
