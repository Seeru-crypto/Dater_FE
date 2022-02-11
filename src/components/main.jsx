import React, { memo } from 'react'
import styled from 'styled-components'
import { ReactComponent as MongoIcon } from '../static/icons/mongodb-icon.svg'
import { ReactComponent as ReactIcon } from '../static/icons/reactjs-icon.svg'
import { ReactComponent as JavaIcon } from '../static/icons/java-icon.svg'
import config from '../config.json'
import CTAButton from "./CTA-button"
import { useNavigate } from 'react-router-dom'

const Main = () => {
    const navigate = useNavigate()

    return (
        <MainStyle>
            <div className='main-div'>
                <h1>Welcome to Dater!</h1>
                <div className='main-content'>
                    <div className='first content-row'>
                        <div className='cta'>
                            <CTAButton onClickHandler={() => navigate("/add")} />
                        </div>
                        <article className='about'>
                            <h4>About</h4>
                            <p>
                                Dater is a event manager, which will send out an email if a
                                date is nearing.
                            </p>
                        </article>

                    </div>
                    <div className='second content-row'>
                        <article className='tech'>
                            <h4>Tech
                                <span>
                                    <a className='git-link' href={config.GITHUB_LINK}>
                                        <i className='pi pi-github git-icon' />
                                    </a>
                            </span></h4>
                            <ul className='tech-ul'>
                                <li>
                                    <b>Front-end:</b> React with PrimeReact UI components.
                                    <span>
                                        <ReactIcon />
                                        </span>
                                </li>
                                <li>
                                    <b>Back-end: </b>
                                    Java spring framework (spring boot), with REST API endpoints.
                                    <span>
                                    <JavaIcon />
                                </span>
                                </li>
                                <li>
                                    <b>Database: </b> MongoDB
                                    <span className='icon' title='MongoDB'>
                                    <MongoIcon />
                                </span>
                                </li>
                                <li>
                                    <b>Hosting:</b>
                                    <p>Front- and back-end are hosted by Heroku. Database by MongoDB Atlas</p>
                                </li>
                            </ul>
                        </article>
                        <article className='lessons'>
                            <h4>Lessons</h4>

                            <p>
                                The main difficulty was creating components as re-usable
                                as possible without over-engineering. Since it was first
                                time using mongoDB there were a few difficulties
                                integrating Spiring with mongoDB Atlas.
                            </p>
                            <details>
                                <summary>Read more...</summary>
                                <article className='front-end'>
                                    <h5 className='main-detail-header'> Front-end</h5>
                                    <p>Redux- This was the first time using redux nad utilizing its storage capability.
                                        The app was optimized so that HTTP requests are made once, when page loads.
                                        Navigating between pages
                                        does not create unncecesary HTTP requests</p>
                                    <p> Reusable components: by making separate react components, the amount of HTML
                                        code was cut down to marginal amounts and makes it easier to upkeep this
                                        application.</p>
                                    <p> styled components: Using them the most CSS is localized to .jsx files and the
                                        amount of seperate css files is reduced.</p>
                                    <p> First time learning docker and dockerizing project modules.</p>
                                </article>
                                <article className='back-end'>
                                    <h5 className='main-detail-header'> Back-end</h5>
                                    <p>Emailer is realized by and is set to check given dates every xh</p>
                                    <p>Manipulating date formats so that effective comparison can be made and later
                                        displayed in front-end.</p>
                                </article>
                                <article className='database'>
                                    <h5 className='main-detail-header'> DB</h5>
                                    <p>The spring boot hs very good integration with MongoDB, but it actually made it
                                        harder to customize functions.
                                        Since it was difficult to track down how data moved inside back-end.</p>
                                </article>
                                <article className='hosting'>
                                    <h5 className='main-detail-header'> Hosting, CI/CD</h5>
                                    <p></p>
                                </article>
                            </details>
                        </article>
                    </div>
                </div>

            </div>
        </MainStyle>
    )
}

export default memo(Main)

const MainStyle = styled.div`
  background-color: var(--bkg);
  color: var(--text);
  min-height: 100vh;
  transition: all 0.4s ease;
  padding: 2rem 2rem 30rem 2rem;

  .content-row {
    padding-top: 2rem;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-around;
  }

  svg {
    width: 3rem;
    height: 3rem;
    margin-left: 0.5rem;
  }

  details article {
    background-color: var(--details-bkg);
    border: #094067 2px solid;
    border-radius: 2rem;
    margin: 1rem;
    padding: 1rem 2rem;
  }

  .main-detail-header {
    font-weight: bold;
    text-decoration: underline;
    text-decoration-color: var(--text);
  }

  .lessons h4 {
    padding: 1rem 0;
  }

  .about, .tech, .lessons {
    width: 40%;
    border: 3px var(--text) solid;
    border-radius: .75rem;
    padding: 1rem;
  }

  .cta {
    font-size: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40%;
  }

  .second.content-row {
    margin-top: 2rem;
  }

  .tech-ul > * {
    padding-top: 0.5rem
  }

  .git-link {
    text-decoration: none;
    color: var(--git-icon);
  }

  .git-icon {
    font-size: 2rem;
    padding-left: 1rem;
  }

  .main-content {
    display: flex;
    flex-direction: column;
    margin-left: 3rem;
  }

`
