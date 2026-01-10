import { BooksContext } from "@/contexts/BookContext";
import { useContext } from "react";

export function useBooks() {
  const context = useContext(BooksContext);
  if (context === undefined) {
    throw new Error("useBooks must be used within a BooksProvider");
  }
  return context;
}