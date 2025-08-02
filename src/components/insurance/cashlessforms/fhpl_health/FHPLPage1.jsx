import React from "react";
import styled, { css } from "styled-components";
import page1 from "@/assets/form_templates/fhpl/FHPL_PAGE_1.jpg";

import {
  ageGaps,
  dateGaps,
  getDateOnly,
  parseAgeToYYMM,
  parseAgeToYYMMChars,
  parseAgeToYYMMCharsWithLabels,
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
  /* font-size: 8px; */
  display: flex;
  justify-content: center;
  align-content: center;
  font-family: Arial, sans-serif;
  color: #000;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  font-size: ${({ fontSize }) => fontSize || "12"}px;
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

const FHPLPage1 = ({ data }) => {
  const renderCharByChar = (text, top, left, gap) => {
    if (typeof text !== "string") return null;

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

      // Add next gap or default gap for next char
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
      // style={{ border: "1px solid tomato" }}
    >
      {text || ""}
    </FieldBox>
  );

  const proposedLineOfTreatmentFn = (keyword) =>
    data?.proposedLineOfTreatment
      ?.toLowerCase()
      .includes(keyword.toLowerCase()) || false;

  const routeOfDrugAdministrationFn = (keyword) =>
    data?.routeOfDrugAdministration
      ?.toLowerCase()
      .includes(keyword.toLowerCase()) || false;

  const isEmergencyType = (type = "") => {
    const event =
      data?.isThisAEmergencyOrPlannedEvent?.toLowerCase().trim() || "";
    return event.includes(type.toLowerCase().trim());
  };
  /*****************GAP FOR EVERY CHARACTER ********************/
  const renderSingleCharByChar = (text, top, left, gaps = []) => {
    return [...(text || "")].map((char, index) => {
      // Calculate left offset by summing all previous gaps + base left
      const offset = gaps.slice(0, index).reduce((acc, g) => acc + g, 0);

      return (
        <Field key={index} top={top} left={left + offset}>
          {char}
        </Field>
      );
    });
  };

  const safeUpper = (text = "") => {
    if (!text || typeof text !== "string") return "";

    const trimmed = text.trim().toLowerCase();
    if (trimmed === "null" || trimmed === "undefined") return "";

    return text;
  };
  return (
    <PageContainer>
      <PageWrapper pageBreak={false}>
        <BackgroundImage src={page1.src} alt="Background Form" />

        {/********************************** NAME OF TPA  ****************************/}
        {renderParagraph(data?.insuranceName || " - ", 193, 377, 233, 18)}

        {/********************************** TOLL FREE PHONE NUMBER  ****************************/}
        {renderParagraph(data?.tollFreePhoneNumber || " - ", 215, 377, 233, 18)}

        {/**********************************  TOLL FREE TAX  ****************************/}
        {renderParagraph(data?.tollFreeTax || " - ", 237, 377, 233, 18)}

        {/********************************** NAME OF THE HOSPITAL ****************************/}
        {renderParagraph(data?.nameOfTheHospital || " - ", 260, 377, 233, 18)}

        {/********************************** I) ADDRESS  ****************************/}
        {renderParagraph(data?.address || " - ", 283, 377, 233, 18)}

        {/********************************** ROHINI ID ****************************/}
        {renderParagraph(data?.rohiniId || " - ", 305, 377, 233, 18)}

        {/********************************** EMAIL ID  ****************************/}
        {renderParagraph(data?.hospitalEmail || " - ", 328, 377, 233, 18)}

        {/********************************** NAME OF THE PATIENT ****************************/}
        {renderParagraph(data?.patientName || " - ", 402, 377, 233, 18)}

        {/********************************** GENDER ****************************/}
        {(data?.gender?.trim()?.toLowerCase() || "") === "male" && (
          <Tick top={432} left={340}>
            ✔
          </Tick>
        )}
        {(data?.gender?.trim()?.toLowerCase() || "") === "female" && (
          <Tick top={432} left={433}>
            ✔
          </Tick>
        )}
        {(data?.gender?.trim()?.toLowerCase() || "") === "thirdgender" && (
          <Tick top={432} left={535}>
            ✔
          </Tick>
        )}

        {/**********************************AGE 5 Y MM YY ****************************/}
        <EraseArea top={466} left={375} width={110} height={18} />

        {renderSingleCharByChar(
          parseAgeToYYMMCharsWithLabels(data?.age || ""),
          468,
          377,
          [10, 10, 20, 10, 10, 20]
        )}
        {/********************************** DOB DD MM YYYY  ****************************/}
        <EraseArea top={499} left={375} width={112} height={18} />

        {renderSingleCharByChar(
          getDateOnly(data?.dateOfBirth),
          500,
          375,
          [8, 13, 13, 7, 13, 13, 7, 7, 7, 10]
        )}
        {/********************************** CONTACT NUMBER  ****************************/}
        {renderParagraph(data?.contactNo || " - ", 526, 377, 233, 18)}

        {/********************************** CONTACT NUMBER OF ATTENDING RELATIVE ****************************/}
        {renderParagraph(data?.contactNo || " - ", 551, 377, 233, 18)}

        {/********************************** INSURED CARD ID NUMBER  ****************************/}
        {renderParagraph(data?.insuredIdCardNo || " - ", 576, 377, 233, 18)}

        {/**********************************  POLICY NUMBER / NAME OF CORPORATE ****************************/}
        {renderParagraph(data?.policyId || " - ", 601, 377, 233, 18)}

        {/* {renderParagraph(data?.corporate || "", 564.5, 347, 213, 12.5)} */}

        {/********************************** EMPLOYEE ID  ****************************/}
        {renderParagraph(data?.employeeId || " - ", 625, 377, 233, 18)}

        {/********************************** CURRENTLY DO YOU HAVE ANY OTHER MED CLAIM INSURANCE  ****************************/}
        {normalizeString(
          data?.currentlyDoYouHaveAnyOtherMedicalClaimHealthInsurance
        ) === "yes" && (
          <Tick top={661} left={530}>
            ✔
          </Tick>
        )}
        {normalizeString(
          data?.currentlyDoYouHaveAnyOtherMedicalClaimHealthInsurance
        ) === "no" && (
          <Tick top={661} left={605}>
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
          685,
          377,
          233,
          16
        )}

        {/********************************** GIVE DETAILS  ****************************/}
        {renderParagraph(
          normalizeString(
            data?.currentlyDoYouHaveAnyOtherMedicalClaimHealthInsurance
          ) === "yes"
            ? data?.currentMedicalCompanyDetails || "-"
            : "-",
          706,
          377,
          233,
          18
        )}

        {/********************************** DO YOU HAVE A FAMILY PHYSICIAN  ****************************/}
        {normalizeString(data?.doYouHaveAFamilyPhysician) === "yes" && (
          <Tick top={734} left={535}>
            ✔
          </Tick>
        )}
        {normalizeString(data?.doYouHaveAFamilyPhysician) === "no" && (
          <Tick top={734} left={606}>
            ✔
          </Tick>
        )}

        {/********************************** NAME OF FAMILY PHYSICIAN  ****************************/}
        {renderParagraph(
          normalizeString(data?.doYouHaveAFamilyPhysician) === "yes"
            ? data?.familyPhysicianName || "-"
            : "-",
          757,
          377,
          233,
          18
        )}

        {/********************************** NAME OF FAMILY PHYSICIAN  ****************************/}
        {renderParagraph(
          normalizeString(data?.doYouHaveAFamilyPhysician) === "yes"
            ? data?.familyPhysicianContactNumber || "-"
            : "-",
          784,
          377,
          233,
          18
        )}

        {/**********************************  CURRENT ADDRESS OF INSURED PATIENT ****************************/}
        {renderParagraph(data?.currentPatientAddress || "", 806, 377, 233, 18)}
        {/**********************************  OCCUPATION OF INSURED PATIENT  ****************************/}
        {renderParagraph(data?.occupation || "", 831, 378, 232, 18)}

        {/**********************************  NAME OF TREATING DOCTOR  ****************************/}
        {renderParagraph(
          data?.nameOfTheTreatingDoctor || "",
          974,
          348,
          229,
          18
        )}
        {/**********************************  CONTACT NUMBER  ****************************/}
        {renderParagraph(data?.doctorContactNo || "", 997, 348, 229, 18)}
      </PageWrapper>
    </PageContainer>
  );
};

export default FHPLPage1;
