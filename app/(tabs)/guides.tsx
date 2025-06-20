import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { fetchGuides } from "../../services/guidesService";

export type Guide = {
  id: string;
  title: string;
  content: string;
  category: string;
}

const categories: string[] = ["All", "Police", "Housing", "Protest"];

const GuidesScreen: React.FC = () => {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [filtered, setFiltered] = useState<Guide[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] =useState<string>("");

  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      const data = await fetchGuides();
      setGuides(data);
      setFiltered(data);
    };
    load();
  }, []);

  useEffect(() => {
    let filteredList = guides;

    if (selectedCategory !== "All") {
      filteredList = filteredList.filter((g) => g.category === selectedCategory);
    }

    if (searchQuery.trim() !== "") {
      filteredList = filteredList.filter((g) =>
        g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFiltered(filteredList);
  }, [selectedCategory, searchQuery, guides]);

  const renderItem: ListRenderItem<Guide> = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.content}>{item.content}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Know Your Rights</Text>

      <View style={styles.categoryRow}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategory,
            ]}
            onPress={() => {
              setSelectedCategory(category)}
            }
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput 
          style={styles.searchBar}
          placeholder="Search guides..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item: guide }) => (
          <TouchableOpacity onPress={() => router.push(`/guides/${guide.id}`)}>
            <View style={styles.card}>
              <Text style={styles.title}>{guide.title}</Text>
              <Text style={styles.content} numberOfLines={2}>
                {guide.content}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ListHeaderComponent={<Text style={styles.header2}>Guides</Text>}
        ListFooterComponent={<Text style={styles.footer}>End of List</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 24, color: "#fff", fontWeight: "bold", marginBottom: 12 },
  header2: { fontSize: 16, color: "#f0f0f0", fontWeight: "bold", marginBottom: 12 },
  footer: { fontSize: 16, color: "#f0f0f0", fontWeight: "bold", marginBottom: 12 },
  categoryRow: { flexDirection: "row", marginBottom: 16, flexWrap: "wrap" },
  categoryButton: {
    backgroundColor: "#eee",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedCategory: { backgroundColor: "#007AFF" },
  categoryText: { color: "#000" },
  selectedText: { color: "#fff" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    elevation: 2,
  },
  title: { fontSize: 18, fontWeight: "bold" },
  content: { fontSize: 14, marginTop: 4 },
  searchBar: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
  }
});

export default GuidesScreen;
