import React from "react";

const Collection = () => {
  // Placeholder for saved artworks - you can connect this to your backend or localStorage later
  const savedArtworks = [];

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-6">My Collection</h1>
      {savedArtworks.length === 0 ? (
        <p>You haven't added any artworks to your collection yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Render saved artworks here */}
        </div>
      )}
    </div>
  );
};

export default Collection;
