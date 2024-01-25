import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

const Header = () => {

  const { userInfo , setUserInfo } = useContext(UserContext);

  useEffect(() => {
    fetch(`/profile`, {
      credentials: "include",
    })
      .then((response) => {
        response.json().then((userInfo) => {
          setUserInfo(userInfo);
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [setUserInfo]);

  
  const userLogout = () => {
    // Invalidating the cookie
    fetch(`${backendUrl}/logout`, {
      credentials: "include",
      method: "POST"
    });

    setUserInfo(null);
  }

  const username = userInfo?.username;
  
  return (
    <>
      <header>
        <Link to="/" className="login">
          MyBlog
        </Link>
        <nav>
          {username && (
            <>
              <Link to="/create">Create new post</Link>
              <a href="" onClick={userLogout}>Logout</a>
            </>
          )}
          {!username && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>
    </>
  );
};

export default Header;
