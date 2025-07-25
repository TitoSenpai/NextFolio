"use server"

import { writeFile, access, mkdir } from 'fs/promises'
import { join } from 'path'
import { z } from 'zod'

const BlogPostSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  slug: z.string()
    .min(1, "Slug is required")
    .max(100, "Slug too long")
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  tags: z.string().optional(),
  content: z.string().min(1, "Content is required"),
})

export type BlogPostData = z.infer<typeof BlogPostSchema>

export async function createBlogPost(data: BlogPostData) {
  try {
    // Validate the data
    const validatedData = BlogPostSchema.parse(data)
    
    // Create the directory paths
    const contentDir = join(process.cwd(), 'content', 'blog')
    const fileName = `${validatedData.slug}.mdx`
    const filePath = join(contentDir, fileName)
    
    // Ensure the directory exists
    try {
      await mkdir(contentDir, { recursive: true })
    } catch {
      // Directory might already exist, that's okay
    }
    
    // Check if file already exists
    try {
      await access(filePath)
      return {
        success: false,
        error: `A blog post with slug "${validatedData.slug}" already exists.`
      }
    } catch {
      // File doesn't exist, which is what we want
    }
    
    // Parse tags
    const tagsArray = validatedData.tags
      ? validatedData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
      : []
    
    // Create the frontmatter
    const frontmatter = `---
title: "${validatedData.title}"
slug: "${validatedData.slug}"
date: "${new Date().toISOString()}"
tags: [${tagsArray.map(tag => `"${tag}"`).join(', ')}]
draft: false
---

`
    
    // Combine frontmatter and content
    const fileContent = frontmatter + validatedData.content
    
    // Write the file
    await writeFile(filePath, fileContent, 'utf8')
    
    return {
      success: true,
      message: `Blog post "${validatedData.title}" created successfully!`,
      filePath: `content/blog/${fileName}`
    }
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', ')
      }
    }
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    }
  }
}
