import React from "react";
import styled from "styled-components";
import {Accordion, AccordionTab} from 'primereact/accordion';
import content from "./lessons-content.json"
import {ReactComponent as SwaggerIcon} from "../../static/icons/swagger.svg";

const LessonAccordions = () => {

    return (
        <LessonAccordionsStyle>
            <div className="accordion-demo">
                <div className="card">
                <Accordion className="parent-accordion">
                <AccordionTab header="read more">

                    <Accordion className="child-accordion" multiple>
                        <AccordionTab header="Front-end">
                            {content.FRONT.map((row) => (
                                    <p className="paragrapf" key={row}>{row}</p>
                                )
                            )}
                        </AccordionTab>
                        <AccordionTab header="Back-end">
                            {content.BACK.map((row, index) =>(
                                <p className={`paragrapf index${index}`} key={row}>{row}
                                    {index === 7 && (
                                        <span className={'span-swagger-icon'}>
                                            <a href={process.env.REACT_APP_SWAGGER_LINK} rel="noreferrer" target="_blank">
                                                <SwaggerIcon className="icon"/>
                                                </a>
                                            </span>
                                        )}
                                    </p>
                                )
                            )}

                        </AccordionTab>
                        <AccordionTab header="Database">
                            {content.DATABASE.map((row, index) =>
                                (
                                    <p className="paragrapf" key={row}>{row} with {index}</p>
                                )
                            )}
                        </AccordionTab>
                        <AccordionTab header="Hosting">
                            {content.HOSTING.map((row) =>
                                (
                                    <p className="paragrapf" key={row}>{row}</p>
                                )
                            )}
                        </AccordionTab>
                    </Accordion>
                </AccordionTab>
            </Accordion>
                    </div>
                    </div>
        </LessonAccordionsStyle>
    )
}

export default LessonAccordions

const LessonAccordionsStyle = styled.div`
  
  .paragrapf{
    padding: .5rem;

    &.index7{
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
  }
  
  .span-swagger-icon{
    padding-left: .2rem;
    
    .icon{
      height: 3vh;
      width: 3vw;
    }
  }

  .accordion-demo .accordion-custom i, .accordion-demo .accordion-custom span {
    vertical-align: middle;
  }

  .accordion-demo .accordion-custom span {
    margin: 0 .5rem;
  }

  .accordion-demo .p-accordion p {
    line-height: 1.5;
    margin: 0;
  }
  
  .p-accordion .p-accordion-tab:first-child .p-accordion-header .p-accordion-header-link {
    color: var(--text);
    background-color: var(--bkg);

    :hover {
      color: var(--details-bkg);
      background-color: var(--text);
    }
  }

  .p-accordion .p-accordion-tab .p-accordion-content {
    color: var(--text);
    background-color: var(--bkg);
  }

  .parent-accordion &.p-accordion .p-accordion-tab .p-accordion-header .p-accordion-header-link {
    color: var(--text);
    background-color: var(--bkg);
  }

  .child-accordion {
    &.p-accordion .p-accordion-tab .p-accordion-header .p-accordion-header-link {
      color: var(--text);
      background-color: var(--bkg);
      border: 1px solid #495057;

      :hover {
        color: var(--details-bkg);
        background-color: var(--text);
      }
    }
  }
  //
  .child-accordion {
    &.p-accordion .p-accordion-tab .p-accordion-content {
      margin: 1rem 0;
      padding: 1rem;
      border: #094067 2px solid;
      border-radius: 2rem;
      color: var(--text);
      background-color: var(--details-bkg);
    }
  }
`