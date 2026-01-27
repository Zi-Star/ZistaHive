const { withSentryConfig } = require('@sentry/nextjs')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@zistahive/ui', 'lucide-react'],
  images: {
    domains: ['pub-fa95945cb61146e39594ad527c4c9c39.r2.dev'],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  webpack: (config) => {
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      'bufferutil': 'commonjs bufferutil',
    })
    return config
  },
}

const SentryWebpackPluginOptions = {
  silent: true,
}

module.exports = withSentryConfig(nextConfig, SentryWebpackPluginOptions)
