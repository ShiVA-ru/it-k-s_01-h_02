import { db } from "../../../db/in-memory.db";
import { BlogDbModel } from "../models/BlogDbModel";
import { BlogInputModel } from "../models/BlogInputModel";

export const blogsRepository = {
  create(data: BlogInputModel) {
    const newEntity: BlogDbModel = {
      id: (+new Date()).toString(),
      name: data.name,
      description: data.description,
      websiteUrl: data.websiteUrl,
    };

    db.blogs.push(newEntity);

    return newEntity;
  },

  findAll(): BlogDbModel[] {
    return db.blogs;
  },

  findOneById(id: string): BlogDbModel | null {
    const findBlog = db.blogs.find((blog) => blog.id === id);

    return findBlog ? findBlog : null;
  },

  updateById(id: string, data: BlogInputModel): Boolean {
    const index = db.blogs.findIndex((blog) => blog.id === id);

    if (index === -1) {
      return false;
    }

    const entity = db.blogs[index];

    const updatedEntity: BlogDbModel = {
      ...entity,
      ...data,
      id: entity.id,
    };

    db.blogs[index] = updatedEntity;

    return true;
  },

  deleteById(id: string): void {
    const index = db.blogs.findIndex((blog) => blog.id === id);

    if (index === -1) {
      throw new Error("Blog not exist");
    }

    db.blogs.splice(index, 1);

    return;
  },
};
