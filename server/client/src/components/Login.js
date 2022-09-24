import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../gql/mutations";
import { GET_MY_PROFILE } from "../gql/queries";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [Login, { loading, error }] = useMutation(LOGIN, {
    onCompleted(data) {
      localStorage.setItem("token", data.login.token);
      navigate("/");
    },
    refetchQueries: [{ query: GET_MY_PROFILE }],
  });

  if (loading) return <h1> loading </h1>;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Login({
      variables: {
        user: formData,
      },
    });
  };

  return (
    <div>
      {error && error.message}
      <h5> Login! </h5>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
          required
        />
        <br />

        <button type="submit"> Login </button>
      </form>

      <Link to="/signUp">Need an account</Link>
    </div>
  );
};

export default Login;
