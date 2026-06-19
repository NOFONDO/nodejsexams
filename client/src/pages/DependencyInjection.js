import React from 'react';
import { Link } from 'react-router-dom';

function DependencyInjection() {
  return (
    <div className="page">
      <Link to="/" className="back-btn">← Back to Home</Link>

      <h2> Q2 — Structural Coupling & Dependency Injection</h2>

      <p>
        Structural coupling refers to how much modules depend on each 
        other. Tightly coupled code is hard to test and maintain. 
        Dependency Injection solves this by passing dependencies 
        from outside instead of hardcoding them inside the module.
      </p>

      <h3 style={{ marginBottom: '10px' }}>❌ BAD — Tightly Coupled:</h3>
      <pre>{`
// BAD PRACTICE — Hardcoded dependency
import client from "../config/database.js";

async function getUserInfo_Coupled(username) {
  const query = "SELECT * FROM users WHERE username = ?";
  const [rows] = await client.query(query, [username]);
  return rows;
}

// Problem: Must connect to real database to test this
// Problem: Changing database means editing this file
      `}</pre>

      <h3 style={{ marginBottom: '10px' }}>✅ GOOD — Dependency Injection:</h3>
      <pre>{`
// GOOD PRACTICE — Client is injected from outside
async function getUserInfo(client, username) {
  const query = "SELECT * FROM users WHERE username = ?";
  const [rows] = await client.query(query, [username]);
  return rows;
}

// In production — use real database
getUserInfo(realDatabaseClient, "banlon");

// In testing — use a mock database (no real DB needed!)
getUserInfo(mockDatabaseClient, "banlon");
      `}</pre>

      <h3 style={{ marginBottom: '10px' }}> Benefits of Dependency Injection:</h3>
      <table>
        <thead>
          <tr>
            <th>Benefit</th>
            <th>Explanation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Testability</td>
            <td>Inject mock objects during testing, no real DB needed</td>
          </tr>
          <tr>
            <td>Loose Coupling</td>
            <td>Module does not know which specific client it receives</td>
          </tr>
          <tr>
            <td>Reusability</td>
            <td>Same function works with any compatible client</td>
          </tr>
          <tr>
            <td>Scalability</td>
            <td>Swap components without editing existing code</td>
          </tr>
          <tr>
            <td>Separation of Concerns</td>
            <td>Each module focuses only on its own logic</td>
          </tr>
        </tbody>
      </table>

      <p>
        Dependency Injection also enforces the Single Responsibility 
        Principle — a module should have only one reason to change. 
        DI removes the responsibility of obtaining dependencies, 
        leaving the module focused purely on its own logic.
      </p>
    </div>
  );
}

export default DependencyInjection;