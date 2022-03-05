import React, {useEffect, useRef} from 'react'
import config from '../../config.json'
import styled from 'styled-components'
import {Toast} from 'primereact/toast'
import {useAppDispatch, useAppSelector} from '../../store'
import {getAdminData, getLogs, getPollerData} from '../../slicers/adminSlice'
import ErrorBar from '../../components/functional-components/error-bar'
import LoadingBar from '../../components/functional-components/loading-bar'
import AdminSettings from "./admin-settings";
import AdminDetails from "./admin-details";
import {AdminLogTable} from "../../components/admin/admin-index";

const Admin = () => {

    const {error, loading, logs, configId, pollerValue} = useAppSelector((state) => state.admin)
    const toast = useRef(null)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (error !== '') {
            const localTimer = setInterval(() => {
                dispatch(getAdminData());
            }, config.HTTP_INTERVAL_VALUE)
            return () => clearTimeout(localTimer)
        }
    }, [error, dispatch, configId])

    useEffect(() => {
        dispatch(getAdminData())
        dispatch(getLogs());
        dispatch(getPollerData());
    }, [])

    return (
        <AdminStyle>
            <ErrorBar error={error} />
            <LoadingBar loading={loading} />
            <div className='admin-border'>
                <Toast ref={toast} />
                    {!loading && !error && (
                        <div className='general-admin-page'>
                            <h1>Admin Page</h1>
                            <div className="first-row">
                                <AdminSettings toast={toast} />
                                <AdminDetails logs={logs} pollerValue={pollerValue} />
                            </div>
                            {/*<h2>Logs</h2>*/}
                            <div className="second-row">
                                <AdminLogTable logs={logs} />
                            </div>
                        </div>
                    )}
            </div>
        </AdminStyle>
    )
}

const AdminStyle = styled.div`
  transition: all 0.4s ease;

  .first-row{
    width: 80%;
    flex-direction: row;
    display: flex;
    padding: 1rem 0 2rem 0;
  }
  
  .admin-border{
    display: flex;
    justify-content: space-around;
  }
  .admin-btn-grp {
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-start;
    gap: 1rem;
    width: 100%;
  }

  .general-admin-page {
    min-height: 100vh;
    border-radius: 0.75rem;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

`

export default Admin
