import React from "react";
import { useQuery } from "@apollo/client";
import { GET_QUOTE } from "../gql/queries";
import { Link } from "react-router-dom";

const Home = () => {
  const { loading, error, data } = useQuery(GET_QUOTE);

  return loading ? (
    <h1> Loading</h1>
  ) : error ? (
    <h1> Error </h1>
  ) : data.quotes.length === 0 ? (
    <h1> No Quotes Available</h1>
  ) : (
    <div>
      {data.quotes.map((quote) => {
        return (
          <blockquote key={quote.by}>
            <h5> {quote.title}</h5>
            <Link to={`/profile/${quote.by}`}>
              <p> {quote.name} </p>
            </Link>
          </blockquote>
        );
      })}
    </div>
  );
};

export default Home;
