import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

// Optimizing for scalability:
// 1. In serverless environments (AWS App Runner / Cloud Run), we need to be careful with pool size
//    as each instance opens connections.
// 2. In local dev, we don't want to exhaust connections if hot-reloading.

const globalPool = global as unknown as { pool: Pool };

const poolConfig = {
  connectionString: process.env.DATABASE_URL!,
  max: process.env.DB_MAX_CONNECTIONS ? parseInt(process.env.DB_MAX_CONNECTIONS) : 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
  keepAlive: true,
};

// Use a singleton pattern for the pool to prevent multiple pools during hot-reloading in dev
const pool = globalPool.pool || new Pool(poolConfig);

// Prevent crash on idle client error
if (!globalPool.pool) {
  pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
  });
}

if (process.env.NODE_ENV !== 'production') {
  globalPool.pool = pool;
}

export const db = drizzle(pool, { schema });
