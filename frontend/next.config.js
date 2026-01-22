/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8001',
                pathname: '/**',
            },
        ],
    },
}

module.exports = nextConfig
