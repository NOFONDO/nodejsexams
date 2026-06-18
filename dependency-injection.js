// Q2 — Structural Coupling & Dependency Injection in Node.js

// ❌ BAD PRACTICE — Tightly Coupled
// This function hardcodes its own database dependency
import client from "../config/database.js";

async function getUserInfo_Coupled(username) {
  const query = "SELECT * FROM users WHERE username = ?";
  const [rows] = await client.query(query, [username]);
  return rows;
}
// Problem: To test this, you need a real database
// Problem: To swap databases, you must edit this file directly


// ✅ GOOD PRACTICE — Dependency Injection (Loosely Coupled)
// The client is passed in from outside — not hardcoded
async function getUserInfo(client, username) {
  const query = "SELECT * FROM users WHERE username = ?";
  const [rows] = await client.query(query, [username]);
  return rows;
}

// In production — use real database
getUserInfo(realDatabaseClient, "banlon");

// In testing — use a fake/mock database (no real DB needed!)
getUserInfo(mockDatabaseClient, "banlon");

// Benefits of Dependency Injection:
// 1. Testability  — inject mock objects during testing
// 2. Loose Coupling — module does not know which client it receives
// 3. Reusability  — same function works with any compatible client
// 4. Scalability  — swap components without editing existing code