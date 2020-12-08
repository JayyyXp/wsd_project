import { Client } from "../deps.js";
import { config, connectionPool } from "../config/config.js";

const getClient = () => {
  return new Client(config.database);
}

/* const executeQuery = async(query, ...args) => {
  const client = getClient();
  try {
    await client.connect();
    return await client.query(query, ...args);
  } catch (e) {
    console.log(e);
  } finally {
    await client.end();
  }
} */


const executeQuery = async(query, ...params) => {
  const client = await connectionPool.connect();
  try {
      return await client.query(query, ...params);
  } catch (e) {
      console.log(e);  
  } finally {
      client.release();
  }
  
  return null;
};

export { executeQuery };