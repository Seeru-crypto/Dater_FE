import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { CustomerService } from "./CustomerService";
import useGetData from "./API/get-data";
const FilterTable = () => {
  const [products, setProducts] = useState([]);
  const customerService = new CustomerService();

  //useEffect(() => {
  //  customerService.getUserData().then((data) => setProducts(data));
  // console.log(products);
  //}, []);

  const { data, isPending, error } = useGetData(`http://localhost:3000/users`);
  let users = data.data;

  // This is a prime react table!
  return (
    <div>
      <div className="card">
        <DataTable value={users}>
          <Column field="name" header="Name"></Column>
          <Column field="birth-day" header="birth-day"></Column>
          <Column field="reminder" header="reminder"></Column>
          {/*<Column field={products.reminder ? '✓' : ''} header="reminder"></Column>*/}
          <Column field="reminder-days" header="reminder-days"></Column>
        </DataTable>
      </div>
    </div>
  );
};
export default FilterTable;
