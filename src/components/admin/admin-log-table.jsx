import styled from "styled-components";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import React, {useEffect, useState} from "react";
import "../../static/css-files/event-table.css"
import {motion} from "framer-motion";
import {adminTableTransition} from "../../static/animations/motion";

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
                paginator
                value={defaultData}
                emptyMessage='No logs found'
                paginatorTemplate='CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown'
                currentPageReportTemplate='Showing {first} to {last} of {totalRecords}'
                rows={5}
                rowsPerPageOptions={[5, 10, 20]}
            >
                <Column className='table-selector' exportable={false} />
                <Column
                    field='sentToAddress'
                    sortable
                    header='Recipient'
                />
                <Column
                    field='date'
                    sortable
                    header='Date'
                    body={renderDateValues}
                />
                <Column
                    sortable
                    field='initiatedBy'
                    header='initiator'
                />
                <Column
                    field='schedulerValue'
                    sortable
                    header='poller value'
                />
                <Column
                    field='errorDesc'
                    sortable
                    header='Errors'
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