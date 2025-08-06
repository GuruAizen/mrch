import React from "react";
import page1 from "@/assets/form_templates/aditya_birla/aditya_birla_capital_page1.jpg";
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
  justify-content: start;
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
    `}/* border: 1px solid tomato; */
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

const AdityaBirlaPage1 = ({ data }) => {
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
        <BackgroundImage src={page1.src} alt="Background Form" />

        {/**********************************  TOLL FREE TAX  ****************************/}
        {renderParagraph(data?.tollFreePhoneNumber || "", 212, 475, 89, 18)}

        {/**********************************  HOSPITAL NAME  ****************************/}
        {renderParagraph(data?.nameOfTheHospital || "", 235, 175, 549, 18)}

        {/**********************************  HOSPITAL ADDRESS  ****************************/}
        {renderParagraph(data?.address || "", 260, 122, 622, 48)}

        {/**********************************  ROHINI ID  ****************************/}
        {renderParagraph(data?.rohiniId || "", 311, 126, 622, 18)}

        {/**********************************  EMAIL ID  ****************************/}
        {renderParagraph(data?.email || "", 336, 126, 622, 18)}

        {/**********************************  NAME OF THE PATIENT  ****************************/}
        {renderParagraph(data?.patientName || "", 400, 182, 570, 18)}

        {/********************************** GENDER ****************************/}
        {normalizeString(data?.gender) === "male" && (
          <Tick top={428} left={122}>
            ✔
          </Tick>
        )}
        {normalizeString(data?.gender) === "male" && (
          <Tick top={428} left={182}>
            ✔
          </Tick>
        )}
        {normalizeString(data?.gender) === "male" && (
          <Tick top={428} left={248}>
            ✔
          </Tick>
        )}
        {/**********************************  AGE  ****************************/}
        <EraseArea top={429} left={401} width={82} height={12} />

        {renderSingleCharByChar(
          parseAgeToYYMMCharsWithLabels(data?.age || ""),
          429,
          401,
          [10, 10, 18, 10, 10, 20]
        )}

        {/********************************** DOB DD MM YYYY  ****************************/}
        <EraseArea top={433} left={613} width={10} height={12} />
        <EraseArea top={433} left={630} width={10} height={12} />
        <EraseArea top={433} left={646} width={10} height={12} />
        <EraseArea top={433} left={662} width={10} height={12} />
        <EraseArea top={433} left={678} width={10} height={12} />
        <EraseArea top={433} left={695} width={10} height={12} />
        <EraseArea top={433} left={712} width={10} height={12} />
        <EraseArea top={433} left={728} width={10} height={12} />

        {renderSingleCharByChar(
          parseDOBtoDDMMYYYY(data?.dateOfBirth),
          431,
          613,
          [17, 17, 17, 17, 17, 17, 17]
        )}

        {/**********************************  CONTACT NUMBER  ****************************/}
        {renderSingleCharByChar(
          data?.contactNo || "",
          457,
          163,
          [19, 19, 19, 19, 19, 19, 19, 19, 19]
        )}

        {/**********************************  CONTACT NUMBER  ****************************/}
        {renderSingleCharByChar(
          data?.contactNoOfAttendingRelative || "",
          457,
          569,
          [19, 19, 19, 19, 19, 19, 19, 19, 19]
        )}

        {/**********************************  INSURED ID  ****************************/}
        {renderParagraph(data?.insuredIdCardNo || "", 479, 196, 192, 14)}

        {/**********************************  POLICY NO  ****************************/}
        {renderParagraph(data?.policyNumber || "", 500, 249, 484, 18)}

        {/**********************************  EMPLOYEE ID  ****************************/}
        {renderParagraph(data?.employeeId || "", 526, 146, 172, 18)}

        {/********************************** CURRENTLY DO YOU HAVE ANY OTHER MED CLAIM INSURANCE  ****************************/}
        {normalizeString(
          data?.currentlyDoYouHaveAnyOtherMedicalClaimHealthInsurance
        ) === "yes" && (
          <Tick top={556} left={390}>
            ✔
          </Tick>
        )}
        {normalizeString(
          data?.currentlyDoYouHaveAnyOtherMedicalClaimHealthInsurance
        ) === "no" && (
          <Tick top={556} left={445}>
            ✔
          </Tick>
        )}

        {/********************************** COMPANY NAME  ****************************/}
        {renderParagraph(
          normalizeString(
            data?.currentlyDoYouHaveAnyOtherMedicalClaimHealthInsurance
          ) === "yes"
            ? data?.currentMedicalInsuranceCompanyName || "-"
            : "-",
          580,
          167,
          543,
          14
        )}

        {/********************************** GIVE DETAILS  ****************************/}
        {renderParagraph(
          normalizeString(
            data?.currentlyDoYouHaveAnyOtherMedicalClaimHealthInsurance
          ) === "yes"
            ? data?.currentMedicalCompanyDetails || "-"
            : "-",
          604,
          157,
          573,
          16
        )}

        {/********************************** DO YOU HAVE A FAMILY PHYSICIAN  ****************************/}
        {normalizeString(data?.doYouHaveAFamilyPhysician) === "yes" && (
          <Tick top={633} left={242}>
            ✔
          </Tick>
        )}
        {normalizeString(data?.doYouHaveAFamilyPhysician) === "no" && (
          <Tick top={633} left={299}>
            ✔
          </Tick>
        )}

        {/********************************** NAME OF FAMILY PHYSICIAN  ****************************/}
        {renderParagraph(
          normalizeString(data?.doYouHaveAFamilyPhysician) === "yes"
            ? data?.familyPhysicianName || "-"
            : "-",
          655,
          234,
          482,
          16
        )}

        {/********************************** NAME OF FAMILY PHYSICIAN  ****************************/}
        {renderParagraph(
          normalizeString(data?.doYouHaveAFamilyPhysician) === "yes"
            ? data?.familyPhysicianContactNumber || "-"
            : "-",
          678,
          208,
          492,
          18
        )}

        {/**********************************  CURRENT ADDRESS OF INSURED PATIENT ****************************/}
        {renderParagraph(data?.currentPatientAddress || "", 702, 248, 482, 44)}
        {/**********************************  OCCUPATION OF INSURED PATIENT  ****************************/}
        {renderParagraph(data?.occupation || "", 754, 230, 492, 18)}

        {/**********************************   NAME OF TREATING DOCTOR  ****************************/}
        {renderParagraph(
          data?.nameOfTheTreatingDoctor || "",
          835,
          218,
          499,
          14
        )}

        {/**********************************  CONTACT NO  ****************************/}
        {renderParagraph(data?.contactNo || "", 860, 166, 182, 14)}

        {/**********************************  NATURE OF ILLNESS   ****************************/}
        {renderParagraph(
          data?.natureOfIllnessWithPresentingComplaints || "",
          882,
          343,
          404,
          18
        )}

        {/**********************************  RELEVANT CLINICAL FINDINGS  ****************************/}
        {renderParagraph(
          data?.relevantClinicalFindings || "",
          911,
          206,
          532,
          14,
          12
        )}
        {/**********************************  DURATION OF PRESENT AILMENT  ****************************/}
        {renderParagraph(
          data?.presentAilmentDuration || "",
          937,
          233,
          115,
          18,
          12,
          true
        )}

        {/********************************** DATE OF FIRST CONSULTATION  ****************************/}
        <EraseArea top={969} left={230} width={10} height={10} />
        <EraseArea top={969} left={246} width={10} height={10} />
        <EraseArea top={969} left={262} width={10} height={10} />
        <EraseArea top={969} left={278} width={10} height={10} />
        <EraseArea top={969} left={295} width={10} height={10} />
        <EraseArea top={969} left={312} width={10} height={10} />
        <EraseArea top={969} left={328} width={10} height={10} />
        <EraseArea top={969} left={345} width={10} height={10} />

        {renderSingleCharByChar(
          parseDOBtoDDMMYYYY(data?.dateOfFirstConsultation),
          966,
          230,
          [17, 17, 17, 17, 17, 17, 17]
        )}

        {/**********************************  PAST HISTORY  ****************************/}
        {renderParagraph(
          data?.pastHistoryOfPresentAilment || " - ",
          992,
          282,
          462,
          18
        )}

        {/**********************************  PROVISONAL DIAGNOSIS  ****************************/}
        {renderParagraph(data?.provisionalDiagnosis || "", 1017, 184, 570, 18)}

        {/**********************************  ICD 10 C0DE  ****************************/}
        {renderParagraph(data?.icd10Code || "", 1043, 159, 582, 18)}
      </PageWrapper>
    </PageContainer>
  );
};

export default AdityaBirlaPage1;
