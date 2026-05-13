/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,

  images:{
    remotePatterns:[
      {
        protocol: "https",
        hostname: "assignment08-server.onrender.com",
      },

      {
        protocol: "https",
        hostname: "***",
      },
    ],
  }
};
export default nextConfig;
