import styled from 'styled-components';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import React, { useEffect, useState } from 'react';
import '../../static/css-files/table.css';
import { motion } from 'framer-motion';
import { Button } from 'primereact/button';
import { adminTableTransition } from '../../static/animations/motion';
import { customStyle, idBodyStyle, idHeaderStyle, errorDescStyle } from '../event-list/event-list-style';

function AdminLogTable({ logs }) {
  const [defaultData, setDefaultData] = useState(logs);

  useEffect(() => {
    setDefaultData(logs);
  }, [logs]);

  const rowId = (rowData) => {
    return (
      <p className="tooltip">
        <Button
          icon="pi pi-copy"
          className="p-button-rounded p-button-secondary p-mr-2"
          onClick={() => {
            navigator.clipboard.writeText(rowData.id);
          }}
        />
        <span className="tooltiptext">copy Id</span>
      </p>
    );
  };

  return (
    <AdminLogTableStyle initial={adminTableTransition.initial} animate={adminTableTransition.animate} transition={adminTableTransition.transition}>
      <h2 className="logs-header">Logs</h2>
      <hr className="rounded" />
      <DataTable
        sortField="formattedDate"
        sortOrder={-1}
        responsiveLayout="scroll"
        paginatorClassName="ui-paginator"
        paginator
        value={defaultData}
        emptyMessage="No logs found"
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        rows={5}
        rowsPerPageOptions={[5, 10, 20]}
      >
        <Column className="table-selector" style={customStyle} exportable={false} />
        <Column field="sentToAddress" sortable header="Recipient" style={customStyle} />
        <Column field="formattedDate" sortable header="Date" style={customStyle} />
        <Column sortable field="initiatedBy" header="initiator" style={customStyle} />
        <Column field="schedulerValue" sortable header="poller value" style={customStyle} />
        <Column field="errorDesc" sortable header="Errors" style={errorDescStyle} />
        <Column body={rowId} header="Id" headerStyle={idHeaderStyle} bodyStyle={idBodyStyle} />
      </DataTable>
    </AdminLogTableStyle>
  );
}

const AdminLogTableStyle = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;

  .rounded {
    width: 100%;
    height: 1px;
    border-top: 8px solid #bbb;
    border-radius: 5px;
  }

  .tooltip {
    position: relative;
    display: inline-block;
  }

  .tooltip .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: black;
    color: #fff;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;

    position: absolute;
    z-index: 1;
  }

  .tooltip:hover .tooltiptext {
    visibility: visible;
  }
`;
export default AdminLogTable;
