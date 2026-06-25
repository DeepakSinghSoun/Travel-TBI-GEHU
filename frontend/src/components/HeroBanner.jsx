function HeroBanner() {
  return (
    <section className="relative h-[80vh] bg-cover bg-center flex items-center justify-center"
        style={{
            backgroundImage:
            "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb')",
        }}
        >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 text-center text-white px-6">
            <h1 className="text-4xl md:text-6xl font-bold">
            Find Your Perfect Homestay
            </h1>

            <p className="mt-4 text-lg md:text-xl">
            Explore amazing destinations with AI-powered travel planning.
            </p>

            <button className="mt-6 bg-blue-600 px-6 py-3 rounded-lg">
            Explore Now
            </button>
        </div>
    </section>
  );
}

export default HeroBanner;