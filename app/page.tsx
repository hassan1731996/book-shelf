"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import BookDetails from "@/components/book-details"
import BookForm from "@/components/book-form"
import DeleteConfirmation from "@/components/delete-confirmation"
import { bookService, type Book, type BookInput } from "@/services/bookService"

export default function BookShelf() {
  const [books, setBooks] = useState<Book[]>([])
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [currentView, setCurrentView] = useState<"shelf" | "details" | "add" | "edit">("shelf")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean
    book: Book | null
  }>({ isOpen: false, book: null })

  // Fetch books on component mount
  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    try {
      setLoading(true)
      setError(null)
      const fetchedBooks = await bookService.getAllBooks()
      setBooks(fetchedBooks)
    } catch (err) {
      setError("Failed to load books. Please try again.")
      console.error("Error fetching books:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleViewDetails = (book: Book) => {
    setSelectedBook(book)
    setCurrentView("details")
  }

  const handleAddNewBook = () => {
    setSelectedBook(null)
    setCurrentView("add")
  }

  const handleEditBook = (book: Book) => {
    setSelectedBook(book)
    setCurrentView("edit")
  }

  const handleDeleteBook = (book: Book) => {
    setDeleteConfirmation({ isOpen: true, book })
  }

  const confirmDelete = async () => {
    if (deleteConfirmation.book) {
      try {
        await bookService.deleteBook(deleteConfirmation.book._id)
        setBooks(books.filter((book) => book._id !== deleteConfirmation.book!._id))
        setDeleteConfirmation({ isOpen: false, book: null })
        setCurrentView("shelf")
      } catch (err) {
        setError("Failed to delete book. Please try again.")
        console.error("Error deleting book:", err)
      }
    }
  }

  const cancelDelete = () => {
    setDeleteConfirmation({ isOpen: false, book: null })
  }

  const handleSaveBook = async (bookData: BookInput) => {
    try {
      if (currentView === "edit" && selectedBook) {
        // Update existing book
        const updatedBook = await bookService.updateBook(selectedBook._id, bookData)
        setBooks(books.map((book) => (book._id === selectedBook._id ? updatedBook : book)))
      } else {
        // Add new book
        const newBook = await bookService.createBook(bookData)
        setBooks([newBook, ...books])
      }
      setCurrentView("shelf")
      setSelectedBook(null)
    } catch (err) {
      setError("Failed to save book. Please try again.")
      console.error("Error saving book:", err)
    }
  }

  const handleCancel = () => {
    setCurrentView("shelf")
    setSelectedBook(null)
  }

  // Show error state
  if (error && books.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={fetchBooks}>Try Again</Button>
        </div>
      </div>
    )
  }

  // Render different views based on current state
  if (currentView === "details" && selectedBook) {
    return <BookDetails book={selectedBook} onBack={handleCancel} onEdit={handleEditBook} onDelete={handleDeleteBook} />
  }

  if (currentView === "add") {
    return <BookForm onSave={handleSaveBook} onCancel={handleCancel} isEditing={false} />
  }

  if (currentView === "edit" && selectedBook) {
    return <BookForm book={selectedBook} onSave={handleSaveBook} onCancel={handleCancel} isEditing={true} />
  }

  // Main bookshelf view
  return (
    <>
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">My BookShelf</h1>
            <Button
              variant="outline"
              size="lg"
              className="bg-white hover:bg-gray-50 text-gray-900 border-gray-300 px-8 py-3 text-lg"
              onClick={handleAddNewBook}
            >
              Add New Book
            </Button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
              <span className="ml-2 text-gray-600">Loading books...</span>
            </div>
          ) : (
            /* Books Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {books.map((book) => (
                <Card key={book._id} className="bg-white shadow-sm border-gray-200 hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    {/* Book Cover */}
                    <div className="mb-4">
                      <div
                        className={`w-full h-64 ${book.coverColor} rounded-sm flex items-center justify-center mb-4 shadow-sm`}
                      >
                        <div className="text-white text-center p-4">
                          <div className="text-sm font-semibold mb-2">{book.title}</div>
                          <div className="text-xs opacity-90">{book.author}</div>
                        </div>
                      </div>
                    </div>

                    {/* Book Info */}
                    <div className="text-center space-y-2">
                      <h3 className="font-semibold text-gray-900 text-base leading-tight">{book.title}</h3>
                      <p className="text-gray-600 text-sm">{book.author}</p>

                      {/* View Details Button */}
                      <div className="pt-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full bg-white hover:bg-gray-50 text-gray-900 border-gray-300"
                          onClick={() => handleViewDetails(book)}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && books.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No books in your collection yet.</p>
              <Button onClick={handleAddNewBook}>Add Your First Book</Button>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmation
        isOpen={deleteConfirmation.isOpen}
        bookTitle={deleteConfirmation.book?.title || ""}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </>
  )
}
