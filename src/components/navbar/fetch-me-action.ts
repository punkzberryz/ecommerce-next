"use server";

import { validateRequest } from "@/lib/auth";

export const fetchMeAction = async () => {
  const { user } = await validateRequest();
  return { user };
};
