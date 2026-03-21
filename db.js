const { Client } = require("pg"); // <-- PG Client
const dbConfig = {
    host: "localhost",
    user: "postgres",
    password: "hanae",
    port: 5432
};

// Connect to PostgreSQL server (without database yet)
const client = new Client(dbConfig);

client.connect(err => {
    if (err) throw err;
    console.log("Connected to PostgreSQL server");

    // create database if not exists
    client.query(
        "SELECT 1 FROM pg_database WHERE datname='procurement_system'",
        (err, result) => {
            if (err) throw err;

            if (result.rowCount === 0) {
                client.query(
                    "CREATE DATABASE procurement_system",
                    err => {
                        if (err) throw err;
                        console.log("Database created");
                        connectDatabase();
                    }
                );
            } else {
                console.log("Database already exists");
                connectDatabase();
            }
        }
    );
});

// connect to created database
function connectDatabase() {
    const db = new Client({
        host: "localhost",
        user: "postgres",
        password: "hanae",
        database: "procurement_system",
        port: 5432
    });

    db.connect(err => {
        if (err) throw err;
        console.log("Connected to procurement_system database");

        createTables(db);
    });

    module.exports = db;
}

// create tables
function createTables(db) {
    const fournisseurTable = `
        CREATE TABLE IF NOT EXISTS fournisseurs (
            id_fournisseur SERIAL PRIMARY KEY,
            nom VARCHAR(100) NOT NULL,
            email VARCHAR(150) UNIQUE NOT NULL,
            telephone VARCHAR(20),
            adresse TEXT,
            status VARCHAR(20) DEFAULT 'PENDING',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;

    db.query(fournisseurTable, err => {
        if (err) throw err;
        console.log("Table fournisseurs ready");
    });
}