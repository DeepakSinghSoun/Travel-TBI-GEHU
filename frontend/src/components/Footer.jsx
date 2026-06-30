import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Footer() {
  const { token } = useAuth();

  const links = [
    { name: "Home", path: "/" },
    { name: "Listings", path: "/listings" },
    { name: "Trip Planner", path: "/trip-planner" },
  ];

  if (token) {
    links.push(
      { name: "Dashboard", path: "/dashboard" },
      { name: "Profile", path: "/profile" }
    );
  } else {
    links.push(
      { name: "Login", path: "/login" },
      { name: "Register", path: "/register" }
    );
  }

  return (
    <footer className="bg-slate-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* About */}
          <div>
            <h2 className="text-3xl font-bold text-blue-400">
              StayNest
            </h2>

            <p className="mt-4 text-slate-300 leading-7">
              StayNest is an AI-powered travel and homestay platform that
              helps travelers discover unique accommodations, check
              availability, and plan personalized trips effortlessly.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-slate-300 hover:text-blue-400 transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Contact Us
            </h3>

            <p className="text-slate-300">
              📧 support@staynest.com
            </p>

            <p className="text-slate-300 mt-3">
              📞 +91 00000 00000
            </p>

            <p className="text-slate-300 mt-3">
              📍 Dehradun, Uttarakhand, India
            </p>

            <div className="flex gap-4 mt-6">
              <a href="#" className="hover:text-blue-400">
                Facebook
              </a>

              <a href="#" className="hover:text-blue-400">
                Instagram
              </a>

              <a href="#" className="hover:text-blue-400">
                LinkedIn
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-slate-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">

          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} StayNest. All Rights Reserved.
          </p>

          <div className="flex gap-6 mt-4 md:mt-0 text-sm">
            <Link
              to="/privacy-policy"
              className="hover:text-blue-400"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="hover:text-blue-400"
            >
              Terms & Conditions
            </Link>
          </div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;