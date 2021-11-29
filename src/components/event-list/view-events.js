import React from 'react'
import { Message } from 'primereact/message'
import { Button } from 'primereact/button'

import FilterTable from './filter-table'
import config from '../../config.json'
import useGetData from '../../API/useGetData'

const ViewEvents = () => {
    const apiPath = 'http://localhost:8080/api/event'
    const defaultErrorMessage = config.labels.defaultErrorMessage
    let { getData: data, isPending, error } = useGetData(apiPath)
    return (
        <div>
            <div
                hidden={error ? true : false}
                style={{ padding: '1rem' }}
                className="p-grid vertical-container"
            >
                <h5 className="p-col p-col-align-start">View events: </h5>
                <div>
                    <div className="p-col p-col-align-end">
                        <Button
                            onClick={() => console.log('email checking!')}
                            className="p-button-outlined p-button-secondary"
                        >
                            <i className="pi pi-envelope p-px-2" />
                            <span> Check dates </span>
                        </Button>
                    </div>
                </div>
            </div>
            <div
                hidden={error ? false : true}
                style={{
                    display: 'flex',
                    width: '100%',
                    flexDirection: 'column',
                }}
            >
                <Message severity="error" text={defaultErrorMessage} />
            </div>
            <FilterTable data={data?.data} />
            {isPending && (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <i
                        className="pi pi-spin pi-spinner"
                        style={{ fontSize: '2em' }}
                    ></i>
                </div>
            )}
        </div>
    )
}
export default ViewEvents
