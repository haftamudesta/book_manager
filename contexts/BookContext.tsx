import { useAuth } from "@/hooks/useUser";
import { client, databases } from "@/lib/appwrite";
import { ID, Permission, Query, Role } from "react-native-appwrite";
import { useState, createContext, ReactNode, useEffect } from "react";

const DATABASE_ID = "69621d2a0001d95baa67";
const TABLE_ID = "books";
export interface Book {
  $id: string;
  $collectionId?: string;
  $databaseId?: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions?: string[];
  $sequence?: number;
  title: string;
  description: string;
  author: string;
  userId: string;
}

interface BooksContextType {
  books: Book[];
  fetchBooks: () => Promise<void>;
  fetchBookById: (id: string) => Promise<Book | undefined>;
  createBook: (data: Omit<Book, "$id">) => Promise<void>;
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
    if (!user?.$id) {
      setBooks([]);
      return;
    }

    try {
      const appwriteBooks = await databases.listDocuments(
        DATABASE_ID,
        TABLE_ID,
        [Query.equal("userId", user.$id), Query.orderDesc("$createdAt")]
      );
      const documents = appwriteBooks.documents;
      const transformedBooks: Book[] = documents.map((doc) => ({
        $id: doc.$id,
        $collectionId: doc.$collectionId,
        $databaseId: doc.$databaseId,
        $createdAt: doc.$createdAt,
        $updatedAt: doc.$updatedAt,
        $permissions: doc.$permissions,
        $sequence: doc.$sequence,
        title: doc.title || "",
        description: doc.description || "",
        author: doc.author || "",
        userId: doc.userId || user.$id,
      }));
      setBooks(transformedBooks);
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  }

  async function fetchBookById(id: string): Promise<Book | undefined> {
    if (!user?.$id || !id) {
      console.log("No user or invalid ID");
      return undefined;
    }

    try {
      const response = await databases.getDocument(DATABASE_ID, TABLE_ID, id);
      const doc = response as any;

      console.log("Fetched book document:", doc);
      if (doc.userId && doc.userId !== user.$id) {
        console.log("Book does not belong to current user");
      }
      return {
        $id: doc.$id || "",
        $collectionId: doc.$collectionId,
        $databaseId: doc.$databaseId,
        $createdAt: doc.$createdAt || new Date().toISOString(),
        $updatedAt: doc.$updatedAt || new Date().toISOString(),
        $permissions: doc.$permissions,
        $sequence: doc.$sequence,
        title: doc.title || "Untitled",
        description: doc.description || "",
        author: doc.author || "Unknown Author",
        userId: doc.userId || user.$id,
      };
    } catch (error: any) {
      console.error(
        `Error fetching book with id ${id}:`,
        error.message || error
      );
      throw error;
    }
  }

  async function createBook(data: Omit<Book, "$id">): Promise<void> {
    if (!user?.$id) {
      throw new Error("User must be logged in to create a book");
    }
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
          Permission.read(Role.user(user.$id)),
          Permission.update(Role.user(user.$id)),
          Permission.delete(Role.user(user.$id)),
        ]
      );
      await fetchBooks();
    } catch (error) {
      console.error("Error creating book:", error);
      throw error;
    }
  }

  async function deleteBook(id: string): Promise<void> {
    try {
      await databases.deleteDocument(DATABASE_ID, TABLE_ID, id);
    } catch (error) {
      console.error(`Error deleting book with id ${id}:`, error);
      throw error;
    }
  }

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const channel = `databases.${DATABASE_ID}.collections.${TABLE_ID}.documents`;

    if (user?.$id) {
      fetchBooks();

      unsubscribe = client.subscribe(channel, (response) => {
        const { events, payload } = response as any;

        if (
          events.includes(
            `databases.${DATABASE_ID}.collections.${TABLE_ID}.documents.*.create`
          )
        ) {
          const newBook: Book = {
            $id: payload.$id,
            $collectionId: payload.$collectionId,
            $databaseId: payload.$databaseId,
            $createdAt: payload.$createdAt,
            $updatedAt: payload.$updatedAt,
            $permissions: payload.$permissions,
            $sequence: payload.$sequence,
            title: payload.title || "",
            description: payload.description || "",
            author: payload.author || "",
            userId: payload.userId || user.$id,
          };
          if (newBook.userId === user.$id) {
            setBooks((prevBooks) => [newBook, ...prevBooks]);
          }
        }

        if (
          events.includes(
            `databases.${DATABASE_ID}.collections.${TABLE_ID}.documents.*.delete`
          )
        ) {
          setBooks((prevBooks) =>
            prevBooks.filter((book) => book.$id !== payload.$id)
          );
        }
        if (
          events.includes(
            `databases.${DATABASE_ID}.collections.${TABLE_ID}.documents.*.update`
          )
        ) {
          const updatedBook: Book = {
            $id: payload.$id,
            $collectionId: payload.$collectionId,
            $databaseId: payload.$databaseId,
            $createdAt: payload.$createdAt,
            $updatedAt: payload.$updatedAt,
            $permissions: payload.$permissions,
            $sequence: payload.$sequence,
            title: payload.title || "",
            description: payload.description || "",
            author: payload.author || "",
            userId: payload.userId || user.$id,
          };
          setBooks((prevBooks) =>
            prevBooks.map((book) =>
              book.$id === updatedBook.$id ? updatedBook : book
            )
          );
        }
      });
    } else {
      setBooks([]);
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user, fetchBooks]);

  return (
    <BooksContext.Provider
      value={{ books, fetchBooks, fetchBookById, createBook, deleteBook }}
    >
      {children}
    </BooksContext.Provider>
  );
}
