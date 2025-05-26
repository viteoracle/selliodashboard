import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">Sellio</h3>
            <p className="text-gray-600 mb-4">
              Connecting local vendors and customers in a seamless online marketplace experience.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/share/14cxLG3SbH/?mibextid=wwXIfr" 
                 className="text-gray-400 hover:text-market-600"
                 target="_blank"
                 rel="noopener noreferrer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/campu_strade?igsh=dTN4dTIwbjgzYTZn&utm_source=qr"
                 className="text-gray-400 hover:text-market-600"
                 target="_blank"
                 rel="noopener noreferrer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="https://chat.whatsapp.com/ICk3GlCEG3Y7XghFEb1Z3m"
                 className="text-gray-400 hover:text-market-600"
                 target="_blank"
                 rel="noopener noreferrer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-market-600">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-600 hover:text-market-600">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-600 hover:text-market-600">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-market-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-market-600">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Vendor</h3>
            <ul className="space-y-2">
              {[
                { path: "/seller/login", label: "Seller Login" },
                { path: "/seller/register", label: "Become a Seller" },
                // { path: "/seller/dashboard", label: "Vendor Dashboard" },
                { path: "/seller/guide", label: "Seller Guide" }
              ].map(({ path, label }) => (
                <li key={path}>
                  <Link to={path} className="text-gray-600 hover:text-market-600">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <address className="not-italic text-gray-600">
              <p className="mb-2">Nkwelle, Anambra state</p>
              <p className="mb-2">Nigeria</p>
              <p className="mb-2">
                <a href="tel:+2348074219598" className="hover:text-market-600">
                  Hotline: +234 807 421 9598
                </a>
              </p>
              <p className="mb-2">
                <a href="mailto:Sellio52@gmail.com" className="hover:text-market-600">
                  Sellio52@gmail.com
                </a>
              </p>
              <p>
                <a href="https://chat.whatsapp.com/ICk3GlCEG3Y7XghFEb1Z3m" 
                   className="hover:text-market-600"
                   target="_blank"
                   rel="noopener noreferrer">
                  Join our WhatsApp Group
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Sellio. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <Link to="/privacy" className="text-gray-600 hover:text-market-600 text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-600 hover:text-market-600 text-sm">
                Terms of Service
              </Link>
              <Link to="/faq" className="text-gray-600 hover:text-market-600 text-sm">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
