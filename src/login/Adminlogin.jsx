import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { Flex, Text } from "@chakra-ui/react"; // Import Text from Chakra UI
import Navbar from "../UserSide/Components/Home/Navbar";
import Footer from "../UserSide/Components/Home/Footer";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email || !password) {
      setError("Please fill all the fields");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email address");
      return false;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        localStorage.setItem("adminEmail", JSON.stringify(email));
        navigate("/dashboard");
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="login">
        <Flex align="center" className="loginContainer">
          <Flex
            className="logoanime"
            ml={"2rem"}
            justify={"center"}
            align="center"
            height={"250px"}
            p="2rem"
            display={{ base: "none", md: "Flex" }}
          >
            <Text
              fontSize="4xl"
              fontWeight="bold"
              color="teal.500"
              textShadow="2px 2px 4px rgba(0, 0, 0, 0.3)"
            >
              ZeonHub
            </Text>
          </Flex>

          <div className="loginDetail">
            <h3>Admin Login</h3>

            <form onSubmit={handleSubmit}>
              <input
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter email"
                className={error.includes("email") ? "invalid" : ""}
              />
              {error.includes("email") && <span className="error">* {error}</span>}

              <input
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter a password"
                className={error.includes("Password") ? "invalid" : ""}
              />
              {error.includes("Password") && <span className="error">* {error}</span>}

              <p>
                New User? <Link to="/signup">Signup</Link>
              </p>

              <button type="submit">Login</button>
            </form>
          </div>
        </Flex>
      </div>
      <Footer />
    </>
  );
};

export default AdminLogin;
