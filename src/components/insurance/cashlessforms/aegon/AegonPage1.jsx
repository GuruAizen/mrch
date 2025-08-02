import React from "react";
import page1 from "@/assets/form_templates/aegon_life/aegon_life_page1.jpg";
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

const AegonPage1 = ({ data }) => {
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

        {/**********************************  HOSPITAL NAME  ****************************/}
        {renderParagraph(data?.nameOfTheHospital || "", 273, 238, 479, 20)}

        {/**********************************  HOSPITAL ADDRESS  ****************************/}
        {renderParagraph(data?.address || "", 312, 176, 542, 18)}

        {/**********************************  ROHINI ID  ****************************/}
        {renderParagraph(data?.rohiniId || "", 335, 176, 542, 18)}

        {/**********************************  EMAIL ID  ****************************/}
        {renderParagraph(data?.email || "", 358, 176, 542, 18)}

        {/**********************************  NAME OF THE PATIENT  ****************************/}
        {renderParagraph(data?.patientName || "", 416, 236, 482, 18)}

        {/********************************** GENDER ****************************/}
        {normalizeString(data?.gender) === "male" && (
          <Tick top={452} left={202}>
            ✔
          </Tick>
        )}
        {normalizeString(data?.gender) === "female" && (
          <Tick top={452} left={379}>
            ✔
          </Tick>
        )}
        {normalizeString(data?.gender) === "thirdgender" && (
          <Tick top={452} left={535}>
            ✔
          </Tick>
        )}
        {/**********************************  AGE  ****************************/}
        {renderSingleCharByChar(
          parseAgeToYYMMCharsWithLabels(data?.age || ""),
          488,
          247,
          [10, 10, 110, 10, 10, 20]
        )}

        {/********************************** DOB DD MM YYYY  ****************************/}
        <EraseArea top={515} left={365} width={122} height={22} />

        {renderSingleCharByChar(
          getDateOnly(data?.dateOfBirth),
          515,
          375,
          [8, 13, 13, 7, 13, 13, 7, 7, 7, 10]
        )}

        {/**********************************  CONTACT NUMBER  ****************************/}
        {renderParagraph(data?.contactNo || "", 553, 236, 482, 18)}

        {/**********************************  CONTACT NUMBER  ****************************/}
        {renderParagraph(
          data?.contactNoOfAttendingRelative || "",
          586,
          299,
          412,
          18
        )}

        {/**********************************  INSURED ID  ****************************/}
        {renderParagraph(data?.insuredIdCardNo || "", 620, 236, 482, 18)}

        {/**********************************  POLICY NO  ****************************/}
        {renderParagraph(data?.policyNumber || "", 655, 299, 414, 18)}

        {/**********************************  EMPLOYEE ID  ****************************/}
        {renderParagraph(data?.employeeId || "", 690, 236, 482, 18)}

        {/********************************** CURRENTLY DO YOU HAVE ANY OTHER MED CLAIM INSURANCE  ****************************/}
        {normalizeString(
          data?.currentlyDoYouHaveAnyOtherMedicalClaimHealthInsurance
        ) === "yes" && (
          <Tick top={727} left={490}>
            ✔
          </Tick>
        )}
        {normalizeString(
          data?.currentlyDoYouHaveAnyOtherMedicalClaimHealthInsurance
        ) === "no" && (
          <Tick top={727} left={580}>
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
          764,
          237,
          483,
          16
        )}

        {/********************************** GIVE DETAILS  ****************************/}
        {renderParagraph(
          normalizeString(
            data?.currentlyDoYouHaveAnyOtherMedicalClaimHealthInsurance
          ) === "yes"
            ? data?.currentMedicalCompanyDetails || "-"
            : "-",
          796,
          237,
          483,
          18
        )}

        {/********************************** DO YOU HAVE A FAMILY PHYSICIAN  ****************************/}
        {normalizeString(data?.doYouHaveAFamilyPhysician) === "yes" && (
          <Tick top={832} left={435}>
            ✔
          </Tick>
        )}
        {normalizeString(data?.doYouHaveAFamilyPhysician) === "no" && (
          <Tick top={832} left={535}>
            ✔
          </Tick>
        )}

        {/********************************** NAME OF FAMILY PHYSICIAN  ****************************/}
        {renderParagraph(
          normalizeString(data?.doYouHaveAFamilyPhysician) === "yes"
            ? data?.familyPhysicianName || "-"
            : "-",
          867,
          298,
          422,
          18
        )}

        {/********************************** NAME OF FAMILY PHYSICIAN  ****************************/}
        {renderParagraph(
          normalizeString(data?.doYouHaveAFamilyPhysician) === "yes"
            ? data?.familyPhysicianContactNumber || "-"
            : "-",
          902,
          298,
          422,
          18
        )}

        {/**********************************  CURRENT ADDRESS OF INSURED PATIENT ****************************/}
        {renderParagraph(data?.currentPatientAddress || "", 936, 298, 422, 18)}
        {/**********************************  OCCUPATION OF INSURED PATIENT  ****************************/}
        {renderParagraph(data?.occupation || "", 970, 298, 422, 18)}
      </PageWrapper>
    </PageContainer>
  );
};

export default AegonPage1;
