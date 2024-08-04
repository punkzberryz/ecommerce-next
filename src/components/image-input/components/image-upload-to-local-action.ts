import { config } from "@/lib/config";
import { catchErrorHelper } from "@/lib/error";

export const uploadImageToLocalAction = async ({
  image,
  signData,
}: {
  image: File;
  signData: {
    signature: string;
    timestamp: number;
    apiKey: string;
    folder: string;
  };
}) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("api_key", signData.apiKey);
  formData.append("timestamp", signData.timestamp.toString());
  formData.append("folder", signData.folder);
  formData.append("signature", signData.signature);
  try {
    const response = await fetch("/image", {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      const err: { error: { message: string } } = await response.json();
      console.log({ err });
      throw new Error(err.error.message);
    }
    const resp = await response.json();
    console.log({ resp });
    return resp;
    // const url = `${config.baseUrl}/uploads/${signData.folder}/${name}`;
    // console.log({ url });
    // return { url };
  } catch (err) {
    return catchErrorHelper("uploadImageToLocalAction", err);
  }
};
