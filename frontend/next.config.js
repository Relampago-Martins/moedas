/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {},
    images: {
        remotePatterns: [],
    },
};

if (process.env.NODE_ENV !== 'production') {
    // Configurações de debug, aplicadas apenas fora de produção
    nextConfig.allowedDevOrigins = ['172.18.100.153'];
    nextConfig.images.remotePatterns.push({
        protocol: 'http',
        hostname: '172.18.100.153',
        port: '8002',
        pathname: '/**',
    });
}

module.exports = nextConfig;
