export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  category: 'Poems' | 'Short Stories' | 'Blogs' | 'Articles' | 'Content Writing';
  tags: string[];
  author: string;
  createdAt: number;
  readingTime: number;
  published: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  author: string;
  content: string;
  createdAt: number;
}
