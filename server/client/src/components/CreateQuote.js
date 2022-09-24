import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_QUOTE } from "../gql/mutations";
import { GET_MY_PROFILE, GET_QUOTE } from "../gql/queries";

const CreateQuote = () => {
  const [quote, setQuote] = useState("");
  const [createQuote, { data, loading, error }] = useMutation(CREATE_QUOTE, {
    refetchQueries: [{ query: GET_QUOTE }, { query: GET_MY_PROFILE }],
  });
  if (loading) return <h1> Loading ... </h1>;
  if (error) return <h1> {error.message} </h1>;
  const handleSubmit = (e) => {
    e.preventDefault();
    createQuote({
      variables: {
        title: quote,
      },
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          placeholder="Write Your Quote Here"
        />

        <button> Create Post </button>
      </form>

      {data && data.createQuote && <h1> {data.createQuote.title} </h1>}
    </div>
  );
};

export default CreateQuote;
