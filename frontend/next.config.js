const {
    PHASE_PRODUCTION_BUILD,
    PHASE_PRODUCTION_SERVER,
} = require('next/constants');

/**
 * @param {string} phase
 * @returns {import('next').NextConfig}
 */
module.exports = (phase) => {
    const isProduction =
        phase === PHASE_PRODUCTION_BUILD || phase === PHASE_PRODUCTION_SERVER;

    /** @type {import('next').NextConfig} */
    const nextConfig = {
        env: {},
        images: {
            remotePatterns: [],
        },
    };

    if (!isProduction) {
        // Configurações de debug, aplicadas apenas fora de produção
        nextConfig.allowedDevOrigins = ['172.18.100.153'];
        nextConfig.images.remotePatterns.push({
            protocol: 'http',
            hostname: '172.18.100.153',
            port: '8002',
            pathname: '/**',
        });
    }

    return nextConfig;
};
