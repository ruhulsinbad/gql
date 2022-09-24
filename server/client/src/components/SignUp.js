import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { SIGN_UP } from "../gql/mutations";

const SignUp = () => {
  const [formData, setFormData] = useState({});

  const [signUpUser, { data, loading, error }] = useMutation(SIGN_UP);

  if (loading) return <h1> Loading ...</h1>;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signUpUser({
      variables: {
        user: formData,
      },
    });
  };

  return (
    <div>
      {error && error.message}
      {data && data.signUp && <div> {data.signUp.name} is signed up</div>}
      <h5> SignUp! </h5>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          name="name"
          onChange={handleChange}
          required
        />
        <br />
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

        <button type="submit"> SignUp </button>
      </form>

      <Link to="/login">Already have an account</Link>
    </div>
  );
};

export default SignUp;
