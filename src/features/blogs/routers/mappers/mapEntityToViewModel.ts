import { BlogDbModel } from "../../models/BlogDbModel";
import { BlogViewModel } from "../../models/BlogViewModel";

export const mapEntityToViewModel = (dbEntity: BlogDbModel): BlogViewModel => ({
  id: dbEntity.id,
  name: dbEntity.name,
  description: dbEntity.description,
  websiteUrl: dbEntity.websiteUrl,
});
