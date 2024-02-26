import React, { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const [author, setAuthor] = useState();
  const [isPending, setIsPending] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, author };

    setIsPending(true);

    fetch("http://localhost:8000/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blog),
    }).then((res) => {
      setIsPending(false);
      console.log("Created");
      navigate("/");
    });
  };

  return (
    <div className="create">
      <h2>Add a Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog-title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Blog-body:</label>
        <textarea rows="5" onChange={(e) => setBody(e.target.value)}>
          {body}
        </textarea>

        <label>Blog-author:</label>
        <select value={author} onChange={(e) => setAuthor(e.target.value)}>
          <option value="mario">mario</option>
          <option value="yoshi">yoshi</option>
        </select>
        <button type="submit" disabled={isPending}>
          {isPending ? "Adding..." : "Add blog"}{" "}
        </button>
      </form>
    </div>
  );
};

export default Create;
