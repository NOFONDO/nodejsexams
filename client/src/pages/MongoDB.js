import React from 'react';
import { Link } from 'react-router-dom';

function MongoDB() {
  return (
    <div className="page">
      <Link to="/" className="back-btn">← Back to Home</Link>

      <h2> Q1 — MongoDB Aggregation Pipeline</h2>

      <p>
        A developer wants to group active user accounts by their 
        residential country, count total occurrences, and sort 
        output from lowest to highest frequency.
      </p>

      <h3 style={{ marginBottom: '10px' }}>✅ Full Aggregation Pipeline:</h3>
      <pre>{`
db.users.aggregate([

  // STAGE 1 — Filter only active users
  { $match: { active: true } },

  // STAGE 2 — Group by country and count
  {
    $group: {
      _id: "$address.country",
      totalUsers: { $sum: 1 }
    }
  },

  // STAGE 3 — Sort ascending (lowest count first)
  { $sort: { totalUsers: 1 } }

]);
      `}</pre>

      <h3 style={{ marginBottom: '10px' }}>📊 Stage Breakdown:</h3>
      <table>
        <thead>
          <tr>
            <th>Stage</th>
            <th>Operator</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>$match</td>
            <td>active: true</td>
            <td>Filters only active users</td>
          </tr>
          <tr>
            <td>$group</td>
            <td>_id: "$address.country"</td>
            <td>Groups documents by country</td>
          </tr>
          <tr>
            <td>$group</td>
            <td>totalUsers: $sum: 1</td>
            <td>Counts one per document</td>
          </tr>
          <tr>
            <td>$sort</td>
            <td>totalUsers: 1</td>
            <td>Sorts lowest count first</td>
          </tr>
        </tbody>
      </table>

      <h3 style={{ marginBottom: '10px' }}>
        ⚡ Why Aggregation Pipeline over MapReduce?
      </h3>
      <p>
        The Aggregation Pipeline runs as native MongoDB C++ code making 
        it much faster than MapReduce which runs JavaScript functions.
        MapReduce is now officially deprecated in modern MongoDB versions.
        The Aggregation Pipeline is the only recommended approach for 
        production systems.
      </p>
    </div>
  );
}

export default MongoDB;