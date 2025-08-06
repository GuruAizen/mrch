import React from "react";
import page3 from "@/assets/form_templates/aegon_life/aegon_life_page3.jpg";
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

const AegonPage3 = ({ data }) => {
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
  const renderConditionally = (field, tfField) => {
    const tf = (tfField || "").toString().toLowerCase();
    const shouldRender =
      tf &&
      tf !== "n/a" &&
      tf !== "false" &&
      tf !== "null" &&
      tf !== "undefined";

    return shouldRender ? field || "-" : "-";
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
        <BackgroundImage src={page3.src} alt="Background Form" />

        {/********************************** DATE OF ADMISSION  ****************************/}
        <EraseArea top={121} left={460} width={142} height={22} />

        {renderSingleCharByChar(
          getDateOnly(data?.dateOfAdmission),
          121,
          460,
          [8, 13, 13, 7, 13, 13, 7, 7, 7, 10]
        )}
        {/********************************** TIME OF ADMISSION  ****************************/}
        <EraseArea top={155} left={460} width={142} height={22} />

        {renderSingleCharByChar(
          parseTimeToHHMM(data?.dateOfAdmission),
          155,
          460,
          [8, 13, 13, 7, 13, 13, 7, 7, 7, 10]
        )}
        {/********************************** THIS IS AN EMERGENCY PLANNED HOSPITAL EVENT ****************************/}
        {isEmergencyType("an emergency") && (
          <Tick top={197} left={487}>
            ✔
          </Tick>
        )}
        {isEmergencyType("a planned hospitalization event") && (
          <Tick top={197} left={626}>
            ✔
          </Tick>
        )}
        {/**********************************  DIABETES   ****************************/}
        {renderParagraph(
          renderConditionally(data?.diabetesSince, data?.diabetesSinceTf),
          274,
          328,
          52,
          18,
          10
        )}

        {renderParagraph(
          renderConditionally(data?.diabetesRemarks, data?.diabetesSinceTf),
          274,
          400,
          310,
          18
        )}

        {/**********************************  HEART DISEASE  ****************************/}
        {renderParagraph(
          renderConditionally(
            data?.heartDiseaseSince,
            data?.heartDiseaseSinceTf
          ),
          304,
          328,
          52,
          18,
          10
        )}

        {renderParagraph(
          renderConditionally(
            data?.heartDiseaseRemarks,
            data?.heartDiseaseSinceTf
          ),
          304,
          400,
          310,
          18
        )}

        {/**********************************  HYPER TENSION  ****************************/}
        {renderParagraph(
          renderConditionally(
            data?.hypertensionSince,
            data?.hypertensionSinceTf
          ),
          334,
          328,
          52,
          18,
          10
        )}

        {renderParagraph(
          renderConditionally(
            data?.hypertensionRemarks,
            data?.hypertensionSinceTf
          ),
          334,
          400,
          310,
          18
        )}
        {/**********************************  HYPER LIPIDEMIAS  ****************************/}
        {renderParagraph(
          renderConditionally(
            data?.hyperlipidemiasSince,
            data?.hyperlipidemiasSinceTf
          ),
          364,
          328,
          52,
          18,
          10
        )}

        {renderParagraph(
          renderConditionally(
            data?.hyperlipidemiasRemarks,
            data?.hyperlipidemiasSinceTf
          ),
          364,
          400,
          310,
          18
        )}

        {/**********************************  OSTEOARTHRITIS  ****************************/}
        {renderParagraph(
          renderConditionally(
            data?.osteoarthritisSince,
            data?.osteoarthritisSinceTf
          ),
          393,
          328,
          52,
          18,
          10
        )}

        {renderParagraph(
          renderConditionally(
            data?.osteoarthritisRemarks,
            data?.osteoarthritisSinceTf
          ),
          393,
          400,
          310,
          18
        )}

        {/**********************************  OSTEOARTHRITIS  ****************************/}
        {renderParagraph(
          renderConditionally(
            data?.asthmaCopdBronchitisSince,
            data?.asthmaCopdBronchitisSinceTf
          ),
          423,
          328,
          52,
          18,
          10
        )}

        {renderParagraph(
          renderConditionally(
            data?.asthmaCopdBronchitisRemarks,
            data?.asthmaCopdBronchitisSinceTf
          ),
          423,
          400,
          310,
          18
        )}
        {/**********************************  CANCER  ****************************/}
        {renderParagraph(
          renderConditionally(data?.cancerSince, data?.cancerSinceTf),
          452,
          328,
          52,
          18,
          10
        )}
        {renderParagraph(
          renderConditionally(data?.cancerRemarks, data?.cancerSinceTf),
          452,
          400,
          310,
          18
        )}
        {/**********************************  ALCOHOL / DRUG ABUSE ****************************/}
        {renderParagraph(
          renderConditionally(
            data?.alcoholDrugabuseSince,
            data?.alcoholDrugabuseSinceTf
          ),
          482,
          328,
          52,
          18,
          10
        )}
        {renderParagraph(
          renderConditionally(
            data?.alcoholDrugabuseRemarks,
            data?.alcoholDrugabuseSinceTf
          ),
          482,
          400,
          310,
          18
        )}
        {/********************************** HIV / STD ****************************/}
        {renderParagraph(
          renderConditionally(data?.hivstdSince, data?.hivstdSinceTf),
          512,
          328,
          52,
          18,
          10
        )}
        {renderParagraph(
          renderConditionally(data?.hivstdRemarks, data?.hivstdSinceTf),
          512,
          400,
          310,
          18
        )}

        {/********************************** ANY OTHER AILMENTS ****************************/}
        {renderParagraph(
          renderConditionally(
            data?.anyOtherailmentSince,
            data?.anyOtherailmentSinceTf
          ),
          542,
          328,
          52,
          18,
          10
        )}
        {renderParagraph(
          renderConditionally(
            data?.anyOtherailmentRemarks,
            data?.anyOtherailmentSinceTf
          ),
          542,
          400,
          310,
          18
        )}

        {/**********************************  EXPECTED NUMBER OF DAYS    ****************************/}
        {renderParagraph(
          data?.expectedNoOfDaysStayInHospital || "",
          582,
          414,
          190,
          18
        )}
        {/**********************************  DAYS IN ICU   ****************************/}
        {renderParagraph(data?.daysInIcu || "", 616, 414, 190, 18)}
        {/**********************************  ROOM TYPE   ****************************/}
        {renderParagraph(data?.roomType || "", 655, 148, 239, 18)}
        {/**********************************  PER DAY ROOM RENT   ****************************/}
        {renderParagraph(
          data?.perDayRoomRentNursingServiceCharges || "",
          685,
          477,
          239,
          18
        )}

        {/**********************************  EXPECTED COST OF INVESTIGATION   ****************************/}
        {renderParagraph(
          data?.expectedCostForInvestigationDiagnostics || "",
          719,
          477,
          239,
          18
        )}

        {/********************************** ICU CHARGES   ****************************/}
        {renderParagraph(data?.icuCharges || "", 753, 477, 239, 18)}

        {/********************************** OT CHARGES   ****************************/}
        {renderParagraph(data?.otCharges || "", 787, 477, 239, 18)}
        {/********************************** PROFESSION FEES SURGEON   ****************************/}
        {renderParagraph(
          data?.professionalFeesSurgeonAnesthetistFeesConsultationCharges || "",
          822,
          477,
          239,
          18
        )}

        {/********************************** MEDICINES + CONSUMABLES   ****************************/}
        {renderParagraph(
          data?.medicinesConsumablesCostOfImplantsIfApplicablePleaseSpecify ||
            "",
          854,
          477,
          239,
          18
        )}
        {/********************************** OTHER HOSPITAL EXPENSES     ****************************/}
        {renderParagraph(data?.otherHospitalExpenses || "", 887, 477, 239, 18)}

        {/********************************** ALL INCLUSIVE PACKAGES ****************************/}
        {renderParagraph(
          data?.allInclusivePackageChargesIfAnyApplicable || "",
          920,
          477,
          239,
          18
        )}
        {/********************************** SUM TOTAL EXPECTED ****************************/}
        {renderParagraph(
          data?.sumTotalExpectedCostOfHospitalization || "",
          954,
          477,
          239,
          18
        )}
      </PageWrapper>
    </PageContainer>
  );
};

export default AegonPage3;
