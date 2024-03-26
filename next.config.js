/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['@mdxeditor/editor'],
    reactStrictMode: true,
    webpack: (config) => {
        config.experiments = { ...config.experiments, topLevelAwait: true }
        return config
    }
}

module.exports = nextConfig
