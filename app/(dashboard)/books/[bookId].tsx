import { StyleSheet, Text } from "react-native";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useBooks } from "../../../hooks/useBooks";
import { Book } from "@/contexts/BookContext";

import ThemedText from "@/components/Themedtext";
import ThemedButton from "../../../components/ThemedButton";
import ThemedView from "@/components/Themedview";
import Spacer from "../../../components/Spacer";
import ThemedCard from "../../../components/ThemedCard";
import ThemedLoader from "../../../components/ThemedLoader";
import { Colors } from "@/constants/colors";

const BookDetails = () => {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const params = useLocalSearchParams();
  const { fetchBookById, deleteBook } = useBooks();
  const bookId = Array.isArray(params.bookId)
    ? params.bookId[0]
    : params.bookId;
  const router = useRouter();

  useEffect(() => {
    async function loadBook() {
      if (!bookId) {
        setError("No book ID provided");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const bookData = await fetchBookById(bookId);
        if (bookData) {
          setBook(bookData);
        } else {
          setError("Book not found");
        }
      } catch (err) {
        console.error("Error loading book:", err);
        setError("Failed to load book details");
      } finally {
        setLoading(false);
      }
    }

    loadBook();
  }, [bookId]);
  const handleDelete = async () => {
    await deleteBook(bookId);
    setBook(null);
    router.replace("/books");
  };

  if (loading) {
    return (
      <ThemedView safe={true} style={styles.container}>
        <ThemedLoader />
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView safe={true} style={styles.container}>
        <ThemedCard style={styles.card}>
          <ThemedText style={styles.errorText}>{error}</ThemedText>
          <Spacer height={20} />
          <ThemedButton
            onPress={() => {
              router.push("/books");
            }}
          >
            <ThemedText style={{ color: "#fff" }}>Go Back</ThemedText>
          </ThemedButton>
        </ThemedCard>
      </ThemedView>
    );
  }

  if (!book) {
    return (
      <ThemedView safe={true} style={styles.container}>
        <ThemedCard style={styles.card}>
          <ThemedText>No book data available</ThemedText>
        </ThemedCard>
      </ThemedView>
    );
  }

  return (
    <ThemedView safe={true} style={styles.container}>
      <ThemedCard style={styles.card}>
        <ThemedText style={styles.title}>{book.title}</ThemedText>
        <ThemedText style={styles.author}>Written by {book.author}</ThemedText>
        <Spacer height={20} />

        <ThemedText style={styles.sectionTitle}>Book Description:</ThemedText>
        <Spacer height={10} />

        <ThemedText style={styles.description}>{book.description}</ThemedText>

        {book.$createdAt && (
          <>
            <Spacer height={20} />
            <ThemedText style={styles.date}>
              Added on {new Date(book.$createdAt).toLocaleDateString()}
            </ThemedText>
          </>
        )}
        <ThemedText style={styles.delete} onPress={handleDelete}>
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            Delete Book
          </Text>
        </ThemedText>
      </ThemedCard>
    </ThemedView>
  );
};

export default BookDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin: 20,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  author: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#666",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },
  date: {
    fontSize: 14,
    color: "#888",
    fontStyle: "italic",
  },
  errorText: {
    fontSize: 18,
    color: "#FF3B30",
    textAlign: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  delete: {
    marginTop: 40,
    backgroundColor: Colors.warning,
    width: 200,
    height: 40,
    alignSelf: "center",
    borderRadius: 50,
    paddingTop: 4,
    cursor: "pointer",
  },
});
