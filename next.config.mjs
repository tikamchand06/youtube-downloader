/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ port: "", search: "", pathname: "/**", protocol: "https", hostname: "i.ytimg.com" }],
  },
};

export default nextConfig;
