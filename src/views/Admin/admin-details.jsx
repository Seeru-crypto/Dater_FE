import styled from "styled-components";
import React, {useEffect, useState} from "react";
import {checkEvents} from "../../slicers/eventSlice";
import {getLogs} from "../../slicers/adminSlice";
import config from "../../config.json";
import {useAppDispatch} from "../../store";

const AdminDetails = ({logs}) => {
    const dispatch = useAppDispatch()
    const [timer, setTimer] = useState(null);
    const [pollingRate, setPollingRate] = useState("");
    const [lastMailTime, setLastMailTime] = useState("");

    const eventCheckHandler = () => {
        if (timer) clearTimeout(timer);
        const timeOut = setTimeout(() => checkEventAction(), config.HTTP_INTERVAL_VALUE);
        setTimer(timeOut);
    }

    const checkEventAction = async () => {
        const res = await dispatch(checkEvents())
        if (res.meta.requestStatus === 'fulfilled') dispatch(getLogs());
    };

    useEffect(() => {
        if (logs.length > 1) {
            setPollingRate(logs[logs.length - 1].schedulerValue);
            const lastElementDateTime = new Date(logs[logs.length - 1].date);
            const time = `${lastElementDateTime.getHours()}.${lastElementDateTime.getMinutes()}.${lastElementDateTime.getMilliseconds()}`
            const date = `${lastElementDateTime.getDate()}-${lastElementDateTime.getMonth()}-${lastElementDateTime.getFullYear()}`
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
  max-width: 300px;
  border-radius: 1rem 2rem;
  background-color: var(--side-nav-bkg);
  color: var(--nav-text-color);
  font-size: small;
  margin-left: 2rem;
  padding: 1rem;

  .details-footer {
    display: flex;
    height: 100%;
    align-items: flex-end;
    justify-content: center;

    button {
      padding: .5rem;
      border-radius: .5rem;
      border: black 1px solid;
      background-color: transparent;
      color: white;
      display: flex;
      align-items: center;
      transition: all 0.5s ease;
    }

    button:hover {
      transition: all 0.5s;
      color: var(--text);
      cursor: pointer;
      background-color: var(--add-border);
    }
  }
`
export default AdminDetails