import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
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
    const res = await API.post("/auth/login", formData);

    localStorage.setItem("token", res.data.token);

    localStorage.setItem(
      "user",
      JSON.stringify(res.data.user)
    );

    toast.success("Login Successful");

    navigate("/dashboard");

  } catch (error) {

    console.log(error);

    toast.error("Invalid Email or Password");

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
          Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />

        <button
  type="submit"
  disabled={loading}
  className={`w-full p-3 rounded text-white transition-all duration-200 ${
    loading
      ? "bg-blue-400 opacity-70 cursor-not-allowed blur-[0.5px]"
      : "bg-blue-500 hover:bg-blue-600"
  }`}
>
  {loading ? "Logging in..." : "Login"}
</button>

        <p className="mt-4 text-center">
          Don't have an account?

          <Link
            to="/signup"
            className="text-blue-500 ml-1"
          >
            Signup
          </Link>
        </p>

      </form>

    </div>
  );
}

export default Login;