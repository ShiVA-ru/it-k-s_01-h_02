import { BlogViewModel } from "../features/blogs/models/BlogViewModel";
import { PostViewModel } from "../features/posts/models/PostViewModel";

export type DBType = {
  blogs: BlogViewModel[];
  posts: PostViewModel[];
};

export const db: DBType = {
  blogs: [],
  posts: [],
};
