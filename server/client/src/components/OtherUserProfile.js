import React from "react";
import { useQuery } from "@apollo/client";
import { GET_OTHERS_PROFILE } from "../gql/queries";
import { useParams } from "react-router-dom";

const OtherUserProfile = () => {
  const { id } = useParams();

  const { loading, data, error } = useQuery(GET_OTHERS_PROFILE, {
    variables: {
      id,
    },
  });
  if (loading) return <h1> Loading ...</h1>;

  if (error) throw new Error(error.message);
  console.log(data);
  return (
    <>
      <div>
        <h5> {data.user.name} </h5>
        <h5> {data.user.email} </h5>
      </div>

      {data.user.quotes.length === 0 && <h1> No Quotes availavle </h1>}

      {data.user.quotes.map((quote) => {
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

export default OtherUserProfile;
