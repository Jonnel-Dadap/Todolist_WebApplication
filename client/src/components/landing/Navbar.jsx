import React from "react";

function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4">
      
      <div>
        <h1 className="text-xl font-bold">
          Todo Post
        </h1>
      </div>

      <div className="flex gap-6">
        <a href="#home">Home</a>
        <a href="#features">Features</a>
        <a href="#about">About</a>
      </div>

    </nav>
  );
}

export default Navbar;