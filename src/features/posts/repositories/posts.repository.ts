import { db } from "../../../db/in-memory.db";
import { PostDbModel } from "../models/PostDbModel";
import { PostInputModel } from "../models/PostInputModel";

export const postsRepository = {
  create(data: PostInputModel) {
    const newEntity: PostDbModel = {
      id: (+new Date()).toString(),
      title: data.title,
      shortDescription: data.shortDescription,
      content: data.content,
      blogId: data.blogId,
    };

    db.posts.push(newEntity);

    return newEntity;
  },

  findAll(): PostDbModel[] {
    return db.posts;
  },

  findOneById(id: string): PostDbModel | null {
    const findPost = db.posts.find((post) => post.id === id);

    return findPost ? findPost : null;
  },

  updateById(id: string, data: PostInputModel): Boolean {
    const index = db.posts.findIndex((post) => post.id === id);

    if (index === -1) {
      return false;
    }

    const entity = db.posts[index];

    const updatedEntity: PostDbModel = {
      ...entity,
      ...data,
      id: entity.id,
    };

    db.posts[index] = updatedEntity;

    return true;
  },

  deleteById(id: string): void {
    const index = db.posts.findIndex((post) => post.id === id);

    if (index === -1) {
      throw new Error("Post not exist");
    }

    db.posts.splice(index, 1);

    return;
  },
};
