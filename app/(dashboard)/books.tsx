import {
  StyleSheet,
  ScrollView,
  Pressable,
  RefreshControl,
  View,
} from "react-native";
import { useBooks } from "../../hooks/useBooks";
import { Colors } from "@/constants/colors";
import { useRouter } from "expo-router";
import { useState, useCallback } from "react";

import Spacer from "../../components/Spacer";
import ThemedText from "@/components/Themedtext";
import ThemedView from "@/components/Themedview";
import ThemedCard from "../../components/ThemedCard";

const Books = () => {
  const { books, fetchBooks } = useBooks();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchBooks();
    } catch (error) {
      console.error("Error refreshing books:", error);
    } finally {
      setRefreshing(false);
    }
  }, [fetchBooks]);

  const handleBookPress = (bookId: string) => {
    // router.push(`/books/${bookId}`);
  };

  if (!books || books.length === 0) {
    return (
      <ThemedView style={styles.container} safe={true}>
        <View style={styles.header}>
          <ThemedText style={styles.heading}>Your Reading List</ThemedText>
          <Pressable
            style={styles.addIcon}
            onPress={() => router.push("/create")}
          >
            <ThemedText style={styles.addIconText}>+</ThemedText>
          </Pressable>
        </View>

        <View style={styles.emptyContainer}>
          <ThemedText style={styles.emptyText}>No books yet</ThemedText>
          <Spacer height={20} />
          <Pressable
            style={styles.addButton}
            onPress={() => router.push("/create")}
          >
            <ThemedText style={styles.addButtonText}>
              Add Your First Book
            </ThemedText>
          </Pressable>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container} safe={true}>
      <View style={styles.header}>
        <ThemedText style={styles.heading}>Your Reading List</ThemedText>
        <Pressable
          style={styles.addIcon}
          onPress={() => router.push("/create")}
        >
          <ThemedText style={styles.addIconText}>+</ThemedText>
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.primary]}
            tintColor={Colors.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {books.map((book, index) => {
          return (
            <Pressable
              key={book.$id || `book-${index}`}
              onPress={() => handleBookPress(book.$id)}
              style={({ pressed }) => [
                styles.pressableItem,
                pressed && styles.pressedItem,
              ]}
            >
              <ThemedCard style={styles.card}>
                <ThemedText style={styles.title} numberOfLines={1}>
                  {book.title}
                </ThemedText>
                <Spacer height={8} />
                <ThemedText style={styles.author} numberOfLines={1}>
                  Written by {book.author}
                </ThemedText>
                {book.description && (
                  <>
                    <Spacer height={8} />
                    <ThemedText numberOfLines={2} style={styles.description}>
                      {book.description}
                    </ThemedText>
                  </>
                )}
                {book.$createdAt && (
                  <>
                    <Spacer height={8} />
                    <ThemedText style={styles.date}>
                      Added {new Date(book.$createdAt).toLocaleDateString()}
                    </ThemedText>
                  </>
                )}
              </ThemedCard>
              {index < books.length - 1 && <Spacer height={12} />}
            </Pressable>
          );
        })}
        <Spacer height={30} />
      </ScrollView>
    </ThemedView>
  );
};

export default Books;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 24,
  },
  addIcon: {
    backgroundColor: Colors.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  addIconText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
  },
  pressableItem: {
    borderRadius: 8,
  },
  pressedItem: {
    opacity: 0.7,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    borderLeftColor: Colors.gray,
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  author: {
    fontSize: 14,
    color: Colors.gray,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.gray,
  },
  date: {
    fontSize: 12,
    color: Colors.lightGray,
    fontStyle: "italic",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 18,
    color: Colors.mediumGray,
    textAlign: "center",
  },
  addButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
