import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Gallery = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = "1f1c6bc2-60a5-49e9-a7b2-2a53c0194703";

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const res = await axios.get(
          `https://api.harvardartmuseums.org/object?apikey=${API_KEY}&size=100&hasimage=1`
        );

        // Filter only artworks that have usable image URLs
        const filtered = res.data.records.filter(art => art.primaryimageurl);
        setArtworks(filtered.slice(0, 12)); // Use first 12 with images
      } catch (error) {
        console.error("Error fetching artworks:", error);
      }
      setLoading(false);
    };

    fetchArtworks();
  }, []);

  if (loading) {
    return <div className="text-center p-6 text-lg">Loading artworks...</div>;
  }

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {artworks.map(art => (
        <Link
          to={`/artwork/${art.id}`}
          key={art.id}
          className="border rounded shadow hover:shadow-lg transition"
        >
          <img
            src={art.primaryimageurl}
            alt={art.title || "Untitled"}
            className="w-full h-64 object-cover rounded-t"
          />
          <div className="p-4">
            <h2 className="font-semibold text-lg">{art.title || "Untitled"}</h2>
            <p className="text-sm text-gray-600">
              {art.people?.[0]?.name || "Unknown Artist"}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Gallery;
