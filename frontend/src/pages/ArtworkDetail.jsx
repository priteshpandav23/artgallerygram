import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const ArtworkDetail = () => {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_KEY = "YOUR_API_KEY"; // Replace with your API key

  useEffect(() => {
    const fetchArtwork = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.harvardartmuseums.org/object/${id}?apikey=${API_KEY}`
        );
        setArtwork(response.data);
      } catch (error) {
        console.error("Error fetching artwork:", error);
      }
      setLoading(false);
    };
    fetchArtwork();
  }, [id]);

  if (loading) return <p className="p-6">Loading artwork details...</p>;
  if (!artwork) return <p className="p-6">Artwork not found.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {artwork.primaryimageurl ? (
        <img
          src={artwork.primaryimageurl}
          alt={artwork.title}
          className="w-full rounded shadow mb-6"
        />
      ) : (
        <div className="w-full h-96 bg-gray-200 flex items-center justify-center rounded mb-6">
          No Image Available
        </div>
      )}
      <h1 className="text-3xl font-bold mb-2">{artwork.title || "Untitled"}</h1>
      <p className="text-gray-700 mb-1">
        <strong>Artist: </strong>
        {artwork.people?.[0] ? (
          <Link to={`/artist/${artwork.people[0].id}`} className="text-blue-600 hover:underline">
            {artwork.people[0].name}
          </Link>
        ) : (
          "Unknown Artist"
        )}
      </p>
      <p className="text-gray-700 mb-1">
        <strong>Date: </strong> {artwork.dated || "Unknown"}
      </p>
      <p className="text-gray-700 mb-1">
        <strong>Medium: </strong> {artwork.medium || "Unknown"}
      </p>
      <p className="mt-4">{artwork.description || artwork.provenance || "No description available."}</p>
      {/* Add to collection button (logic to be added) */}
      <button
        disabled
        className="mt-6 bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed"
        title="Add to collection feature coming soon"
      >
        Add to Collection
      </button>
    </div>
  );
};

export default ArtworkDetail;
