/**
 * Parses IMAGE_PROVIDERS (comma-separated URLs) into URL objects.
 * Empty entries (e.g. trailing comma) and invalid URLs are ignored.
 * @returns {URL[]}
 */
function getImageProviders() {
    return (process.env.IMAGE_PROVIDERS ?? '')
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean)
        .flatMap((value) => {
            try {
                return [new URL(value)];
            } catch {
                console.warn(
                    `[next.config] Ignoring invalid IMAGE_PROVIDERS URL: "${value}"`,
                );
                return [];
            }
        });
}

const imageProviders = getImageProviders();

/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {},
    images: {
        remotePatterns: imageProviders.map((url) => ({
            protocol: url.protocol.replace(':', ''),
            hostname: url.hostname,
            port: url.port,
            pathname: '/**',
        })),
    },
};

if (process.env.NODE_ENV !== 'production') {
    // Configurações de debug, aplicadas apenas fora de produção
    nextConfig.allowedDevOrigins = [
        ...new Set(imageProviders.map((url) => url.hostname)),
    ];
}

module.exports = nextConfig;
