import React, {memo} from 'react'
import styled from 'styled-components'
import {ReactComponent as MongoIcon} from '../static/icons/mongodb-icon.svg'
import {ReactComponent as ReactIcon} from '../static/icons/reactjs-icon.svg'
import {ReactComponent as JavaIcon} from '../static/icons/java-icon.svg'
import config from '../config.json'
import CTAButton from "./CTA-button"
import {useNavigate} from 'react-router-dom'
import {setCurrentPage} from "../slicers/adminSlice";
import {useAppDispatch} from "../store";

const Main = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    return (
        <MainStyle>
            <div className='main-div'>
                <h1>Welcome to Dater!</h1>
                <div className='main-content'>
                    <div className='first content-row'>
                        <div className='cta'>
                            <CTAButton onClickHandler={() => {
                                navigate("/add")
                                dispatch(setCurrentPage("/add"))
                            }}/>
                        </div>
                        <article className='main-box about'>
                            <h4>About</h4>
                            <div>
                                Dater is a event manager, which will send out an email if a
                                date is nearing.
                                <p>Try it out!</p>
                                <p className="heroku-warning">The initial load time might be longer than usual due to
                                    Heroku booting application up.</p>
                            </div>
                        </article>

                    </div>
                    <div className='second content-row'>
                        <article className="main-box">
                            <div className='tech'>
                                <h4>Tech
                                    <span>
                                    <a className='git-link' href={config.GITHUB_LINK}>
                                        <i className='pi pi-github git-icon'/>
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
                                    <MongoIcon/>
                                </span>
                                </li>
                                    <li>
                                        <b>Hosting:</b>
                                        <p>Front- and back-end are hosted by Heroku. Database by MongoDB Atlas</p>
                                    </li>
                                </ul>
                            </div>
                        </article>
                        <article className='main-box lessons'>
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
                                        does not create unnecessary HTTP requests</p>
                                    <p> Reusable components: by making separate react components, the amount of HTML
                                        code was cut down to marginal amounts, making it easier to upkeep this
                                        application.</p>
                                    <p> Styled components: Using them most CSS is localized to react components and the
                                        amount of seperate css files is reduced.</p>
                                </article>
                                <article className='back-end'>
                                    <h5 className='main-detail-header'> Back-end</h5>
                                    <p>Mailer is realized by Spring javaMail function with thymeleaf template engine.</p>
                                    <p>local & dev profiles made it very easy to test locally and later deploy</p>
                                    <p>Creating recurring check was achieved by springframework scheduling function</p>
                                    <p>Manipulating date formats so that effective comparison can be made later on was a bit difficult.</p>
                                </article>
                                <article className='database'>
                                    <h5 className='main-detail-header'> DB</h5>
                                    <p>Spring boot has very good integration with MongoDB, which made it
                                        harder to customize functions/ data flow.
                                        Since it was difficult to track down how data moved inside spring.</p>
                                    <p>Since the dataflow is comparatively simple, the DB schema was simple as well, created 2 indexes: events, settings</p>
                                </article>
                                <article className='hosting'>
                                    <h5 className='main-detail-header'> Hosting, CI/CD</h5>
                                    <p>First time learning docker and dockerized project modules (FE, BE, DB).</p>
                                    <p>Learning how to use, Hosting platform Heroku, managing env variables.</p>
                                    <p>Setting up automatic deploy pipelines</p>
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

  .heroku-warning{
    background-color: grey;
    color: white;
    border-radius: .75rem;
    padding: .5rem;
  }
  
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

  .main-box {
    width: 40%;
  }

  .about, .tech, .lessons {
    border: 3px var(--text) solid;
    border-radius: .75rem;
    padding: 1rem;
  }

  .cta {
    font-size: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
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
