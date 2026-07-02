import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firestore";

export async function getPosts() {
  const snap = await getDocs(collection(db, "posts"));

  return snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
}
