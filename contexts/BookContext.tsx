import { useState, createContext, ReactNode } from "react";

export interface Book {
  title: string;
  description: string;
  author: string;
  userId: string;
}

interface BooksContextType {
  books: Book[];
  fetchBooks: () => Promise<void>;
  fetchBookById: (id: string) => Promise<Book | undefined>;
  createBook: (data: Omit<Book, "id">) => Promise<void>;
  deleteBook: (id: string) => Promise<void>;
}

export const BooksContext = createContext<BooksContextType | undefined>(
  undefined
);

interface BooksProviderProps {
  children: ReactNode;
}

export function BooksProvider({ children }: BooksProviderProps) {
  const [books, setBooks] = useState<Book[]>([]);

  async function fetchBooks(): Promise<void> {
    try {
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  }

  async function fetchBookById(id: string): Promise<Book | undefined> {
    try {
      return undefined;
    } catch (error) {
      console.error(`Error fetching book with id ${id}:`, error);
      throw error;
    }
  }

  async function createBook(data: Omit<Book, "id">): Promise<void> {
    try {
    } catch (error) {
      console.error("Error creating book:", error);
      throw error;
    }
  }

  async function deleteBook(id: string): Promise<void> {
    try {
    } catch (error) {
      console.error(`Error deleting book with id ${id}:`, error);
      throw error;
    }
  }

  return (
    <BooksContext.Provider
      value={{ books, fetchBooks, fetchBookById, createBook, deleteBook }}
    >
      {children}
    </BooksContext.Provider>
  );
}
