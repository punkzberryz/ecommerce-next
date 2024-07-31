"use server";

import { catchErrorForServerActionHelper } from "@/lib/error/catch-error-action-helper";
import { categorySchema, CategorySchema } from "./category-schema";
import {
  BadRequestError,
  UnauthorizedError,
  UnauthorizedMessageCode,
} from "@/lib/error";
import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { Category } from "@prisma/client";

export const createNewCategoryAction = async ({
  data,
}: {
  data: CategorySchema;
}) => {
  try {
    //validate body
    const validatedData = categorySchema.safeParse(data);
    if (!validatedData.success) {
      throw new BadRequestError();
    }
    //validate user
    const { user } = await validateRequest();
    if (user?.role !== "ADMIN") {
      throw new UnauthorizedError(UnauthorizedMessageCode.notAdmin);
    }
    //create new category
    if (data.isChild) {
      if (!data.parentId) throw new BadRequestError();
      const parentCategory = await db.category.findUnique({
        where: {
          id: parseInt(data.parentId),
        },
      });
      if (!parentCategory) {
        throw new BadRequestError();
      }
    }

    const category = await db.category.create({
      data: {
        name: data.name,
        parentId:
          data.isChild && data.parentId ? parseInt(data.parentId) : undefined,
      },
    });

    return { category };
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    console.log({ error });
    return { error };
  }
};

export const editCategoryAction = async ({
  data,
  id,
}: {
  data: CategorySchema;
  id: number;
}) => {
  try {
    //validate body
    const validatedData = categorySchema.safeParse(data);
    if (!validatedData.success || !id) {
      throw new BadRequestError();
    }
    //validate user
    const { user } = await validateRequest();
    if (user?.role !== "ADMIN") {
      throw new UnauthorizedError(UnauthorizedMessageCode.notAdmin);
    }
    if (data.isChild) {
      if (!data.parentId) throw new BadRequestError();
      const parentCategory = await db.category.findUnique({
        where: {
          id: parseInt(data.parentId),
        },
      });
      if (!parentCategory) {
        throw new BadRequestError();
      }
    }

    //edit category
    const category = await db.category.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        parentId:
          data.isChild && data.parentId ? parseInt(data.parentId) : null,
      },
    });

    return { category };
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return { error };
  }
};

export const deleteCategoryAction = async ({ id }: { id: number }) => {
  try {
    //validate body
    if (!id) throw new BadRequestError();
    //validate user
    const { user } = await validateRequest();
    if (user?.role !== "ADMIN") {
      throw new UnauthorizedError(UnauthorizedMessageCode.notAdmin);
    }
    //delete category
    await db.category.delete({
      where: {
        id,
      },
    });
    return {};
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return { error };
  }
};

export const getManyCategoryAction = async ({
  pageId,
  limit,
}: {
  limit: number;
  pageId: number;
}) => {
  try {
    //validate user
    if (!pageId || !limit) {
      throw new BadRequestError();
    }
    //validate user
    const userReq = validateRequest();
    //get categories
    const categoriesReq = db.category.findMany({
      skip: (pageId - 1) * limit,
      take: limit,
      orderBy: {
        id: "desc",
      },
      include: {
        children: true,
      },
      where: {
        parentId: {
          equals: null,
        },
      },
    });
    const [categories, { user }] = await Promise.all([categoriesReq, userReq]);
    if (!user || user.role !== "ADMIN") {
      throw new UnauthorizedError(UnauthorizedMessageCode.notAdmin);
    }
    const allCategories: CategoryWithParentName[] = [];
    categories.forEach((parent) => {
      allCategories.push({ ...parent });
      allCategories.push(
        ...parent.children.map((child) => ({
          ...child,
          parentName: parent.name,
        })),
      );
    });
    return { categories: allCategories };
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return { error };
  }
};
export interface CategoryWithParentName extends Category {
  parentName?: string;
}
