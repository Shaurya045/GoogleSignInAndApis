import { useState, useEffect } from "react";
import "../App.css";

async function fetchUserData() {
  const response = await fetch("http://127.0.0.1:3000/oauth/user", {
    method: "get",
  }).then(response => response.json());

  return response;
}

function Profile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function getData() {
      const data = await fetchUserData();
      setUserData(data);
    }
    getData();
  }, []);

  return (
    <div>
      {userData ? (
        <div>
          <h1>Welcome, {userData.name}</h1>
          <h2>{userData.email}</h2>
          <h2>Your YouTube Channel</h2>
          <p>Title: {userData.channelData.snippet.title}</p>
          <p>Description: {userData.channelData.snippet.description}</p>
          <p>Subscribers: {userData.channelData.statistics.subscriberCount}</p>
          <p>Views: {userData.channelData.statistics.viewCount}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Profile;
