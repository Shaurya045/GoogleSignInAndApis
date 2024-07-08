import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { toast } from "react-toastify";

function navigate(url) {
  window.location.href = url;
}

async function auth() {
  const response = await fetch("http://127.0.0.1:3000/request", {
    method: "post",
  }).then((response) => response.json());
  navigate(response.url);
}

async function fetchUserData(setUserData, setCheckedAutoLogout) {
  const response = await fetch("http://127.0.0.1:3000/oauth/user", {
    method: "get",
  });
  const data = await response.json();
  setUserData(data);
  setCheckedAutoLogout(false);
}

function Home() {
  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState("");
  const [checkedAutoLogout, setCheckedAutoLogout] = useState(false);

  useEffect(() => {
    fetchUserData(setUserData, setCheckedAutoLogout);
  }, []);

  useEffect(() => {
    if (!checkedAutoLogout && userData) {
      autoLogout(userData);
    }
  }, [checkedAutoLogout, userData]);

  const logout = async () => {
    await fetch("http://127.0.0.1:3000/oauth/logout", {
      method: "post",
    });
    setUserData(null);
    // history.push("/");
  };

  const removeUser = async () => {
    await fetch("http://127.0.0.1:3000/oauth/remove", {
      method: "post",
    });
    setUserData(null);
    // history.push("/");
  };

  const autoLogout = (data) => {
    const subscriberCount = Number(data.channelData.statistics.subscriberCount);
    if (subscriberCount <= 50000) {
      setMessage(
        "You have been logged out because your subscriber count is less than 50,000."
      );
      removeUser();
    }
    toast.error("Bye");
  };

  return (
    <div>
      <h1>Welcome to Google Sign In</h1>
      {message && <p>{message}</p>}
      {userData ? (
        <div className="login">
          <h2>Welcome, {userData.name}</h2>
          <Link to="/profile">
            <button className="btn">View Profile</button>
          </Link>
          <button className="btn" onClick={logout}>
            Logout
          </button>
        </div>
      ) : (
        <button className="btn" onClick={auth}>
          Sign In with Google
        </button>
      )}
    </div>
  );
}

export default Home;
