import { Client } from 'pg';
import { config } from 'dotenv';

config();

async function testNotification() {
  const connectionString = `postgresql://${process.env.DB_USER || 'postgres'}:${process.env.DB_PASSWORD || 'admin'}@${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || '5432'}/${process.env.DB_NAME || 'paymentDb'}`;

  const client = new Client({ connectionString });

  try {
    await client.connect();
    console.log('✔ Connected to database\n');

    // Test INSERT
    console.log('📝 Testing INSERT...');
    const insertResult = await client.query(`
      INSERT INTO product (name, price, image) 
      VALUES ('Test Product', 99.99, 'https://example.com/image.jpg')
      RETURNING *;
    `);
    console.log('✔ Inserted product:', insertResult.rows[0]);
    console.log('⏳ Wait for notification in your app logs...\n');

    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Test UPDATE
    console.log('📝 Testing UPDATE...');
    const updateResult = await client.query(
      `
      UPDATE product 
      SET price = 79.99 
      WHERE id = $1
      RETURNING *;
    `,
      [insertResult.rows[0].id],
    );
    console.log('✔ Updated product:', updateResult.rows[0]);
    console.log('⏳ Wait for notification in your app logs...\n');

    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Test DELETE
    console.log('📝 Testing DELETE...');
    await client.query(`DELETE FROM product WHERE id = $1`, [
      insertResult.rows[0].id,
    ]);
    console.log('✔ Deleted product');
    console.log('⏳ Wait for notification in your app logs...\n');

    console.log(
      '✅ All tests completed! Check your NestJS app logs for notifications.',
    );
  } catch (error) {
    console.error('✘ Error:', error);
  } finally {
    await client.end();
  }
}

testNotification();
