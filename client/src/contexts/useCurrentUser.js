// getting useState and useEffect
import { useState, useEffect } from "react";
import axios from "axios";

// creating a hook
export const useCurrentUser = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const requestUrl = `${process.env.REACT_APP_API_URL}/user/me`;

    const requestOptions = {
      url: requestUrl,
      method: "GET",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios(requestOptions)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        console.log(response.data.username);
        if (response.status === 200) {
          return response.data.username;
        } else {
          throw new Error("You are not logged in.");
        }
      })
      .then((user) => setUser(user))
      .catch((error) => error);
    // .catch(console.error);
  }, []);

  return { user, setUser };
};
