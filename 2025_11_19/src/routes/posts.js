const express = require("express")
const { PrismaClient } = require("@prisma/client")
const router = express.Router()

const prisma = new PrismaClient()

// CREATE
router.post("/", async (req, res) => {
    const { title, content, categoryId } = req.body
    const post = await prisma.wpis.create({
        data: { title, content, categoryId }
    })
    res.json(post)
})

// READ
router.get("/", async (req, res) => {
    const posts = await prisma.wpis.findMany({
        include: { category: true, comments: true }
    })
    res.json(posts)
})

// READ :id
router.get("/:id", async (req, res) => {
    const post = await prisma.wpis.findUnique({
        where: { id: Number(req.params.id) },
        include: { category: true, comments: true }
    })
    res.json(post)
})

// UPDATE
router.put("/:id", async (req, res) => {
    const post = await prisma.wpis.update({
        where: { id: Number(req.params.id) },
        data: req.body
    })
    res.json(post)
})

// DELETE
router.delete("/:id", async (req, res) => {
    const post = await prisma.wpis.delete({
        where: { id: Number(req.params.id) }
    })
    res.json(post)
})

module.exports = router
