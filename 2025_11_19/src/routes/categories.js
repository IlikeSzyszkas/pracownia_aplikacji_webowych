const express = require("express")
const { PrismaClient } = require("@prisma/client")
const router = express.Router()

const prisma = new PrismaClient()

// CREATE
router.post("/", async (req, res) => {
    const category = await prisma.kategoria.create({
        data: { name: req.body.name }
    })
    res.json(category)
})

// READ
router.get("/", async (req, res) => {
    const categories = await prisma.kategoria.findMany({
        include: { posts: true }
    })
    res.json(categories)
})

// UPDATE
router.put("/:id", async (req, res) => {
    const category = await prisma.kategoria.update({
        where: { id: Number(req.params.id) },
        data: req.body
    })
    res.json(category)
})

// DELETE
router.delete("/:id", async (req, res) => {
    const category = await prisma.kategoria.delete({
        where: { id: Number(req.params.id) }
    })
    res.json(category)
})

module.exports = router
