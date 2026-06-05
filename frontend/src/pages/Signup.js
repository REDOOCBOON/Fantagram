import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/signup", {
        username,
        email,
        password,
      });

      alert(
        "Account created successfully!"
      );

      navigate("/login");
    } catch (err) {
      alert("Signup Failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg,#1976d2,#42a5f5)",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "20px",
          width: "350px",
          boxShadow:
            "0 5px 20px rgba(0,0,0,0.2)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
          }}
        >
          Fantagram
        </h1>

        <h3
          style={{
            textAlign: "center",
          }}
        >
          Create Account
        </h3>

        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(
                e.target.value
              )
            }
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
            }}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              background: "#1976d2",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Sign Up
          </button>
        </form>

        <br />

        <button
          onClick={() =>
            navigate("/login")
          }
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Back To Login
        </button>
      </div>
    </div>
  );
}

export default Signup;