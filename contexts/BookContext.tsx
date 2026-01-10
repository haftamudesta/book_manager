import { useAuth } from "@/hooks/useUser";
import { databases } from "@/lib/appwrite";
import { ID, Permission, Query, Role } from "react-native-appwrite";
import { useState, createContext, ReactNode, useEffect } from "react";

const DATABASE_ID = "69621d2a0001d95baa67";
const TABLE_ID = "books";
export interface Book {
  title: string;
  description: string;
  author: string;
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
  const { user } = useAuth();

  async function fetchBooks(): Promise<void> {
    try {
      const response = await databases.listDocuments(DATABASE_ID, TABLE_ID, [
        Query.equal("userId", user?.$id),
      ]);
      setBooks(response.documents);
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
      await databases.createDocument(
        DATABASE_ID,
        TABLE_ID,
        ID.unique(),
        {
          ...data,
          userId: user?.$id,
        },
        [
          Permission.read(Role.user(user?.$id)),
          Permission.update(Role.user(user?.$id)),
          Permission.delete(Role.user(user?.$id)),
        ]
      );
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

  useEffect(() => {
    if (user) {
      fetchBooks();
    } else {
      setBooks([]);
    }
  }, [user]);
  return (
    <BooksContext.Provider
      value={{ books, fetchBooks, fetchBookById, createBook, deleteBook }}
    >
      {children}
    </BooksContext.Provider>
  );
}
