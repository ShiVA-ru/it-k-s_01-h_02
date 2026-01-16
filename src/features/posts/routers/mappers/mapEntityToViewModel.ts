import { PostDbModel } from "../../models/PostDbModel";
import { PostViewModel } from "../../models/PostViewModel";

export const mapEntityToViewModel = (dbEntity: PostDbModel): PostViewModel => ({
  id: dbEntity.id,
  title: dbEntity.title,
  shortDescription: dbEntity.shortDescription,
  content: dbEntity.content,
  blogId: dbEntity.blogId,
  blogName: dbEntity.blogName,
});
