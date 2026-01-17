import { Request, Response } from "express";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { mapEntityToViewModel } from "../mappers/mapEntityToViewModel";
import { PostViewModel } from "../../models/PostViewModel";
import { blogsRepository } from "../../../blogs/repositories/blogs.repository";
import { postsRepository } from "../../repositories/posts.repository";

export function getPostListHandler(
  req: Request,
  res: Response<PostViewModel[]>,
) {
  const findEntity = postsRepository.findAll();
  const blogs = blogsRepository.findAll();
  const blogsIdsNames = new Map(blogs.map((blog) => [blog.id, blog.name]));

  res
    .status(HttpStatus.Ok)
    .json(
      findEntity.map((post) =>
        mapEntityToViewModel(post, blogsIdsNames.get(post.blogId) ?? ""),
      ),
    );
}
