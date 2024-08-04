import { validateRequest } from "@/lib/auth";
import { config } from "@/lib/config";
import { UnauthorizedError, UnauthorizedMessageCode } from "@/lib/error";
import { catchRouteErrorHelper } from "@/lib/error/catch-route-error-helper";
import { NextRequest, NextResponse } from "next/server";
import formidable from "formidable";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export async function POST(request: NextRequest) {
  try {
    const { user } = await validateRequest();
    if (user?.role !== "ADMIN")
      throw new UnauthorizedError(UnauthorizedMessageCode.notAdmin);

    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create a unique filename to avoid overwriting
    const uniqueFilename = `${Date.now()}-${file.name}`;
    const uploadDir = join(process.cwd(), "public", "uploads");
    const filePath = join(uploadDir, uniqueFilename);

    // Ensure the uploads directory exists
    await mkdir(uploadDir, { recursive: true });

    // Write the file
    await writeFile(filePath, buffer);
    console.log(`File saved to ${filePath}`);

    return NextResponse.json({
      url: `${config.baseUrl}/uploads/${file.name}`,
    });
  } catch (err) {
    return catchRouteErrorHelper(err, "POST /image");
  }
}
