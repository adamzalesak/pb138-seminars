-- Auto-runs on first Postgres container start (mounted via docker-entrypoint-initdb.d).
-- Creates a separate database for vitest + Playwright runs so they never touch
-- the dev DB.
CREATE DATABASE pb138_test;
