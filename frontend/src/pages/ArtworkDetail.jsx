import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const ArtworkDetail = () => {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState("");

  const API_KEY = "1f1c6bc2-60a5-49e9-a7b2-2a53c0194703"; 
  const userId = localStorage.getItem("userId"); 

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://api.harvardartmuseums.org/object/${id}?apikey=${API_KEY}`
        );
        setArtwork(res.data);
      } catch (error) {
        console.error("Failed to fetch artwork:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtwork();
  }, [id]);

  const handleAddToCollection = async () => {
    if (!userId) {
      setMessage("You must be logged in to add to your collection.");
      return;
    }

    setAdding(true);
    setMessage("");

    try {
      const artworkData = {
        artworkId: artwork.objectid.toString(),
        title: artwork.title || "Untitled",
        imageUrl: artwork.primaryimageurl || "",
        artist: artwork.people?.[0]?.name || "Unknown",
        date: artwork.dated || "",
        medium: artwork.medium || "",
      };

      const res = await axios.post("http://localhost:5000/api/collection/add", {
        userId,
        ...artworkData,
      });

      setMessage(res.data.message || "Artwork added successfully!");
    } catch (err) {
      console.error("Error adding artwork to collection:", err);
      setMessage("Failed to add artwork. Try again later.");
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <p className="p-6 text-gray-700">Loading artwork details...</p>;
  if (!artwork) return <p className="p-6 text-red-500">Artwork not found.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {artwork.primaryimageurl ? (
        <img
          src={artwork.primaryimageurl}
          alt={artwork.title}
          className="w-full rounded-xl shadow-lg mb-6"
        />
      ) : (
        <div className="w-full h-96 bg-gray-200 flex items-center justify-center rounded mb-6">
          <span className="text-gray-500">No Image Available</span>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-2">{artwork.title || "Untitled"}</h1>

      <p className="text-gray-700 mb-1">
        <strong>Artist:</strong>{" "}
        {artwork.people?.[0] ? (
          <Link
            to={`/artist/${artwork.people[0].id}`}
            className="text-blue-600 hover:underline"
          >
            {artwork.people[0].name}
          </Link>
        ) : (
          "Unknown"
        )}
      </p>

      <p className="text-gray-700 mb-1">
        <strong>Date:</strong> {artwork.dated || "Unknown"}
      </p>

      <p className="text-gray-700 mb-1">
        <strong>Medium:</strong> {artwork.medium || "Unknown"}
      </p>

      <p className="mt-4 text-gray-800">
        {artwork.description || artwork.provenance || "No description available."}
      </p>

      <button
        onClick={handleAddToCollection}
        disabled={adding}
        className={`mt-6 px-4 py-2 rounded text-white transition ${
          adding
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {adding ? "Adding..." : "Add to Collection"}
      </button>

      {message && (
        <p className="mt-4 text-green-600 font-medium">{message}</p>
      )}
    </div>
  );
};

export default ArtworkDetail;
