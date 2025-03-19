/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // Ensure CSS/PostCSS processing works correctly
    webpack: (config) => {
        // Add any custom webpack configuration if needed
        return config;
    },
}

module.exports = nextConfig
