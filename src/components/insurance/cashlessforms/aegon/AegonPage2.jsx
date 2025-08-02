import React from "react";
import page2 from "@/assets/form_templates/aegon_life/aegon_life_page2.jpg";
import styled, { css } from "styled-components";
import {
  ageGaps,
  dobGaps,
  getDateOnly,
  parseAgeToYYMM,
  parseAgeToYYMMCharsWithLabels,
  parseDOBtoDDMMYYYY,
  parseTimeToHHMM,
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
  z-index: 20;
  /* border: 1px solid tomato; */
`;

const Field = styled.div`
  position: absolute;
  font-size: 12px;
  font-family: Arial, sans-serif;
  color: #000;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  z-index: 20;
  text-transform: uppercase;
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
  text-transform: uppercase;
  ${({ whiteBg }) =>
    whiteBg &&
    css`
      background-color: white;
      color: black;
    `}
  /* border: 1px solid tomato; */
`;

const EraseArea = styled.div`
  position: absolute;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background-color: white;
  z-index: 10;
  opacity: 1;
  /* border: 1px solid tomato; */
`;

const AegonPage2 = ({ data }) => {
  const renderCharByChar = (text, top, left, gap) => {
    if (!text) return null;
    return [...(text || "")].map((char, index) => (
      <Field key={index} top={top} left={left + index * gap}>
        {char}
      </Field>
    ));
  };

  const renderCharByCharWithGaps = (
    text,
    top,
    left,
    gaps = [],
    defaultGap = 15.3
  ) => {
    const chars = [...(text || "")];
    let offset = 0;

    return chars.map((char, index) => {
      const field = (
        <Field key={index} top={top} left={left + offset}>
          {char}
        </Field>
      );
      offset += gaps[index] ?? defaultGap;
      return field;
    });
  };

  const renderParagraph = (
    text,
    top,
    left,
    width,
    height,
    fontSize,
    whiteBg = false
  ) => (
    <FieldBox
      top={top}
      left={left}
      width={width}
      height={height}
      fontSize={fontSize}
      whiteBg={whiteBg}
    >
      {text || ""}
    </FieldBox>
  );

  const renderSingleCharByChar = (text, top, left, gaps = []) => {
    return [...(text || "")].map((char, index) => {
      const offset = gaps.slice(0, index).reduce((acc, g) => acc + g, 0);
      return (
        <Field key={index} top={top} left={left + offset}>
          {char}
        </Field>
      );
    });
  };

  const proposedLineOfTreatmentFn = (keyword) => {
    const value = normalizeString(data?.proposedLineOfTreatment);
    return value.includes(normalizeString(keyword));
  };

  const routeOfDrugAdministrationFn = (keyword) => {
    const value = normalizeString(data?.routeOfDrugAdministration);
    return value.includes(normalizeString(keyword));
  };

  const isEmergencyType = (type = "") => {
    const event = normalizeString(data?.isThisAEmergencyOrPlannedEvent);
    return event.includes(normalizeString(type));
  };

  const safeUpper = (text = "") => {
    const normalized = normalizeString(text);
    if (normalized === "null" || normalized === "undefined") return "";
    return text;
  };

  return (
    <PageContainer>
      <PageWrapper pagebreak={true}>
        <BackgroundImage src={page2.src} alt="Background Form" />

        {/**********************************   NAME OF TREATING DOCTOR  ****************************/}
        {renderParagraph(
          data?.nameOfTheTreatingDoctor || "",
          104,
          298,
          419,
          20
        )}

        {/**********************************  CONTACT NO  ****************************/}
        {renderParagraph(
          data?.nameOfTheTreatingDoctor || "",
          140,
          236,
          482,
          18
        )}

        {/**********************************  NATURE OF ILLNESS   ****************************/}
        {renderParagraph(
          data?.natureOfIllnessWithPresentingComplaints || "",
          174,
          413,
          304,
          18
        )}

        {/**********************************  RELEVANT CLINICAL FINDINGS  ****************************/}
        {renderParagraph(
          data?.relevantClinicalFindings || "",
          208,
          236,
          482,
          18
        )}

        {/**********************************  DURATION OF PRESENT AILMENT  ****************************/}
        {renderParagraph(
          data?.presentAilmentDuration || "",
          242,
          353,
          88,
          22,
          12,
          true
        )}

        {/********************************** DATE OF FIRST CONSULTATION  ****************************/}
        <EraseArea top={263} left={465} width={122} height={22} />

        {renderSingleCharByChar(
          getDateOnly(data?.dateOfBirth),
          263,
          467,
          [8, 13, 13, 7, 13, 13, 7, 7, 7, 10]
        )}

        {/**********************************  PAST HISTORY  ****************************/}
        {renderParagraph(
          data?.pastHistoryOfPresentAilment || " - ",
          285,
          356,
          362,
          18
        )}

        {/**********************************  PROVISONAL DIAGNOSIS  ****************************/}
        {renderParagraph(data?.provisionalDiagnosis || "", 320, 239, 480, 18)}

        {/**********************************  ICD 10 C0DE  ****************************/}
        {renderParagraph(data?.icd10Code || "", 350, 236, 482, 18)}

        {/********************************** PROPOSED LINE OF TREATMENT ****************************/}
        {proposedLineOfTreatmentFn("medical management") && (
          <Tick top={402} left={322}>
            ✔
          </Tick>
        )}
        {proposedLineOfTreatmentFn("surgical management") && (
          <Tick top={420} left={322}>
            ✔
          </Tick>
        )}
        {proposedLineOfTreatmentFn("intensivecare") && (
          <Tick top={438} left={322}>
            ✔
          </Tick>
        )}
        {proposedLineOfTreatmentFn("investigation") && (
          <Tick top={454} left={322}>
            ✔
          </Tick>
        )}
        {proposedLineOfTreatmentFn("non-allopathic treatment") && (
          <Tick top={472} left={322}>
            ✔
          </Tick>
        )}

        {/**********************************  INVESTIGATION  ****************************/}
        {renderParagraph(
          data?.ifInvestigativeOfMedicalManagementProvideDetails || "",
          503,
          473,
          244,
          18
        )}

        {/**********************************  ROUTE OF DRUG   ****************************/}
        {renderParagraph(
          data?.routeOfDrugAdministration || "",
          538,
          300,
          412,
          18
        )}

        {/**********************************  SURGICAL NAME   ****************************/}
        {renderParagraph(data?.surgicalNameOfSurgery || "", 567, 300, 412, 18)}
        {/**********************************  ICD 10 PCS CODE   ****************************/}
        {renderParagraph(data?.icd10PcsCode || "", 593, 300, 412, 18)}

        {/**********************************  OTHER TREATMENT   ****************************/}
        {renderParagraph(
          data?.ifOtherTreatmentDetails || "",
          626,
          300,
          412,
          18
        )}

        {/**********************************  HOW DID INJURY OCCUR   ****************************/}
        {renderParagraph(data?.howDidInjuryOccur || "", 660, 240, 472, 18)}

        {/********************************** RTA  ****************************/}
        {normalizeString(data?.isItRta) === "yes" && (
          <Tick top={730} left={535}>
            ✔
          </Tick>
        )}
        {normalizeString(data?.isItRta) === "no" && (
          <Tick top={730} left={625}>
            ✔
          </Tick>
        )}
        {/********************************** EXPECTED DATE OF DELIVERY  ****************************/}
        <EraseArea top={760} left={565} width={122} height={22} />

        {renderSingleCharByChar(
          getDateOnly(data?.dateOfBirth),
          760,
          565,
          [8, 13, 13, 7, 13, 13, 7, 7, 7, 10]
        )}

        {/********************************** FIR NO  ****************************/}
        {renderParagraph(normalizeString(data?.firNo), 816, 237, 483, 18)}

        {/********************************** REPORTED TO POLICE  ****************************/}
        {normalizeString(data?.reportedToPolice) === "yes" && (
          <Tick top={788} left={535}>
            ✔
          </Tick>
        )}
        {normalizeString(data?.reportedToPolice) === "no" && (
          <Tick top={788} left={625}>
            ✔
          </Tick>
        )}
        {/********************************** ALCOHOL  ****************************/}
        {normalizeString(data?.injuryDueToAlcoholConsumption) === "yes" && (
          <Tick top={844} left={535}>
            ✔
          </Tick>
        )}
        {normalizeString(data?.injuryDueToAlcoholConsumption) === "no" && (
          <Tick top={844} left={625}>
            ✔
          </Tick>
        )}
        {/********************************** TEST CONDUCTED TO ESTABLISH  ****************************/}
        {normalizeString(data?.testsConductedToEstablish) === "yes" && (
          <Tick top={873} left={535}>
            ✔
          </Tick>
        )}
        {normalizeString(data?.testsConductedToEstablish) === "no" && (
          <Tick top={873} left={625}>
            ✔
          </Tick>
        )}
        {/********************************** IN CASE OF MATERNITY  ****************************/}
        {renderParagraph(data?.maternityG || "", 915, 255, 22, 15)}
        {renderParagraph(data?.maternityP || "", 915, 370, 22, 15)}
        {renderParagraph(data?.maternityL || "", 915, 484, 22, 15)}
        {renderParagraph(data?.maternityA || "", 915, 574, 22, 15)}

        {/********************************** EXPECTED DATE OF DELIVERY  ****************************/}
        <EraseArea top={946} left={445} width={122} height={22} />

        {renderSingleCharByChar(
          getDateOnly(data?.dateOfBirth),
          948,
          445,
          [8, 13, 13, 7, 13, 13, 7, 7, 7, 10]
        )}
      </PageWrapper>
    </PageContainer>
  );
};

export default AegonPage2;
