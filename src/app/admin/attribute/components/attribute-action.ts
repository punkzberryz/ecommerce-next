"use server";

import { catchErrorForServerActionHelper } from "@/lib/error/catch-error-action-helper";
import { attributeSchema, AttributeSchema } from "./attribute-schema";
import {
  BadRequestError,
  UnauthorizedError,
  UnauthorizedMessageCode,
} from "@/lib/error";
import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { Attribute } from "@prisma/client";

export const createNewAttributeAction = async ({
  data,
}: {
  data: AttributeSchema;
}) => {
  try {
    // Validate body
    const validatedData = attributeSchema.safeParse(data);
    if (!validatedData.success) {
      throw new BadRequestError();
    }
    // Validate user
    const { user } = await validateRequest();
    if (user?.role !== "ADMIN") {
      throw new UnauthorizedError(UnauthorizedMessageCode.notAdmin);
    }
    // Create new attribute
    if (data.isChild) {
      // Check if parentId is provided
      if (!data.parentId) throw new BadRequestError();
      const parentAttribute = await db.attribute.findUnique({
        where: {
          id: parseInt(data.parentId),
        },
      });
      if (!parentAttribute) {
        throw new BadRequestError();
      }
    }

    const attribute = await db.attribute.create({
      data: {
        name: data.name,
        parentId:
          data.isChild && data.parentId ? parseInt(data.parentId) : undefined,
      },
    });

    return { attribute };
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return { error };
  }
};

export const editAttributeAction = async ({
  data,
  id,
}: {
  data: AttributeSchema;
  id: number;
}) => {
  try {
    // Validate body
    const validatedData = attributeSchema.safeParse(data);
    if (!validatedData.success || !id) {
      throw new BadRequestError();
    }
    // Validate user
    const { user } = await validateRequest();
    if (user?.role !== "ADMIN") {
      throw new UnauthorizedError(UnauthorizedMessageCode.notAdmin);
    }

    if (data.isChild) {
      // Check if parentId is provided
      if (!data.parentId) throw new BadRequestError();
      const parentAttribute = await db.attribute.findUnique({
        where: {
          id: parseInt(data.parentId),
        },
      });
      if (!parentAttribute) {
        throw new BadRequestError();
      }
    }
    // Edit attribute
    const attribute = await db.attribute.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        parentId:
          data.isChild && data.parentId ? parseInt(data.parentId) : null,
      },
    });

    return { attribute };
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return { error };
  }
};

export const deleteAttributeAction = async ({ id }: { id: number }) => {
  try {
    // Validate body
    if (!id) throw new BadRequestError();
    // Validate user
    const { user } = await validateRequest();
    if (user?.role !== "ADMIN") {
      throw new UnauthorizedError(UnauthorizedMessageCode.notAdmin);
    }
    // Delete attribute
    await db.attribute.delete({
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

export const getManyAttributeAction = async ({
  pageId,
  limit,
}: {
  limit: number;
  pageId: number;
}) => {
  try {
    // Validate input
    if (!pageId || !limit) {
      throw new BadRequestError();
    }
    // Validate user
    const userReq = validateRequest();
    // Get attributes
    const attributesReq = db.attribute.findMany({
      skip: (pageId - 1) * limit,
      take: limit,
      orderBy: {
        id: "desc",
      },
      include: {
        children: true,
      },
      where: {
        parentId: { equals: null },
      },
    });
    const [attributes, { user }] = await Promise.all([attributesReq, userReq]);
    if (!user || user.role !== "ADMIN") {
      throw new UnauthorizedError(UnauthorizedMessageCode.notAdmin);
    }
    const allAttributes: AttributeWithParentName[] = [];
    attributes.forEach((parent) => {
      allAttributes.push({ ...parent });
      allAttributes.push(
        ...parent.children.map((child) => ({
          ...child,
          parentName: parent.name,
        })),
      );
    });
    return { attributes: allAttributes };
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return { error };
  }
};

export interface AttributeWithParentName extends Attribute {
  parentName?: string;
}
