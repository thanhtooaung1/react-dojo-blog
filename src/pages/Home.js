import React, { useEffect, useState } from "react";
import BlogList from "./BlogList";
import useFetch from "../hooks/useFetch";

const Home = () => {
  const {
    data: blogs,
    isPending,
    error,
  } = useFetch("https://blogs-json-server.vercel.app/blogs");

  return (
    <div className="home">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blogs && <BlogList blogs={blogs} title="All Blogs" />}
    </div>
  );
};

export default Home;
