import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase/firestore";

export async function deletePost(id: string) {
  return deleteDoc(doc(db, "posts", id));
}
