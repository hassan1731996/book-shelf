const mongoose = require("mongoose")
const Book = require("./models/Book")
require("dotenv").config()

const initialBooks = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic",
    description:
      "The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on prosperous Long Island and in New York City, the novel tells the story of Jay Gatsby and his obsession with Daisy Buchanan.",
    publishedYear: 1925,
    coverColor: "bg-blue-800",
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Classic",
    description:
      "'To Kill a Mockingbird' is a novel by Harper Lee published in 1960. It is a classic of modern American literature, dealing with serious issues of race and inequality in the Deep South through the eyes of young Scout Finch.",
    publishedYear: 1960,
    coverColor: "bg-yellow-700",
  },
  {
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian Fiction",
    description:
      "1984 is a dystopian social science fiction novel by English novelist George Orwell. It was published in 1949 as Orwell's ninth and final book completed in his lifetime.",
    publishedYear: 1949,
    coverColor: "bg-red-600",
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    description:
      "Pride and Prejudice is an 1813 novel of manners written by Jane Austen. The novel follows the character development of Elizabeth Bennet, the dynamic protagonist.",
    publishedYear: 1813,
    coverColor: "bg-yellow-600",
  },
]

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/bookshelf")

    // Clear existing books
    await Book.deleteMany({})

    // Insert initial books
    await Book.insertMany(initialBooks)

    console.log("Database seeded successfully!")
    process.exit(0)
  } catch (error) {
    console.error("Error seeding database:", error)
    process.exit(1)
  }
}

seedDatabase()
