import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/firestore";

export async function savePost(data: any) {
  return addDoc(collection(db, "posts"), {
    ...data,
    slug: data.title.toLowerCase().replace(/\s+/g, "-"),
    createdAt: serverTimestamp(),
  });
}
