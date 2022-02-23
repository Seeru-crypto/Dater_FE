import React from "react";
import styled from "styled-components";
import {Accordion, AccordionTab} from 'primereact/accordion';
import content from "./lessons-content.json"

const LessonAccordions = () => {

    return (
        <LessonAccordionsStyle>
            <Accordion className="parent-accordion">
                <AccordionTab header="read more">

                    <Accordion className="child-accordion" multiple>
                        <AccordionTab header="Front-end">
                            {content.FRONT.map((row) => (
                                    <p key={row}>{row}</p>
                                )
                            )}
                        </AccordionTab>
                        <AccordionTab header="Back-end">
                            {content.BACK.map((row) =>
                                (
                                    <p key={row}>{row}</p>
                                )
                            )}
                        </AccordionTab>
                        <AccordionTab header="Database">
                            {content.DATABASE.map((row) =>
                                (
                                    <p key={row}>{row}</p>
                                )
                            )}
                        </AccordionTab>
                        <AccordionTab header="Hosting">
                            {content.HOSTING.map((row) =>
                                (
                                    <p key={row}>{row}</p>
                                )
                            )}
                        </AccordionTab>
                    </Accordion>
                </AccordionTab>
            </Accordion>

        </LessonAccordionsStyle>
    )
}

export default LessonAccordions

const LessonAccordionsStyle = styled.div`
  
  .p-accordion .p-accordion-tab:first-child .p-accordion-header .p-accordion-header-link {
    color: var(--text);
    background-color: var(--bkg);
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

      :hover {
        color: var(--details-bkg);
        background-color: var(--text);
      }
    }
  }
  
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