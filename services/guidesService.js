import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const fetchGuides = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "guides"));
    const guides = [];
    querySnapshot.forEach((doc) => {
      guides.push({ id: doc.id, ...doc.data() });
    })
    console.log(guides)
    return guides;
  } catch (error) {
    console.error('Error fetching guides:', error);
    return [];
  }
}

export const fetchGuideById = async (id) => {
  try {
    const docRef = doc(db, "guides", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // need to return explicit return type to typecheck in [id].tsx
      const data = docSnap.data();
      return {
        id: docSnap.id,
        title: data.title,
        content: data.content,
        category: data.category,
      };
    } else {
      console.warn(`Guide with id ${id} not found`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching guide by ID:", error);
    return null;
  }
}
