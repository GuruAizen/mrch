import React from "react";
import page2 from "@/assets/form_templates/aditya_birla/aditya_birla_capital_page2.jpg";
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

const AdityaBirlaPage2 = ({ data }) => {
  const renderCharByChar = (text, top, left, gap) => {
    if (!text) return null;
    return [...(text || "")].map((char, index) => (
      <Field key={index} top={top} left={left + index * gap}>
        {char}
      </Field>
    ));
  };
  const renderCharFields = (data, tf, top, left, width, height, fontSize) =>
    renderConditionally1(data, tf, top, left, width, height, fontSize).map(
      (item, idx) => (
        <FieldBox
          key={idx}
          top={item.top}
          left={item.left}
          width={item.width}
          height={item.height}
          fontSize={item.fontSize}
        >
          {item.char}
        </FieldBox>
      )
    );

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
  const renderConditionally = (field, tfField) => {
    const tf = (tfField || "").toString().toLowerCase();
    const shouldRender =
      tf &&
      tf !== "n/a" &&
      tf !== "false" &&
      tf !== "null" &&
      tf !== "undefined";

    if (!shouldRender) return ["-", "-", "-", "-"];

    try {
      const date = new Date(field);
      if (isNaN(date)) throw new Error("Invalid date");

      const mm = String(date.getMonth() + 1).padStart(2, "0"); // e.g. "04"
      const yy = String(date.getFullYear()).slice(-2); // e.g. "25"

      return [...mm, ...yy].map(Number); // → [0, 4, 2, 5]
    } catch {
      return ["-", "-", "-", "-"]; // fallback for invalid input
    }
  };

  const renderConditionally1 = (
    field,
    tfField,
    top,
    left,
    width,
    height,
    fontSize,
    gapArray = [] // optional custom gaps
  ) => {
    const tf = (tfField || "").toString().toLowerCase();
    const shouldRender =
      tf &&
      tf !== "n/a" &&
      tf !== "false" &&
      tf !== "null" &&
      tf !== "undefined";

    const getCharObjects = (chars) => {
      let offset = 0;
      return chars.map((char, index) => {
        const item = {
          char,
          top,
          left: left + offset,
          width,
          height,
          fontSize,
        };
        offset += gapArray[index] ?? width + 2; // default spacing
        return item;
      });
    };

    try {
      if (!shouldRender) return getCharObjects(["-", "-", "-", "-"]);

      const date = new Date(field);
      if (isNaN(date)) throw new Error("Invalid date");

      const mm = String(date.getMonth() + 1).padStart(2, "0"); // "04"
      const yy = String(date.getFullYear()).slice(-2); // "25"
      const digits = [...mm, ...yy]; // ['0', '4', '2', '5']

      return getCharObjects(digits);
    } catch {
      return getCharObjects(["-", "-", "-", "-"]);
    }
  };
  const renderCharFieldsWithGaps = (
    field,
    tfField,
    top,
    left,
    width,
    height,
    fontSize,
    gapArray = []
  ) =>
    renderConditionally1(
      field,
      tfField,
      top,
      left,
      width,
      height,
      fontSize,
      gapArray
    ).map((item, idx) => (
      <FieldBox
        key={idx}
        top={item.top}
        left={item.left}
        width={item.width}
        height={item.height}
        fontSize={item.fontSize}
      >
        {item.char}
      </FieldBox>
    ));

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

        {/********************************** PROPOSED LINE OF TREATMENT ****************************/}
        {proposedLineOfTreatmentFn("medical management") && (
          <Tick top={52} left={322}>
            ✔
          </Tick>
        )}
        {proposedLineOfTreatmentFn("surgical management") && (
          <Tick top={80} left={322}>
            ✔
          </Tick>
        )}
        {proposedLineOfTreatmentFn("intensivecare") && (
          <Tick top={107} left={322}>
            ✔
          </Tick>
        )}
        {proposedLineOfTreatmentFn("investigation") && (
          <Tick top={132} left={322}>
            ✔
          </Tick>
        )}
        {proposedLineOfTreatmentFn("non-allopathic treatment") && (
          <Tick top={157} left={322}>
            ✔
          </Tick>
        )}

        {/**********************************  INVESTIGATION  ****************************/}
        {renderParagraph(
          data?.ifInvestigativeOfMedicalManagementProvideDetails || "",
          181,
          383,
          364,
          18
        )}

        {/**********************************  ROUTE OF DRUG   ****************************/}
        {renderParagraph(
          data?.routeOfDrugAdministration || "",
          208,
          240,
          482,
          16
        )}

        {/**********************************  SURGICAL NAME   ****************************/}
        {renderParagraph(data?.surgicalNameOfSurgery || "", 233, 220, 512, 16)}

        {/**********************************  ICD 10 PCS CODE   ****************************/}
        {renderParagraph(data?.icd10PcsCode || "", 258, 180, 562, 16)}

        {/**********************************  OTHER TREATMENT   ****************************/}
        {renderParagraph(
          data?.ifOtherTreatmentDetails || "",
          284,
          250,
          472,
          16
        )}

        {/**********************************  HOW DID INJURY OCCUR   ****************************/}
        {renderParagraph(data?.howDidInjuryOccur || "", 309, 180, 562, 16)}

        {/********************************** RTA  ****************************/}
        {normalizeString(data?.isItRta) === "yes" && (
          <Tick top={363} left={167}>
            ✔
          </Tick>
        )}
        {normalizeString(data?.isItRta) === "no" && (
          <Tick top={363} left={223}>
            ✔
          </Tick>
        )}
        {/********************************** DATE OF INJURY  ****************************/}
        <EraseArea top={391} left={168} width={10} height={12} />
        <EraseArea top={391} left={184} width={10} height={12} />
        <EraseArea top={391} left={201} width={10} height={12} />
        <EraseArea top={391} left={218} width={10} height={12} />
        <EraseArea top={391} left={234} width={10} height={12} />
        <EraseArea top={391} left={251} width={10} height={12} />
        <EraseArea top={391} left={268} width={10} height={12} />
        <EraseArea top={391} left={283} width={10} height={12} />

        {renderCharByCharWithGaps(
          parseDOBtoDDMMYYYY(data?.dateOfInjury),
          390,
          168,
          [17, 17, 17, 17, 17, 17, 17, 17]
        )}

        {/********************************** REPORTED TO POLICE  ****************************/}
        {normalizeString(data?.reportedToPolice) === "yes" && (
          <Tick top={411} left={218}>
            ✔
          </Tick>
        )}
        {normalizeString(data?.reportedToPolice) === "no" && (
          <Tick top={411} left={274}>
            ✔
          </Tick>
        )}
        {/********************************** FIR NO  ****************************/}
        {renderParagraph(normalizeString(data?.firNo), 435, 137, 183, 16)}

        {/********************************** ALCOHOL  ****************************/}
        {normalizeString(data?.injuryDueToAlcoholConsumption) === "yes" && (
          <Tick top={463} left={329}>
            ✔
          </Tick>
        )}
        {normalizeString(data?.injuryDueToAlcoholConsumption) === "no" && (
          <Tick top={463} left={385}>
            ✔
          </Tick>
        )}

        {/********************************** ALCOHOL ABUSE  ****************************/}
        {normalizeString(data?.alcoholDrugabuse) === "true" && (
          <Tick top={488} left={264}>
            ✔
          </Tick>
        )}
        {normalizeString(data?.alcoholDrugabuse) === "false" && (
          <Tick top={488} left={320}>
            ✔
          </Tick>
        )}
        {/********************************** TEST CONDUCTED TO ESTABLISH  ****************************/}
        {normalizeString(data?.testsConductedToEstablish) === "yes" && (
          <Tick top={515} left={389}>
            ✔
          </Tick>
        )}
        {normalizeString(data?.testsConductedToEstablish) === "no" && (
          <Tick top={514} left={444}>
            ✔
          </Tick>
        )}
        {/********************************** IN CASE OF MATERNITY  ****************************/}
        {renderParagraph(data?.maternityG || "", 542, 176, 22, 15)}
        {renderParagraph(data?.maternityP || "", 542, 231, 22, 15)}
        {renderParagraph(data?.maternityL || "", 542, 286, 22, 15)}
        {renderParagraph(data?.maternityA || "", 542, 341, 22, 15)}

        {/********************************** EXPECTED DATE OF DELIVERY  ****************************/}
        <EraseArea top={570} left={239} width={10} height={12} />
        <EraseArea top={570} left={255} width={10} height={12} />
        <EraseArea top={570} left={272} width={10} height={12} />
        <EraseArea top={570} left={288} width={10} height={12} />
        <EraseArea top={570} left={305} width={10} height={12} />
        <EraseArea top={570} left={322} width={10} height={12} />
        <EraseArea top={570} left={338} width={10} height={12} />
        <EraseArea top={570} left={354} width={10} height={12} />

        {renderCharByCharWithGaps(
          parseDOBtoDDMMYYYY(data?.expectedDateOfDelivery),

          568,
          239,
          [17, 17, 17, 17, 17, 17, 17, 17]
        )}

        {/********************************** DATE OF ADMISSION  ****************************/}
        <EraseArea top={623} left={182} width={10} height={12} />
        <EraseArea top={623} left={200} width={10} height={12} />
        <EraseArea top={623} left={215} width={10} height={12} />
        <EraseArea top={623} left={232} width={10} height={12} />
        <EraseArea top={623} left={249} width={10} height={12} />
        <EraseArea top={623} left={265} width={10} height={12} />
        <EraseArea top={623} left={282} width={10} height={12} />
        <EraseArea top={623} left={298} width={10} height={12} />

        {renderCharByCharWithGaps(
          parseDOBtoDDMMYYYY(data?.dateOfAdmission),
          620,
          182,
          [17, 17, 17, 17, 17, 17, 17, 17]
        )}

        {/********************************** TIME OF ADMISSION  ****************************/}
        <EraseArea top={646} left={182} width={10} height={12} />
        <EraseArea top={646} left={200} width={10} height={12} />
        <EraseArea top={646} left={215} width={10} height={12} />
        <EraseArea top={646} left={232} width={10} height={12} />

        {renderSingleCharByChar(
          parseTimeToHHMM(data?.dateOfAdmission),
          645,
          184,
          [17, 17, 17, 17, 17, 17, 17, 17]
        )}
        {/********************************** THIS IS AN EMERGENCY PLANNED HOSPITAL EVENT ****************************/}
        {isEmergencyType("an emergency") && (
          <Tick top={664} left={390}>
            ✔
          </Tick>
        )}
        {isEmergencyType("an emergency") && (
          // {isEmergencyType("a planned hospitalization event") && (
          <Tick top={664} left={466}>
            ✔
          </Tick>
        )}

        {/**********************************  DIABETES   ****************************/}
        <EraseArea top={724} left={172} width={10} height={12} />
        <EraseArea top={724} left={188} width={10} height={12} />
        <EraseArea top={724} left={204} width={10} height={12} />
        <EraseArea top={724} left={154} width={10} height={12} />

        {renderCharFieldsWithGaps(
          data?.heartDiseaseSince,
          data?.heartDiseaseSinceTf,
          723,
          154,
          12,
          16,
          10,
          [17, 16, 16, 16]
        )}

        {/* {renderParagraph(
          renderConditionally(data?.diabetesRemarks, data?.diabetesSinceTf),
          274,
          400,
          310,
          18
        )} */}

        {/**********************************  HEART DISEASE  ****************************/}
        <EraseArea top={749} left={172} width={10} height={12} />
        <EraseArea top={749} left={188} width={10} height={12} />
        <EraseArea top={749} left={204} width={10} height={12} />
        <EraseArea top={749} left={220} width={10} height={12} />

        {renderCharFieldsWithGaps(
          data?.heartDiseaseSince,
          data?.heartDiseaseSinceTf,
          748,
          171,
          12,
          16,
          10,
          [17, 16, 16, 16]
        )}

        {/* {renderParagraph(
          renderConditionally(
            data?.heartDiseaseRemarks,
            data?.heartDiseaseSinceTf
          ),
          304,
          400,
          310,
          18
        )} */}

        {/**********************************  HYPER TENSION  ****************************/}
        <EraseArea top={774} left={172} width={10} height={12} />
        <EraseArea top={774} left={188} width={10} height={12} />
        <EraseArea top={774} left={204} width={10} height={12} />
        <EraseArea top={774} left={220} width={10} height={12} />

        {renderCharFieldsWithGaps(
          data?.hypertensionSince,
          data?.hypertensionSinceTf,
          773,
          171,
          12,
          16,
          10,
          [17, 16, 16, 16]
        )}

        {/* {renderParagraph(
          renderConditionally(
            data?.hypertensionRemarks,
            data?.hypertensionSinceTf
          ),
          334,
          400,
          310,
          18
        )} */}

        {/**********************************  HYPER LIPIDEMIAS  ****************************/}
        <EraseArea top={800} left={181} width={10} height={12} />
        <EraseArea top={800} left={197} width={10} height={12} />
        <EraseArea top={800} left={213} width={10} height={12} />
        <EraseArea top={800} left={230} width={10} height={12} />

        {renderCharFieldsWithGaps(
          data?.hyperlipidemiasSince,
          data?.hyperlipidemiasSinceTf,
          798,
          180,
          12,
          16,
          10,
          [17, 16, 16, 16]
        )}

        {/* {renderParagraph(
          renderConditionally(
            data?.hyperlipidemiasRemarks,
            data?.hyperlipidemiasSinceTf
          ),
          364,
          400,
          310,
          18
        )} */}

        {/**********************************  OSTEOARTHRITIS  ****************************/}
        <EraseArea top={823} left={170} width={10} height={12} />
        <EraseArea top={823} left={186} width={10} height={12} />
        <EraseArea top={823} left={202} width={10} height={12} />
        <EraseArea top={823} left={218} width={10} height={12} />

        {renderCharFieldsWithGaps(
          data?.osteoarthritisSince,
          data?.osteoarthritisSinceTf,
          822,
          169,
          12,
          16,
          10,
          [17, 16, 16, 16]
        )}

        {/* {renderParagraph(
          renderConditionally(
            data?.osteoarthritisRemarks,
            data?.osteoarthritisSinceTf
          ),
          393,
          400,
          310,
          18
        )} */}

        {/**********************************  ASTHMA  ****************************/}
        <EraseArea top={848} left={230} width={10} height={12} />
        <EraseArea top={848} left={247} width={10} height={12} />
        <EraseArea top={848} left={263} width={10} height={12} />
        <EraseArea top={848} left={280} width={10} height={12} />
        {renderCharFieldsWithGaps(
          data?.asthmaCopdBronchitisSince,
          data?.asthmaCopdBronchitisSinceTf,
          847,
          230,
          12,
          16,
          10,
          [17, 16, 16, 16]
        )}

        {/* {renderParagraph(
          renderConditionally(
            data?.asthmaCopdBronchitisRemarks,
            data?.asthmaCopdBronchitisSinceTf
          ),
          423,
          400,
          310,
          18
        )}
         */}
        {/**********************************  CANCER  ****************************/}
        <EraseArea top={875} left={138} width={10} height={12} />
        <EraseArea top={875} left={155} width={10} height={12} />
        <EraseArea top={875} left={170} width={10} height={12} />
        <EraseArea top={875} left={187} width={10} height={12} />
        {renderCharFieldsWithGaps(
          data?.cancerSince,
          data?.cancerSinceTf,
          874,
          138,
          12,
          16,
          10,
          [17, 16, 16, 16]
        )}

        {/* {renderParagraph(
          renderConditionally(data?.cancerRemarks, data?.cancerSinceTf),
          452,
          400,
          310,
          18
        )} */}
        {/**********************************  ALCOHOL / DRUG ABUSE ****************************/}

        <EraseArea top={900} left={202} width={10} height={12} />
        <EraseArea top={900} left={219} width={10} height={12} />
        <EraseArea top={900} left={234} width={10} height={12} />
        <EraseArea top={900} left={250} width={10} height={12} />

        {renderCharFieldsWithGaps(
          data?.alcoholDrugabuseSince,
          data?.alcoholDrugabuseSinceTf,
          899,
          202,
          12,
          16,
          10,
          [17, 16, 16, 16]
        )}

        {/* {renderParagraph(
          renderConditionally(
            data?.alcoholDrugabuseRemarks,
            data?.alcoholDrugabuseSinceTf
          ),
          482,
          400,
          310,
          18
        )} */}

        {/********************************** HIV / STD ****************************/}
        <EraseArea top={927} left={264} width={10} height={12} />
        <EraseArea top={927} left={280} width={10} height={12} />
        <EraseArea top={927} left={297} width={10} height={12} />
        <EraseArea top={927} left={313} width={10} height={12} />

        {renderCharFieldsWithGaps(
          data?.hivstdSince,
          data?.hivstdSinceTf,
          926,
          264,
          12,
          16,
          10,
          [17, 16, 16, 16]
        )}
        {/* {renderParagraph(
          renderConditionally(data?.hivstdRemarks, data?.hivstdSinceTf),
          512,
          400,
          310,
          18
        )} */}

        {/********************************** ANY OTHER AILMENTS ****************************/}
        <EraseArea top={950} left={248} width={10} height={12} />
        <EraseArea top={950} left={265} width={10} height={12} />
        <EraseArea top={950} left={281} width={10} height={12} />
        <EraseArea top={950} left={298} width={10} height={12} />

        {renderCharFieldsWithGaps(
          data?.anyOtherailmentSince,
          data?.anyOtherailmentSinceTf,
          949,
          248,
          12,
          16,
          10,
          [17, 16, 16, 16]
        )}

        {/* {renderParagraph(
          renderConditionally(
            data?.anyOtherailmentRemarks,
            data?.anyOtherailmentSinceTf
          ),
          542,
          400,
          310,
          18
        )} */}

        {/**********************************  EXPECTED NUMBER OF DAYS    ****************************/}
        {renderParagraph(
          data?.expectedNoOfDaysStayInHospital || "",
          968,
          284,
          100,
          16
        )}
        {/**********************************  DAYS IN ICU   ****************************/}
        {renderParagraph(data?.daysInIcu || "", 995, 139, 90, 14)}
        {/**********************************  ROOM TYPE   ****************************/}
        {renderParagraph(data?.roomType || "", 1018, 138, 269, 16)}

        {/**********************************  PER DAY ROOM RENT   ****************************/}
        {renderParagraph(
          data?.perDayRoomRentNursingServiceCharges || "",
          1043,
          384,
          239,
          16
        )}

        {/**********************************  EXPECTED COST OF INVESTIGATION   ****************************/}
        {renderParagraph(
          data?.expectedCostForInvestigationDiagnostics || "",
          1069,
          292,
          219,
          16
        )}
      </PageWrapper>
    </PageContainer>
  );
};

export default AdityaBirlaPage2;
