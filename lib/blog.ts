import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { BlogPost } from '@/types';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData(): BlogPost[] {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const slug = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Calculate read time (average 200 words per minute)
    const wordCount = matterResult.content.split(' ').length;
    const readTime = Math.ceil(wordCount / 200);

    // Combine the data with the slug
    return {
      slug,
      content: matterResult.content,
      readTime,
      title: matterResult.data.title || '',
      excerpt: matterResult.data.excerpt || '',
      date: matterResult.data.date || '',
      author: matterResult.data.author || 'Revenue Blog Team',
      category: matterResult.data.category || 'General',
      tags: matterResult.data.tags || [],
      featuredImage: matterResult.data.featuredImage || '/images/default-post.jpg',
      seoTitle: matterResult.data.seoTitle,
      seoDescription: matterResult.data.seoDescription,
      affiliateLinks: matterResult.data.affiliateLinks || [],
    } as BlogPost;
  });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getPostData(slug: string): Promise<BlogPost> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Calculate read time
  const wordCount = matterResult.content.split(' ').length;
  const readTime = Math.ceil(wordCount / 200);

  // Combine the data with the slug and contentHtml
  return {
    slug,
    content: contentHtml,
    readTime,
    title: matterResult.data.title || '',
    excerpt: matterResult.data.excerpt || '',
    date: matterResult.data.date || '',
    author: matterResult.data.author || 'Revenue Blog Team',
    category: matterResult.data.category || 'General',
    tags: matterResult.data.tags || [],
    featuredImage: matterResult.data.featuredImage || '/images/default-post.jpg',
    seoTitle: matterResult.data.seoTitle,
    seoDescription: matterResult.data.seoDescription,
    affiliateLinks: matterResult.data.affiliateLinks || [],
  };
}

export function getPostsByCategory(category: string): BlogPost[] {
  const allPosts = getSortedPostsData();
  return allPosts.filter(post => 
    post.category.toLowerCase() === category.toLowerCase()
  );
}

export function getPostsByTag(tag: string): BlogPost[] {
  const allPosts = getSortedPostsData();
  return allPosts.filter(post => 
    post.tags.some(postTag => postTag.toLowerCase() === tag.toLowerCase())
  );
}

export function getFeaturedPosts(limit: number = 3): BlogPost[] {
  const allPosts = getSortedPostsData();
  // For now, return the most recent posts as featured
  // In production, you might have a "featured" field in frontmatter
  return allPosts.slice(0, limit);
}

export function getRelatedPosts(currentPost: BlogPost, limit: number = 3): BlogPost[] {
  const allPosts = getSortedPostsData();
  
  // Filter out current post and find related posts by category and tags
  const otherPosts = allPosts.filter(post => post.slug !== currentPost.slug);
  
  const relatedPosts = otherPosts.filter(post => {
    // Same category gets higher priority
    if (post.category === currentPost.category) return true;
    
    // Posts with shared tags
    return post.tags.some(tag => currentPost.tags.includes(tag));
  });
  
  return relatedPosts.slice(0, limit);
}

export function getAllCategories(): Array<{ name: string; count: number }> {
  const allPosts = getSortedPostsData();
  const categoryCount: { [key: string]: number } = {};
  
  allPosts.forEach(post => {
    categoryCount[post.category] = (categoryCount[post.category] || 0) + 1;
  });
  
  return Object.entries(categoryCount).map(([name, count]) => ({
    name,
    count,
  }));
}

export function getAllTags(): Array<{ name: string; count: number }> {
  const allPosts = getSortedPostsData();
  const tagCount: { [key: string]: number } = {};
  
  allPosts.forEach(post => {
    post.tags.forEach(tag => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
  });
  
  return Object.entries(tagCount).map(([name, count]) => ({
    name,
    count,
  }));
}
