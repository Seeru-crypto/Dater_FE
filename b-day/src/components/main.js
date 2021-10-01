import React from "react"
import Service from "../service";

const Main = () => {
  const {resData, isPending, error} = Service.getUsers('http://localhost:3000/users')
  console.log(resData);
  console.log(isPending);
  console.log(error);

  return (
        <div>
            Main page!
        </div>
    )
}
export default Main;