import { query } from "../db.js";

export const getClients = async () => {
    const {rows} = await query("SELECT * FROM client_tb order by id asc;");
    return rows;
}   


export const createClient = async (clientData) => {
  const { name, email, job, rate, isactive } = clientData;

  const { rows } = await query(
    `
      INSERT INTO client_tb (name, email, job, rate, isactive)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `,
    [name, email, job, rate, isactive]
  );

  return rows[0]; // return the newly created client
};

export const updateClient = async (clientData, clientId) => {
  const { name, email, job, rate, isactive } = clientData;

  const { rows } = await query(
    `
      update client_tb set name = $1, email = $2, job = $3, rate = $4, isactive = $5
      where id = $6
      RETURNING *
    `,
    [name, email, job, rate, isactive, clientId]
  );

  return rows[0]; // return the newly created client
};

export const deleteClient = async (clientId) => {
  // const { name, email, job, rate, isactive } = clientData;

  const { rows } = await query(
    `
      delete from client_tb
      where id = $1
      RETURNING *
    `,
    [clientId]
  );

  return rows[0]; // return the newly created client
};


export const searchClient = async (searchTerm) => {
  const wildcardTerm = `%${searchTerm}%`;

  const { rows } = await query(
    `
      SELECT * FROM client_tb
      WHERE 
        name ILIKE $1 OR
        email ILIKE $1 OR
        job ILIKE $1 OR
        CAST(rate AS TEXT) ILIKE $1 OR
        CAST(isactive AS TEXT) ILIKE $1
    `,
    [wildcardTerm]
  );

  return rows; // return all matched clients
};
