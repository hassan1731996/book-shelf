const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    genre: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    publishedYear: {
      type: Number,
      required: true,
      min: 1000,
      max: new Date().getFullYear(),
    },
    cover: {
      type: String,
      default: "/placeholder.svg?height=300&width=200",
    },
    coverColor: {
      type: String,
      default: "bg-blue-800",
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("Book", bookSchema)
