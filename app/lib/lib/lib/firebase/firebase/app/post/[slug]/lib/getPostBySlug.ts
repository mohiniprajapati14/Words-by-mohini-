import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/firestore";

export async function getPostBySlug(slug: string) {
  const q = query(collection(db, "posts"), where("slug", "==", slug));
  const snap = await getDocs(q);

  return snap.docs[0]?.data() || null;
}
