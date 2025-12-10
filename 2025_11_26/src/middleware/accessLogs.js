const {connectMongoDb} = require("./database");

const accessLogger = async (req, res, next) => {
    const db = await connectMongoDb();

    res.on("finish", async () => {
        try {
            const log = {
                method: req.method,
                url: req.originalUrl,
                status: res.statusCode,
                timestamp: new Date()
            };
            console.log(log);
            await db.collection("accessLogs").insertOne(log);
        } catch (err) {
            console.error("Błąd:", err);
        }
    });

    next();
};

module.exports = accessLogger;
