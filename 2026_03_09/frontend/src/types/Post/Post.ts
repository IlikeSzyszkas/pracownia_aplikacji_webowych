import type { Comment } from '../Comment/Comment.ts'

export interface Post {
  id: number
  title: string
  content: string
  author: string
  categoryId: number
  createdAt: string
  comments: Comment[]
}
