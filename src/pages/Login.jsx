import React, { useState , useEffect} from "react";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import { useAppContext } from "../Context/Context";
import toast from "react-hot-toast";
import { useAuth } from "../Context/authContext";

const Login = () => {
useEffect(() => {
  document.title = "Login to Echozy – Connect, Share & Grow Your Network";

  const setMeta = (name, content, property = false) => {
    let tag;
    if (property) {
      tag = document.querySelector(`meta[property='${name}']`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    } else {
      tag = document.querySelector(`meta[name='${name}']`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    }
  };

  // Standard meta description
  setMeta("description", "Log in to Echozy – the modern social media platform to share posts, connect with friends, discover communities and grow your personal network. Join today.");

  // Open Graph meta tags
  setMeta("og:title", "Login to Echozy – Connect, Share & Grow Your Network", true);
  setMeta("og:description", "Log in to Echozy – the modern social media platform to share posts, connect with friends, discover communities and grow your personal network. Join today.", true);
  setMeta("og:type", "website", true);
  setMeta("og:url", "https://echozy.vercel.app/login", true);
  setMeta("og:image", "https://echozy.vercel.app/og-image.png", true);

  // Twitter / X Cards
  setMeta("twitter:card", "summary_large_image");
  setMeta("twitter:title", "Login to Echozy – Connect, Share & Grow Your Network");
  setMeta("twitter:description", "Log in to Echozy – the modern social media platform to share posts, connect with friends and discover communities.");
  setMeta("twitter:image", "https://echozy.vercel.app/og-image.png");
}, []);




  
  const [current, setCurrent] = useState("create");
  const { navigateTo } = useAppContext();
  const [block, setBlock] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const { API, fetchAllPosts, fetchAllFriendsRequest, fetchAllFriends } =
    useAppContext();
  const { setUser } = useAuth();

  const submitHandler = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (current === "create") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!firstName.trim()) newErrors.firstName = "First name is required";
      else if (firstName.trim().length < 3)
        newErrors.firstName = "First name must be at least 3 characters";

      if (!lastName.trim()) newErrors.lastName = "Last name is required";
      else if (lastName.trim().length < 3)
        newErrors.lastName = "Last name must be at least 3 characters";

      if (!email || !emailRegex.test(email))
        newErrors.email = "A valid email is required (e.g. user@example.com).";

      if (!password.trim()) newErrors.password = "Password is required";
      else if (password.length < 5)
        newErrors.password = "Password must be at least 5 characters";

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      setErrors({});
    } else {
      if (!email.trim()) newErrors.email = "Email is required";
      if (!password.trim()) newErrors.password = "Password is required";

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
    }

    setErrors({});
    if (current === "create") {
      setBlock(true);
      try {
        const response = await API.post("api/user/add", {
          firstName,
          lastName,
          email,
          password,
        });
        if (response.data.success) {
          setUser(response.data.user);
          setFirstName("");
          setLastName("");
          setEmail("");
          setPassword("");
          navigateTo("/welcome");
          fetchAllPosts();
          fetchAllFriends();
          fetchAllFriendsRequest();
        }
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An unexpected error occurred");
        }
      } finally {
        setBlock(false);
      }
    } else {
      try {
        setBlock(true);
        const response = await API.post("api/user/login", { email, password });
        if (response.data.success) {
          setUser(response.data.user);
          setEmail("");
          setPassword("");
          navigateTo("/home");
          fetchAllPosts();
          fetchAllFriends();
          fetchAllFriendsRequest();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An unexpected error occurred");
        }
      } finally {
        setBlock(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 5}s`,
            }}
          >
            <div className="w-3 h-3 bg-blue-200 rounded-full opacity-50"></div>
          </div>
        ))}
      </div>

      {/* Back button */}
      <div className="absolute top-6 left-6 z-10">
        <button
          onClick={() => navigateTo("/")}
          className="bg-white shadow-md rounded-full p-3 hover:bg-gray-50 transition-colors"
          aria-label="Go back"
        >
          <FaArrowLeft className="text-gray-700" />
        </button>
      </div>

      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">
          {/* Decorative element */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-100 rounded-full opacity-50"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-100 rounded-full opacity-50"></div>

          <div className="relative z-10">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                {current === "create" ? "Join Echozy" : "Welcome Back"}
              </h1>
              <p className="text-gray-600 mt-2">
                {current === "create"
                  ? "Create your account to get started"
                  : "Sign in to continue your journey"}
              </p>
            </div>

            <form className="space-y-5" onSubmit={submitHandler}>
              {current === "create" && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      onChange={(e) => {
                        setFirstName(e.target.value);
                        setErrors((prev) => ({ ...prev, firstName: "" }));
                      }}
                      value={firstName}
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.firstName ? "border-red-500" : "border-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      onChange={(e) => {
                        setLastName(e.target.value);
                        setErrors((prev) => ({ ...prev, lastName: "" }));
                      }}
                      value={lastName}
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.lastName ? "border-red-500" : "border-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div>
                <input
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors((prev) => ({ ...prev, email: "" }));
                  }}
                  value={email}
                  type="email"
                  name="email"
                  placeholder="Email address"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div className="relative">
                <input
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors((prev) => ({ ...prev, password: "" }));
                  }}
                  value={password}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors pr-12`}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              <button
                disabled={block}
                type="submit"
                className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 ${
                  block
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:from-blue-700 hover:to-purple-700 hover:shadow-lg"
                }`}
              >
                {block ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    {current === "create" ? "Creating..." : "Signing in..."}
                  </div>
                ) : current === "create" ? (
                  "Create Account"
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {current === "create"
                  ? "Already have an account?"
                  : "Don't have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => {
                    setCurrent(current === "create" ? "login" : "create");
                    setErrors({});
                  }}
                  className="text-blue-600 font-semibold hover:text-blue-800 transition-colors"
                >
                  {current === "create" ? "Sign in" : "Create one"}
                </button>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          Your information is kept private and is never shared with third parties.
        </div>
      </div>

      {/* Floating animation style */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Login;
