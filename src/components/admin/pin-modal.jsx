import React from "react";
import styled from "styled-components";
import {Dialog} from "primereact/dialog";
import {useAppDispatch, useAppSelector} from "../../store";
import {setPin} from "../../slicers/adminSlice";
import AdminSettingButton from "./admin-setting-button";


const PinModal = ({isVisible, setVisibility, clickHandler}) => {
    const dispatch = useAppDispatch()
    const pin = useAppSelector((state) => state.admin.pin)

    return(
            <Dialog header="Please enter" style={{width:"50%"}} visible={isVisible} onHide={() => setVisibility(!isVisible)} breakpoints={{'960px': '75vw'}}>
        <PinModalStyle>
                <input type="text" value={pin} onChange={(e) => dispatch(setPin(e.target.value))}/>
                <AdminSettingButton text="submit" submitHandle={() => clickHandler()}/>
        </PinModalStyle>
            </Dialog>
    )
}

export default PinModal;

const PinModalStyle = styled.div`
  display: flex;
  gap: .5rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;

`