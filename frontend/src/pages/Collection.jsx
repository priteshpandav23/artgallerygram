import React, { useEffect, useState } from "react";
import axios from "axios";

const Collection = () => {
  const [savedArtworks, setSavedArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/collection/${userId}`);
        setSavedArtworks(res.data.collection); // ✅ Correct extraction
      } catch (error) {
        console.error("Error fetching collection:", error);
      }
      setLoading(false);
    };

    if (userId) {
      fetchCollection();
    }
  }, [userId]);

  const handleDelete = async (objectID) => {
    try {
      await axios.delete(`http://localhost:5000/api/collection/${userId}/${objectID}`);
      setSavedArtworks((prev) => prev.filter((art) => art.objectID !== objectID));
    } catch (error) {
      console.error("Failed to delete artwork:", error);
    }
  };

  if (loading) {
    return <p className="p-6 text-center">Loading your collection...</p>;
  }

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-6">My Collection</h1>
      {savedArtworks.length === 0 ? (
        <p>You haven't added any artworks to your collection yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {savedArtworks.map((art) => (
            <div key={art.objectID} className="bg-white shadow rounded overflow-hidden">
              {art.imageUrl ? (
                <img src={art.imageUrl} alt={art.title} className="w-full h-64 object-cover" />
              ) : (
                <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                  No Image
                </div>
              )}
              <div className="p-4 text-left">
                <h2 className="font-semibold text-lg">{art.title}</h2>
                <p className="text-sm text-gray-600">{art.artist}</p>
                <p className="text-sm text-gray-500">{art.date}</p>
                <button
                  onClick={() => handleDelete(art.objectID)}
                  className="mt-3 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Collection;
