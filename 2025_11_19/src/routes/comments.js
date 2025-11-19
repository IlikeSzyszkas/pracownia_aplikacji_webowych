const express = require("express")
const { PrismaClient } = require("@prisma/client")
const router = express.Router()

const prisma = new PrismaClient()

// CREATE
router.post("/", async (req, res) => {
    const { text, postId } = req.body
    const comment = await prisma.komentarz.create({
        data: { text, postId }
    })
    res.json(comment)
})

// READ
router.get("/", async (req, res) => {
    const comments = await prisma.komentarz.findMany({
        include: { post: true }
    })
    res.json(comments)
})

// UPDATE
router.put("/:id", async (req, res) => {
    const comment = await prisma.komentarz.update({
        where: { id: Number(req.params.id) },
        data: req.body
    })
    res.json(comment)
})

// DELETE
router.delete("/:id", async (req, res) => {
    const comment = await prisma.komentarz.delete({
        where: { id: Number(req.params.id) }
    })
    res.json(comment)
})

module.exports = router
