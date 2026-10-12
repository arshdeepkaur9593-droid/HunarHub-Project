import { CheckCircle, Home, CalendarDays, Clock } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

function BookingSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  const booking = location.state?.booking;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center">
        <div className="w-full rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-10">
          {/* Success Icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle size={48} className="text-green-600" />
          </div>

          {/* Heading */}
          <h1 className="mt-6 text-3xl font-bold text-slate-900">
            Booking Successful!
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
            Your service booking request has been submitted successfully. The
            service provider will contact you for confirmation.
          </p>

          {/* Booking Details */}
          {booking && (
            <div className="mt-8 rounded-2xl bg-slate-50 p-5 text-left">
              <h2 className="text-lg font-bold text-slate-900">
                Booking Details
              </h2>

              <div className="mt-5 space-y-4">
                {/* Service */}
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Service
                  </p>

                  <p className="mt-1 font-semibold text-slate-800">
                    {booking.serviceName}
                  </p>
                </div>

                {/* Date */}
                <div className="flex items-center gap-3">
                  <CalendarDays size={20} className="text-indigo-600" />

                  <div>
                    <p className="text-xs text-slate-400">Date</p>

                    <p className="text-sm font-semibold text-slate-700">
                      {booking.date}
                    </p>
                  </div>
                </div>

                {/* Time */}
                <div className="flex items-center gap-3">
                  <Clock size={20} className="text-indigo-600" />

                  <div>
                    <p className="text-xs text-slate-400">Time</p>

                    <p className="text-sm font-semibold text-slate-700">
                      {booking.time}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div className="border-t border-slate-200 pt-4">
                  <p className="text-xs text-slate-400">Service Price</p>

                  <p className="mt-1 text-xl font-bold text-indigo-600">
                    ₹{booking.price}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
            >
              <Home size={18} />
              Back to Home
            </button>

            <button
              type="button"
              onClick={() => navigate("/services")}
              className="rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Explore More Services
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default BookingSuccess;
