import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { migrate } from 'drizzle-orm/node-postgres/migrator';

async function main() {
  // Dynamically import db to ensure dotenv runs first
  const { db } = await import('./index');
  
  console.log('Migrating database...');
  await migrate(db, { migrationsFolder: 'drizzle' });
  console.log('Migration complete!');
  process.exit(0);
}

main().catch((err) => {
  console.error('Migration failed', err);
  process.exit(1);
});
