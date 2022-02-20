import styled from "styled-components";
import React, {useEffect, useState} from "react";
import {checkEvents} from "../../slicers/eventSlice";
import {getLogs} from "../../slicers/adminSlice";
import config from "../../config.json";
import {useAppDispatch} from "../../store";


const AdminDetails = ({logs}) => {
    const [pollingRate, setPollingRate] = useState("");
    const [lastMailTime, setLastMailTime] = useState("");
    const dispatch = useAppDispatch()
    const [timer, setTimer] = useState(null);

    const eventCheckHandler = () => {
        if (timer) clearTimeout(timer);
        const timeOut = setTimeout(() => getEvents(), config.HTTP_INTERVAL_VALUE);
        setTimer(timeOut);
    }

    const getEvents = () => {
        dispatch(checkEvents())
        setTimeout(() => dispatch(getLogs()), config.HTTP_INTERVAL_VALUE);
    };

    useEffect(() => {
        if (logs.length > 1) {
            setPollingRate(logs[logs.length - 1].schedulerValue);
            const dateTime = new Date(logs[logs.length - 1].date);
            const time = `${dateTime.getHours()}.${dateTime.getMinutes()}.${dateTime.getMilliseconds()}`
            const date = `${dateTime.getDate()}-${dateTime.getMonth()}-${dateTime.getFullYear()}`
            const formattedDateTime = `${time} : ${date}`;
            setLastMailTime(formattedDateTime)
        }
    }, [logs])
    return (
        <AdminDetailsStyle>

            <div className="details-header">
                <h5>Details</h5></div>
            <div className="details-body">
                <p>
                    Current polling rate: <br/> {pollingRate} min
                </p>
                <p>
                    Emails sent to date: {logs.length}
                </p>
                <p>
                    Last event sent: <br/> {lastMailTime}
                </p>
            </div>

            <div className="details-footer">

                <button onClick={() => eventCheckHandler()}>
                    <i className='pi pi-envelope p-px-2'/>
                    <span>
                    Check dates!
                    </span>
                </button>
            </div>

        </AdminDetailsStyle>
    );

}

const AdminDetailsStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  border-radius: 1rem 2rem;
  background-color: var(--side-nav-bkg);
  color: var(--nav-text-color);
  font-size: small;
  margin-left: 2rem;
  padding: 1rem;


  .details-footer > button {
    padding: .5rem;
    border-radius: .5rem;
    border: black 1px solid;
    background-color: transparent;
    color: white;
    display: flex;
    align-items: center;
    transition: all 0.5s ease;
  }

  .details-footer > button:hover {
    transition: all 0.5s;
    color: var(--text);
    cursor: pointer;
    background-color: var(--add-border);
  }

    .details-footer {
    display: flex;
    height: 100%;
    align-items: flex-end;
    justify-content: center;
  }


`
export default AdminDetails