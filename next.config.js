/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config({ path: `${__dirname}/.env` })

const { withGraphCommerce, runtimeCachingOptimizations } = require('@graphcommerce/next-config')

// eslint-disable-next-line import/order
const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  extendDefaultRuntimeCaching: true,
  workboxOptions: {
    runtimeCaching: runtimeCachingOptimizations,
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  onDemandEntries: {
    maxInactiveAge: 1000 * 60 * 10,
    pagesBufferLength: 10,
  },
  optimizeFonts: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mobelringen.no',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'mcstaging.mobelringen.no',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.mobelringen.no',
        port: '',
        pathname: '/**',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = withGraphCommerce(withPWA(nextConfig), __dirname)
