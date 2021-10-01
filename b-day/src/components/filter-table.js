// import React from 'react';
//
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { InputText } from 'primereact/inputtext';
// import { CustomerService } from '../service/CustomerService';
// import { Dropdown } from 'primereact/dropdown';
// import { Button } from 'primereact/button';
// import { ProgressBar } from 'primereact/progressbar';
// import { Calendar } from 'primereact/calendar';
// import { MultiSelect } from 'primereact/multiselect';
//
// const FilterTable = () => {
//
//
//   const countryBodyTemplate = (rowData) => {
//     return (
//       <React.Fragment>
//         <span className="p-column-title">Country</span>
//         <img alt="flag" src="showcase/demo/images/flag_placeholder.png" onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className={`flag flag-${rowData.country.code}`} width={30} />
//         <span className="image-text">{rowData.country.name}</span>
//       </React.Fragment>
//     );
//   }
//
//   return (
//     <div className="datatable-filter-demo">
//       <div className="card">
//         <DataTable ref={dt} value={customers} paginator rows={10}
//                    header={header} className="p-datatable-customers"
//                    globalFilter={globalFilter} emptyMessage="No customers found.">
//           <Column field="name" header="Name" body={nameBodyTemplate} filter filterPlaceholder="Search by name" />
//           <Column field="birthday" filterField="country.name" header="Country" body={countryBodyTemplate} filter filterPlaceholder="Search by country" filterMatchMode="contains" />
//           <Column field="reminder" header="Representative" body={representativeBodyTemplate} filter filterElement={representativeFilter} />
//           <Column field="reminder-days" header="Date" body={dateBodyTemplate} filter filterElement={dateFilter} filterFunction={filterDate} />
//         </DataTable>
//       </div>
//     </div>
//   );
// }
// export default FilterTable;


import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { CustomerService } from './CustomerService';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';
import './DataTableDemo.css';

const DataTableFilterDemo = () => {
  const [customers, setCustomers] = useState(null);
  const [selectedRepresentative, setSelectedRepresentative] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [globalFilter, setGlobalFilter] = useState('');
  const dt = useRef(null);
  const representatives = [
    {name: "Amy Elsner", image: 'amyelsner.png'},
    {name: "Anna Fali", image: 'annafali.png'},
    {name: "Asiya Javayant", image: 'asiyajavayant.png'},
    {name: "Bernardo Dominic", image: 'bernardodominic.png'},
    {name: "Elwin Sharvill", image: 'elwinsharvill.png'},
    {name: "Ioni Bowcher", image: 'ionibowcher.png'},
    {name: "Ivan Magalhaes",image: 'ivanmagalhaes.png'},
    {name: "Onyama Limba", image: 'onyamalimba.png'},
    {name: "Stephen Shaw", image: 'stephenshaw.png'},
    {name: "XuXue Feng", image: 'xuxuefeng.png'}
  ];

  const statuses = [
    'unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal'
  ];

  const customerService = new CustomerService();

  useEffect(() => {
    customerService.getCustomersLarge().then(data => setCustomers(data));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const filterDate = (value, filter) => {
    if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
      return true;
    }

    if (value === undefined || value === null) {
      return false;
    }

    return value === formatDate(filter);
  }

  const formatDate = (date) => {
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = '0' + month;
    }

    if (day < 10) {
      day = '0' + day;
    }

    return date.getFullYear() + '-' + month + '-' + day;
  }

  const onRepresentativesChange = (e) => {
    dt.current.filter(e.value, 'representative.name', 'in');
    setSelectedRepresentative(e.value);
  }

  const onDateChange = (e) => {
    dt.current.filter(e.value, 'date', 'custom');
    setSelectedDate(e.value);
  }

  const onStatusChange = (e) => {
    dt.current.filter(e.value, 'status', 'equals');
    setSelectedStatus(e.value);
  }

  const nameBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Name</span>
        {rowData.name}
      </React.Fragment>
    );
  }

  const countryBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Country</span>
        <img alt="flag" src="showcase/demo/images/flag_placeholder.png" onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className={`flag flag-${rowData.country.code}`} width={30} />
        <span className="image-text">{rowData.country.name}</span>
      </React.Fragment>
    );
  }

  const representativeBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Representative</span>
        <img alt={rowData.representative.name} src={`showcase/demo/images/avatar/${rowData.representative.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} width={32} style={{verticalAlign: 'middle'}} />
        <span className="image-text">{rowData.representative.name}</span>
      </React.Fragment>
    );
  }

  const dateBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Date</span>
        <span>{rowData.date}</span>
      </React.Fragment>
    );
  }

  const statusBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Status</span>
        <span className={`customer-badge status-${rowData.status}`}>{rowData.status}</span>
      </React.Fragment>
    );
  }

  const activityBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Activity</span>
        <ProgressBar value={rowData.activity} showValue={false} />
      </React.Fragment>
    );
  }

  const representativesItemTemplate = (option) => {
    return (
      <div className="p-multiselect-representative-option">
        <img alt={option.name} src={`showcase/demo/images/avatar/${option.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} width={32} style={{verticalAlign: 'middle'}} />
        <span className="image-text">{option.name}</span>
      </div>
    );
  }

  const statusItemTemplate = (option) => {
    return <span className={`customer-badge status-${option}`}>{option}</span>;
  }

  const reset = () => {
    setSelectedRepresentative(null);
    setSelectedDate(null);
    setSelectedStatus(null);
    setGlobalFilter('');
    dt.current.reset();
  }

  const header = (
    <div className="table-header">
      <Button type="button" label="Clear" className="p-button-outlined" icon="pi pi-filter-slash" onClick={reset} />
      <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Global Search" />
            </span>
    </div>
  );

  const representativeFilter = <MultiSelect value={selectedRepresentative} options={representatives} itemTemplate={representativesItemTemplate} onChange={onRepresentativesChange} optionLabel="name" optionValue="name" placeholder="All" className="p-column-filter" />;
  const dateFilter = <Calendar value={selectedDate} onChange={onDateChange} dateFormat="yy-mm-dd" className="p-column-filter" placeholder="Registration Date"/>;
  const statusFilter = <Dropdown value={selectedStatus} options={statuses} onChange={onStatusChange} itemTemplate={statusItemTemplate} placeholder="Select a Status" className="p-column-filter" showClear />;

  return (
    <div className="datatable-filter-demo">
      <div className="card">
        <DataTable ref={dt} value={customers} paginator rows={10}
                   header={header} className="p-datatable-customers"
                   globalFilter={globalFilter} emptyMessage="No customers found.">
          <Column field="name" header="Name" body={nameBodyTemplate} filter filterPlaceholder="Search by name" />
          <Column field="country" filterField="country.name" header="Country" body={countryBodyTemplate} filter filterPlaceholder="Search by country" filterMatchMode="contains" />
          <Column field="representative.name" header="Representative" body={representativeBodyTemplate} filter filterElement={representativeFilter} />
          <Column field="date" header="Date" body={dateBodyTemplate} filter filterElement={dateFilter} filterFunction={filterDate} />
          <Column field="status" header="Status" body={statusBodyTemplate} filter filterElement={statusFilter}/>
          <Column field="activity" header="Activity" body={activityBodyTemplate} filter filterPlaceholder="Minimum" filterMatchMode="gte" />
        </DataTable>
      </div>
    </div>
  );
}
export default DataTableFilterDemo;