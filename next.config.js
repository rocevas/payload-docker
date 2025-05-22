import { withPayload } from '@payloadcms/next/withPayload'

import redirects from './redirects.js'

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined || process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const baseConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      [NEXT_PUBLIC_SERVER_URL].map(item => {
        const url = new URL(item)
        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', ''),
        }
      })[0],
    ],
  }
}

const dynamicConfig = withPayload({
  ...baseConfig,
  redirects,
}, {
  devBundleServerPackages: false,
})

const staticConfig = {
  ...baseConfig,
  output: 'export',
  trailingSlash: true,

  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  // rewrites: () => [],
  // redirects: () => [],
}

const config = process.env.BUILD_MODE === 'static'
  ? staticConfig
  : dynamicConfig

export default config
