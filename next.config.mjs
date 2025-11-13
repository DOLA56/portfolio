/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        // N'empêche plus le build en cas d'erreurs ESLint
        ignoreDuringBuilds: true,
    },
    typescript: {
        // N'empêche plus le build en cas d'erreurs TypeScript
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
