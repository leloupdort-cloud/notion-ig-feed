export default function Home({ posts }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "4px",
      background: "#fff",
      padding: "4px"
    }}>
      {posts.map((post, i) => (
        <img
          key={i}
          src={post.image}
          style={{
            width: "100%",
            aspectRatio: "1/1",
            objectFit: "cover"
          }}
        />
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.BASE_URL}/api/notion`);
  const posts = await res.json();

  return { props: { posts } };
}
