import { BlogViewModel } from "../../models/BlogViewModel";
export const mapEntityToViewModel = (
  dbEntity: BlogViewModel,
): BlogViewModel => ({
  id: dbEntity.id,
  name: dbEntity.name,
  description: dbEntity.description,
  websiteUrl: dbEntity.websiteUrl,
});
