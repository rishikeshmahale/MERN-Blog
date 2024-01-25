import React, { useState } from "react";


const RegisterPage = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const onValuesChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const onHandleRegister = async (e) => {
    e.preventDefault();

    const response = await fetch(`/register`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      alert("Registration Successful");
    } else {
      alert("Registration failed");
    }


  };

  return (
    <>
      <form className="register" onSubmit={onHandleRegister}>
        <h1>Register</h1>
        <input
          type="text"
          placeholder="enter your username"
          name="username"
          value={data.username}
          onChange={(e) => onValuesChange(e)}
        />
        <input
          type="password"
          placeholder="enter your password"
          name="password"
          value={data.password}
          onChange={(e) => onValuesChange(e)}
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default RegisterPage;
