"use server";
import { catchErrorForServerActionHelper } from "@/lib/error/catch-error-action-helper";
import {
  BadRequestError,
  UnauthorizedError,
  UnauthorizedMessageCode,
} from "@/lib/error";
import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { productSchema, ProductSchema } from "./product-schema";
export const createNewProductAction = async ({
  data,
}: {
  data: ProductSchema;
}) => {
  try {
    //validate body
    const validateData = productSchema.safeParse(data);
    if (!validateData.success) {
      throw new BadRequestError();
    }
    const categoryId = parseInt(data.categoryId);
    if (isNaN(categoryId)) throw new BadRequestError();
    const price = parseFloat(data.price);
    if (isNaN(price)) throw new BadRequestError();

    //validate user
    const { user } = await validateRequest();
    if (user?.role !== "ADMIN") {
      throw new UnauthorizedError(UnauthorizedMessageCode.notAdmin);
    }
    //create new product
    const product = await db.product.create({
      data: {
        name: data.name,
        description: data.description,
        isArchived: data.isArchived,
        isFeatured: data.isFeatured,
        quantity: data.quantity,
        categoryId,
        price,
        productImage: {
          createMany: {
            data: [...data.images.map((img) => ({ url: img.url }))],
          },
        },
        AttributesOnProducts: {
          createMany: {
            data: [
              ...data.attributeIds.map((id) => ({ attributeId: parseInt(id) })),
            ],
          },
        },
      },
    });

    return { product };
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);

    return { error };
  }
};
export const editProductAction = async ({
  data,
  id,
}: {
  data: ProductSchema;
  id: number;
}) => {
  try {
    //validate body
    const validateData = productSchema.safeParse(data);
    if (!validateData.success || !id) {
      throw new BadRequestError();
    }
    const categoryId = parseInt(data.categoryId);
    if (isNaN(categoryId)) throw new BadRequestError();
    const price = parseFloat(data.price);
    if (isNaN(price)) throw new BadRequestError();
    //validate user
    const { user } = await validateRequest();
    if (user?.role !== "ADMIN") {
      throw new UnauthorizedError(UnauthorizedMessageCode.notAdmin);
    }
    const editData = {
      name: data.name,
      description: data.description,
      isArchived: data.isArchived,
      isFeatured: data.isFeatured,
      quantity: data.quantity,
      categoryId,
      price,
    };

    const product = await db.$transaction(async (tx) => {
      //first delete all images and attributes
      await tx.product.update({
        where: { id },
        data: {
          ...editData,
          productImage: { deleteMany: {} },
          AttributesOnProducts: { deleteMany: {} },
        },
      });

      //then add new images, and attributes
      const product = await tx.product.update({
        where: { id },
        data: {
          ...editData,
          productImage: {
            createMany: {
              data: [...data.images.map((img) => ({ url: img.url }))],
            },
          },
          AttributesOnProducts: {
            createMany: {
              data: [
                ...data.attributeIds.map((id) => ({
                  attributeId: parseInt(id),
                })),
              ],
            },
          },
        },
      });
      return product;
    });

    return { product };
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);

    return { error };
  }
};

export const deleteProductAction = async ({ id }: { id: number }) => {
  try {
    //validate body
    if (!id) {
      throw new BadRequestError();
    }
    //validate user
    const { user } = await validateRequest();
    if (!user || user.role !== "ADMIN") {
      throw new UnauthorizedError(UnauthorizedMessageCode.notAdmin);
    }
    const product = await db.product.findFirst({
      where: { id },
    });
    if (!product) throw new BadRequestError("ไม่พบข้อมูล");
    await db.product.delete({ where: { id } });
    return {};
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);

    return { error };
  }
};
export const getManyProductsAction = async ({
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
    // Get Products
    const productsReq = db.product.findMany({
      skip: (pageId - 1) * limit,
      take: limit,
      orderBy: { id: "desc" },
      include: {
        productImage: {
          take: 1,
        },
      },
    });
    const [products, { user }] = await Promise.all([productsReq, userReq]);
    if (!user || user.role !== "ADMIN") {
      throw new UnauthorizedError(UnauthorizedMessageCode.notAdmin);
    }
    return { products };
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return { error };
  }
};
