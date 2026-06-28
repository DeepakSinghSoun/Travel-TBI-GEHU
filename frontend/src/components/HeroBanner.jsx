import { Link } from "react-router-dom";
import Button from "./Button";

function HeroBanner() {
  return (
    <section
      className="relative h-[80vh] bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Hero Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Find Your Perfect Homestay
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-200">
          Discover unique stays, compare prices, check availability,
          and plan unforgettable trips with AI-powered travel assistance.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/listings">
            <Button className="px-8 py-3">
              Explore Homestays
            </Button>
          </Link>

          <Link to="/trip-planner">
            <Button
              className="px-8 py-3"
              variant="secondary"
            >
              AI Trip Planner
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;