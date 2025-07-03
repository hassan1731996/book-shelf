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

// Validation middleware
const validateBook = (req, res, next) => {
  const { title, author, genre, description, publishedYear } = req.body

  if (!title || !author || !genre || !description) {
    return res.status(400).json({
      message: "Missing required fields: title, author, genre, and description are required",
    })
  }

  if (publishedYear && (publishedYear < 1000 || publishedYear > new Date().getFullYear())) {
    return res.status(400).json({
      message: "Published year must be between 1000 and current year",
    })
  }

  next()
}

// GET all books
router.get("/", async (req, res) => {
  try {
    console.log("Fetching all books...")
    const books = await Book.find().sort({ createdAt: -1 })
    console.log(`Found ${books.length} books`)
    res.json(books)
  } catch (error) {
    console.error("Error fetching books:", error)
    res.status(500).json({ message: "Failed to fetch books", error: error.message })
  }
})

// GET single book
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid book ID format" })
    }

    const book = await Book.findById(id)
    if (!book) {
      return res.status(404).json({ message: "Book not found" })
    }

    res.json(book)
  } catch (error) {
    console.error("Error fetching book:", error)
    res.status(500).json({ message: "Failed to fetch book", error: error.message })
  }
})

// POST new book
router.post("/", validateBook, async (req, res) => {
  try {
    console.log("Creating new book:", req.body)

    const bookData = {
      ...req.body,
      coverColor: getRandomColor(),
      cover: req.body.cover || "/placeholder.svg?height=300&width=200",
    }

    const book = new Book(bookData)
    const newBook = await book.save()

    console.log("Book created successfully:", newBook._id)
    res.status(201).json(newBook)
  } catch (error) {
    console.error("Error creating book:", error)

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation error",
        errors: Object.values(error.errors).map((e) => e.message),
      })
    }

    res.status(500).json({ message: "Failed to create book", error: error.message })
  }
})

// PUT update book
router.put("/:id", validateBook, async (req, res) => {
  try {
    const { id } = req.params

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid book ID format" })
    }

    const book = await Book.findById(id)
    if (!book) {
      return res.status(404).json({ message: "Book not found" })
    }

    Object.keys(req.body).forEach((key) => {
      if (req.body[key] !== undefined) {
        book[key] = req.body[key]
      }
    })

    const updatedBook = await book.save()
    console.log("Book updated successfully:", updatedBook._id)
    res.json(updatedBook)
  } catch (error) {
    console.error("Error updating book:", error)

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation error",
        errors: Object.values(error.errors).map((e) => e.message),
      })
    }

    res.status(500).json({ message: "Failed to update book", error: error.message })
  }
})

// DELETE book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid book ID format" })
    }

    const book = await Book.findById(id)
    if (!book) {
      return res.status(404).json({ message: "Book not found" })
    }

    await Book.findByIdAndDelete(id)
    console.log("Book deleted successfully:", id)
    res.json({ message: "Book deleted successfully" })
  } catch (error) {
    console.error("Error deleting book:", error)
    res.status(500).json({ message: "Failed to delete book", error: error.message })
  }
})

module.exports = router
