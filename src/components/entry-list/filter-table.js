import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { DeleteData, GetData } from "../API/delete-data";
import { useHistory } from "react-router-dom";

// Hea tabeli näidis https://www.primefaces.org/primereact/showcase/#/datatable/crud

const FilterTable = () => {
  const getUserPath = "http://localhost:5432/users";
  const [data, setData] = useState([]);

  //useEffect(() => {
  //  customerService.getUserData().then((data) => setProducts(data));
  // console.log(products);
  //}, []);

  // let { data, isPending, error } = useGetData(getUserPath);
  //  console.log(data);

  useEffect(() => {
    const getData = async () => {
      const test = await GetData(getUserPath);
      console.log("test is ", test);
      setData(test.data);
    };

    getData();
  }, []);

  const renderBooleanValues = (rowData, item) => {
    if (typeof rowData[item.field] === "boolean") {
      return rowData[item.field] ? "True" : "False";
    } else {
      return rowData[item.field];
    }
  };

  const rowActions = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-mr-2"
          onClick={() => editProduct(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </React.Fragment>
    );
  };

  const editProduct = (product) => {
    console.log("edit product ", product.id);
    //routeChange();
  };

  const confirmDeleteProduct = async (product) => {
    console.log("Delte entry ", product);
    //DeleteData(getUserPath, product.id);
    const test = await GetData(getUserPath);
    setData(test.data);
  };

  // This is a prime react table!
  return (
    <div>
      {data && (
        <div className="card">
          <DataTable value={data}>
            <Column field="name" sortable header="Name"></Column>
            <Column field="birth-day" sortable header="birth-day"></Column>
            <Column
              sortable
              field="reminder"
              body={renderBooleanValues}
              header="reminder"
            ></Column>
            <Column
              field="reminder-days"
              sortable
              header="reminder-days"
            ></Column>
            <Column
              body={rowActions}
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
