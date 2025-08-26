const jwt = require("jsonwebtoken");

function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  // Bearer <token> → Bearer 123
  if (!token) {
    return res.sendStatus(401);
  }
  return jwt.verify(token, "MY SECRET KEY", (error, user) => {
    if (error) return res.sendStatus(403);
    if (!user.isAdmin) return res.sendStatus(403);
    req.user = user;
  });
}

module.exports = requireAdmin;
