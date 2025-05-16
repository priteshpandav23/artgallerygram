import { useState } from "react";

export default function AuthForm({ onLogin, onSignup }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setEmail("");
    setUsername("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password || (!isLogin && !username)) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        await onLogin({ email, password });
      } else {
        await onSignup({ email, username, password });
      }
    } catch (err) {
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-900 p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {isLogin ? "Login" : "Sign Up"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {!isLogin && (
          <div>
            <label className="block mb-1 font-semibold">Username</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required={!isLogin}
            />
          </div>
        )}

        <div>
          <label className="block mb-1 font-semibold">Password</label>
          <input
            type="password"
            className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold text-white disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (isLogin ? "Logging in..." : "Signing up...") : (isLogin ? "Login" : "Sign Up")}
        </button>
      </form>

      <p className="text-center mt-4 text-gray-400">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          onClick={toggleMode}
          className="text-blue-500 hover:underline font-semibold"
        >
          {isLogin ? "Sign Up" : "Login"}
        </button>
      </p>
    </div>
  );
}
