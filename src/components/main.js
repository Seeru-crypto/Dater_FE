import React, { memo } from 'react'
import styled from 'styled-components'

const Main = () => {
// ToDo fix front page styling with Styled component
// ToDo fix console errors!
    return (
        <MainStyle>
        <div className="main-div">
            <h1>Welcome to Dater!</h1>

            <div className="section-div">
                <h3>Description:</h3>
                <p>
                    Dater is a event manager, which will send out an email if a
                    date is nearing.
                </p>
            </div>
            <div className="p-fluid p-formgrid p-grid">
                <a
                    className="git-link"
                    href="https://github.com/Seeru-crypto/bDay_front-end"
                >
                    <i
                        className="pi pi-github git-icon"
                    />
                </a>

                <details className="main-content">
                    <summary>About this project</summary>
                    <ul>
                        <li>
                            For the front end I used React with primereact
                            component library
                        </li>
                        <li>
                            For the back-end I used spring boot, with REST API
                            endpoints
                        </li>
                        <li>For the database I used mongoDB</li>
                    </ul>
                    <h5>Lessons</h5>
                    <p>
                        The main difficulty was creating components as re-usable
                        as possible without over-engineering. Since it was first
                        time using mongoDB there were a few difficulties
                        integrating Spiring with mongoDB Atlas.
                    </p>
                </details>
            </div>
        </div>
        </MainStyle>
    )
}
export default memo(Main)


const MainStyle = styled.div`
.main-div {
    padding: 2rem 2rem 0 2rem;
}

.git-link {
    text-decoration: none;
    color: black;
}

.git-icon {
    font-size: 2rem;
}

.main-content{
    margin-left: 3rem;
}
    
`
