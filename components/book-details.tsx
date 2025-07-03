"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import type { Book } from "@/services/bookService"

interface BookDetailsProps {
  book: Book
  onBack: () => void
  onEdit: (book: Book) => void
  onDelete: (bookId: string) => void
}

export default function BookDetails({ book, onBack, onEdit, onDelete }: BookDetailsProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Button variant="ghost" onClick={onBack} className="mb-6 text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to BookShelf
        </Button>

        {/* Book Details Layout */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Book Cover */}
            <div className="flex justify-center lg:justify-start">
              <div className={`w-80 h-96 ${book.coverColor} rounded-lg flex items-center justify-center shadow-lg`}>
                <div className="text-white text-center p-6">
                  <div className="text-2xl font-bold mb-4 leading-tight">{book.title}</div>
                  {book.title === "To Kill a Mockingbird" && (
                    <div className="mb-4">
                      <svg viewBox="0 0 200 120" className="w-48 h-32 mx-auto">
                        {/* Tree illustration */}
                        <path
                          d="M100 120 L100 80 M80 100 Q100 70 120 100 M70 90 Q100 60 130 90 M60 80 Q100 50 140 80"
                          stroke="currentColor"
                          strokeWidth="3"
                          fill="none"
                        />
                        <circle cx="85" cy="85" r="3" fill="currentColor" opacity="0.7" />
                        <circle cx="95" cy="75" r="2" fill="currentColor" opacity="0.7" />
                        <circle cx="105" cy="80" r="3" fill="currentColor" opacity="0.7" />
                        <circle cx="115" cy="85" r="2" fill="currentColor" opacity="0.7" />
                        <circle cx="125" cy="90" r="3" fill="currentColor" opacity="0.7" />
                      </svg>
                    </div>
                  )}
                  <div className="text-lg font-semibold tracking-wider">{book.author.toUpperCase()}</div>
                </div>
              </div>
            </div>

            {/* Book Information */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{book.title}</h1>
                <p className="text-xl text-gray-600 mb-4">{book.author}</p>
                <p className="text-lg text-gray-700 font-medium">{book.genre}</p>
              </div>

              <div>
                <p className="text-gray-700 leading-relaxed text-base">{book.description}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6">
                <Button
                  variant="outline"
                  onClick={() => onEdit(book)}
                  className="px-6 py-2 text-gray-700 border-gray-300 hover:bg-gray-50"
                >
                  Edit Book
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onDelete(book._id)}
                  className="px-6 py-2 text-gray-700 border-gray-300 hover:bg-gray-50"
                >
                  Delete Book
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
