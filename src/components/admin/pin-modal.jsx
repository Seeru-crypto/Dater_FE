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
        <ModalColorStyle>
            <Dialog header="Please enter" draggable={false}
                    appendTo="self"
                    style={{width: "50%"}} visible={isVisible} onHide={() => setVisibility(!isVisible)}
                    breakpoints={{'960px': '75vw'}}>
                <PinModalStyle>
                    <input type="text" value={pin} onChange={(e) => dispatch(setPin(e.target.value))}/>
                    <AdminSettingButton text="submit" submitHandle={() => clickHandler()}/>
                </PinModalStyle>
            </Dialog>
        </ModalColorStyle>
    )
}

export default PinModal;

const PinModalStyle = styled.div`
  background-color: var(--bkg);
  color: var(--text);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const ModalColorStyle = styled.div`
  .p-dialog-content, .p-dialog-header {
    background-color: var(--bkg);
    color: var(--text);
    padding: 1rem;
  }
`