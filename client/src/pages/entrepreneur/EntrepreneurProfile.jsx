import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  BriefcaseBusiness,
  Clock3,
  Pencil,
  Save,
  X,
  IndianRupee,
  CalendarDays,
  Sparkles,
  LoaderCircle,
  Store,
} from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/users";

const emptyProfile = {
  name: "",
  email: "",
  phone: "",
  age: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  businessName: "",
  location: "",
  skill: "",
  experience: "",
  bio: "",
  services: [],
  servicesText: "",
  priceRange: "",
  availability: "Not set",
  workingHours: "",
  status: "Pending",
};

const getProfileData = (user = {}, entrepreneur = {}) => {
  const days = entrepreneur.availability?.days;

  const availability = days
    ? Object.entries(days)
        .filter(([, enabled]) => enabled)
        .map(([day]) => day.charAt(0).toUpperCase() + day.slice(1))
        .join(", ")
    : "";

  const services = Array.isArray(entrepreneur.services)
    ? entrepreneur.services
    : [];

  return {
    name: user.name || entrepreneur.ownerName || "",
    email: user.email || entrepreneur.email || "",
    phone: user.phone || entrepreneur.phone || "",
    age: user.age ?? entrepreneur.age ?? "",
    address: user.address || entrepreneur.address || "",
    city: user.city || entrepreneur.city || "",
    state: user.state || entrepreneur.state || "",
    pincode: user.pincode || entrepreneur.pincode || "",
    businessName: entrepreneur.businessName || "",
    location: entrepreneur.location || "",
    skill:
      entrepreneur.skill ||
      entrepreneur.category ||
      entrepreneur.skills?.join(", ") ||
      "",
    experience: entrepreneur.experience || "",
    bio: entrepreneur.bio || entrepreneur.description || "",
    services,
    servicesText: services.join(", "),
    priceRange: entrepreneur.priceRange || "",
    availability: availability || "Not set",
    workingHours: entrepreneur.workingHours || "",
    status: entrepreneur.status || "Pending",
  };
};

async function readResponse(response) {
  const result = await response.json().catch(() => ({}));

  if (!response.ok || result.success === false) {
    throw new Error(result.message || result.error || "Something went wrong.");
  }

  return result.data ?? result;
}

export default function EntrepreneurProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(emptyProfile);
  const [savedProfile, setSavedProfile] = useState(emptyProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const inputClass =
    "w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-soft)] px-4 py-3 text-sm text-[var(--color-body)] outline-none transition focus:border-[var(--color-primary-light)] focus:bg-white focus:ring-2 focus:ring-[var(--color-accent-soft)]";

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/me`, {
          method: "GET",
          credentials: "include",
        });

        const data = await readResponse(response);
        const nextProfile = getProfileData(data.user, data.entrepreneur);

        setProfile(nextProfile);
        setSavedProfile(nextProfile);
      } catch (err) {
        setError(
          err.message || "Unable to load your profile. Please log in again.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProfile((previous) => {
      if (name === "servicesText") {
        return {
          ...previous,
          servicesText: value,
          services: value
            .split(",")
            .map((service) => service.trim())
            .filter(Boolean),
        };
      }

      return {
        ...previous,
        [name]: value,
      };
    });
  };

  const handleEdit = () => {
    setError("");
    setSuccess("");
    setIsEditing(true);
  };

  const handleCancel = () => {
    setProfile(savedProfile);
    setIsEditing(false);
    setError("");
    setSuccess("");
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const payload = {
        name: profile.name.trim(),
        email: profile.email.trim(),
        phone: profile.phone.trim(),
        age: profile.age === "" ? null : Number(profile.age),
        address: profile.address.trim(),
        city: profile.city.trim(),
        state: profile.state.trim(),
        pincode: profile.pincode.trim(),
        businessName: profile.businessName.trim(),
        location: profile.location.trim(),
        skill: profile.skill.trim(),
        experience: profile.experience.trim(),
        bio: profile.bio.trim(),
        services: profile.services,
        priceRange: profile.priceRange.trim(),
        workingHours: profile.workingHours.trim(),
      };

      const response = await fetch(`${API_URL}/entrepreneur/profile`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await readResponse(response);

      const updatedProfile = getProfileData(data.user, data.entrepreneur);

      setProfile(updatedProfile);
      setSavedProfile(updatedProfile);
      setIsEditing(false);
      setSuccess("Your profile has been updated successfully.");
    } catch (err) {
      setError(err.message || "Unable to save your profile.");
    } finally {
      setSaving(false);
    }
  };

  const statusClass =
    profile.status === "Approved"
      ? "border border-[var(--color-green-border)] bg-[var(--color-green-soft)] text-[var(--color-green-dark)]"
      : "border border-[var(--color-border)] bg-[var(--color-surface-soft)] text-[var(--color-body)]";

  const Field = ({
    label,
    name,
    value,
    icon: Icon,
    type = "text",
    placeholder = "",
  }) => (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-semibold text-[var(--color-secondary)]"
      >
        {label}
      </label>

      {isEditing ? (
        <input
          id={name}
          type={type}
          name={name}
          value={value ?? ""}
          onChange={handleChange}
          placeholder={placeholder}
          className={inputClass}
        />
      ) : (
        <div className="flex min-h-[46px] items-center gap-3 rounded-[var(--radius-md)] border border-[var(--color-border-light)] bg-[var(--color-surface-soft)] px-4 py-3 text-sm text-[var(--color-body)]">
          {Icon && (
            <Icon size={18} className="shrink-0 text-[var(--color-primary)]" />
          )}
          <span className="break-words">
            {value !== "" && value !== null && value !== undefined
              ? value
              : "Not provided"}
          </span>
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-background)]">
        <div className="flex items-center gap-3 text-sm font-medium text-[var(--color-primary)]">
          <LoaderCircle size={22} className="animate-spin" />
          Loading your profile...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <div className="border-b border-[var(--color-border)] bg-[var(--color-peach-light)]">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 px-4 py-6 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] bg-white text-[var(--color-primary)] shadow-sm">
                <Store size={18} />
              </div>

              <p className="text-sm font-semibold text-[var(--color-primary-dark)]">
                Entrepreneur Panel
              </p>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-[var(--color-heading)] sm:text-3xl">
              My Profile
            </h1>

            <p className="mt-1 text-sm text-[var(--color-muted)]">
              Manage your personal details and business information.
            </p>
          </div>

          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="flex items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-blue)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[var(--color-blue-dark)] hover:shadow-md"
            >
              <Pencil size={17} />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                disabled={saving}
                className="flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white px-4 py-2.5 text-sm font-semibold text-[var(--color-body)] transition hover:bg-[var(--color-surface-soft)] disabled:opacity-60"
              >
                <X size={17} />
                Cancel
              </button>

              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-green-dark)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  <LoaderCircle size={17} className="animate-spin" />
                ) : (
                  <Save size={17} />
                )}
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          )}
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {error && (
          <div
            role="alert"
            className="mb-6 rounded-[var(--radius-md)] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        {success && (
          <div
            role="status"
            className="mb-6 rounded-[var(--radius-md)] border border-[var(--color-green-border)] bg-[var(--color-green-soft)] px-4 py-3 text-sm text-[var(--color-green-dark)]"
          >
            {success}
          </div>
        )}

        <section className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-card)]">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-[var(--color-accent-soft)] bg-[var(--color-peach-light)] text-[var(--color-primary)]">
              <Store size={48} strokeWidth={1.7} />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl font-bold text-[var(--color-heading)]">
                  {profile.name || "Entrepreneur"}
                </h2>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass}`}
                >
                  {profile.status}
                </span>
              </div>

              <p className="mt-1 text-sm font-semibold text-[var(--color-heading)]">
                {profile.businessName || "Add your business name"}
              </p>

              <p className="mt-1 text-sm font-semibold text-[var(--color-primary)]">
                {profile.skill || "Add your primary skill"}
              </p>

              <div className="mt-3 flex flex-wrap gap-4 text-sm text-[var(--color-muted)]">
                <span className="flex items-center gap-1.5">
                  <MapPin size={16} className="text-[var(--color-blue)]" />
                  {profile.location ||
                    [profile.city, profile.state].filter(Boolean).join(", ") ||
                    "Location not provided"}
                </span>

                <span className="flex items-center gap-1.5">
                  <BriefcaseBusiness
                    size={16}
                    className="text-[var(--color-green-dark)]"
                  />
                  {profile.experience || "Experience not provided"}
                  {profile.experience ? " experience" : ""}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-soft)]">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-blue-light)] text-[var(--color-blue)]">
              <User size={19} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-[var(--color-heading)]">
                Personal Information
              </h2>
              <p className="mt-0.5 text-sm text-[var(--color-muted)]">
                Your basic contact and personal details.
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Field
              label="Full Name"
              name="name"
              value={profile.name}
              icon={User}
            />

            <Field
              label="Email Address"
              name="email"
              value={profile.email}
              icon={Mail}
              type="email"
            />

            <Field
              label="Phone Number"
              name="phone"
              value={profile.phone}
              icon={Phone}
            />

            <Field
              label="Age"
              name="age"
              value={profile.age}
              icon={CalendarDays}
              type="number"
              placeholder="Enter your age"
            />

            <Field
              label="Street Address"
              name="address"
              value={profile.address}
              icon={MapPin}
              placeholder="Enter your street address"
            />

            <Field
              label="City"
              name="city"
              value={profile.city}
              icon={MapPin}
              placeholder="Enter your city"
            />

            <Field
              label="State"
              name="state"
              value={profile.state}
              icon={MapPin}
              placeholder="Enter your state"
            />

            <Field
              label="PIN Code"
              name="pincode"
              value={profile.pincode}
              icon={MapPin}
              placeholder="Enter your PIN code"
            />
          </div>

          <p className="mt-4 text-xs text-[var(--color-muted)]">
            Email address is shown from your account details.
          </p>
        </section>

        <section className="mt-6 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-soft)]">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-accent-soft)] text-[var(--color-primary)]">
              <Store size={19} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-[var(--color-heading)]">
                Business Information
              </h2>
              <p className="mt-0.5 text-sm text-[var(--color-muted)]">
                Introduce your business to HunarHub customers.
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Field
              label="Business / Company Name"
              name="businessName"
              value={profile.businessName}
              icon={Store}
              placeholder="Enter your business name"
            />

            <Field
              label="Business Location"
              name="location"
              value={profile.location}
              icon={MapPin}
              placeholder="Enter your business location"
            />

            <Field
              label="Business Category / Primary Skill"
              name="skill"
              value={profile.skill}
              icon={Sparkles}
              placeholder="e.g. Tailoring, Pottery, Handicrafts"
            />

            <Field
              label="Experience"
              name="experience"
              value={profile.experience}
              icon={BriefcaseBusiness}
              placeholder="e.g. 3 years"
            />
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-semibold text-[var(--color-secondary)]">
              Business Description
            </label>

            {isEditing ? (
              <textarea
                name="bio"
                rows={5}
                value={profile.bio}
                onChange={handleChange}
                placeholder="Describe your business, skills, and experience..."
                className={`${inputClass} resize-y`}
              />
            ) : (
              <p className="whitespace-pre-wrap rounded-[var(--radius-md)] border border-[var(--color-border-light)] bg-[var(--color-surface-soft)] px-4 py-4 text-sm leading-6 text-[var(--color-body)]">
                {profile.bio || "No business description added yet."}
              </p>
            )}
          </div>
        </section>

        <section className="mt-6 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-soft)]">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-accent-soft)] text-[var(--color-primary)]">
              <Sparkles size={19} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-[var(--color-heading)]">
                Services Offered
              </h2>
              <p className="mt-0.5 text-sm text-[var(--color-muted)]">
                Add the services your business provides.
              </p>
            </div>
          </div>

          {isEditing && (
            <div className="mb-5">
              <label
                htmlFor="servicesText"
                className="mb-2 block text-sm font-semibold text-[var(--color-secondary)]"
              >
                Your Services
              </label>

              <textarea
                id="servicesText"
                name="servicesText"
                rows={3}
                value={profile.servicesText}
                onChange={handleChange}
                placeholder="Custom Stitching, Dress Alteration, Handmade Crafts"
                className={`${inputClass} resize-y`}
              />

              <p className="mt-2 text-xs text-[var(--color-muted)]">
                Separate each service with a comma.
              </p>
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            {profile.services.length > 0 ? (
              profile.services.map((service, index) => (
                <span
                  key={`${service}-${index}`}
                  className="rounded-full border border-[var(--color-blue-border)] bg-[var(--color-blue-light)] px-4 py-2 text-sm font-medium text-[var(--color-blue-dark)]"
                >
                  {service}
                </span>
              ))
            ) : (
              <p className="text-sm text-[var(--color-muted)]">
                No services added yet.
              </p>
            )}
          </div>
        </section>

        <section className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-soft)]">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-accent-soft)] text-[var(--color-primary)]">
                <IndianRupee size={19} />
              </div>

              <div>
                <h2 className="text-lg font-bold text-[var(--color-heading)]">
                  Pricing Details
                </h2>
                <p className="mt-0.5 text-sm text-[var(--color-muted)]">
                  Set your typical service price range.
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-[var(--radius-lg)] border border-[var(--color-border-light)] bg-[var(--color-surface-soft)] p-5">
              <label
                htmlFor="priceRange"
                className="text-sm font-medium text-[var(--color-muted)]"
              >
                Price Range
              </label>

              {isEditing ? (
                <input
                  id="priceRange"
                  type="text"
                  name="priceRange"
                  value={profile.priceRange}
                  onChange={handleChange}
                  placeholder="e.g. ₹300 - ₹2,500"
                  className={`${inputClass} mt-2`}
                />
              ) : (
                <p className="mt-1 text-2xl font-bold text-[var(--color-primary)]">
                  {profile.priceRange || "Not provided"}
                </p>
              )}
            </div>
          </div>

          <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-soft)]">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-green-soft)] text-[var(--color-green-dark)]">
                <Clock3 size={19} />
              </div>

              <div>
                <h2 className="text-lg font-bold text-[var(--color-heading)]">
                  Availability
                </h2>
                <p className="mt-0.5 text-sm text-[var(--color-muted)]">
                  Set your business working hours.
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-[var(--radius-lg)] border border-[var(--color-green-border)] bg-[var(--color-green-soft)] p-4">
              <div className="flex items-start gap-3">
                <CalendarDays
                  size={20}
                  className="mt-1 shrink-0 text-[var(--color-green-dark)]"
                />

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-[var(--color-heading)]">
                    {profile.availability}
                  </p>

                  {isEditing ? (
                    <input
                      type="text"
                      name="workingHours"
                      value={profile.workingHours}
                      onChange={handleChange}
                      placeholder="e.g. 10:00 AM - 7:00 PM"
                      className={`${inputClass} mt-3`}
                    />
                  ) : (
                    <p className="mt-1 text-xs text-[var(--color-muted)]">
                      {profile.workingHours || "Working hours not set"}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-[var(--radius-xl)] border border-[var(--color-green-border)] bg-[var(--color-green-soft)] p-5 shadow-[var(--shadow-soft)]">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[var(--color-green-dark)] shadow-sm">
              <Store size={18} />
            </div>

            <div>
              <h3 className="font-semibold text-[var(--color-heading)]">
                Business Profile Status
              </h3>

              <p className="mt-1 text-sm leading-6 text-[var(--color-body)]">
                Keep your business name, skills, services, pricing, and location
                updated so customers can make informed decisions. Your current
                account status is {profile.status}.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
