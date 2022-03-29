import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Toast } from 'primereact/toast';
import config from '../../config.json';
import { useAppDispatch, useAppSelector } from '../../store';
import { getAdminData, getLogs, getPollerData } from '../../slicers/adminSlice';
import ErrorBar from '../../components/functional-components/error-bar';
import LoadingBar from '../../components/functional-components/loading-bar';
import AdminSettings from './admin-settings';
import AdminDetails from './admin-details';
import { AdminLogTable } from '../../components/admin/admin-index';

function Admin() {
  const { error, isEmailEnabled, isSmsActive, smsTo, userMailAddress, pin, loading, logs, configId, pollerValue } = useAppSelector(
    (state) => state.admin
  );

  const toast = useRef(null);
  const dispatch = useAppDispatch();
  const [formattedLogs, setFormattedLogs] = useState([]);

  useEffect(() => {
    if (error !== '') {
      const localTimer = setInterval(() => {
        dispatch(getAdminData());
        dispatch(getLogs());
        dispatch(getPollerData());
      }, config.HTTP_INTERVAL_VALUE);
      return () => clearTimeout(localTimer);
    }
    return () => {};
  }, [error, dispatch, configId]);

  useEffect(() => {
    if (configId === '') {
      dispatch(getAdminData());
      dispatch(getLogs());
      dispatch(getPollerData());
    }
  }, []);

  useEffect(() => {
    if (logs) {
      const newLogs = logs.map((log) => {
        const formattedDate = new Date(log.dateCreated).toLocaleString('en-GB');
        return { ...log, formattedDate };
      });
      setFormattedLogs(newLogs);
    }
  }, [logs]);

  return (
    <AdminStyle>
      <ErrorBar error={error} />
      <LoadingBar loading={loading} />
      <div className="admin-border">
        <Toast ref={toast} />
        {!loading && !error && (
          <div className="general-admin-page">
            <h1>Admin Page</h1>
            <div className="first-row">
              <AdminSettings
                toast={toast}
                configId={configId}
                smsTo={smsTo}
                isSmsActive={isSmsActive}
                isEmailEnabled={isEmailEnabled}
                userMailAddress={userMailAddress}
                pin={pin}
              />
              <AdminDetails logs={logs} smsTo={userMailAddress} pollerValue={pollerValue} currentPhoneNumber={smsTo} />
            </div>
            <div className="second-row">
              <AdminLogTable logs={formattedLogs} />
            </div>
          </div>
        )}
      </div>
    </AdminStyle>
  );
}

const AdminStyle = styled.div`
  transition: all 0.2s ease;

  .first-row {
    width: 80%;
    flex-direction: row;
    display: flex;
    padding: 1rem 0 2rem 0;
  }

  .admin-border {
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

  @media (max-width: 960px) {
    .first-row {
      width: 100%;
      gap: 1rem;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      display: flex;
      padding: 1rem 0 2rem 0;
    }

    .second-row {
      display: flex;
      justify-content: center;
      align-items: center;
      min-width: 800px;
      font-size: 10px;
    }
  }
`;

export default Admin;
