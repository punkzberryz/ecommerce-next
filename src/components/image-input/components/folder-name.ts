import { config } from "@/lib/config";

export const cloudinaryFolderName = {
  product: `${config.projectName}/product`,
} as const;

export type CloudinaryFolderName = typeof cloudinaryFolderName;
