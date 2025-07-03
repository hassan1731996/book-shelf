const express = require("express")
const router = express.Router()
const Book = require("../models/Book")

// Generate random color for book covers
const getRandomColor = () => {
  const colors = [
    "bg-blue-800",
    "bg-green-800",
    "bg-red-600",
    "bg-yellow-600",
    "bg-purple-700",
    "bg-indigo-700",
    "bg-pink-700",
    "bg-gray-700",
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

// GET all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 })
    res.json(books)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// GET single book
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    if (!book) {
      return res.status(404).json({ message: "Book not found" })
    }
    res.json(book)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// POST new book
router.post("/", async (req, res) => {
  try {
    const bookData = {
      ...req.body,
      coverColor: getRandomColor(),
      cover: req.body.cover || "/placeholder.svg?height=300&width=200",
    }

    const book = new Book(bookData)
    const newBook = await book.save()
    res.status(201).json(newBook)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// PUT update book
router.put("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    if (!book) {
      return res.status(404).json({ message: "Book not found" })
    }

    Object.keys(req.body).forEach((key) => {
      if (req.body[key] !== undefined) {
        book[key] = req.body[key]
      }
    })

    const updatedBook = await book.save()
    res.json(updatedBook)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// DELETE book
router.delete("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    if (!book) {
      return res.status(404).json({ message: "Book not found" })
    }

    await Book.findByIdAndDelete(req.params.id)
    res.json({ message: "Book deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
