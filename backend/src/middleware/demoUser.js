export function attachDemoUser(req, res, next) {
  // This keeps the project easy to run locally while preserving a user-scoped data model.
  // In production, replace this with JWT authentication and derive userId from the token.
  req.user = {
    id: process.env.DEMO_USER_ID || 'demo-user-001'
  };
  next();
}
