/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      //   bodySizeLimit: process.env.NODE_ENV === "production" ? "1mb" : "6mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },

      {
        protocol: "http",
        hostname: "localhost*",
        pathname: "**",
      },
    ],
  },
  //   webpack: (config) => {
  //     config.externals.push("@node-rs/argon2", "@node-rs/bcrypt");
  //     return config;
  //   },
};

export default nextConfig;
