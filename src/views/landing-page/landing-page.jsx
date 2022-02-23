import React, {memo} from 'react'
import styled from 'styled-components'
import {ReactComponent as MongoIcon} from '../../static/icons/mongodb-icon.svg'
import {ReactComponent as ReactIcon} from '../../static/icons/reactjs-icon.svg'
import {ReactComponent as JavaIcon} from '../../static/icons/java-icon.svg'
import config from '../../config.json'
import CTAButton from "../../components/landing-page/CTA-button"
import {useNavigate} from 'react-router-dom'
import {setCurrentPage} from "../../slicers/adminSlice";
import {useAppDispatch} from "../../store";
import {motion} from "framer-motion";
import {leftSideTransition, rightSideTransition} from "../../static/animations/motion";
import LessonAccordions from "./lesson-accordions";

const LandingPage = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    return (
        <LandingPageStyle>
            <div className='main-div'>
                <h1>Welcome to Dater!</h1>
                <div className='main-content'>
                    <div className='first content-row'>
                        <motion.div
                            animate={rightSideTransition.animate}
                            initial={rightSideTransition.initial}
                            transition={rightSideTransition.transition}
                            className='cta'>
                            <CTAButton onClickHandler={() => {
                                navigate("/add")
                                dispatch(setCurrentPage("/add"))
                            }}/>
                        </motion.div>
                        <motion.article
                            animate={leftSideTransition.animate}
                            initial={leftSideTransition.initial}
                            transition={leftSideTransition.transition}
                            className='main-box about'
                        >
                            <h4>About</h4>
                            <div>
                                Dater is a event manager, which will send out an email if a
                                date is nearing.
                                <p className="heroku-warning">The initial load time might be longer than usual due to
                                    Heroku booting application up.</p>
                            </div>
                        </motion.article>

                    </div>
                    <div className='second content-row'>
                        <motion.article
                            animate={rightSideTransition.animate}
                            initial={rightSideTransition.initial}
                            transition={rightSideTransition.transition}
                            className="main-box">
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
                        </motion.article>
                        <motion.article
                            initial={leftSideTransition.initial}
                            animate={leftSideTransition.animate}
                            transition={leftSideTransition.transition}
                            className='main-box lessons'>
                            <h4>Lessons</h4>
                            <p>
                                The main difficulty was creating components as re-usable
                                as possible without over-engineering. Since it was first
                                time using mongoDB there were a few difficulties
                                integrating Spiring with mongoDB Atlas.
                            </p>
                            <LessonAccordions />
                        </motion.article>
                    </div>
                </div>
            </div>
        </LandingPageStyle>
    )
}

export default memo(LandingPage)

const LandingPageStyle = styled.div`
  transition: all 0.4s ease;
  padding: 2rem 2rem 30rem 2rem;

  .heroku-warning{
    background-color: grey;
    color: white;
    border-radius: .75rem;
    margin-top: .5rem;
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
