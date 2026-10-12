
import React from "react";
import { ArrowLeft, Pencil, Package, IndianRupee, Tag } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ProductView() {
  const navigate = useNavigate();
  const location = useLocation();

  const product = location.state?.product;

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-background)] px-4">
        <div className="w-full max-w-md rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center shadow-[var(--shadow-card)]">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-peach)] text-[var(--color-primary)]">
            <Package size={30} />
          </div>

          <h1 className="mt-5 text-xl font-bold text-[var(--color-heading)]">
            Product not found
          </h1>

          <p className="mt-2 text-sm text-[var(--color-muted)]">
            The product details could not be loaded.
          </p>

          <button
            onClick={() => navigate("/entrepreneur/products")}
            className="mt-6 inline-flex items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-green-dark)] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            <ArrowLeft size={17} />
            Back to My Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* Header */}
      <div className="border-b border-[var(--color-border)] bg-[var(--color-peach-light)]">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-6 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate("/entrepreneur/products")}
            className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-2.5 text-[var(--color-body)] shadow-[var(--shadow-soft)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary-dark)]"
          >
            <ArrowLeft size={20} />
          </button>

          <div>
            <p className="text-sm font-semibold text-[var(--color-primary-dark)]">
              Entrepreneur Panel
            </p>

            <h1 className="mt-1 text-2xl font-bold text-[var(--color-heading)]">
              Product Details
            </h1>

            <p className="mt-1 text-sm text-[var(--color-muted)]">
              View and manage your product information
            </p>
          </div>
        </div>
      </div>

      {/* Product */}
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-card)]">
          <div className="grid md:grid-cols-2">
            {/* Image */}
            <div className="min-h-[400px] bg-[var(--color-surface-soft)]">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full min-h-[400px] w-full object-cover"
                />
              ) : (
                <div className="flex h-full min-h-[400px] flex-col items-center justify-center text-[var(--color-light-text)]">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-peach)] text-[var(--color-primary)]">
                    <Package size={28} />
                  </div>

                  <p className="mt-3 text-sm font-medium">
                    No Image Available
                  </p>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="p-6 sm:p-8">
              {/* Category */}
              <div className="flex items-center gap-2">
                <Tag
                  size={16}
                  className="text-[var(--color-primary-dark)]"
                />

                <p className="text-sm font-semibold text-[var(--color-primary-dark)]">
                  {product.category}
                </p>
              </div>

              {/* Name */}
              <h1 className="mt-2 text-3xl font-bold leading-tight text-[var(--color-heading)]">
                {product.name}
              </h1>

              {/* Status */}
              <div className="mt-5">
                <span
                  className={`inline-flex rounded-full border px-3 py-1.5 text-sm font-semibold ${
                    product.status === "Active"
                      ? "border-[var(--color-green-border)] bg-[var(--color-green-soft)] text-[var(--color-green-dark)]"
                      : "border-[var(--color-red-border)] bg-[var(--color-red)] text-[var(--color-error)]"
                  }`}
                >
                  {product.status}
                </span>
              </div>

              {/* Price */}
              <div className="mt-7 rounded-[var(--radius-lg)] bg-[var(--color-peach)] p-5">
                <p className="text-sm font-medium text-[var(--color-primary-dark)]">
                  Price
                </p>

                <p className="mt-1 flex items-center gap-1 text-3xl font-bold text-[var(--color-primary-dark)]">
                  <IndianRupee size={25} />

                  {Number(product.price).toLocaleString("en-IN")}
                </p>
              </div>

              {/* Stock */}
              <div className="mt-5 flex items-center gap-3 rounded-[var(--radius-lg)] border border-[var(--color-blue-border)] bg-[var(--color-blue-light)] p-4">
                <div className="rounded-[var(--radius-md)] bg-white p-3 text-[var(--color-blue-dark)]">
                  <Package size={22} />
                </div>

                <div>
                  <p className="text-sm text-[var(--color-muted)]">
                    Available Stock
                  </p>

                  <p
                    className={`text-lg font-bold ${
                      Number(product.stock) > 0
                        ? "text-[var(--color-green-dark)]"
                        : "text-[var(--color-error)]"
                    }`}
                  >
                    {product.stock} units
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="mt-7">
                <h2 className="text-lg font-bold text-[var(--color-heading)]">
                  Description
                </h2>

                <div className="mt-2 rounded-[var(--radius-md)] bg-[var(--color-surface-soft)] p-4">
                  <p className="leading-7 text-[var(--color-body)]">
                    {product.description ||
                      "No description available for this product."}
                  </p>
                </div>
              </div>

              {/* Product Information */}
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[var(--radius-md)] border border-[var(--color-border-light)] bg-[var(--color-surface-soft)] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-light-text)]">
                    Product ID
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[var(--color-heading)]">
                    {product.id}
                  </p>
                </div>

                <div className="rounded-[var(--radius-md)] border border-[var(--color-border-light)] bg-[var(--color-surface-soft)] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-light-text)]">
                    Category
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[var(--color-heading)]">
                    {product.category}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() =>
                    navigate("/entrepreneur/edit-product", {
                      state: { product },
                    })
                  }
                  className="flex items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-blue-dark)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  <Pencil size={18} />
                  Edit Product
                </button>

                <button
                  onClick={() => navigate("/entrepreneur/products")}
                  className="flex items-center justify-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-3 text-sm font-semibold text-[var(--color-body)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary-dark)]"
                >
                  <ArrowLeft size={18} />
                  Back to My Products
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
