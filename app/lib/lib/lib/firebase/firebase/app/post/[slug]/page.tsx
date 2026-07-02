import { getPostBySlug } from "@/lib/getPostBySlug";

export default async function PostPage({ params }: any) {
  const post = await getPostBySlug(params.slug);

  if (!post) return <p>Post not found</p>;

  return (
    <main style={{ padding: 40 }}>
      <h1>{post.title}</h1>
      <p>{post.category}</p>
      <div>{post.content}</div>
    </main>
  );
}
