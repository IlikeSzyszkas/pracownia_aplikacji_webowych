const express = require("express")
const cors = require("cors")
const { PrismaClient } = require("@prisma/client")
const accessLogs = require("./middleware/accessLogs")
const errorLogs = require("./middleware/errorLogs")


const postsRouter = require("./routes/posts")
const categoriesRouter = require("./routes/categories")
const commentsRouter = require("./routes/comments")

const prisma = new PrismaClient()
const app = express()

app.use(cors())
app.use(express.json())
app.use(accessLogs)

app.use("/posts", postsRouter)
app.use("/categories", categoriesRouter)
app.use("/comments", commentsRouter)

app.use(errorLogs)

app.listen(8080, () => console.log("Server running on port 8080"))
