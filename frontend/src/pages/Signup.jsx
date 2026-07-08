import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Spinner = () => (
  <svg
    className="animate-spin h-5 w-5"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C6.477 0 2 4.477 2 10h2z"
    />
  </svg>
);

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      const res = await API.post("/auth/register", formData);

      localStorage.setItem("token", res.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      toast.success("Signup Successful");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      toast.error("Signup Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-[350px]"
      >

        <h1 className="text-3xl font-bold mb-6 text-center">
          Signup
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          disabled={loading}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded disabled:bg-gray-100 disabled:cursor-not-allowed"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          disabled={loading}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded disabled:bg-gray-100 disabled:cursor-not-allowed"
          required
        />

        <input
          type="text"
          name="phoneNumber"
          placeholder="+919876543210"
          value={formData.phoneNumber}
          disabled={loading}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded disabled:bg-gray-100 disabled:cursor-not-allowed"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          disabled={loading}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded disabled:bg-gray-100 disabled:cursor-not-allowed"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full h-12 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
            loading
              ? "bg-blue-400 opacity-80 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 active:scale-95"
          }`}
        >
          {loading ? (
            <>
              <Spinner />
              Creating Account...
            </>
          ) : (
            "Signup"
          )}
        </button>

        <p className="mt-4 text-center">
          Already have an account?

          <Link
            to={loading ? "#" : "/"}
            className={`ml-1 transition-colors ${
              loading
                ? "text-gray-400 pointer-events-none"
                : "text-blue-500 hover:underline"
            }`}
          >
            Login
          </Link>
        </p>

      </form>

    </div>
  );
}

export default Signup;