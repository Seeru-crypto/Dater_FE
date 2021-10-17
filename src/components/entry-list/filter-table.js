import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { DeleteData, GetData } from '../API/delete-data';
import { useHistory } from 'react-router-dom';
import EntryDetails from '../entry-details';

// Hea tabeli näidis https://www.primefaces.org/primereact/showcase/#/datatable/crud

const FilterTable = () => {
    const [selectedEntry, setSelectedEntry] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    const getUserPath = 'http://localhost:5432/users';
    const [data, setData] = useState([]);
    const [productDialog, setProductDialog] = useState(false);

    useEffect(() => {
        const getData = async () => {
            const test = await GetData(getUserPath);
            console.log('test is ', test);
            setData(test.data);
        };

        getData();
    }, []);

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const renderBooleanValues = (rowData, item) => {
        if (typeof rowData[item.field] === 'boolean') {
            return rowData[item.field] ? 'True' : 'False';
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
                {/* <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteProduct(rowData)}
        /> */}
            </React.Fragment>
        );
    };
    const productDialogFooter = (
        <React.Fragment>
            <Button
                label="Delete"
                icon="pi pi-check"
                className="p-button-text"
                onClick={() => {
                    DeleteData(getUserPath, selectedEntry.id);
                }}
            />

            <Button
                label="Cancel"
                icon="pi pi-times"
                className="p-button-text"
                onClick={hideDialog}
            />

            {selectedEntry && (
                <Button
                    label="Save"
                    icon="pi pi-check"
                    className="p-button-text"
                    onClick={() => {
                        console.log('entry was saved!');
                    }}
                />
            )}
        </React.Fragment>
    );
    const editProduct = (product) => {
        setSelectedEntry(product);
        setProductDialog(true);
        /*     return <EntryDetails props={product} />;
    //routeChange();
 */
    };

    /*   const confirmDeleteProduct = async (product) => {
    console.log("Delte entry ", product);
    //DeleteData(getUserPath, product.id);
    const test = await GetData(getUserPath);
    setData(test.data);
  }; */

    // This is a prime react table!
    return (
        <div>
            {data && (
                <div className="card">
                    <DataTable value={data}>
                        <Column
                            field="entry-name"
                            sortable
                            header="entry-name"
                        ></Column>
                        <Column field="date" sortable header="date"></Column>
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
                            field="description"
                            sortable
                            header="description"
                        ></Column>
                        <Column
                            body={rowActions}
                            header="Edit"
                            headerStyle={{ width: '8em', textAlign: 'center' }}
                            bodyStyle={{
                                textAlign: 'center',
                                overflow: 'visible',
                            }}
                        />
                    </DataTable>
                </div>
            )}
            {selectedEntry && (
                <Dialog
                    visible={productDialog}
                    style={{ width: '450px' }}
                    header="Product Details"
                    modal
                    className="p-fluid"
                    footer={productDialogFooter}
                    onHide={hideDialog}
                >
                    <div>product ID is {selectedEntry.id}</div>
                </Dialog>
            )}
        </div>
    );
};
export default FilterTable;
