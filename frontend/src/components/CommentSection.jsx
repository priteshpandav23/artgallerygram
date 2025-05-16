import { useState } from "react";

export default function CommentSection({ comments = [], postId, onAddComment }) {
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setLoading(true);

    // Call the parent callback to add the comment (pass commentText & postId)
    await onAddComment(commentText);

    setCommentText("");
    setLoading(false);
  };

  return (
    <div className="mt-4">
      <h3 className="font-semibold mb-2">Comments</h3>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Write a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="flex-grow bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-white disabled:opacity-50"
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </form>

      {comments.length === 0 && <p className="text-gray-400">No comments yet.</p>}

      <ul className="space-y-2 max-h-48 overflow-y-auto">
        {comments.map((comment) => (
          <li key={comment._id} className="bg-gray-700 p-3 rounded-md">
            <p className="text-sm">
              <span className="font-semibold">{comment.user || "Anonymous"}:</span> {comment.text}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
