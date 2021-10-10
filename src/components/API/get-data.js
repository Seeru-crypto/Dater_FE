import { useEffect, useState } from "react";
import axios from "axios";

const useGetData = (url) => {
  // CUSTOM HOOKS IN REACT HAVE TO START WITH THE KEYOWRD "use..."!!!!
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true); // create a loading message, while the data is being retrieved
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();
    // The timeout function simulates real-world delay
    axios
      .get(url)
      .then((data) => {
        setData(data.data);
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          setError(err.message);
          setIsPending(false);
        }
      }); // it will catch network errors/ cant connect to the server at all
    return () => abortCont.abort();
  }, [url]);
  return { data, isPending, error };
};
export default useGetData;
