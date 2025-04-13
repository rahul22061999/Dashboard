import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new pg.Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

export const query = async (text, params) => {
  const client = await pool.connect(); // temporary connection
  console.log('Db connection established...');
  try {
    console.log('📤 Running query:', text);
    const result = await client.query(text, params);
    console.log('✅ Query successful',text, params);
    return result;
  } finally {
    client.release();
    console.log('🔒 DB Connection released\n'); // return client to pool
  }
};

