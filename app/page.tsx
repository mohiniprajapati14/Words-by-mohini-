import { getPosts } from "@/lib/posts";

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <main style={{ padding: 40 }}>
      <h1 style={{ color: "#f5c542" }}>Words by Mohini</h1>

      {posts.map((p: any) => (
        <a key={p.id} href={`/post/${p.slug}`}>
          <h2>{p.title}</h2>
        </a>
      ))}
    </main>
  );
}
