/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "ik.imagekit.io",
          pathname: "**", // allow all paths
        },
        {
          protocol: "https",
          hostname: "html.tailus.io",
          pathname: "**", // allow customer logos
        }
      ],
    },
  };
  
  export default nextConfig;
  