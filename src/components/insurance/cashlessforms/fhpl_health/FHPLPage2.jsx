import React from "react";
import styled, { css } from "styled-components";
import page2 from "@/assets/form_templates/fhpl/FHPL_PAGE_2.jpg";
import {
  getTimeFromDate,
  getValidFormattedDate,
  hasValidDate,
  isValidDateValue,
} from "./functions";

export const normalizeString = (value) =>
  String(value ?? "")
    .replace(/[\u200B-\u200D\uFEFF\u00A0]/g, "")
    .trim()
    .toLowerCase();

const PageContainer = styled.div`
  position: relative;
  width: 210mm;
  height: 297mm;
  margin: 0 auto;

  @media print {
    position: relative;
    top: 0;
    left: 0;
    width: 210mm;
    height: 297mm;
    margin: 0;
  }
`;

const PageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 210mm;
  height: 297mm;
  box-sizing: border-box;
  z-index: 1;

  @media print {
    width: 210mm;
    height: 297mm;
    margin: 0;
    padding: 0;
    page-break-inside: avoid;
    ${({ pagebreak }) =>
      pagebreak &&
      css`
        page-break-after: always;
        break-after: page;
      `}
  }
`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 210mm;
  height: 297mm;
  object-fit: fill;
  margin: 0;
  padding: 0;
  pointer-events: none;
  user-select: none;
  z-index: 0;

  @media print {
    width: 210mm;
    height: 297mm;
    object-fit: fill;
  }
`;

const Tick = styled.div`
  position: absolute;
  font-size: 14px;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  /* border: 1px solid tomato; */
  /* background-color: red; */
`;

const Field = styled.div`
  position: absolute;
  font-size: 12px;
  font-family: Arial, sans-serif;
  color: #000;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  z-index: 20; // <-- ensure it is above EraseArea
  text-transform: uppercase; // Apply uppercase via CSS
  /* border: 1px dashed red; // Helps you visualize the box while aligning */
`;

const FieldBox = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-content: center;
  font-family: Arial, sans-serif;
  color: #000;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  font-size: ${({ fontSize }) => fontSize || 12}px;
  line-height: 1.4;
  white-space: pre-wrap;
  word-wrap: break-word;
  z-index: 20;
  text-align: center;
  vertical-align: middle;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: uppercase; // Apply uppercase via CSS
`;

//Apply whitener in specific area
const EraseArea = styled.div`
  position: absolute;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background-color: white; // or whatever color matches your form background
  z-index: 10; // Above background image, below text
  opacity: 1; // Fully opaque to hide background
  /* border: 1px solid tomato; */
`;

const FHPLPage2 = ({ data }) => {
  const renderParagraph = (
    text,
    top,
    left,
    width,
    height,
    fontSize,
    options = {} // optional borders
  ) => (
    <FieldBox
      top={top}
      left={left}
      width={width}
      height={height}
      fontSize={fontSize}
      style={{
        borderBottom: options.bottomBorder ? "1px solid black" : "none",
        // optionally keep red debug border for ALL calls
        // border: "1px dashed red",
      }}
    >
      {text || " - "}
    </FieldBox>
  );

  const proposedLineOfTreatmentFn = (keyword) =>
    data?.proposedLineOfTreatment
      ?.toLowerCase()
      .includes(keyword.toLowerCase()) || false;
  const isEmergencyType = (type = "") => {
    const event =
      data?.isThisAEmergencyOrPlannedEvent?.toLowerCase().trim() || "";
    return event.includes(type.toLowerCase().trim());
  };
  return (
    <PageContainer>
      <PageWrapper pageBreak={false}>
        <BackgroundImage src={page2.src} alt="Background Form" />

        {/**********************************  NATURE OF ILLNESS / DISEASE   ****************************/}
        {renderParagraph(
          data?.natureOfIllnessWithPresentingComplaints || "",
          98,
          384,
          193,
          20
        )}
        {/********************************** RELEVANT FINDINGS  ****************************/}
        {renderParagraph(
          data?.relevantClinicalFindings || "",
          125,
          347,
          233,
          20
        )}
        {/**********************************  DURATION OF PRESENT AILMENT  ****************************/}
        {renderParagraph(data?.presentAilmentDuration || "", 149, 346, 97, 20)}
        {/**********************************  DATE OF FIRST CONSULTATION  ****************************/}
        <EraseArea top={172} left={337} width={115} height={20} />

        {renderParagraph(
          data?.doctorDateOfFirstConsultation || "",
          172,
          337,
          115,
          20,
          { bottomBorder: true }
        )}
        {/**********************************  PAST HISTORY OF PRESENT AILMENT  ****************************/}
        {renderParagraph(
          data?.pastHistoryOfPresentAilment || "",
          194,
          325,
          225,
          20
        )}
        {/**********************************  PROVISIONAL DIAGNOSIS  ****************************/}
        {renderParagraph(data?.provisionalDiagnosis || "", 221, 348, 233, 20)}

        {/**********************************  ICD 10 CODE  ****************************/}
        {renderParagraph(data?.icd10Code || "", 245, 348, 233, 20)}

        {/********************************** PROPOSED LINE OF TREATMENT ****************************/}
        {proposedLineOfTreatmentFn("medical management") && (
          <Tick top={302} left={365}>
            ✔
          </Tick>
        )}
        {proposedLineOfTreatmentFn("surgical management") && (
          <Tick top={329} left={365}>
            ✔
          </Tick>
        )}
        {proposedLineOfTreatmentFn("intensivecare") && (
          <Tick top={354} left={365}>
            ✔
          </Tick>
        )}
        {proposedLineOfTreatmentFn("investigation") && (
          <Tick top={380} left={365}>
            ✔
          </Tick>
        )}
        {proposedLineOfTreatmentFn("non-allopathic treatment") && (
          <Tick top={406} left={365}>
            ✔
          </Tick>
        )}

        {/********************************** INVESTIGATION / MEDICAL MANAGEMENT ****************************/}
        {renderParagraph(
          data?.ifInvestigativeOfMedicalManagementProvideDetails || "",
          424,
          430,
          160,
          20
        )}
        {/**********************************  ROUTE OF DRUG ADMINISTATION  ****************************/}
        {renderParagraph(
          data?.routeOfDrugAdministration || "",
          451,
          341,
          233,
          20
        )}
        {/**********************************  IF SURGICAL, NAME OF SURGERY  ****************************/}
        {renderParagraph(data?.surgicalNameOfSurgery || "", 474, 341, 233, 20)}
        {/**********************************  ICD 10 PCS CODE  ****************************/}
        {renderParagraph(data?.icd10PcsCode || "", 499, 341, 233, 20)}
        {/**********************************  IF OTHER TREATMENT PROVIDE DETAILS  ****************************/}
        {renderParagraph(
          data?.ifOtherTreatmentDetails || "",
          525,
          341,
          233,
          20
        )}
        {/**********************************  HOW DID INJURY OCCUR  ****************************/}
        {renderParagraph(data?.howDidInjuryOccur || "", 551, 341, 233, 20)}

        {/********************************** IN CASE OF ACCIDENT ****************************/}
        {normalizeString(data?.isItRta) === "yes" && (
          <Tick top={600} left={342}>
            ✔
          </Tick>
        )}
        {normalizeString(data?.isItRta) === "no" && (
          <Tick top={606} left={423}>
            ✔
          </Tick>
        )}
        {/********************************** DATE OF INJURY DD MM YYYY  ****************************/}
        {renderParagraph(
          getValidFormattedDate(data?.dateOfInjury),
          634,
          210,
          103,
          20,
          { bottomBorder: true }
        )}

        {hasValidDate(data?.dateOfInjury) === "yes" && (
          <Tick top={634} left={342}>
            ✔
          </Tick> // Yes
        )}

        {hasValidDate(data?.dateOfInjury) === "no" && (
          <Tick top={634} left={420}>
            ✔
          </Tick> // No
        )}

        {/********************************** REPORTED TO POLICE ****************************/}
        {normalizeString(data?.reportedToPolice) === "yes" && (
          <Tick top={663} left={342}>
            ✔
          </Tick>
        )}
        {normalizeString(data?.reportedToPolice) === "no" && (
          <Tick top={663} left={421}>
            ✔
          </Tick>
        )}
        {/********************************** FIR NO  ****************************/}

        {renderParagraph(data?.firNo || "", 688, 303, 197, 20, {
          bottomBorder: true,
        })}
        {/********************************** INJURY / DISEASE CAUSED DUE TO  ****************************/}
        {normalizeString(data?.injuryDueToAlcoholConsumption) === "yes" && (
          <Tick top={713} left={517}>
            ✔
          </Tick>
        )}
        {normalizeString(data?.injuryDueToAlcoholConsumption) === "no" && (
          <Tick top={713} left={598}>
            ✔
          </Tick>
        )}
        {/********************************** TEST CONDUCTED TO ESTABLISH  ****************************/}
        {normalizeString(data?.testsConductedToEstablish) === "yes" && (
          <Tick top={748} left={517}>
            ✔
          </Tick>
        )}
        {normalizeString(data?.testsConductedToEstablish) === "no" && (
          <Tick top={748} left={597}>
            ✔
          </Tick>
        )}
        {/********************************** IN CASE OF MATERNITY  ****************************/}
        {renderParagraph(data?.maternityG || "", 783, 345, 22, 15)}
        {renderParagraph(data?.maternityP || "", 783, 410, 22, 15)}
        {renderParagraph(data?.maternityL || "", 783, 474, 22, 15)}
        {renderParagraph(data?.maternityA || "", 784, 544, 22, 15)}

        {/********************************** EXPECTED DATE OF DELIVERY DD MM YYYY  ****************************/}
        <EraseArea top={813} left={400} width={95} height={20} />

        {renderParagraph(
          getValidFormattedDate(data?.expectedDateOfDelivery),
          813,
          400,
          95,
          20,
          { bottomBorder: true }
        )}

        {/********************************** DATE OF ADMISSION DD MM YYYY  ****************************/}
        <EraseArea top={880} left={438} width={95} height={20} />

        {renderParagraph(
          getValidFormattedDate(data?.dateAndTimeOfAdmission),
          880,
          438,
          95,
          20,
          { bottomBorder: true }
        )}
        {/********************************** DATE OF ADMISSION DD MM YYYY  ****************************/}
        <EraseArea top={912} left={438} width={95} height={20} />

        {renderParagraph(
          getTimeFromDate(data?.dateAndTimeOfAdmission),
          912,
          438,
          95,
          20,
          { bottomBorder: true }
        )}
        {/********************************** THIS IS AN EMERGENCY PLANNED HOSPITAL EVENT ****************************/}
        {isEmergencyType("an emergency") && (
          <Tick top={950} left={485}>
            ✔
          </Tick>
        )}
        {isEmergencyType("a planned hospitalization event") && (
          <Tick top={950} left={590}>
            ✔
          </Tick>
        )}
      </PageWrapper>
    </PageContainer>
  );
};

export default FHPLPage2;
