import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { CustomerService } from "./CustomerService";
import { DeleteData, GetData } from "../API/delete-data";
import useGetData from "../API/get-data";
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

  const renderDeleteButton = (rowData) => {
    return (
      <Button
        icon="pi pi-trash"
        className="p-button-rounded p-button-warning"
        onClick={() => confirmDeleteProduct(rowData)}
      />
    );
  };

  const confirmDeleteProduct = async (product) => {
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
            <Column field="name" header="Name"></Column>
            <Column field="birth-day" header="birth-day"></Column>
            <Column
              field="reminder"
              body={renderBooleanValues}
              header="reminder"
            ></Column>
            {/*<Column field={products.reminder ? '✓' : ''} header="reminder"></Column>*/}
            <Column field="reminder-days" header="reminder-days"></Column>
            <Column
              body={renderDeleteButton}
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
