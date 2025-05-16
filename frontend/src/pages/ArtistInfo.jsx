import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const ArtistInfo = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_KEY = "YOUR_API_KEY"; // Replace with your API key

  useEffect(() => {
    const fetchArtist = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.harvardartmuseums.org/person/${id}?apikey=${API_KEY}`
        );
        setArtist(response.data);
      } catch (error) {
        console.error("Error fetching artist info:", error);
      }
      setLoading(false);
    };
    fetchArtist();
  }, [id]);

  if (loading) return <p className="p-6">Loading artist information...</p>;
  if (!artist) return <p className="p-6">Artist not found.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{artist.displayname || "Unknown Artist"}</h1>
      {artist.personimageurl ? (
        <img
          src={artist.personimageurl}
          alt={artist.displayname}
          className="w-48 h-48 object-cover rounded mb-4"
        />
      ) : (
        <div className="w-48 h-48 bg-gray-300 flex items-center justify-center rounded mb-4">
          No Image
        </div>
      )}
      <p><strong>Nationality:</strong> {artist.nationality || "Unknown"}</p>
      <p><strong>Born:</strong> {artist.birthdate || "Unknown"}</p>
      <p><strong>Died:</strong> {artist.deathdate || "N/A"}</p>
      <p className="mt-4">{artist.biography || "No biography available."}</p>

      {/* Optionally list related artworks (if available) */}
      {artist.objectcount > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2">Artworks by {artist.displayname}</h2>
          <Link to="/gallery" className="text-blue-600 hover:underline">
            View all artworks
          </Link>
        </div>
      )}
    </div>
  );
};

export default ArtistInfo;
