
import React from "react";
import {
  IndianRupee,
  TrendingUp,
  Users,
  BriefcaseBusiness,
  ShoppingBag,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Activity,
  Download,
} from "lucide-react";

export default function AnalyticsReports() {
  // =========================
  // DEMO DATA
  // Backend se later replace hoga
  // =========================

  const overview = {
    totalRevenue: 184500,
    totalOrders: 324,
    totalUsers: 846,
    totalEntrepreneurs: 128,
    serviceRequests: 186,
    completedRequests: 142,
    pendingRequests: 18,
    complaints: 5,
  };

  const monthlyRevenue = [
    { month: "Jan", revenue: 18500 },
    { month: "Feb", revenue: 22400 },
    { month: "Mar", revenue: 19800 },
    { month: "Apr", revenue: 27600 },
    { month: "May", revenue: 31200 },
    { month: "Jun", revenue: 28900 },
    { month: "Jul", revenue: 33800 },
    { month: "Aug", revenue: 42300 },
  ];

  const categoryData = [
    {
      category: "Tailoring",
      orders: 86,
      revenue: 48200,
    },
    {
      category: "Handmade Crafts",
      orders: 64,
      revenue: 35600,
    },
    {
      category: "Pottery",
      orders: 48,
      revenue: 26400,
    },
    {
      category: "Beauty & Wellness",
      orders: 42,
      revenue: 22100,
    },
    {
      category: "Home Services",
      orders: 38,
      revenue: 18400,
    },
    {
      category: "Cobbler",
      orders: 28,
      revenue: 13700,
    },
  ];

  const serviceStats = {
    total: overview.serviceRequests,
    completed: overview.completedRequests,
    pending: overview.pendingRequests,
    rejected:
      overview.serviceRequests -
      overview.completedRequests -
      overview.pendingRequests,
  };

  const maxRevenue = Math.max(
    ...monthlyRevenue.map((item) => item.revenue)
  );

  // =========================
  // PERCENTAGES
  // =========================

  const completionRate =
    overview.serviceRequests > 0
      ? Math.round(
          (overview.completedRequests /
            overview.serviceRequests) *
            100
        )
      : 0;

  const pendingRate =
    overview.serviceRequests > 0
      ? Math.round(
          (overview.pendingRequests /
            overview.serviceRequests) *
            100
        )
      : 0;

  const complaintRate =
    overview.totalOrders > 0
      ? (
          (overview.complaints /
            overview.totalOrders) *
          100
        ).toFixed(1)
      : 0;

  // =========================
  // EXPORT CSV
  // =========================

  const exportCSV = () => {
    const rows = [];

    // Overview
    rows.push(["HUNARHUB ANALYTICS REPORT"]);
    rows.push([]);
    rows.push(["Overview"]);
    rows.push(["Metric", "Value"]);

    rows.push([
      "Total Revenue",
      `₹${overview.totalRevenue}`,
    ]);

    rows.push([
      "Total Orders",
      overview.totalOrders,
    ]);

    rows.push([
      "Active Users",
      overview.totalUsers,
    ]);

    rows.push([
      "Entrepreneurs",
      overview.totalEntrepreneurs,
    ]);

    rows.push([
      "Service Requests",
      overview.serviceRequests,
    ]);

    rows.push([
      "Completed Requests",
      overview.completedRequests,
    ]);

    rows.push([
      "Pending Requests",
      overview.pendingRequests,
    ]);

    rows.push([
      "Complaints",
      overview.complaints,
    ]);

    rows.push([
      "Request Completion Rate",
      `${completionRate}%`,
    ]);

    rows.push([
      "Complaint Rate",
      `${complaintRate}%`,
    ]);

    // Monthly Revenue
    rows.push([]);
    rows.push(["Monthly Revenue"]);
    rows.push(["Month", "Revenue"]);

    monthlyRevenue.forEach((item) => {
      rows.push([
        item.month,
        `₹${item.revenue}`,
      ]);
    });

    // Category Performance
    rows.push([]);
    rows.push(["Category Performance"]);
    rows.push([
      "Category",
      "Orders",
      "Revenue",
      "Revenue Percentage",
    ]);

    categoryData.forEach((item) => {
      const percentage = Math.round(
        (item.revenue /
          overview.totalRevenue) *
          100
      );

      rows.push([
        item.category,
        item.orders,
        `₹${item.revenue}`,
        `${percentage}%`,
      ]);
    });

    // Service Requests
    rows.push([]);
    rows.push(["Service Request Performance"]);
    rows.push(["Status", "Count"]);

    rows.push([
      "Total Requests",
      serviceStats.total,
    ]);

    rows.push([
      "Completed",
      serviceStats.completed,
    ]);

    rows.push([
      "Pending",
      serviceStats.pending,
    ]);

    rows.push([
      "Rejected",
      serviceStats.rejected,
    ]);

    // Convert rows to CSV
    const csvContent = rows
      .map((row) =>
        row
          .map((cell) => {
            const value = String(cell ?? "");

            return `"${value.replace(/"/g, '""')}"`;
          })
          .join(",")
      )
      .join("\n");

    // BOM for Excel Unicode support
    const BOM = "\uFEFF";

    const blob = new Blob(
      [BOM + csvContent],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `hunarhub-analytics-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor:
          "var(--color-background)",
      }}
    >
      {/* ================= HEADER ================= */}

      <div
        className="border-b bg-white"
        style={{
          borderColor:
            "var(--color-border-light)",
        }}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <span
              className="inline-flex rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider"
              style={{
                backgroundColor:
                  "var(--color-peach)",
                color:
                  "var(--color-primary-dark)",
              }}
            >
              Admin Panel
            </span>

            <h1
              className="mt-3 text-2xl font-bold sm:text-3xl"
              style={{
                color:
                  "var(--color-heading)",
              }}
            >
              Analytics & Reports
            </h1>

            <p
              className="mt-1 text-sm"
              style={{
                color:
                  "var(--color-muted)",
              }}
            >
              Monitor HunarHub performance,
              revenue, users, orders and service
              activity.
            </p>
          </div>

          {/* EXPORT BUTTON */}

          <button
            type="button"
            onClick={exportCSV}
            className="inline-flex w-fit items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
            style={{
              backgroundColor:
                "var(--color-green-dark)",
              boxShadow:
                "0 7px 20px rgba(77, 122, 69, 0.16)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                "#3F6839";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor =
                "var(--color-green-dark)";
            }}
          >
            <Download size={18} />
            Export CSV
          </button>
        </div>
      </div>

      {/* ================= MAIN ================= */}

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* ================= OVERVIEW ================= */}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {/* Revenue */}

          <div
            className="rounded-2xl border bg-white p-5 transition-all duration-200 hover:-translate-y-1"
            style={{
              borderColor:
                "var(--color-border-light)",
              boxShadow:
                "var(--shadow-soft)",
            }}
          >
            <div className="flex items-center justify-between">
              <div
                className="rounded-xl p-3"
                style={{
                  backgroundColor:
                    "var(--color-peach)",
                  color:
                    "var(--color-primary)",
                }}
              >
                <IndianRupee size={22} />
              </div>

              <div
                className="flex items-center gap-1 text-xs font-semibold"
                style={{
                  color:
                    "var(--color-success)",
                }}
              >
                <TrendingUp size={15} />
                12.5%
              </div>
            </div>

            <p
              className="mt-4 text-sm"
              style={{
                color:
                  "var(--color-muted)",
              }}
            >
              Total Revenue
            </p>

            <p
              className="mt-1 text-2xl font-bold"
              style={{
                color:
                  "var(--color-heading)",
              }}
            >
              ₹
              {overview.totalRevenue.toLocaleString(
                "en-IN"
              )}
            </p>

            <p
              className="mt-2 text-xs"
              style={{
                color:
                  "var(--color-light-text)",
              }}
            >
              Compared with previous period
            </p>
          </div>

          {/* Orders */}

          <div
            className="rounded-2xl border bg-white p-5 transition-all duration-200 hover:-translate-y-1"
            style={{
              borderColor:
                "var(--color-border-light)",
              boxShadow:
                "var(--shadow-soft)",
            }}
          >
            <div className="flex items-center justify-between">
              <div
                className="rounded-xl p-3"
                style={{
                  backgroundColor:
                    "#C6BEEE",
                  color: "#665A9E",
                }}
              >
                <ShoppingBag size={22} />
              </div>

              <TrendingUp
                size={18}
                style={{
                  color:
                    "var(--color-success)",
                }}
              />
            </div>

            <p
              className="mt-4 text-sm"
              style={{
                color:
                  "var(--color-muted)",
              }}
            >
              Total Orders
            </p>

            <p
              className="mt-1 text-2xl font-bold"
              style={{
                color:
                  "var(--color-heading)",
              }}
            >
              {overview.totalOrders}
            </p>

            <p
              className="mt-2 text-xs"
              style={{
                color:
                  "var(--color-light-text)",
              }}
            >
              Marketplace orders
            </p>
          </div>

          {/* Users */}

          <div
            className="rounded-2xl border bg-white p-5 transition-all duration-200 hover:-translate-y-1"
            style={{
              borderColor:
                "var(--color-border-light)",
              boxShadow:
                "var(--shadow-soft)",
            }}
          >
            <div
              className="w-fit rounded-xl p-3"
              style={{
                backgroundColor:
                  "var(--color-green)",
                color:
                  "var(--color-green-dark)",
              }}
            >
              <Users size={22} />
            </div>

            <p
              className="mt-4 text-sm"
              style={{
                color:
                  "var(--color-muted)",
              }}
            >
              Active Users
            </p>

            <p
              className="mt-1 text-2xl font-bold"
              style={{
                color:
                  "var(--color-heading)",
              }}
            >
              {overview.totalUsers}
            </p>

            <p
              className="mt-2 text-xs"
              style={{
                color:
                  "var(--color-light-text)",
              }}
            >
              Registered customers
            </p>
          </div>

          {/* Entrepreneurs */}

          <div
            className="rounded-2xl border bg-white p-5 transition-all duration-200 hover:-translate-y-1"
            style={{
              borderColor:
                "var(--color-border-light)",
              boxShadow:
                "var(--shadow-soft)",
            }}
          >
            <div
              className="w-fit rounded-xl p-3"
              style={{
                backgroundColor:
                  "#EAF2FF",
                color: "#5B7DB1",
              }}
            >
              <BriefcaseBusiness size={22} />
            </div>

            <p
              className="mt-4 text-sm"
              style={{
                color:
                  "var(--color-muted)",
              }}
            >
              Entrepreneurs
            </p>

            <p
              className="mt-1 text-2xl font-bold"
              style={{
                color:
                  "var(--color-heading)",
              }}
            >
              {overview.totalEntrepreneurs}
            </p>

            <p
              className="mt-2 text-xs"
              style={{
                color:
                  "var(--color-light-text)",
              }}
            >
              Registered entrepreneurs
            </p>
          </div>
        </div>

        {/* ================= REVENUE CHART ================= */}

        <section
          className="mt-8 rounded-2xl border bg-white p-6"
          style={{
            borderColor:
              "var(--color-border-light)",
            boxShadow:
              "var(--shadow-soft)",
          }}
        >
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2
                className="text-lg font-bold"
                style={{
                  color:
                    "var(--color-heading)",
                }}
              >
                Revenue Overview
              </h2>

              <p
                className="mt-1 text-sm"
                style={{
                  color:
                    "var(--color-muted)",
                }}
              >
                Monthly platform revenue
                performance.
              </p>
            </div>

            <div
              className="flex items-center gap-2 text-sm font-semibold"
              style={{
                color: "#5B7DB1",
              }}
            >
              <Activity size={17} />
              2026
            </div>
          </div>

          <div
            className="mt-8 flex h-72 items-end gap-3 overflow-x-auto border-b px-2 pb-0"
            style={{
              borderColor:
                "var(--color-border)",
            }}
          >
            {monthlyRevenue.map((item) => {
              const height =
                (item.revenue /
                  maxRevenue) *
                100;

              return (
                <div
                  key={item.month}
                  className="flex h-full min-w-[55px] flex-1 flex-col items-center justify-end"
                >
                  <div
                    className="mb-2 text-xs font-semibold"
                    style={{
                      color:
                        "var(--color-body)",
                    }}
                  >
                    ₹
                    {(
                      item.revenue / 1000
                    ).toFixed(1)}
                    k
                  </div>

                  <div
                    className="w-full max-w-11 rounded-t-lg transition-all duration-300 hover:opacity-80"
                    style={{
                      height: `${height}%`,
                      backgroundColor:
                        "var(--color-primary)",
                    }}
                    title={`₹${item.revenue.toLocaleString(
                      "en-IN"
                    )}`}
                  />

                  <p
                    className="mt-3 text-xs font-medium"
                    style={{
                      color:
                        "var(--color-muted)",
                    }}
                  >
                    {item.month}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================= CATEGORY PERFORMANCE ================= */}

        <section
          className="mt-8 overflow-hidden rounded-2xl border bg-white"
          style={{
            borderColor:
              "var(--color-border-light)",
            boxShadow:
              "var(--shadow-soft)",
          }}
        >
          <div
            className="border-b p-6"
            style={{
              borderColor:
                "var(--color-border-light)",
            }}
          >
            <h2
              className="text-lg font-bold"
              style={{
                color:
                  "var(--color-heading)",
              }}
            >
              Category Performance
            </h2>

            <p
              className="mt-1 text-sm"
              style={{
                color:
                  "var(--color-muted)",
              }}
            >
              Orders and revenue generated by
              category.
            </p>
          </div>

          <div>
            {categoryData.map((item, index) => {
              const percentage =
                Math.round(
                  (item.revenue /
                    overview.totalRevenue) *
                    100
                );

              return (
                <div
                  key={item.category}
                  className="p-5"
                  style={{
                    borderBottom:
                      index !==
                      categoryData.length - 1
                        ? "1px solid var(--color-border-light)"
                        : "none",
                  }}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold"
                        style={{
                          backgroundColor:
                            index % 2 === 0
                              ? "var(--color-peach)"
                              : "var(--color-green)",
                          color:
                            index % 2 === 0
                              ? "var(--color-primary-dark)"
                              : "var(--color-green-dark)",
                        }}
                      >
                        {index + 1}
                      </div>

                      <div>
                        <h3
                          className="font-semibold"
                          style={{
                            color:
                              "var(--color-heading)",
                          }}
                        >
                          {item.category}
                        </h3>

                        <p
                          className="mt-1 text-xs"
                          style={{
                            color:
                              "var(--color-muted)",
                          }}
                        >
                          {item.orders} orders
                        </p>
                      </div>
                    </div>

                    <div className="text-left sm:text-right">
                      <p
                        className="font-bold"
                        style={{
                          color:
                            "var(--color-heading)",
                        }}
                      >
                        ₹
                        {item.revenue.toLocaleString(
                          "en-IN"
                        )}
                      </p>

                      <p
                        className="text-xs"
                        style={{
                          color:
                            "var(--color-muted)",
                        }}
                      >
                        {percentage}% of revenue
                      </p>
                    </div>
                  </div>

                  <div
                    className="mt-3 h-2 overflow-hidden rounded-full"
                    style={{
                      backgroundColor:
                        "var(--color-border-light)",
                    }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.min(
                          percentage * 2.5,
                          100
                        )}%`,
                        backgroundColor:
                          index % 2 === 0
                            ? "var(--color-primary)"
                            : "var(--color-green-dark)",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================= SERVICE ANALYTICS ================= */}

        <section className="mt-8 grid gap-6 lg:grid-cols-2">

          {/* Service Requests */}

          <div
            className="rounded-2xl border bg-white p-6"
            style={{
              borderColor:
                "var(--color-border-light)",
              boxShadow:
                "var(--shadow-soft)",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="rounded-xl p-3"
                style={{
                  backgroundColor:
                    "#EAF2FF",
                  color: "#5B7DB1",
                }}
              >
                <BriefcaseBusiness size={22} />
              </div>

              <div>
                <h2
                  className="font-bold"
                  style={{
                    color:
                      "var(--color-heading)",
                  }}
                >
                  Service Requests
                </h2>

                <p
                  className="text-sm"
                  style={{
                    color:
                      "var(--color-muted)",
                  }}
                >
                  Current service request
                  performance.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-5">

              <div>
                <div className="flex justify-between text-sm">
                  <span
                    style={{
                      color:
                        "var(--color-muted)",
                    }}
                  >
                    Total Requests
                  </span>

                  <span
                    className="font-semibold"
                    style={{
                      color:
                        "var(--color-heading)",
                    }}
                  >
                    {serviceStats.total}
                  </span>
                </div>

                <div
                  className="mt-2 h-2 rounded-full"
                  style={{
                    backgroundColor:
                      "var(--color-border-light)",
                  }}
                >
                  <div
                    className="h-full w-full rounded-full"
                    style={{
                      backgroundColor:
                        "#5B7DB1",
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm">
                  <span
                    style={{
                      color:
                        "var(--color-muted)",
                    }}
                  >
                    Completed
                  </span>

                  <span
                    className="font-semibold"
                    style={{
                      color:
                        "var(--color-success)",
                    }}
                  >
                    {serviceStats.completed}
                  </span>
                </div>

                <div
                  className="mt-2 h-2 rounded-full"
                  style={{
                    backgroundColor:
                      "var(--color-border-light)",
                  }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${completionRate}%`,
                      backgroundColor:
                        "var(--color-success)",
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm">
                  <span
                    style={{
                      color:
                        "var(--color-muted)",
                    }}
                  >
                    Pending
                  </span>

                  <span
                    className="font-semibold"
                    style={{
                      color: "#C58A25",
                    }}
                  >
                    {serviceStats.pending}
                  </span>
                </div>

                <div
                  className="mt-2 h-2 rounded-full"
                  style={{
                    backgroundColor:
                      "var(--color-border-light)",
                  }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${pendingRate}%`,
                      backgroundColor:
                        "#C58A25",
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm">
                  <span
                    style={{
                      color:
                        "var(--color-muted)",
                    }}
                  >
                    Rejected
                  </span>

                  <span
                    className="font-semibold"
                    style={{
                      color:
                        "var(--color-error)",
                    }}
                  >
                    {serviceStats.rejected}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Summary */}

          <div
            className="rounded-2xl border bg-white p-6"
            style={{
              borderColor:
                "var(--color-border-light)",
              boxShadow:
                "var(--shadow-soft)",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="rounded-xl p-3"
                style={{
                  backgroundColor:
                    "var(--color-green)",
                  color:
                    "var(--color-green-dark)",
                }}
              >
                <BarChart3 size={22} />
              </div>

              <div>
                <h2
                  className="font-bold"
                  style={{
                    color:
                      "var(--color-heading)",
                  }}
                >
                  Performance Summary
                </h2>

                <p
                  className="text-sm"
                  style={{
                    color:
                      "var(--color-muted)",
                  }}
                >
                  Key platform performance
                  indicators.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">

              <div
                className="rounded-2xl border p-4"
                style={{
                  backgroundColor:
                    "var(--color-green)",
                  borderColor:
                    "var(--color-green-border)",
                }}
              >
                <CheckCircle
                  size={21}
                  style={{
                    color:
                      "var(--color-success)",
                  }}
                />

                <p
                  className="mt-3 text-sm"
                  style={{
                    color:
                      "var(--color-green-dark)",
                  }}
                >
                  Request Completion
                </p>

                <p
                  className="mt-1 text-2xl font-bold"
                  style={{
                    color:
                      "var(--color-green-dark)",
                  }}
                >
                  {completionRate}%
                </p>
              </div>

              <div
                className="rounded-2xl border p-4"
                style={{
                  backgroundColor:
                    "#FDEAEA",
                  borderColor: "#F2CCCC",
                }}
              >
                <AlertCircle
                  size={21}
                  style={{
                    color:
                      "var(--color-error)",
                  }}
                />

                <p
                  className="mt-3 text-sm"
                  style={{
                    color: "#A94444",
                  }}
                >
                  Complaint Rate
                </p>

                <p
                  className="mt-1 text-2xl font-bold"
                  style={{
                    color: "#873838",
                  }}
                >
                  {complaintRate}%
                </p>
              </div>

              <div
                className="rounded-2xl border p-4"
                style={{
                  backgroundColor:
                    "#C6BEEE",
                  borderColor: "#B5AADF",
                }}
              >
                <ShoppingBag
                  size={21}
                  style={{
                    color: "#665A9E",
                  }}
                />

                <p
                  className="mt-3 text-sm"
                  style={{
                    color: "#665A9E",
                  }}
                >
                  Total Orders
                </p>

                <p
                  className="mt-1 text-2xl font-bold"
                  style={{
                    color: "#554B87",
                  }}
                >
                  {overview.totalOrders}
                </p>
              </div>

              <div
                className="rounded-2xl border p-4"
                style={{
                  backgroundColor:
                    "#EAF2FF",
                  borderColor: "#D4E1F5",
                }}
              >
                <BriefcaseBusiness
                  size={21}
                  style={{
                    color: "#5B7DB1",
                  }}
                />

                <p
                  className="mt-3 text-sm"
                  style={{
                    color: "#5B7DB1",
                  }}
                >
                  Entrepreneurs
                </p>

                <p
                  className="mt-1 text-2xl font-bold"
                  style={{
                    color: "#405E88",
                  }}
                >
                  {overview.totalEntrepreneurs}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= PLATFORM PERFORMANCE ================= */}

        <section
          className="mt-8 rounded-2xl border p-6"
          style={{
            backgroundColor: "#EAF2FF",
            borderColor: "#D4E1F5",
          }}
        >
          <div className="flex items-start gap-4">
            <div
              className="rounded-xl p-3"
              style={{
                backgroundColor: "#D9E7FA",
                color: "#5B7DB1",
              }}
            >
              <TrendingUp size={23} />
            </div>

            <div>
              <h3
                className="font-bold"
                style={{
                  color: "#405E88",
                }}
              >
                Platform Performance
              </h3>

              <p
                className="mt-1 text-sm leading-6"
                style={{
                  color: "#4F6687",
                }}
              >
                HunarHub currently shows steady
                growth across entrepreneurs,
                customer activity, marketplace
                orders and service requests. These
                analytics will automatically reflect
                live platform data once the backend
                APIs and database are connected.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}