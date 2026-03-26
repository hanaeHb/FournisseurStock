const { Client } = require("pg");

// 1. connect server (بدون DB)
const client = new Client({
    host: "localhost",
    user: "postgres",
    password: "hanae",
    port: 5432
});

client.connect()
    .then(() => {
        console.log("Connected to PostgreSQL server");

        return client.query(
            "SELECT 1 FROM pg_database WHERE datname='procurement_system'"
        );
    })
    .then(result => {
        if (result.rowCount === 0) {
            return client.query("CREATE DATABASE procurement_system");
        }
    })
    .then(() => {
        console.log("Database ready");
        return connectDatabase();
    })
    .catch(err => console.error(err));


// 2. connect to DB
const db = new Client({
    host: "localhost",
    user: "postgres",
    password: "hanae",
    database: "procurement_system",
    port: 5432
});

async function connectDatabase() {
    await db.connect();
    console.log("Connected to procurement_system database");

    await createTables();
}

// 3. create tables
async function createTables() {
    const fournisseurTable = `
        CREATE TABLE IF NOT EXISTS fournisseurs (
            id_fournisseur SERIAL PRIMARY KEY,
            user_id INTEGER UNIQUE,
            prenom VARCHAR(100),
            nom VARCHAR(100) NOT NULL,
            email VARCHAR(150) UNIQUE NOT NULL,
            telephone VARCHAR(20),
            cin VARCHAR(20),
            adresse TEXT,
            status VARCHAR(20) DEFAULT 'PENDING',
            image TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
    `;

    await db.query(fournisseurTable);
    console.log("Table fournisseurs ready");
}

// 4. EXPORT IMPORTANT
module.exports = db;