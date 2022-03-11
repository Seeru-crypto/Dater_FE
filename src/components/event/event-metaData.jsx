import styled from "styled-components";

const EventMetaData = ({dateCreated, dateUpdated}) => {
    return(
        <EventMetaDataStyle>
            { dateUpdated &&
            <p>Updated: {new Date(dateUpdated).toLocaleString("en-GB")}</p>
            }
            <p>Created: {new Date(dateCreated).toLocaleString("en-GB")}</p>
        </EventMetaDataStyle>
    )
}

const EventMetaDataStyle = styled.div`
  padding: .5rem;
`

export default EventMetaData;