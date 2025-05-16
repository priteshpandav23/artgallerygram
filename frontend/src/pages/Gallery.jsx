import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Gallery = () => {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    axios.get("https://api.harvardartmuseums.org/object?apikey=YOUR_API_KEY&size=12")
      .then(res => {
        setArtworks(res.data.records);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {artworks.map(art => (
        <Link to={`/artwork/${art.id}`} key={art.id} className="border rounded shadow hover:shadow-lg transition">
          <img src={art.primaryimageurl} alt={art.title} className="w-full h-64 object-cover rounded-t" />
          <div className="p-4">
            <h2 className="font-semibold text-lg">{art.title}</h2>
            <p className="text-sm text-gray-600">{art.people?.[0]?.name || "Unknown Artist"}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Gallery;
