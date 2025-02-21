import pg from "pg";

import { config } from "dotenv";

config();

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR ( 50 ),
    text VARCHAR ( 255 ),
    added TIMESTAMPTZ
)
`;

async function populateDb() {
  console.log("seeding...");

  const client = new pg.Client({
    connectionString: process.env.DB_CONNECTION_STRING,
  });

  await client.connect();
  await client.query(SQL);
  await client.end();

  console.log("done");
}

populateDb();
