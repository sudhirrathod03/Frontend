import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const API_BASE = import.meta.env.VITE_API_URL;


function Navbar({ showForm, setShowForm, formType, setFormType }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({ email: "", password: "", username: "" });


  const handleDashboardClick = () => {
    if (token) {
      window.location.href = import.meta.env.VITE_DASHBOARD_URL;

    } else {
      setShowForm(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload(); // Refresh to update navbar
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint =
      formType === "signup"
        ? `${API_BASE}/api/auth/register`
        : `${API_BASE}/api/auth/login`;

      const res = await axios.post(endpoint, formData);
      localStorage.setItem("token", res.data.token);
      setShowForm(false);
      setFormData({ email: "", password: "", username: "" });
      navigate("/");
      window.location.reload(); // so navbar updates
    } catch (err) {
      alert(err.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg border-bottom p-3" style={{ backgroundColor: "white" }}>
        <div className="container on-nav">
          <Link className="navbar-brand" to="/">
            <img style={{ width: "150px" }} alt="logo" src="/assets/images/logo.svg" />
          </Link>

          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav text-center">
              <li className="nav-item mx-2">
                <Link className="nav-link" to="/about">About</Link>
              </li>
              <li className="nav-item mx-2">
                <Link className="nav-link" to="/product">Product</Link>
              </li>
              <li className="nav-item mx-2">
                <Link className="nav-link" to="/pricing">Pricing</Link>
              </li>
              <li className="nav-item mx-2">
                <Link className="nav-link" to="/support">Support</Link>
              </li>

              <li className="nav-item mx-2">
                <button className="btn btn-primary" onClick={handleDashboardClick}>
                  Dashboard
                </button>
              </li>

              {token && (
                <li className="nav-item mx-2">
                  <button className="btn btn-outline-danger" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Login/Signup Popup */}
      {showForm && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    }}
  >
    <div
      className="shadow-lg"
      style={{
        background: "#fff",
        padding: "30px 40px",
        borderRadius: "12px",
        width: "90%",
        maxWidth: "400px",
      }}
    >
      <h4 className="text-center mb-4 text-primary fw-bold">
        {formType === "login" ? "Login to your account" : "Create an account"}
      </h4>
      <form onSubmit={handleFormSubmit}>
        {formType === "signup" && (
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Enter username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
            />
          </div>
        )}
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-4">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100 mb-2">
          {formType === "login" ? "Login" : "Signup"}
        </button>
        <p className="text-center" style={{ fontSize: "14px" }}>
          {formType === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <span
            style={{ color: "#007bff", cursor: "pointer", fontWeight: "bold" }}
            onClick={() =>
              setFormType(formType === "login" ? "signup" : "login")
            }
          >
            {formType === "login" ? "Sign up" : "Login"}
          </span>
        </p>
        <button
          onClick={() => setShowForm(false)}
          className="btn btn-outline-secondary w-100 mt-2"
          type="button"
        >
          Close
        </button>
      </form>
    </div>
  </div>
)}

    </>
  );
}

export default Navbar;
