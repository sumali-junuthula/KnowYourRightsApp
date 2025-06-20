import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import type { Guide } from "../(tabs)/guides";
import { fetchGuideById } from "../../services/guidesService";
export default function GuideDetailScreen() {
  const { id } = useLocalSearchParams();
  const [guide, setGuide] = useState<Guide | null>(null);

  useEffect(() => {
    const load = async () => {
      if (typeof id === 'string') {
        const data = await fetchGuideById(id);
        setGuide(data);
      }
    };
    load();
  }, [id]);

  if (!guide) return <Text style={styles.loading}>Loading...</Text>;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{guide.title}</Text>
      <Text style={styles.category}>Category: {guide.category}</Text>
      <Text style={styles.content}>{guide.content}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 24, color: "white", fontWeight: "bold", marginBottom: 8 },
  category: { fontSize: 16, color: "gray", marginBottom: 12 },
  content: { fontSize: 16, color: "gray", lineHeight: 24 },
  loading: { color: "white" }
});
