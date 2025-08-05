const { config } = require('./../config/config');

function ensureDbUrl() {
    if (config.db_url) return config.db_url;

    // Fallback: build from discrete env vars if present
    const { user, password, host, database, port } = config.postgres || {};
    if (user && password && host && database) {
        return `postgres://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${host}:${port || 5432}/${database}`;
    }
    return undefined;
}

const dbUrl = ensureDbUrl();

module.exports = {
    development: {
        url: dbUrl,
        dialect: 'postgres',
    },
    production: {
        url: dbUrl,
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                rejectUnauthorized: false
            }
        }
    },
}