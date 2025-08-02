import React from "react";
import page1 from "@/assets/form_templates/medi_assist/medi_assist_cashless_claim_page_1.jpg";
import styled, { css } from "styled-components";
import {
  ageGaps,
  dobGaps,
  parseAgeToYYMM,
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

const MediAssistPage1 = ({ data }) => {
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

  const renderParagraph = (text, top, left, width, height, fontSize) => (
    <FieldBox
      top={top}
      left={left}
      width={width}
      height={height}
      fontSize={fontSize}
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
        <BackgroundImage src={page1.src} alt="Background Form" />
        {renderCharByChar(
          safeUpper(data?.nameOfTheHospital || ""),
          104,
          140,
          15.3
        )}
        {renderCharByChar(data?.hospitalLocation || "", 125, 140.4, 15.25)}
        {renderCharByChar(data?.hospitalId || "", 125, 600.4, 15.25)}
        {renderCharByChar(data?.email || "", 146, 140.4, 15.3)}
        {renderCharByChar(data?.rohiniId || "", 146, 553.4, 15.3)}
        {renderCharByChar(data?.patientName || "", 229, 140.9, 15.3)}

        {/* Gender tick */}
        {normalizeString(data?.gender) === "male" && (
          <Tick top={247} left={99}>
            ✔
          </Tick>
        )}
        {normalizeString(data?.gender) === "female" && (
          <Tick top={247} left={140}>
            ✔
          </Tick>
        )}
        {normalizeString(data?.gender) === "thirdgender" && (
          <Tick top={247} left={201}>
            ✔
          </Tick>
        )}
        {renderCharByChar(data?.contactNo || "", 250, 340, 15.3)}
        {renderCharByChar(data?.contactNo || "", 252, 600, 15.3)}

        {/* AGE YY MM */}
        <EraseArea top={274} left={100} width={8} height={12} />
        <EraseArea top={274} left={115} width={8} height={12} />
        <EraseArea top={274} left={162} width={10} height={12} />
        <EraseArea top={274} left={178} width={10} height={12} />
        {renderSingleCharByChar(
          parseAgeToYYMM(data?.age || ""),
          272,
          101,
          [15, 47, 15, 33]
        )}

        {/* DOB DD MM YYYY */}
        <EraseArea top={274} left={262} width={10} height={12} />
        <EraseArea top={274} left={277} width={10} height={11} />
        <EraseArea top={274} left={292} width={10} height={11} />
        <EraseArea top={274} left={309} width={8} height={11} />
        <EraseArea top={274} left={323} width={10} height={11} />
        <EraseArea top={274} left={338} width={10} height={11} />
        <EraseArea top={274} left={353} width={10} height={11} />
        <EraseArea top={274} left={369} width={10} height={10} />
        {renderSingleCharByChar(
          parseDOBtoDDMMYYYY(data?.dateOfBirth || ""),
          272,
          263,
          dobGaps
        )}

        {/* INSURED ID NUMBER */}
        {renderCharByChar(data?.insuredIdCardNo || "", 271, 479, 14.9)}

        {/* POLICY NO / NAME OF CORPORATE */}
        {renderCharByCharWithGaps(data?.corporate || "", 292, 187, [14])}

        {/* EMPLOYEE ID */}
        {renderCharByCharWithGaps(
          data?.employeeId || "",
          292,
          614,
          [14, 16, 15, 16]
        )}

        {/* MEDICAL CLAIM / HEALTH INSURANCE */}
        {normalizeString(
          data?.currentlyDoYouHaveAnyOtherMedicalClaimHealthInsurance
        ) === "yes" && (
          <Tick top={311} left={292}>
            ✔
          </Tick>
        )}
        {normalizeString(
          data?.currentlyDoYouHaveAnyOtherMedicalClaimHealthInsurance
        ) === "no" && (
          <Tick top={311} left={324}>
            ✔
          </Tick>
        )}

        {/* INSURER NAME */}
        {renderCharByCharWithGaps(
          data?.insuranceName || "",
          313,
          446,
          [15, 16, 15, 16, 15, 15, 15, 15, 15, 15]
        )}

        {/* GIVE DETAILS */}
        {renderParagraph(data?.giveDetails || "", 335, 106, 639, 32, 10)}

        {/* FAMILY PHYSICIAN NAME */}
        {renderCharByCharWithGaps(
          data?.familyPhysicianName || "",
          370,
          217,
          [15, 17, 15, 13, 15, 16, 15, 16, 15, 16, 15, 14, 15]
        )}

        {/* CONTACT NO */}
        {renderCharByCharWithGaps(
          data?.contactNo || "",
          370,
          600,
          [15, 15, 15, 14, 15, 16, 15, 16, 15, 16, 15, 14, 15]
        )}

        {/* OCCUPATION OF INSURED PATIENT */}
        {renderCharByCharWithGaps(
          data?.occupation || "",
          392,
          170,
          [16, 16, 15, 14, 15, 16, 15, 16, 15, 16, 15, 14, 15]
        )}

        {/* ADDRESS OF INSURED PATIENT */}
        {renderParagraph(data?.address || "", 414, 160, 585, 40)}

        {/* NAME OF TREATING DOCTOR */}
        {renderCharByCharWithGaps(
          data?.nameOfTreatingDoctor || "",
          485,
          171,
          [16, 16, 15, 14, 15, 16, 15, 16, 15, 16, 15, 14, 15]
        )}

        {/* CONTACT NO */}
        {renderCharByCharWithGaps(
          data?.contactNo || "",
          485,
          600,
          [15, 15, 15, 14, 15, 16, 15, 16, 15, 16, 15, 14, 15]
        )}

        {/* NAME OF ILLNESS / DISEASE WITH PRESENTING COMPLAINTS */}
        {renderParagraph(
          data?.natureOfIllnessWithPresentingComplaints || "",
          525,
          49,
          338,
          38
        )}

        {/* RELEVANT CLINICAL FINDINGS */}
        {renderParagraph(
          data?.relevantClinicalFindings || "",
          525,
          403,
          340,
          38
        )}

        {/* DURATION OF PRESENT AILMENT */}
        {renderParagraph(data?.presentAilmentDuration || "", 575, 175, 55, 14)}

        {/* DATE OF FIRST CONSULTATION DD MM YYYY */}
        <EraseArea top={575} left={380} width={10} height={14} />
        <EraseArea top={575} left={395} width={10} height={14} />
        <EraseArea top={575} left={410} width={10} height={14} />
        <EraseArea top={575} left={426} width={10} height={14} />
        <EraseArea top={575} left={441} width={10} height={14} />
        <EraseArea top={575} left={456} width={10} height={14} />
        <EraseArea top={575} left={472} width={10} height={14} />
        <EraseArea top={575} left={487} width={10} height={14} />
        {renderSingleCharByChar(
          parseDOBtoDDMMYYYY(data?.dateOfBirth || ""),
          574,
          381,
          dobGaps
        )}

        {/* PAST HISTORY OF PRESENT AILMENT */}
        {renderParagraph(
          data?.pastHistoryPresentIllness || "",
          600,
          197,
          548,
          20
        )}

        {/* PROVISIONAL DIAGNOSIS */}
        {renderParagraph(
          data?.pastHistoryPresentIllness || "",
          637,
          50,
          540,
          37
        )}

        {/* ICD 10 CODE */}
        {renderCharByCharWithGaps(
          data?.icd10Code || "",
          637,
          599,
          [16, 16, 15, 14, 15, 16, 15, 16, 15, 16, 15, 14, 15]
        )}

        {/* PROPOSED LINE OF TREATMENT */}
        {proposedLineOfTreatmentFn("medical management") && (
          <Tick top={685} left={170}>
            ✔
          </Tick>
        )}
        {proposedLineOfTreatmentFn("surgical management") && (
          <Tick top={685} left={289}>
            ✔
          </Tick>
        )}
        {proposedLineOfTreatmentFn("intensivecare") && (
          <Tick top={685} left={399}>
            ✔
          </Tick>
        )}
        {proposedLineOfTreatmentFn("investigation") && (
          <Tick top={685} left={497}>
            ✔
          </Tick>
        )}
        {proposedLineOfTreatmentFn("non-allopathic treatment") && (
          <Tick top={685} left={583.5}>
            ✔
          </Tick>
        )}

        {/* INVESTIGATION / MEDICAL MANAGEMENT */}
        {renderParagraph(
          data?.ifInvestigativeOfMedicalManagementProvideDetails || "",
          724,
          48,
          340,
          42
        )}

        {/* ROUTE OF DRUG ADMINISTRATION */}
        {routeOfDrugAdministrationFn("iv medication") ? (
          <Tick top={724} left={398.5}>
            ✔
          </Tick>
        ) : routeOfDrugAdministrationFn("oral medication") ? (
          <Tick top={724} left={431.5}>
            ✔
          </Tick>
        ) : (
          <>
            <Tick top={724} left={470.5}>
              ✔
            </Tick>
            {renderParagraph(
              safeUpper(data?.routeOfDrugAdministration || ""),
              724,
              513,
              233,
              42
            )}
          </>
        )}

        {/* IF SURGICAL NAME OF SURGERY */}
        {renderParagraph(data?.surgicalNameOfSurgery || "", 788, 50, 540, 38)}

        {/* ICD 10 PCS CODE */}
        {renderCharByCharWithGaps(
          data?.icd10PcsCode || "",
          789,
          599,
          [16, 16, 15, 14, 15, 16, 15, 16, 15, 16, 15, 14, 15]
        )}

        {/* IF OTHER TREATMENT PROVIDE DETAILS */}
        {renderParagraph(data?.ifOtherTreatmentDetails || "", 851, 50, 338, 38)}

        {/* HOW DID INJURY OCCUR */}
        {renderParagraph(data?.howDidInjuryOccur || "", 853, 402, 342, 36)}

        {/* IN CASE OF ACCIDENT */}
        {normalizeString(data?.isItRta) === "yes" && (
          <Tick top={900} left={178}>
            ✔
          </Tick>
        )}
        {normalizeString(data?.isItRta) === "no" && (
          <Tick top={900} left={207.5}>
            ✔
          </Tick>
        )}

        {/* DATE OF INJURY DD MM YYYY */}
        <EraseArea top={900} left={308.5} width={10} height={14} />
        <EraseArea top={900} left={324} width={10} height={14} />
        <EraseArea top={900} left={339} width={10} height={14} />
        <EraseArea top={900} left={354.5} width={10} height={14} />
        <EraseArea top={900} left={370} width={10} height={14} />
        <EraseArea top={900} left={385} width={10} height={14} />
        <EraseArea top={900} left={400.5} width={10} height={14} />
        <EraseArea top={900} left={415.5} width={10} height={14} />
        {renderCharByCharWithGaps(
          parseDOBtoDDMMYYYY(data?.dateOfInjury || ""),
          898,
          310,
          [16, 16, 15, 14, 15, 16, 15, 16, 15, 16, 15, 14, 15]
        )}

        {/* REPORTED TO POLICE */}
        {normalizeString(data?.reportedToPolice) === "yes" && (
          <Tick top={897} left={528.9}>
            ✔
          </Tick>
        )}
        {normalizeString(data?.reportedToPolice) === "no" && (
          <Tick top={897} left={558.9}>
            ✔
          </Tick>
        )}

        {/* FIR NO */}
        {renderCharByCharWithGaps(
          data?.firNo || "",
          898,
          645,
          [16, 15, 15, 14, 15, 16, 15, 16, 15, 16, 15, 14, 15]
        )}

        {/* INJURY / DISEASE CAUSED DUE TO */}
        {normalizeString(data?.injuryDueToAlcoholConsumption) === "yes" && (
          <Tick top={925} left={330.5}>
            ✔
          </Tick>
        )}
        {normalizeString(data?.injuryDueToAlcoholConsumption) === "no" && (
          <Tick top={925} left={300.5}>
            ✔
          </Tick>
        )}

        {/* TEST CONDUCTED TO ESTABLISH */}
        {normalizeString(data?.testsConductedToEstablish) === "yes" && (
          <Tick top={925} left={603.5}>
            ✔
          </Tick>
        )}
        {normalizeString(data?.testsConductedToEstablish) === "no" && (
          <Tick top={925} left={634}>
            ✔
          </Tick>
        )}

        {/* IN CASE OF MATERNITY */}
        {renderCharByCharWithGaps(data?.maternityG || "", 953, 160, [16])}
        {renderCharByCharWithGaps(data?.maternityP || "", 953, 250, [16])}
        {renderCharByCharWithGaps(data?.maternityL || "", 953, 340, [16])}
        {renderCharByCharWithGaps(data?.maternityA || "", 953, 430, [16])}

        {/* EXPECTED DATE OF DELIVERY DD MM YYYY */}
        <EraseArea top={954} left={628} width={10} height={14} />
        <EraseArea top={954} left={643.5} width={10} height={14} />
        <EraseArea top={954} left={659} width={10} height={14} />
        <EraseArea top={954} left={674} width={10} height={14} />
        <EraseArea top={954} left={689} width={10} height={14} />
        <EraseArea top={954} left={705} width={10} height={14} />
        <EraseArea top={954} left={720} width={10} height={14} />
        <EraseArea top={954} left={735} width={10} height={14} />
        {renderCharByCharWithGaps(
          parseDOBtoDDMMYYYY(data?.expectedDateOfDelivery || ""),
          954,
          629,
          [16, 16, 15, 14, 16, 16, 15, 16, 15, 16, 15, 14, 15]
        )}

        {/* DATE OF ADMISSION DD MM YYYY */}
        <EraseArea top={1003} left={128.5} width={10} height={14} />
        <EraseArea top={1003} left={144.5} width={10} height={14} />
        <EraseArea top={1003} left={159.5} width={10} height={14} />
        <EraseArea top={1003} left={174.5} width={10} height={14} />
        <EraseArea top={1003} left={190} width={10} height={14} />
        <EraseArea top={1003} left={205} width={10} height={14} />
        <EraseArea top={1003} left={221} width={10} height={14} />
        <EraseArea top={1003} left={236.5} width={10} height={14} />
        {renderCharByCharWithGaps(
          parseDOBtoDDMMYYYY(data?.dateOfAdmission || ""),
          1002,
          129,
          [16, 16, 15, 15, 16, 16, 16, 14, 15, 16, 15, 14, 15]
        )}

        {/* TIME OF ADMISSION HH MM */}
        <EraseArea top={1003} left={345} width={10} height={14} />
        <EraseArea top={1003} left={360} width={10} height={14} />
        <EraseArea top={1003} left={375} width={10} height={14} />
        <EraseArea top={1003} left={390} width={10} height={14} />
        {renderCharByCharWithGaps(
          parseTimeToHHMM(data?.dateAndTimeOfAdmission || ""),
          1002,
          345,
          [16, 16, 15, 15]
        )}

        {/* THIS IS AN EMERGENCY PLANNED HOSPITAL EVENT */}
        {isEmergencyType("an emergency") && (
          <Tick top={1000} left={451}>
            ✔
          </Tick>
        )}
        {isEmergencyType("a planned hospitalization event") && (
          <Tick top={1000} left={527}>
            ✔
          </Tick>
        )}

        {/* EXPECTED NO OF DAYS IN HOSPITAL */}
        {renderParagraph(
          data?.expectedNoOfDaysStayInHospital || "",
          1027,
          190,
          55,
          14
        )}

        {/* DAYS IN ICU */}
        {renderParagraph(data?.daysInIcu || "", 1027, 344, 57, 16)}

        {/* ROOM TYPE */}
        {renderParagraph(data?.roomType || "", 1026, 526, 220, 16)}
      </PageWrapper>
    </PageContainer>
  );
};

export default MediAssistPage1;
