import React, {useEffect, useRef, useState} from 'react'
import config from '../../config.json'
import styled from 'styled-components'
import {Toast} from 'primereact/toast'
import {useAppDispatch, useAppSelector} from '../../store'
import {getAdminData, getLogs} from '../../slicers/adminSlice'
import ErrorBar from '../functional-components/error-bar'
import LoadingBar from '../functional-components/loading-bar'
import PinModal from "./pin-modal";
import AdminSettings from "./admin-settings";
import AdminDetails from "./admin-details";

const Admin = () => {
    const toast = useRef(null)
    const loading = useAppSelector((state) => state.admin.loading)
    const error = useAppSelector((state) => state.admin.error)
    const pin = useAppSelector((state) => state.admin.pin)
    const configID = useAppSelector((state) => state.admin.configID)
    const logs = useAppSelector((state) => state.admin.logs)
    const dispatch = useAppDispatch()
    const [isPinModalVisible, setPinModal] = useState(!pin);

    useEffect(() => {
        if (error !== '') {
            const localTimer = setInterval(() => {
                dispatch(getAdminData());
            }, config.HTTP_INTERVAL_VALUE)
            return () => clearTimeout(localTimer)
        }
        if (configID === '') dispatch(getAdminData())
        if  (logs.length === 0) dispatch(getLogs());
    }, [error, dispatch, configID])

    return (
        <AdminStyle>
            <ErrorBar error={error} />
            <LoadingBar loading={loading} />

            <PinModal isVisible={isPinModalVisible} setVisibility={setPinModal} />
            <div className='admin-border'>
                <Toast ref={toast} />
                    {!loading && !error && (
                        <div className='general-admin-page'>
                            <h1>Admin Page</h1>
                            <div className="first-row">
                                <AdminSettings pin={pin} toast={toast} />
                                <AdminDetails logs={logs} />
                            </div>
                        </div>
                    )}
            </div>
        </AdminStyle>
    )
}

const AdminStyle = styled.div`
  background-color: var(--bkg);
  color: var(--text);
  min-height: 100vh;
  transition: all 0.4s ease;

  .first-row{
    flex-direction: row;
    display: flex;
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

  .admin-email-reminder {
    padding: 2rem 2rem;
  }

  .general-admin-page {
    min-height: 100vh;
    border-radius: 0.75rem;
    padding: 2rem;
    margin: 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .custom-butt:hover{
    border: #3da9fc solid 1px !important;
  }

  input {
    width: 100%;
  }

  .admin-border {
    padding: 2rem 4rem;
  }
`

export default Admin
