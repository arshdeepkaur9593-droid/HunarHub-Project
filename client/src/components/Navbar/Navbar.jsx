import React, { useState } from "react";
import {
  FiSearch,
  FiShoppingCart,
  FiMenu,
  FiX,
  FiArrowRight,
  FiUser,
  FiChevronDown,
  FiLogOut,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import Container from "../Container/Container";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { cartCount } = useCart();
  const { user, loading, logout } = useAuth();

  const [search, setSearch] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  const navigate = useNavigate();

  const roleLabel = {
    customer: "Customer",
    entrepreneur: "Entrepreneur",
    admin: "Admin",
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const query = search.trim();

    if (!query) return;

    navigate(`/products?search=${encodeURIComponent(query)}`);
    setMobileMenu(false);
  };

  const handleLogout = async () => {
    setLogoutError("");

    try {
      await logout();
      setProfileMenu(false);
      setMobileMenu(false);
      navigate("/", { replace: true });
    } catch (error) {
      setLogoutError(error.message || "Unable to logout. Please try again.");
    }
  };

  const closeMobileMenu = () => {
    setMobileMenu(false);
    setProfileMenu(false);
  };

  const AuthButtons = ({ mobile = false }) => {
    if (loading) return null;

    if (user) {
      return (
        <div className={mobile ? "space-y-3" : "relative"}>
          <button
            type="button"
            onClick={() => setProfileMenu(!profileMenu)}
            aria-expanded={profileMenu}
            className={
              mobile
                ? "flex w-full items-center gap-3 rounded-xl border p-3 text-left"
                : "flex h-10 items-center gap-2 rounded-full border px-3 transition hover:bg-[var(--color-peach)]"
            }
            style={{
              borderColor: "var(--color-border-light)",
              color: "var(--color-heading)",
              backgroundColor: mobile ? "var(--color-surface)" : "white",
            }}
          >
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
              style={{
                backgroundColor: "var(--color-green)",
                color: "var(--color-green-dark)",
              }}
            >
              <FiUser size={19} />
            </span>

            <span className="min-w-0 flex-1">
              <span className="block max-w-[135px] truncate text-sm font-semibold">
                {user.name}
              </span>
              <span
                className="block text-xs"
                style={{ color: "var(--color-muted)" }}
              >
                {roleLabel[user.role] || user.role}
              </span>
            </span>

            <FiChevronDown
              className={`shrink-0 transition-transform ${
                profileMenu ? "rotate-180" : ""
              }`}
            />
          </button>

          {profileMenu && (
            <div
              className={
                mobile
                  ? "space-y-1 rounded-xl border p-2"
                  : "absolute right-0 top-full z-50 mt-3 w-56 rounded-2xl border bg-white p-2 shadow-xl"
              }
              style={{ borderColor: "var(--color-border-light)" }}
            >
              <div className="border-b px-3 py-2">
                <p className="truncate text-sm font-semibold">{user.name}</p>
                <p
                  className="truncate text-xs"
                  style={{ color: "var(--color-muted)" }}
                >
                  {user.email}
                </p>
                <p
                  className="mt-1 text-xs font-medium"
                  style={{ color: "var(--color-primary)" }}
                >
                  {roleLabel[user.role] || user.role}
                </p>
              </div>

              <Link
                to={
                  user.role === "entrepreneur"
                    ? "/entrepreneur/profile"
                    : user.role === "admin"
                      ? "/admin/dashboard"
                      : "/profile"
                }
                onClick={closeMobileMenu}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition hover:bg-[var(--color-peach)]"
                style={{ color: "var(--color-heading)" }}
              >
                <FiUser size={17} />
                My Profile
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition hover:bg-red-50"
                style={{ color: "#DC2626" }}
              >
                <FiLogOut size={17} />
                Logout
              </button>

              {logoutError && (
                <p className="px-3 py-2 text-xs text-red-600" role="alert">
                  {logoutError}
                </p>
              )}
            </div>
          )}
        </div>
      );
    }

    return (
      <div
        className={
          mobile ? "grid grid-cols-2 gap-3" : "flex items-center gap-2"
        }
      >
        <Link
          to="/login"
          onClick={mobile ? closeMobileMenu : undefined}
          className={
            mobile
              ? "flex h-11 items-center justify-center rounded-xl border text-sm font-semibold"
              : "flex h-10 items-center justify-center rounded-lg px-4 text-sm font-semibold transition hover:bg-[var(--color-peach)]"
          }
          style={{
            borderColor: "var(--color-border-light)",
            color: "var(--color-heading)",
          }}
        >
          Login
        </Link>

        <Link
          to="/signup"
          onClick={mobile ? closeMobileMenu : undefined}
          className={
            mobile
              ? "flex h-11 items-center justify-center rounded-xl text-sm font-semibold text-white"
              : "group flex h-10 items-center gap-2 rounded-lg px-4 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5"
          }
          style={{
            backgroundColor: "var(--color-primary)",
            boxShadow: mobile ? "none" : "var(--shadow-primary)",
          }}
        >
          Signup
          {!mobile && (
            <FiArrowRight
              size={15}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          )}
        </Link>
      </div>
    );
  };

  return (
    <nav
      className="sticky top-0 z-50 border-b backdrop-blur-xl"
      style={{
        backgroundColor: "rgba(255,255,255,0.96)",
        borderColor: "var(--color-border-light)",
      }}
    >
      <Container>
        <div className="flex h-[76px] items-center justify-between gap-5">
          <Link to="/" className="group flex shrink-0 items-center gap-3">
            <div
              className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl text-white transition duration-300 group-hover:-translate-y-0.5"
              style={{
                backgroundColor: "var(--color-primary)",
                boxShadow: "var(--shadow-primary)",
              }}
            >
              <span className="text-xl font-black">H</span>
              <span
                className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-tl-md"
                style={{ backgroundColor: "var(--color-green-dark)" }}
              />
            </div>

            <div className="hidden sm:block">
              <div
                className="text-[21px] font-extrabold tracking-tight"
                style={{ color: "var(--color-heading)" }}
              >
                Hunar
                <span style={{ color: "var(--color-primary)" }}>Hub</span>
              </div>

              <p
                className="mt-[-1px] text-[9px] font-semibold tracking-[0.13em]"
                style={{ color: "var(--color-muted)" }}
              >
                LOCAL SKILLS • REAL OPPORTUNITIES
              </p>
            </div>
          </Link>

          <div className="hidden lg:flex lg:items-center">
            <ul className="flex items-center gap-1">
              {[
                { label: "Home", path: "/" },
                { label: "Services", path: "/services" },
                { label: "Marketplace", path: "/products" },
                { label: "How It Works", path: "/how-it-works" },
                { label: "About", path: "/about" },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="group flex items-center whitespace-nowrap rounded-lg px-3.5 py-2 text-sm font-semibold transition"
                    style={{ color: "var(--color-secondary)" }}
                  >
                    <span className="transition group-hover:text-[var(--color-primary)]">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-2.5">
            <form onSubmit={handleSearch} className="hidden xl:block">
              <div
                className="group relative flex h-10 w-[215px] items-center rounded-full border transition focus-within:border-[var(--color-primary)]"
                style={{
                  backgroundColor: "var(--color-background)",
                  borderColor: "var(--color-border-light)",
                }}
              >
                <FiSearch
                  size={17}
                  className="ml-4 transition"
                  style={{ color: "var(--color-primary-light)" }}
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  aria-label="Search for products"
                  placeholder="Search products..."
                  className="h-full w-full bg-transparent px-3 pr-4 text-xs text-slate-800 outline-none placeholder:text-slate-400"
                />
              </div>
            </form>

            <Link
              to="/cart"
              aria-label="Shopping cart"
              className="group relative flex h-10 w-10 items-center justify-center rounded-full border transition duration-200 hover:-translate-y-0.5"
              style={{
                backgroundColor: "var(--color-surface)",
                borderColor: "var(--color-border-light)",
                color: "var(--color-heading)",
              }}
            >
              <FiShoppingCart
                size={19}
                className="transition group-hover:scale-105"
              />

              {cartCount > 0 && (
                <span
                  className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-1 text-[10px] font-bold text-white"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  {cartCount}
                </span>
              )}
            </Link>

            <div className="hidden items-center gap-2 md:flex">
              <AuthButtons />
            </div>

            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={mobileMenu}
              onClick={() => setMobileMenu(!mobileMenu)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border md:hidden"
              style={{
                borderColor: "var(--color-border-light)",
                color: "var(--color-heading)",
                backgroundColor: "var(--color-surface)",
              }}
            >
              {mobileMenu ? <FiX size={21} /> : <FiMenu size={21} />}
            </button>
          </div>
        </div>
      </Container>

      {mobileMenu && (
        <div
          className="border-t md:hidden"
          style={{
            backgroundColor: "var(--color-surface)",
            borderColor: "var(--color-border-light)",
          }}
        >
          <Container>
            <div className="space-y-5 py-5">
              <form onSubmit={handleSearch}>
                <div
                  className="flex h-11 items-center rounded-xl border"
                  style={{
                    backgroundColor: "var(--color-background)",
                    borderColor: "var(--color-border-light)",
                  }}
                >
                  <FiSearch
                    size={17}
                    className="ml-4"
                    style={{ color: "var(--color-primary)" }}
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search products..."
                    className="h-full w-full bg-transparent px-3 text-sm outline-none"
                  />
                </div>
              </form>

              <div className="flex flex-col">
                {[
                  { label: "Home", path: "/" },
                  { label: "Services", path: "/services" },
                  { label: "Marketplace", path: "/products" },
                  { label: "How It Works", path: "/how-it-works" },
                  { label: "About Us", path: "/about" },
                ].map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeMobileMenu}
                    className="rounded-lg px-3 py-3 text-sm font-semibold transition hover:bg-[var(--color-peach)]"
                    style={{ color: "var(--color-heading)" }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <AuthButtons mobile />
            </div>
          </Container>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
