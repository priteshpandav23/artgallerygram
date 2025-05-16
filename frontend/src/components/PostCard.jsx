function PostCard({ post }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h2 className="text-xl font-bold">{post.title}</h2>
      <p className="text-gray-600">by {post.author}</p>
      <img src={post.imageUrl} alt={post.title} className="mt-2 rounded" />
      <div className="mt-2 flex gap-4">
        <button>❤️ {post.likes}</button>
        <button>💬 {post.comments.length}</button>
      </div>
    </div>
  );
}

export default PostCard;
