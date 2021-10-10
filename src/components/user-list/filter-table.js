import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { CustomerService } from "./CustomerService";
import useGetData from "../API/get-data";
const FilterTable = () => {
  //let data;
  const [products, setProducts] = useState([]);
  const customerService = new CustomerService();

  //useEffect(() => {
  //  customerService.getUserData().then((data) => setProducts(data));
  // console.log(products);
  //}, []);

  const { data, isPending, error } = useGetData(`http://localhost:3000/users`);
  console.log(data);

  const booleanChecker = (rowData, item) => {
    if (typeof rowData[item.field] === "boolean") {
      return rowData[item.field] ? "True" : "False";
    } else {
      return rowData[item.field];
    }
  };

  const reminderBodyTemplate = (rowData) => {
    console.log(rowData.reminder);
    return <span>{rowData.reminder}</span>;
  };

  // This is a prime react table!
  return (
    <div>
      {data && (
        <div className="card">
          <DataTable value={data}>
            <Column field="name" header="Name"></Column>
            <Column field="birth-day" header="birth-day"></Column>
            <Column
              field="reminder"
              body={booleanChecker}
              header="reminder"
            ></Column>
            {/*<Column field={products.reminder ? '✓' : ''} header="reminder"></Column>*/}
            <Column field="reminder-days" header="reminder-days"></Column>
          </DataTable>
        </div>
      )}
    </div>
  );
};
export default FilterTable;
