import React, { memo } from 'react'

const Main = () => {
    return (
        <div>
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
                    style={{
                        textDecoration: 'none',
                        color: 'black',
                    }}
                    href="https://github.com/Seeru-crypto/bDay_front-end"
                >
                    <i
                        className="pi pi-github"
                        style={{ fontSize: '2rem' }}
                    />
                </a>

                <details style={{ marginLeft: '3rem' }}>
                    <summary>About this project</summary>
                    <ul>
                        <li>
                            For the front end I used React with primereact
                            componennt library
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
    )
}
export default memo(Main)
