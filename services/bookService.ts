const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://v0-recreate-ui-screenshot-iota-beige.vercel.app/api"

export interface Book {
  _id: string
  title: string
  author: string
  genre: string
  description: string
  publishedYear: number
  cover: string
  coverColor: string
  createdAt: string
  updatedAt: string
}

export interface BookInput {
  title: string
  author: string
  genre: string
  description: string
  publishedYear: number
  cover?: string
}

class BookService {
  async getAllBooks(): Promise<Book[]> {
    const response = await fetch(`${API_BASE_URL}/books`)
    if (!response.ok) {
      throw new Error("Failed to fetch books")
    }
    return response.json()
  }

  async getBookById(id: string): Promise<Book> {
    const response = await fetch(`${API_BASE_URL}/books/${id}`)
    if (!response.ok) {
      throw new Error("Failed to fetch book")
    }
    return response.json()
  }

  async createBook(bookData: BookInput): Promise<Book> {
    const response = await fetch(`${API_BASE_URL}/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    })
    if (!response.ok) {
      throw new Error("Failed to create book")
    }
    return response.json()
  }

  async updateBook(id: string, bookData: Partial<BookInput>): Promise<Book> {
    const response = await fetch(`${API_BASE_URL}/books/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    })
    if (!response.ok) {
      throw new Error("Failed to update book")
    }
    return response.json()
  }

  async deleteBook(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/books/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      throw new Error("Failed to delete book")
    }
  }
}

export const bookService = new BookService()
