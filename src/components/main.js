import React, { memo } from 'react'
import styled from 'styled-components'

const Main = () => (
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
            <div>
                        <section className="main-content">
                    <h5>About this project</h5>
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
                </section>
            </div>
        </div>
            <a
                className="git-link"
                href="https://github.com/Seeru-crypto/bDay_front-end"
            >
                <i
                    className="pi pi-github git-icon"
                />
            </a>
        </MainStyle>
    )

export default memo(Main)

const MainStyle = styled.div`
  background-color: var(--bkg);
  color: var(--text);
  display: grid;
  place-items: center;
  min-height: 100vh;
  transition: all 0.4s ease;
  padding: 2rem 2rem 30rem 2rem;

.git-link {
    text-decoration: none;
    color: var(--git-icon);
}
  
  section{
    width: 75%;
  }
  
.git-icon {
    font-size: 2rem;
}

.main-content{
    margin-left: 3rem;
}
    
`
