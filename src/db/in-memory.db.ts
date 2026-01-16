import { BlogDbModel } from "../features/blogs/models/BlogDbModel";
import { PostDbModel } from "../features/posts/models/PostDbModel";

export type DBType = {
  blogs: BlogDbModel[];
  posts: PostDbModel[];
};

export const db: DBType = {
  blogs: [],
  posts: [],
};
