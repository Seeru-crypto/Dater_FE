import React, { memo } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as MongoIcon } from '../../static/icons/mongodb-icon.svg';
import { ReactComponent as ReactIcon } from '../../static/icons/reactjs-icon.svg';
import { ReactComponent as JavaIcon } from '../../static/icons/java-icon.svg';
import { ReactComponent as LinkedInIcon } from '../../static/icons/linkedin-icon.svg';
import config from '../../config.json';
import CTAButton from '../../components/landing-page/CTA-button';
import { setCurrentPage } from '../../slicers/adminSlice';
import { useAppDispatch } from '../../store';
import { leftSideTransition, rightSideTransition } from '../../static/animations/motion';
import LessonAccordions from './lesson-accordions';
import Pdf from '../../static/DaterArhitecture.pdf';
import ProjectCompoundArhitecture from '../../static/ProjectCompoundArhitecture.pdf';

function LandingPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return (
    <LandingPageStyle>
      <h1 className="title">Welcome to Dater!</h1>
      <div className="main-div">
        <div className="main-content">
          <div className="first content-row">
            <motion.div
              animate={rightSideTransition.animate}
              initial={rightSideTransition.initial}
              transition={rightSideTransition.transition}
              className="cta"
            >
              <CTAButton
                onClickHandler={() => {
                  navigate('/add');
                  dispatch(setCurrentPage('/add'));
                }}
              />
            </motion.div>
            <motion.article
              animate={leftSideTransition.animate}
              initial={leftSideTransition.initial}
              transition={leftSideTransition.transition}
              className="main-box about"
            >
              <h4>About</h4>
              <div>
                Dater is a event manager, which will send out an email or sms if a date is nearing, it is the first microservice of{' '}
                <a className="anchor-link" rel="noreferrer" target="_blank" href={ProjectCompoundArhitecture}>
                  project Compound.
                </a>
                <p>
                  Click here to see{' '}
                  <a className="anchor-link" rel="noreferrer" target="_blank" href={Pdf}>
                    dater architecture
                  </a>{' '}
                </p>
                <p className="heroku-warning">The initial load time might be longer than usual due to Heroku booting application up.</p>
              </div>
            </motion.article>
          </div>
          <div className="second content-row">
            <motion.article
              animate={rightSideTransition.animate}
              initial={rightSideTransition.initial}
              transition={rightSideTransition.transition}
              className="main-box"
            >
              <div className="tech">
                <div className="tech-first-row">
                  <h4>Tech</h4>
                  <a href={config.GITHUB_LINK} rel="noreferrer" target="_blank">
                    <i className="pi pi-github click-icon" />
                  </a>
                  <a href={config.LINKEDIN_LINK} rel="noreferrer" target="_blank">
                    <LinkedInIcon className="click-icon" />
                  </a>
                </div>
                <div className="tech-section">
                  <div className="section-row front-group">
                    <p>
                      <b>Front-end: </b>React with PrimeReact UI components.
                    </p>
                    <ReactIcon className="tech-svg" />
                  </div>
                  <div className="section-row back-group">
                    <p>
                      <b>Back-end: </b>Java spring framework (spring boot), with REST API endpoints.
                    </p>
                    <JavaIcon className="tech-svg" />
                  </div>
                  <div className="section-row">
                    <p>
                      <b>Database: </b> MongoDB
                    </p>
                    <MongoIcon className="tech-svg mongo" />
                  </div>
                  <div className="section-row hosting-group">
                    <p>
                      <b>Hosting:</b>
                      <span> Front- and back-end are hosted by Heroku. Database by MongoDB Atlas</span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.article>
            <motion.article
              initial={leftSideTransition.initial}
              animate={leftSideTransition.animate}
              transition={leftSideTransition.transition}
              className="main-box lessons"
            >
              <h4>Lessons</h4>
              <p className="lesson-intro">
                The main difficulty was creating components as re-usable as possible without over-engineering. Since it was first time using mongoDB
                there was a bit of a learning curve.
              </p>
              <LessonAccordions />
            </motion.article>
          </div>
        </div>
      </div>
    </LandingPageStyle>
  );
}

export default memo(LandingPage);

const LandingPageStyle = styled.div`
  transition: all 0.4s ease;
  padding: 2rem 2rem 30rem 2rem;

  .main-box.lessons {
    h4 {
      padding: 1rem 0;
    }

    .lesson-intro {
      padding-bottom: 0.5rem;
    }
  }

  .title {
    display: flex;
    justify-content: center;
  }

  .heroku-warning {
    background-color: grey;
    color: white;
    border-radius: 0.75rem;
    margin-top: 0.5rem;
    padding: 0.5rem;
  }

  .section-row {
    display: flex;
    justify-content: space-between;
  }

  .content-row {
    padding-top: 2rem;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-around;
  }

  .tech-svg {
    max-height: 3rem;
    max-width: 3rem;
    margin-left: 0.5rem;
    margin-bottom: -0.125em;

    &.mongo {
      margin-left: 0;
    }
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

  .main-box {
    width: 40%;
  }

  .about,
  .tech,
  .lessons {
    border: 3px var(--text) solid;
    border-radius: 0.75rem;
    padding: 1.5rem;
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

  .tech-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .click-icon {
    width: 3rem;
    height: 3rem;
    font-size: 2rem;
    padding-left: 1rem;
    text-decoration: none;
    color: var(--git-icon);
  }

  .tech-first-row {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .main-content {
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 960px) {
    .content-row {
      flex-direction: column-reverse;
      gap: 0.5rem;
      align-items: center;
    }

    .second.content-row {
      align-items: center;
      flex-direction: column;
      gap: 0.5rem;
    }
    article.main-box .tech {
      width: 90%;
    }

    .main-box {
      width: 100%;
      flex-direction: column;
      display: flex;
      align-items: center;
      justify-content: center;
      &.about,
      &.tech,
      &.lessons {
        width: 90%;
      }
    }
  }
`;
