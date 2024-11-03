const firebaseAdmin = require("firebase-admin");

const adminEmails = ['test@test.com']

exports.firebaseAuthMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send("Unauthorized");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
    req.user = decodedToken;
    req.userId = decodedToken.uid;
    if (adminEmails.includes(decodedToken.email)) {
      req.isAdmin = true
    }
    next();
  } catch (error) {
    console.error("Error verifying Firebase ID token:", error);
    return res.status(401).send("Unauthorized");
  }
};
