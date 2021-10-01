import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {CustomerService} from './CustomerService';

const FilterTable = () => {
  const [products, setProducts] = useState([]);
  const customerService = new CustomerService();

  useEffect(() => {
    customerService.getUserData().then(data => setProducts(data));
    console.log(products);
  }, []);

  return (
    <div>
      <div className="card">
        <DataTable value={products}>
          <Column field="name" header="Name"></Column>
          <Column field="birth-day" header="birth-day"></Column>
          <Column field="reminder" header="reminder"></Column>
          {/*<Column field={products.reminder ? '✓' : ''} header="reminder"></Column>*/}
          <Column field="reminder-days" header="reminder-days"></Column>
        </DataTable>
      </div>
    </div>
  );
}
export default FilterTable;