
import React, { useState } from "react";
import {
  ArrowLeft,
  ImagePlus,
  Plus,
  Package,
  IndianRupee,
  Layers3,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    stock: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    setProduct((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      id: Date.now(),
      name: product.name,
      category: product.category,
      description: product.description,
      price: Number(product.price),
      stock: Number(product.stock),
      status: Number(product.stock) > 0 ? "Active" : "Out of Stock",
      image: product.image
        ? URL.createObjectURL(product.image)
        : null,
    };

    const existingProducts =
      JSON.parse(localStorage.getItem("hunarhubProducts")) || [];

    localStorage.setItem(
      "hunarhubProducts",
      JSON.stringify([
        ...existingProducts,
        newProduct,
      ])
    );

    alert("Product added successfully!");

    navigate("/entrepreneur/products");
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)]">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="border-b border-[var(--color-border)] bg-[var(--color-peach-light)]">

        <div className="mx-auto flex max-w-5xl items-center gap-4 px-4 py-6 sm:px-6 lg:px-8">

          {/* BACK BUTTON */}

          <button
            type="button"
            onClick={() =>
              navigate("/entrepreneur/products")
            }
            className="rounded-xl border border-[var(--color-border)] bg-white p-2.5 text-[var(--color-muted)] shadow-sm transition hover:-translate-y-0.5 hover:bg-[var(--color-surface-soft)] hover:text-[var(--color-heading)]"
          >
            <ArrowLeft size={20} />
          </button>

          {/* TITLE */}

          <div>

            <p className="text-sm font-semibold text-[var(--color-primary-dark)]">
              Entrepreneur Panel
            </p>

            <h1 className="mt-1 text-2xl font-bold text-[var(--color-heading)]">
              Add Product
            </h1>

            <p className="mt-1 text-sm text-[var(--color-muted)]">
              Add a new product to your marketplace.
            </p>

          </div>

        </div>

      </div>

      {/* ================================================= */}
      {/* MAIN */}
      {/* ================================================= */}

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">

        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-3xl border border-[var(--color-border)] bg-white shadow-[var(--shadow-card)]"
        >

          {/* ================================================= */}
          {/* FORM HEADER */}
          {/* ================================================= */}

          <div className="border-b border-[var(--color-border)] bg-[var(--color-surface-soft)] px-6 py-5">

            <div className="flex items-center gap-3">

              <div className="rounded-xl bg-[var(--color-peach)] p-2.5 text-[var(--color-primary-dark)]">
                <Package size={21} />
              </div>

              <div>
                <h2 className="font-bold text-[var(--color-heading)]">
                  Product Information
                </h2>

                <p className="mt-0.5 text-xs text-[var(--color-muted)]">
                  Provide accurate details about your product.
                </p>
              </div>

            </div>

          </div>

          {/* ================================================= */}
          {/* FORM CONTENT */}
          {/* ================================================= */}

          <div className="p-6 sm:p-8">

            <div className="grid gap-6 md:grid-cols-2">

              {/* ================================================= */}
              {/* PRODUCT NAME */}
              {/* ================================================= */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-[var(--color-secondary)]">
                  Product Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  required
                  className="h-11 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] px-4 text-sm text-[var(--color-body)] outline-none transition placeholder:text-[var(--color-light-text)] focus:border-[var(--color-primary)] focus:bg-white focus:ring-2 focus:ring-[var(--color-accent-soft)]"
                />

              </div>

              {/* ================================================= */}
              {/* CATEGORY */}
              {/* ================================================= */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-[var(--color-secondary)]">
                  Category
                </label>

                <div className="relative">

                  <Layers3
                    size={17}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-light-text)]"
                  />

                  <select
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    required
                    className="h-11 w-full appearance-none rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] px-4 pl-10 text-sm text-[var(--color-body)] outline-none transition focus:border-[var(--color-primary)] focus:bg-white focus:ring-2 focus:ring-[var(--color-accent-soft)]"
                  >
                    <option value="">
                      Select category
                    </option>

                    <option value="Handmade Crafts">
                      Handmade Crafts
                    </option>

                    <option value="Pottery">
                      Pottery
                    </option>

                    <option value="Clothing">
                      Clothing
                    </option>

                    <option value="Traditional Crafts">
                      Traditional Crafts
                    </option>

                    <option value="Home Decor">
                      Home Decor
                    </option>
                  </select>

                </div>

              </div>

              {/* ================================================= */}
              {/* PRICE */}
              {/* ================================================= */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-[var(--color-secondary)]">
                  Price (₹)
                </label>

                <div className="relative">

                  <IndianRupee
                    size={17}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-primary-dark)]"
                  />

                  <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    placeholder="Enter price"
                    min="0"
                    required
                    className="h-11 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] px-4 pl-10 text-sm text-[var(--color-body)] outline-none transition placeholder:text-[var(--color-light-text)] focus:border-[var(--color-primary)] focus:bg-white focus:ring-2 focus:ring-[var(--color-accent-soft)]"
                  />

                </div>

              </div>

              {/* ================================================= */}
              {/* STOCK */}
              {/* ================================================= */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-[var(--color-secondary)]">
                  Stock
                </label>

                <div className="relative">

                  <Package
                    size={17}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-green-dark)]"
                  />

                  <input
                    type="number"
                    name="stock"
                    value={product.stock}
                    onChange={handleChange}
                    placeholder="Enter stock quantity"
                    min="0"
                    required
                    className="h-11 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] px-4 pl-10 text-sm text-[var(--color-body)] outline-none transition placeholder:text-[var(--color-light-text)] focus:border-[var(--color-primary)] focus:bg-white focus:ring-2 focus:ring-[var(--color-accent-soft)]"
                  />

                </div>

              </div>

              {/* ================================================= */}
              {/* DESCRIPTION */}
              {/* ================================================= */}

              <div className="md:col-span-2">

                <label className="mb-2 block text-sm font-semibold text-[var(--color-secondary)]">
                  Description
                </label>

                <textarea
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  placeholder="Describe your product..."
                  rows="5"
                  required
                  className="w-full resize-none rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] px-4 py-3 text-sm leading-6 text-[var(--color-body)] outline-none transition placeholder:text-[var(--color-light-text)] focus:border-[var(--color-primary)] focus:bg-white focus:ring-2 focus:ring-[var(--color-accent-soft)]"
                />

                <p className="mt-1.5 text-xs text-[var(--color-light-text)]">
                  Add useful information such as material, size,
                  design, or other important details.
                </p>

              </div>

              {/* ================================================= */}
              {/* IMAGE */}
              {/* ================================================= */}

              <div className="md:col-span-2">

                <label className="mb-2 block text-sm font-semibold text-[var(--color-secondary)]">
                  Product Image
                </label>

                <label className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[var(--color-border)] bg-[var(--color-surface-soft)] px-6 py-12 text-center transition hover:border-[var(--color-primary-light)] hover:bg-[var(--color-accent-soft)]">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-peach)] text-[var(--color-primary-dark)] transition group-hover:scale-105">
                    <ImagePlus size={28} />
                  </div>

                  <p className="mt-4 text-sm font-semibold text-[var(--color-heading)]">
                    Click to upload product image
                  </p>

                  <p className="mt-1 text-xs text-[var(--color-muted)]">
                    PNG, JPG or WEBP
                  </p>

                  <p className="mt-2 text-xs text-[var(--color-light-text)]">
                    Choose a clear image of your product.
                  </p>

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleImageChange}
                    className="hidden"
                  />

                </label>

                {/* SELECTED IMAGE */}

                {product.image && (

                  <div className="mt-3 flex items-center gap-3 rounded-xl border border-[var(--color-green-border)] bg-[var(--color-green-soft)] px-4 py-3">

                    <div className="rounded-lg bg-white p-2 text-[var(--color-green-dark)]">
                      <ImagePlus size={17} />
                    </div>

                    <div className="min-w-0">

                      <p className="text-xs font-medium text-[var(--color-muted)]">
                        Selected image
                      </p>

                      <p className="truncate text-sm font-semibold text-[var(--color-green-dark)]">
                        {product.image.name}
                      </p>

                    </div>

                  </div>

                )}

              </div>

            </div>

          </div>

          {/* ================================================= */}
          {/* BUTTONS */}
          {/* ================================================= */}

          <div className="flex flex-col-reverse gap-3 border-t border-[var(--color-border)] bg-[var(--color-surface-soft)] px-6 py-5 sm:flex-row sm:justify-end sm:px-8">

            {/* CANCEL */}

            <button
              type="button"
              onClick={() =>
                navigate("/entrepreneur/products")
              }
              className="rounded-xl border border-[var(--color-border)] bg-white px-5 py-2.5 text-sm font-semibold text-[var(--color-muted)] transition hover:bg-[var(--color-border-light)] hover:text-[var(--color-heading)]"
            >
              Cancel
            </button>

            {/* ADD PRODUCT */}

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl bg-[var(--color-green-dark)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:opacity-95"
            >
              <Plus size={18} />
              Add Product
            </button>

          </div>

        </form>

      </main>

    </div>
  );
}
