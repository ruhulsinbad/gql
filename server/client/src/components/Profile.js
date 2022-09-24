import React from "react";
import { useQuery } from "@apollo/client";
import { GET_MY_PROFILE } from "../gql/queries";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { loading, data, error } = useQuery(GET_MY_PROFILE);
  if (!localStorage.getItem("token")) {
    navigate("/login");
    return <h1> Unauthorized. Please login first</h1>;
  }
  if (loading) return <h1> Loading ...</h1>;

  if (error) throw new Error(error.message);
  console.log(data);
  return (
    <>
      <div>
        <h5> {data.myprofile.name} </h5>
        <h5> {data.myprofile.email} </h5>
      </div>

      {data.myprofile.quotes.length === 0 && <h1> No Quotes availavle </h1>}

      {data.myprofile.quotes.map((quote) => {
        return (
          <blockquote>
            <h6> {quote.title} </h6>
            <p> {quote.name} </p>
          </blockquote>
        );
      })}
    </>
  );
};

export default Profile;
