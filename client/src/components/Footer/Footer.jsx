
import {
  Mail,
  MapPin,
  Phone,
  Globe,
  MessageCircle,
} from "lucide-react";

function Footer() {
  return (
    <footer
      className="text-slate-300"
      style={{ backgroundColor: "#252525" }}
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

        {/* Main Footer */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <h2
              className="text-2xl font-bold"
              style={{ color: "#FFFFFF" }}
            >
              Hunar
              <span style={{ color: "#EF8354" }}>Hub</span>
            </h2>

            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-400">
              Connecting local talent with customers and helping local
              entrepreneurs grow their businesses.
            </p>

            {/* Social Icons */}
            <div className="mt-5 flex gap-3">

              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-200 hover:-translate-y-1"
                style={{
                  backgroundColor: "#333333",
                  borderColor: "#444444",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#EF8354";
                  e.currentTarget.style.borderColor = "#EF8354";
                  e.currentTarget.style.color = "#FFFFFF";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#333333";
                  e.currentTarget.style.borderColor = "#444444";
                  e.currentTarget.style.color = "#CBD5E1";
                }}
                aria-label="Facebook"
              >
                <Globe size={17} />
              </a>

              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-200 hover:-translate-y-1"
                style={{
                  backgroundColor: "#333333",
                  borderColor: "#444444",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#4D7A45";
                  e.currentTarget.style.borderColor = "#4D7A45";
                  e.currentTarget.style.color = "#FFFFFF";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#333333";
                  e.currentTarget.style.borderColor = "#444444";
                  e.currentTarget.style.color = "#CBD5E1";
                }}
                aria-label="Instagram"
              >
                <MessageCircle size={17} />
              </a>

              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-200 hover:-translate-y-1"
                style={{
                  backgroundColor: "#333333",
                  borderColor: "#444444",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#5B7DB1";
                  e.currentTarget.style.borderColor = "#5B7DB1";
                  e.currentTarget.style.color = "#FFFFFF";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#333333";
                  e.currentTarget.style.borderColor = "#444444";
                  e.currentTarget.style.color = "#CBD5E1";
                }}
                aria-label="LinkedIn"
              >
                <Mail size={17} />
              </a>

            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>

            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href="/" className="transition-colors hover:text-[#EF8354]">
                  Home
                </a>
              </li>

              <li>
                <a
                  href="#categories"
                  className="transition-colors hover:text-[#EF8354]"
                >
                  Categories
                </a>
              </li>

              <li>
                <a
                  href="#how-it-works"
                  className="transition-colors hover:text-[#EF8354]"
                >
                  How It Works
                </a>
              </li>

              <li>
                <a
                  href="#about"
                  className="transition-colors hover:text-[#EF8354]"
                >
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Categories
            </h3>

            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href="#categories"
                  className="transition-colors hover:text-[#EF8354]"
                >
                  Handmade Crafts
                </a>
              </li>

              <li>
                <a
                  href="#categories"
                  className="transition-colors hover:text-[#EF8354]"
                >
                  Tailoring
                </a>
              </li>

              <li>
                <a
                  href="#categories"
                  className="transition-colors hover:text-[#EF8354]"
                >
                  Beauty & Wellness
                </a>
              </li>

              <li>
                <a
                  href="#categories"
                  className="transition-colors hover:text-[#EF8354]"
                >
                  Home Services
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Contact Us
            </h3>

            <ul className="mt-4 space-y-4 text-sm">

              <li className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0"
                  style={{ color: "#EF8354" }}
                />
                <span>Chandigarh, India</span>
              </li>

              <li className="flex items-center gap-3">
                <Phone
                  size={18}
                  className="shrink-0"
                  style={{ color: "#4D7A45" }}
                />
                <span>+91 00000 00000</span>
              </li>

              <li className="flex items-center gap-3">
                <Mail
                  size={18}
                  className="shrink-0"
                  style={{ color: "#5B7DB1" }}
                />
                <span>support@hunarhub.com</span>
              </li>

            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="mt-10 border-t pt-6"
          style={{ borderColor: "#3A3A3A" }}
        >
          <div className="flex flex-col items-center justify-between gap-3 text-center text-sm text-slate-500 sm:flex-row sm:text-left">

            <p>© 2026 HunarHub. All rights reserved.</p>

            <div className="flex gap-5">
              <a
                href="#"
                className="transition-colors hover:text-[#EF8354]"
              >
                Privacy Policy
              </a>

              <a
                href="#"
                className="transition-colors hover:text-[#EF8354]"
              >
                Terms & Conditions
              </a>
            </div>

          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
