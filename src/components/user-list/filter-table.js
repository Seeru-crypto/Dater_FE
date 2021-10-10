import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { CustomerService } from "./CustomerService";
import useGetData from "../API/get-data";
// Hea tabeli näidis https://www.primefaces.org/primereact/showcase/#/datatable/crud
const FilterTable = () => {
  const getUserPath = "http://localhost:5432/users";
  const customerService = new CustomerService();

  //useEffect(() => {
  //  customerService.getUserData().then((data) => setProducts(data));
  // console.log(products);
  //}, []);

  const { data, isPending, error } = useGetData(getUserPath);
  console.log(data);

  const booleanChecker = (rowData, item) => {
    if (typeof rowData[item.field] === "boolean") {
      return rowData[item.field] ? "True" : "False";
    } else {
      return rowData[item.field];
    }
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <Button
        icon="pi pi-trash"
        className="p-button-rounded p-button-warning"
        onClick={() => confirmDeleteProduct(rowData)}
      />
    );
  };

  const confirmDeleteProduct = (product) => {
    console.log("this product was deleted ", product);
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
            <Column
              body={actionBodyTemplate}
              header="delete"
              headerStyle={{ width: "8em", textAlign: "center" }}
              bodyStyle={{ textAlign: "center", overflow: "visible" }}
            />
          </DataTable>
        </div>
      )}
    </div>
  );
};
export default FilterTable;
