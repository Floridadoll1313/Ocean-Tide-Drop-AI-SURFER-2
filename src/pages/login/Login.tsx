import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    checkSession();
  }, []);

  async function checkSession() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      navigate("/members");
    }
  }

  async function handleLogin(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (rememberMe) {
      localStorage.setItem("rememberMe", "true");
    }

    setLoading(false);

    navigate("/members");
  }

  return (
    <main className="login-page">

      <section className="login-card">

        <img
          src="/images/ocean_tide_logo.png"
          alt="Ocean Tide Drop AI SURFER"
          className="login-logo"
        />

        <h1>
          Welcome Back, Surfer 🌊
        </h1>

        <p className="login-subtitle">
          Enter the Surfer's Deck and manage your AI tools.
        </p>


        <form onSubmit={handleLogin}>

          <label>
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            required
          />


          <label>
            Password
          </label>

          <div className="password-wrapper">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="password-toggle"
            >
              {showPassword ? "Hide" : "Show"}
            </button>

          </div>


          <div className="login-options">

            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() =>
                  setRememberMe(!rememberMe)
                }
              />

              Remember Me
            </label>


            <Link to="/forgot-password">
              Forgot Password?
            </Link>

          </div>


          {error && (
            <div className="login-error">
              {error}
            </div>
          )}


          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading
              ? "Catching Wave..."
              : "Login"}
          </button>


        </form>


        <p className="signup-link">

          New to Ocean Tide Drop?

          <Link to="/signup">
            Create Account
          </Link>

        </p>


      </section>

    </main>
  );
}
