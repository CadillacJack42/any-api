-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP IF TABLE EXISTS bands;

CREATE TABLE bands (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    members INT NOT NULL,
    inception TEXT
);