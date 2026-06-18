// Q1 — MongoDB Aggregation Pipeline
// Goal: Group active users by country, count them, sort lowest to highest

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