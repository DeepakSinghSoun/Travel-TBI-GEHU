import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar({ links }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-bold text-blue-600"
        >
          StayNest
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-lg font-medium">
          {links.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={
                  link.name === "Register"
                    ? "bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                    : "hover:text-blue-600 transition"
                }
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden flex flex-col gap-4 px-6 pb-6">
          {links.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={
                  link.name === "Register"
                    ? "block bg-blue-600 text-white text-center py-2 rounded-lg"
                    : "block hover:text-blue-600 transition"
                }
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

export default Navbar;