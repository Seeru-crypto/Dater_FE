import { useEffect, useState } from "react";
import axios from "axios";

const usePostData = (url, data) => {
  // CUSTOM HOOKS IN REACT HAVE TO START WITH THE KEYOWRD "use..."!!!!

  useEffect(() => {
    console.log("Post data", data);
    console.log("Post URL", url);
  });
};
export default usePostData;
