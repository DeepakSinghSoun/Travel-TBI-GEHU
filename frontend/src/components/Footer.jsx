function Footer({ links }) {
  return (
    <footer className="bg-slate-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-2xl font-bold">StayNest</h2>
          <p className="mt-3 text-slate-300">
            AI-Powered Travel & Homestay Platform helping travelers
            discover unique stays and personalized itineraries.
          </p>
        </div>

          <div className="flex justify-center gap-4 mt-4">
            {links.map((link) => (
              <a className="hover:text-blue-400" key={link.path} href={link.path}>
                {link.name}
              </a>
            ))}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">
              Contact
            </h3>

            <p className="text-slate-300">
              support@staynest.com
            </p>

            <p className="text-slate-300 mt-2">
              +91 0000000000
            </p>
          </div>
        </div>

        <p className="mt-4 text-sm text-gray-500 flex justify-center">
          © {new Date().getFullYear()} StayNest. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;