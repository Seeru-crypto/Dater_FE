import React from "react";
import styled from "styled-components";
import {Dialog} from "primereact/dialog";
import {useAppDispatch, useAppSelector} from "../../store";
import {setPin} from "../../slicers/adminSlice";


const PinModal = ({isVisible, setVisibility}) => {
    const dispatch = useAppDispatch()
    const pin = useAppSelector((state) => state.admin.pin)

    return(
        <PinModalStyle>
            <Dialog header="Please enter" style={{width:"50%"}} visible={isVisible} onHide={() => setVisibility(!isVisible)} breakpoints={{'960px': '75vw'}}>
                <input type="text" value={pin} onChange={(e) => dispatch(setPin(e.target.value))}/>
            </Dialog>


        </PinModalStyle>
    )

}

export default PinModal;

const PinModalStyle = styled.div`


`