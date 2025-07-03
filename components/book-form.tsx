"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import type { Book, BookInput } from "@/services/bookService"

interface BookFormProps {
  book?: Book | null
  onSave: (bookData: BookInput) => void
  onCancel: () => void
  isEditing?: boolean
}

export default function BookForm({ book, onSave, onCancel, isEditing = false }: BookFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    coverImageUrl: "",
    description: "",
    publishedYear: new Date().getFullYear(),
  })

  useEffect(() => {
    if (book && isEditing) {
      setFormData({
        title: book.title,
        author: book.author,
        genre: book.genre,
        coverImageUrl: book.cover,
        description: book.description,
        publishedYear: book.publishedYear,
      })
    }
  }, [book, isEditing])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const bookData: BookInput = {
      title: formData.title,
      author: formData.author,
      genre: formData.genre,
      description: formData.description,
      publishedYear: formData.publishedYear,
      cover: formData.coverImageUrl || "/placeholder.svg?height=300&width=200",
    }

    onSave(bookData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <Button variant="ghost" onClick={onCancel} className="mb-6 text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to BookShelf
        </Button>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            {isEditing ? "Edit Book" : "Add a New Book"}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-lg font-medium text-gray-900">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full p-3 text-base border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter book title"
              />
            </div>

            {/* Author */}
            <div className="space-y-2">
              <Label htmlFor="author" className="text-lg font-medium text-gray-900">
                Author
              </Label>
              <Input
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
                className="w-full p-3 text-base border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter author name"
              />
            </div>

            {/* Genre */}
            <div className="space-y-2">
              <Label htmlFor="genre" className="text-lg font-medium text-gray-900">
                Genre
              </Label>
              <Input
                id="genre"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                required
                className="w-full p-3 text-base border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter book genre"
              />
            </div>

            {/* Cover Image URL */}
            <div className="space-y-2">
              <Label htmlFor="coverImageUrl" className="text-lg font-medium text-gray-900">
                Cover Image URL
              </Label>
              <Input
                id="coverImageUrl"
                name="coverImageUrl"
                value={formData.coverImageUrl}
                onChange={handleChange}
                className="w-full p-3 text-base border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter cover image URL (optional)"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-lg font-medium text-gray-900">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full p-3 text-base border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter book description"
              />
            </div>

            {/* Published Year */}
            <div className="space-y-2">
              <Label htmlFor="publishedYear" className="text-lg font-medium text-gray-900">
                Published Year
              </Label>
              <Input
                id="publishedYear"
                name="publishedYear"
                type="number"
                value={formData.publishedYear}
                onChange={handleChange}
                required
                min="1000"
                max={new Date().getFullYear()}
                className="w-full p-3 text-base border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter published year"
              />
            </div>

            {/* Save Button */}
            <div className="pt-6">
              <Button
                type="submit"
                size="lg"
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-300 py-4 text-lg font-medium"
              >
                {isEditing ? "Update Book" : "Save Book"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
