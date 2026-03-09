const { connectMongoDb } = require("./database");

const errorLogger = async (err, req, res, next) => {
  const db = await connectMongoDb();

  try {
    const log = {
        status: res.statusCode,
      message: err.message,
      method: req.method,
      url: req.originalUrl,
      timestamp: new Date()
    };
    console.log(log);
    await db.collection("errorLogs").insertOne(log);
  } catch (dbErr) {
    console.error("Błąd:", dbErr);
  }

    res.status(err.status || 500).json({
        error: err.status && err.message || "Internal Server Error"
    });
};

module.exports = errorLogger;
