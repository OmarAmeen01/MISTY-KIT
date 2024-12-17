/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'hebbkx1anhila5yf.public.blob.vercel-storage.com',
      'cdn.vox-cdn.com', // Remove 'https://'
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/, // Look for .svg files
      use: ["@svgr/webpack"], // Use @svgr/webpack to handle them
    });

    return config; // Always return the modified config
  },
};

export default nextConfig;
