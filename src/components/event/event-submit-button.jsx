import React, {memo} from 'react'
import '../../static/css-files/form-styles.css'
import styled from "styled-components";

const EventSubmitButton = ({onClickHandler}) => {
    return (
        <EventSubmitButtonStyle>
            <button className="add-button" formNoValidate={true} type='submit' onClick={(e) => onClickHandler(e)}>save
            </button>
        </EventSubmitButtonStyle>
    )
}
export default memo(EventSubmitButton)

const EventSubmitButtonStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: medium;
  padding: 1rem;

  .add-button {
    width: 6rem;
    padding: .5rem;
    border-radius: .5rem;
    border: var(--git-icon) 1px solid;
    background-color: transparent;
    color: var(--git-icon);
    transition: all 0.5s ease;
  }

  .add-button:hover {
    transition: all 0.5s;
    color: var(--text);
    cursor: pointer;
    background-color: var(--add-border);
  }
`