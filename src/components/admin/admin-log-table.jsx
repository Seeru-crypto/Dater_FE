import styled from "styled-components";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import React, {useEffect, useState} from "react";
import "../../static/css-files/table.css"
import {motion} from "framer-motion";
import {adminTableTransition} from "../../static/animations/motion";
import {Button} from "primereact/button";
import {customStyle} from "../event-list/event-list-style";

const AdminLogTable = ({logs}) => {
    const [defaultData, setDefaultData] = useState(logs);

    useEffect(() => {
        setDefaultData(logs);
    }, [logs])

    const renderDateValues = (rowData) => {
        const dateTime = new Date(rowData.date);
        const time = `${dateTime.getHours()}.${dateTime.getMinutes()}.${dateTime.getMilliseconds()}`
        const date = `${dateTime.getDate()}-${dateTime.getMonth()}-${dateTime.getFullYear()}`
        return `${time} : ${date}`;
    }

    const rowId = (rowData) => {
        // Copy ID to clipboard
        //  onClick={() => {navigator.clipboard.writeText(this.state.textToCopy)}}
        return (
            <React.Fragment>
                <small>{rowData.id}</small>
                <p>
                <Button
                    icon='pi pi-copy'
                    className='p-button-rounded p-button-secondary p-mr-2'
                    onClick={() => console.log(rowData.id)}
                />
                </p>
            </React.Fragment>
        )
    }


    return(
        <AdminLogTableStyle
            initial={adminTableTransition.initial}
            animate={adminTableTransition.animate}
            transition={adminTableTransition.transition}
        >
            <h2 className="logs-header">Logs</h2>
            <hr className="rounded" />
            <DataTable
                responsiveLayout='scroll'
                paginatorClassName="ui-paginator"
                paginator
                value={defaultData}
                emptyMessage='No logs found'
                paginatorTemplate='CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown'
                currentPageReportTemplate='Showing {first} to {last} of {totalRecords}'
                rows={5}
                rowsPerPageOptions={[5, 10, 20]}
            >
                <Column className='table-selector'
                        style={customStyle}
                        exportable={false} />
                <Column
                    field='sentToAddress'
                    sortable
                    header='Recipient'
                    style={customStyle}
                />
                <Column
                    field='date'
                    sortable
                    header='Date'
                    body={renderDateValues}
                    style={customStyle}
                />
                <Column
                    sortable
                    field='initiatedBy'
                    header='initiator'
                    style={customStyle}
                />
                <Column
                    field='schedulerValue'
                    sortable
                    header='poller value'
                    style={customStyle}
                />
                <Column
                    field='errorDesc'
                    sortable
                    header='Errors'
                    style={customStyle}
                />
                <Column
                    body={rowId}
                    header='Id'
                    style={customStyle}
                />
            </DataTable>
        </AdminLogTableStyle>
    )

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
`
export default AdminLogTable