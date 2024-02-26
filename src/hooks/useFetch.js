import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abort = new AbortController();

    setTimeout(() => {
      fetch(url, { signal: abort.signal })
        .then((res) => {
          if (!res.ok) {
            throw Error("Couldn't fetch data from this resource");
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setData(data);
          setError(null);
          setIsPending(false);
        })
        .catch((e) => {
          setError(e.message);
          setData(null);
          setIsPending(false);
        });
    }, 1000);

    return () => abort.abort();
  }, []);

  return { data, isPending, error };
};

export default useFetch;
