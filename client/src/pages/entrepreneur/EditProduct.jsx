
import React, { useState } from "react";
import { ArrowLeft, Save, Package, IndianRupee, Layers3, FileText } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function EditProduct() {
  const navigate = useNavigate();
  const location = useLocation();

  const product = location.state?.product;

  const [formData, setFormData] = useState({
    name: product?.name || "",
    category: product?.category || "",
    price: product?.price || "",
    stock: product?.stock || "",
    description: product?.description || "",
  });

  if (!product) {
    return (
      <div
        className="flex min-h-screen items-center justify-center px-4"
        style={{ backgroundColor: "var(--color-background)" }}
      >
        <div
          className="w-full max-w-md rounded-3xl border bg-white p-8 text-center"
          style={{
            borderColor: "var(--color-border)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <div
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl"
            style={{
              backgroundColor: "var(--color-peach)",
              color: "var(--color-primary)",
            }}
          >
            <Package size={26} />
          </div>

          <h1
            className="mt-5 text-xl font-bold"
            style={{ color: "var(--color-heading)" }}
          >
            Product not found
          </h1>

          <p
            className="mt-2 text-sm"
            style={{ color: "var(--color-muted)" }}
          >
            The product you're trying to edit could not be found.
          </p>

          <button
            onClick={() => navigate("/entrepreneur/products")}
            className="mt-6 rounded-xl px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            style={{
              backgroundColor: "var(--color-green-dark)",
              boxShadow: "0 8px 20px rgba(77, 122, 69, 0.18)",
            }}
          >
            Back to My Products
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const savedProducts =
      JSON.parse(localStorage.getItem("hunarhubProducts")) || [];

    const updatedProduct = {
      ...product,
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
      status: Number(formData.stock) > 0 ? "Active" : "Out of Stock",
    };

    const productExists = savedProducts.some(
      (item) => item.id === product.id
    );

    let updatedProducts;

    if (productExists) {
      updatedProducts = savedProducts.map((item) =>
        item.id === product.id ? updatedProduct : item
      );
    } else {
      updatedProducts = [...savedProducts, updatedProduct];
    }

    localStorage.setItem(
      "hunarhubProducts",
      JSON.stringify(updatedProducts)
    );

    alert("Product updated successfully!");

    navigate("/entrepreneur/products");
  };

  const inputStyle = {
    borderColor: "var(--color-border)",
    color: "var(--color-heading)",
  };

  const handleFocus = (e) => {
    e.currentTarget.style.borderColor = "var(--color-primary)";
    e.currentTarget.style.boxShadow =
      "0 0 0 3px rgba(239, 131, 84, 0.12)";
  };

  const handleBlur = (e) => {
    e.currentTarget.style.borderColor = "var(--color-border)";
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      {/* Header */}
      <div
        className="border-b"
        style={{
          backgroundColor: "var(--color-peach-light)",
          borderColor: "var(--color-border)",
        }}
      >
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            {/* Back */}
            <button
              onClick={() => navigate("/entrepreneur/products")}
              className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border bg-white transition hover:bg-[#FFF7F2]"
              style={{
                borderColor: "var(--color-border)",
                color: "var(--color-body)",
              }}
            >
              <ArrowLeft size={19} />
            </button>

            <div>
              <p
                className="text-sm font-semibold"
                style={{ color: "var(--color-primary-dark)" }}
              >
                Entrepreneur Panel
              </p>

              <h1
                className="mt-1 text-2xl font-bold sm:text-3xl"
                style={{ color: "var(--color-heading)" }}
              >
                Edit Product
              </h1>

              <p
                className="mt-1 text-sm"
                style={{ color: "var(--color-muted)" }}
              >
                Update your product information and inventory.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-3xl border bg-white"
          style={{
            borderColor: "var(--color-border)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          {/* Form Header */}
          <div
            className="border-b px-6 py-5 sm:px-8"
            style={{
              backgroundColor: "var(--color-surface-soft)",
              borderColor: "var(--color-border-light)",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: "var(--color-peach)",
                  color: "var(--color-primary)",
                }}
              >
                <Package size={22} />
              </div>

              <div>
                <h2
                  className="font-bold"
                  style={{ color: "var(--color-heading)" }}
                >
                  Product Information
                </h2>

                <p
                  className="text-sm"
                  style={{ color: "var(--color-muted)" }}
                >
                  Make changes to your product details below.
                </p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="space-y-6 p-6 sm:p-8">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Product Name */}
              <div>
                <label
                  className="mb-2 block text-sm font-semibold"
                  style={{ color: "var(--color-secondary)" }}
                >
                  Product Name
                </label>

                <div className="relative">
                  <Package
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2"
                    style={{ color: "var(--color-muted)" }}
                  />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="h-12 w-full rounded-xl border bg-[#FFFDFC] pl-11 pr-4 text-sm outline-none transition"
                    style={inputStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label
                  className="mb-2 block text-sm font-semibold"
                  style={{ color: "var(--color-secondary)" }}
                >
                  Category
                </label>

                <div className="relative">
                  <Layers3
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2"
                    style={{ color: "var(--color-green-dark)" }}
                  />

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="h-12 w-full appearance-none rounded-xl border bg-[#FFFDFC] pl-11 pr-4 text-sm outline-none transition"
                    style={inputStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  >
                    <option value="">Select Category</option>
                    <option value="Handmade Crafts">
                      Handmade Crafts
                    </option>
                    <option value="Pottery">Pottery</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Traditional Crafts">
                      Traditional Crafts
                    </option>
                    <option value="Home Decor">Home Decor</option>
                  </select>
                </div>
              </div>

              {/* Price */}
              <div>
                <label
                  className="mb-2 block text-sm font-semibold"
                  style={{ color: "var(--color-secondary)" }}
                >
                  Price (₹)
                </label>

                <div className="relative">
                  <IndianRupee
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2"
                    style={{ color: "var(--color-primary)" }}
                  />

                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                    required
                    className="h-12 w-full rounded-xl border bg-[#FFFDFC] pl-11 pr-4 text-sm outline-none transition"
                    style={inputStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>
              </div>

              {/* Stock */}
              <div>
                <label
                  className="mb-2 block text-sm font-semibold"
                  style={{ color: "var(--color-secondary)" }}
                >
                  Stock
                </label>

                <div className="relative">
                  <Package
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2"
                    style={{ color: "var(--color-blue)" }}
                  />

                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    min="0"
                    required
                    className="h-12 w-full rounded-xl border bg-[#FFFDFC] pl-11 pr-4 text-sm outline-none transition"
                    style={inputStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>

                <p
                  className="mt-2 text-xs"
                  style={{ color: "var(--color-light-text)" }}
                >
                  Stock above 0 keeps the product Active.
                </p>
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label
                  className="mb-2 block text-sm font-semibold"
                  style={{ color: "var(--color-secondary)" }}
                >
                  Description
                </label>

                <div className="relative">
                  <FileText
                    size={18}
                    className="absolute left-4 top-4"
                    style={{ color: "var(--color-muted)" }}
                  />

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Describe your product..."
                    className="w-full resize-none rounded-xl border bg-[#FFFDFC] py-3 pl-11 pr-4 text-sm outline-none transition"
                    style={inputStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>

                <p
                  className="mt-2 text-xs"
                  style={{ color: "var(--color-light-text)" }}
                >
                  Keep the description clear so customers understand what
                  they are buying.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            className="flex flex-col-reverse gap-3 border-t px-6 py-5 sm:flex-row sm:justify-end sm:px-8"
            style={{
              backgroundColor: "var(--color-surface-soft)",
              borderColor: "var(--color-border-light)",
            }}
          >
            <button
              type="button"
              onClick={() => navigate("/entrepreneur/products")}
              className="rounded-xl border bg-white px-5 py-3 text-sm font-semibold transition hover:bg-[#FFF7F2]"
              style={{
                borderColor: "var(--color-border)",
                color: "var(--color-body)",
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              style={{
                backgroundColor: "var(--color-green-dark)",
                boxShadow: "0 8px 20px rgba(77, 122, 69, 0.18)",
              }}
            >
              <Save size={18} />
              Save Changes
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
