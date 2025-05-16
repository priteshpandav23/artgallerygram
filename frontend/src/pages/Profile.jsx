import { useState } from "react";

export default function Profile({ user, onUpdateProfile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setError("");
    if (!isEditing) {
      // Reset fields when canceling edit
      setUsername(user.username);
      setEmail(user.email);
      setAvatar(user.avatar);
    }
  };

  const handleSave = async () => {
    if (!username || !email) {
      setError("Username and email cannot be empty");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await onUpdateProfile({ username, email, avatar });
      setIsEditing(false);
    } catch (err) {
      setError(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // For simplicity, convert to base64 preview (in real app, upload to server)
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-900 p-6 rounded-md shadow-md text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Profile</h2>

      <div className="flex flex-col items-center mb-6">
        {avatar ? (
          <img
            src={avatar}
            alt="Avatar"
            className="w-32 h-32 rounded-full object-cover mb-4 border-2 border-blue-600"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center text-4xl font-bold mb-4">
            {username?.[0]?.toUpperCase() || "U"}
          </div>
        )}

        {isEditing && (
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="mb-4 text-sm text-gray-300"
          />
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Username</label>
          {isEditing ? (
            <input
              type="text"
              className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          ) : (
            <p>{username}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold mb-1">Email</label>
          {isEditing ? (
            <input
              type="email"
              className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          ) : (
            <p>{email}</p>
          )}
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex justify-center gap-4 mt-6">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 py-2 px-6 rounded font-semibold disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save"}
              </button>
              <button
                onClick={handleEditToggle}
                disabled={loading}
                className="bg-gray-600 hover:bg-gray-700 py-2 px-6 rounded font-semibold"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={handleEditToggle}
              className="bg-blue-600 hover:bg-blue-700 py-2 px-6 rounded font-semibold"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
