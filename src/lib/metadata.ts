import { Metadata } from "next";
import { config } from "./config";
interface MetadataOptions extends Metadata {
  title: string;
  description: string;
}

//TODO: update metadata
export const metadataHelper = ({
  title,
  description,
  openGraph,
  ...rest
}: MetadataOptions): Metadata => {
  return {
    title: {
      default: title,
      template: "%s | Ecomerce",
    },
    icons: [
      {
        url: "/logo.svg",
        href: "/logo.svg",
      },
    ],
    metadataBase: new URL(config.baseUrl + "/"),
    description,
    openGraph: {
      title: openGraph?.title ?? title,
      description: openGraph?.description ?? description,
      type: "website",
      locale: "th_TH",
      url: openGraph?.url || config.baseUrl,
      siteName: "Ecomerce แพลตฟอร์ม",
      images: openGraph?.images ?? [
        {
          url: "/img/papai-background.jpg",
          width: 1200,
          height: 630,
          alt: "Ecomerce แพลตฟอร์ม",
        },
      ],
    },
    ...rest,
  };
};
