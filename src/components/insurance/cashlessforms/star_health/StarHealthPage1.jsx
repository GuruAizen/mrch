import React from "react";
import page1 from "@/assets/form_templates/star_health/star_health_page_1.jpg";

import styled, { css } from "styled-components";
import {
  getDateOnly,
  parseAgeToYYMM,
  parseAgeToYYMMChars,
  dateGaps,
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
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-content: center;
  font-family: Arial, sans-serif;
  color: #000;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
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

const StarHealthPage1 = ({ data }) => {
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

  const renderParagraph = (text, top, left, width, height) => (
    <FieldBox
      top={top}
      left={left}
      width={width}
      height={height}
      //   style={{ border: "1px solid tomato" }}
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
      <PageWrapper pageBreak={true}>
        <BackgroundImage src={page1.src} alt="Background Form" />

        {/********************************** NAME OF TPA  ****************************/}
        {/* {renderParagraph(data?.insuranceName || " - ", 185, 347, 213, 12.5)} */}

        {/********************************** TOLL FREE PHONE NUMBER  ****************************/}
        {renderParagraph(data?.tollFreePhoneNumber || " - ", 265, 243, 463, 14)}

        {/**********************************  TOLL FREE TAX  ****************************/}
        {renderParagraph(data?.tollFreeTax || " - ", 296, 243, 463, 14)}

        {/********************************** NAME OF THE HOSPITAL ****************************/}
        {renderParagraph(data?.nameOfTheHospital || " - ", 329, 243, 463, 14)}

        {/********************************** I) ADDRESS  ****************************/}
        {renderParagraph(data?.address || " - ", 353, 243, 463, 14)}

        {/********************************** ROHINI ID ****************************/}
        {renderParagraph(data?.rohiniId || " - ", 375, 243, 463, 14)}

        {/********************************** EMAIL ID  ****************************/}
        {renderParagraph(data?.hospitalEmail || " - ", 399, 243, 463, 14)}

        {/********************************** NAME OF THE PATIENT ****************************/}
        {renderParagraph(data?.patientName || " - ", 453, 243, 463, 14)}

        {/********************************** GENDER ****************************/}
        {normalizeString(data?.gender) === "male" && (
          <Tick top={480} left={290}>
            ✔
          </Tick>
        )}
        {normalizeString(data?.gender) === "female" && (
          <Tick top={480} left={410}>
            ✔
          </Tick>
        )}
        {normalizeString(data?.gender) === "thirdgender" && (
          <Tick top={480} left={530}>
            ✔
          </Tick>
        )}

        {/**********************************AGE 5 Y MM YY ****************************/}
        {/* <EraseArea top={434} left={345} width={95} height={12} /> */}

        {renderSingleCharByChar(
          parseAgeToYYMMCharsWithLabels(data?.age || ""),
          513,
          325,
          [8, 12, 23, 8, 12]
        )}
        {/********************************** DOB DD MM YYYY  ****************************/}
        {/* <EraseArea top={465} left={345} width={102} height={12} /> */}

        {renderSingleCharByChar(
          getDateOnly(data?.dateOfBirth),
          543,
          325,
          dateGaps
        )}
        {/********************************** CONTACT NUMBER  ****************************/}
        {renderParagraph(data?.contactNo || " - ", 572, 365, 333, 14)}

        {/********************************** CONTACT NUMBER OF ATTENDING RELATIVE ****************************/}
        {renderParagraph(data?.contactNo || " - ", 604, 365, 333, 14)}

        {/********************************** INSURED CARD ID NUMBER  ****************************/}
        {renderParagraph(data?.insuredIdCardNo || " - ", 636, 365, 333, 14)}

        {/********************************** PAN NUMBER OF THE PROSPER  ****************************/}
        {renderParagraph(data?.patientPanNumber || " - ", 688, 110, 157, 14)}

        {/********************************** CKYC   ****************************/}
        {renderParagraph(data?.patientPanNumber || " - ", 688, 365, 333, 14)}

        {/**********************************  POLICY NUMBER / NAME OF CORPORATE ****************************/}
        {renderParagraph(data?.policyId || " - ", 719, 365, 333, 14)}

        {/* {renderParagraph(data?.corporate || "", 564.5, 347, 213, 12.5)} */}

        {/********************************** EMPLOYEE ID  ****************************/}
        {renderParagraph(data?.employeeId || " - ", 750, 365, 333, 14)}

        {/********************************** GIVE DETAILS  ****************************/}
        {normalizeString(
          data?.currentlyDoYouHaveAnyOtherMedicalClaimHealthInsurance
        ) === "no" ? (
          <>
            <Tick top={783} left={503}>
              ✔
            </Tick>
            {renderParagraph(
              data?.currentMedicalInsuranceCompanyName || "-",
              807, // X for first line
              365, // Y for first line
              333,
              14
            )}
            {renderParagraph(
              data?.giveDetails || "-", // second value
              835, // X for second line
              365, // Y for second line (shifted down by 20px for spacing)
              333,
              14
            )}
          </>
        ) : (
          <>
            <Tick top={783} left={580}>
              ✔
            </Tick>
            {renderParagraph("-", 752, 350, 323, 14)}
            {renderParagraph("-", 778, 350, 323, 14)}
          </>
        )}

        {/********************************** DO YOU HAVE A FAMILY PHYSICIAN  ****************************/}
        {normalizeString(data?.doYouHaveAFamilyPhysician) === "yes" && (
          <Tick top={867} left={503}>
            ✔
          </Tick>
        )}
        {normalizeString(data?.doYouHaveAFamilyPhysician) === "no" && (
          <Tick top={867} left={579}>
            ✔
          </Tick>
        )}

        {/********************************** NAME OF FAMILY PHYSICIAN  ****************************/}
        {renderParagraph(
          normalizeString(data?.doYouHaveAFamilyPhysician) === "yes"
            ? data?.familyPhysicianName || "-"
            : "-",
          893,
          367,
          335,
          14
        )}

        {/**********************************  CONTACT NUMBER  ****************************/}
        {renderParagraph(data?.doctorContactNo || "", 921, 367, 335, 14)}

        {/**********************************  CURRENT ADDRESS OF INSURED PATIENT ****************************/}
        {renderParagraph(data?.currentPatientAddress || "", 950, 367, 335, 14)}

        {/**********************************  OCCUPATION OF INSURED PATIENT  ****************************/}
        {renderParagraph(data?.occupation || "", 979, 367, 335, 14)}
      </PageWrapper>
    </PageContainer>
  );
};

export default StarHealthPage1;
