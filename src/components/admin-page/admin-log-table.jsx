import styled from "styled-components";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import React, {useEffect, useState} from "react";
import "../event-list/filter-table.css"

const AdminLogTable = ({logs}) => {
    const [defaultData, setDefaultData] = useState(logs);

    useEffect(() => {
        setDefaultData(logs);
    }, [logs])

    const renderDateValues = (rowData) => {
        const dateTime = new Date(rowData.date);
        const time = `${dateTime.getHours()}.${dateTime.getMinutes()}.${dateTime.getMilliseconds()}`
        const date = `${dateTime.getDate()}-${dateTime.getMonth()}-${dateTime.getFullYear()}`
        const formattedDateTime = `${time} : ${date}`;
        return formattedDateTime;
    }
    return(
        <AdminLogTableStyle>
            <DataTable
                responsiveLayout='scroll'
                paginator
                // header={rightToolbar()}
                value={defaultData}
                emptyMessage='No events found'
                paginatorTemplate='CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown'
                currentPageReportTemplate='Showing {first} to {last} of {totalRecords}'
                rows={10}
                rowsPerPageOptions={[10, 20, 50]}
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

                {/*<Column*/}
                {/*    field='mailContent'*/}
                {/*    sortable*/}
                {/*    header='mail content'*/}
                {/*/>*/}
            </DataTable>
        </AdminLogTableStyle>
    )

}

const AdminLogTableStyle = styled.div`

`
export default AdminLogTable