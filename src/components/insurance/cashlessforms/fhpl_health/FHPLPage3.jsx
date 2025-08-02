import React from "react";
import page3 from "@/assets/form_templates/fhpl/FHPL_PAGE_3.jpg";
import docsign from "@/assets/form_templates/common/doctorsignature.jpg"
import hospitalseal from "@/assets/form_templates/common/hospitalseal.jpg";
import styled, { css } from "styled-components";


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

const StyledImage = styled.img`
  position: absolute;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  z-index: ${({ zIndex }) => zIndex || 1};
  opacity: ${({ opacity }) => opacity || 1};
  pointer-events: none;
  user-select: none;
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

const FHPLPage3 = ({ data }) => {
  const renderImage = (
    src,
    top,
    left,
    width,
    height,
    zIndex = 1,
    opacity = 1
  ) => (
    <StyledImage
      src={src}
      top={top}
      left={left}
      width={width}
      height={height}
      zIndex={zIndex}
      opacity={opacity}
      alt=""
    />
  );
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
        // border: "1px dashed tomato",
      }}
    >
      {text || ""}
    </FieldBox>
  );
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

  return (
    <PageContainer>
      <PageWrapper pageBreak={false}>
        <BackgroundImage src={page3.src} alt="Background Form" />

        {/**********************************  DIABETES   ****************************/}
        {renderParagraph(
          renderConditionally(data?.diabetesSince, data?.diabetesSinceTf),
          163,
          378,
          52,
          18,
          10
        )}

        {renderParagraph(
          renderConditionally(data?.diabetesRemarks, data?.diabetesSinceTf),
          163,
          434,
          150,
          18
        )}

        {/**********************************  HEART DISEASE  ****************************/}
        {renderParagraph(
          renderConditionally(
            data?.heartDiseaseSince,
            data?.heartDiseaseSinceTf
          ),
          187,
          378,
          52,
          18,
          10
        )}

        {renderParagraph(
          renderConditionally(
            data?.heartDiseaseRemarks,
            data?.heartDiseaseSinceTf
          ),
          187,
          434,
          150,
          18
        )}

        {/**********************************  HYPER TENSION  ****************************/}
        {renderParagraph(
          renderConditionally(
            data?.hypertensionSince,
            data?.hypertensionSinceTf
          ),
          210,
          378,
          52,
          18,
          10
        )}

        {renderParagraph(
          renderConditionally(
            data?.hypertensionRemarks,
            data?.hypertensionSinceTf
          ),
          210,
          434,
          150,
          18
        )}
        {/**********************************  HYPER LIPIDEMIAS  ****************************/}
        {renderParagraph(
          renderConditionally(
            data?.hyperlipidemiasSince,
            data?.hyperlipidemiasSinceTf
          ),
          234,
          378,
          52,
          18,
          10
        )}

        {renderParagraph(
          renderConditionally(
            data?.hyperlipidemiasRemarks,
            data?.hyperlipidemiasSinceTf
          ),
          234,
          434,
          150,
          18
        )}

        {/**********************************  OSTEOARTHRITIS  ****************************/}
        {renderParagraph(
          renderConditionally(
            data?.osteoarthritisSince,
            data?.osteoarthritisSinceTf
          ),
          259,
          378,
          52,
          18,
          10
        )}

        {renderParagraph(
          renderConditionally(
            data?.osteoarthritisRemarks,
            data?.osteoarthritisSinceTf
          ),
          259,
          434,
          150,
          18
        )}

        {/**********************************  OSTEOARTHRITIS  ****************************/}
        {renderParagraph(
          renderConditionally(
            data?.asthmaCopdBronchitisSince,
            data?.asthmaCopdBronchitisSinceTf
          ),
          282,
          378,
          52,
          18,
          10
        )}

        {renderParagraph(
          renderConditionally(
            data?.asthmaCopdBronchitisRemarks,
            data?.asthmaCopdBronchitisSinceTf
          ),
          282,
          434,
          150,
          18
        )}
        {/**********************************  CANCER  ****************************/}
        {renderParagraph(
          renderConditionally(data?.cancerSince, data?.cancerSinceTf),
          306,
          378,
          52,
          18,
          10
        )}
        {renderParagraph(
          renderConditionally(data?.cancerRemarks, data?.cancerSinceTf),
          306,
          434,
          150,
          18
        )}
        {/**********************************  ALCOHOL / DRUG ABUSE ****************************/}
        {renderParagraph(
          renderConditionally(
            data?.alcoholDrugabuseSince,
            data?.alcoholDrugabuseSinceTf
          ),
          329,
          378,
          52,
          18,
          10
        )}
        {renderParagraph(
          renderConditionally(
            data?.alcoholDrugabuseRemarks,
            data?.alcoholDrugabuseSinceTf
          ),
          329,
          434,
          150,
          18
        )}
        {/********************************** HIV / STD ****************************/}
        {renderParagraph(
          renderConditionally(data?.hivstdSince, data?.hivstdSinceTf),
          353,
          378,
          52,
          18,
          10
        )}
        {renderParagraph(
          renderConditionally(data?.hivstdRemarks, data?.hivstdSinceTf),
          353,
          434,
          150,
          18
        )}

        {/********************************** ANY OTHER AILMENTS ****************************/}
        {renderParagraph(
          renderConditionally(
            data?.anyOtherailmentSince,
            data?.anyOtherailmentSinceTf
          ),
          377,
          378,
          52,
          18,
          10
        )}
        {renderParagraph(
          renderConditionally(
            data?.anyOtherailmentRemarks,
            data?.anyOtherailmentSinceTf
          ),
          377,
          434,
          150,
          18
        )}

        {/**********************************  EXPECTED NUMBER OF DAYS    ****************************/}
        {renderParagraph(
          data?.expectedNoOfDaysStayInHospital || "",
          402,
          378,
          80,
          18
        )}
        {/**********************************  DAYS IN ICU   ****************************/}
        {renderParagraph(data?.daysInIcu || "", 429, 378, 80, 18)}
        {/**********************************  ROOM TYPE   ****************************/}
        {renderParagraph(data?.roomType || "", 455, 378, 100, 18)}
        {/**********************************  PER DAY ROOM RENT   ****************************/}
        {renderParagraph(
          data?.perDayRoomRentNursingServiceCharges || "",
          480,
          488,
          143,
          18
        )}

        {/**********************************  EXPECTED COST OF INVESTIGATION   ****************************/}
        {renderParagraph(
          data?.expectedCostForInvestigationDiagnostics || "",
          506,
          488,
          143,
          18
        )}

        {/**********************************  EXPECTED COST OF INVESTIGATION   ****************************/}
        {renderParagraph(
          data?.expectedCostForInvestigationDiagnostics || "",
          506,
          488,
          143,
          18
        )}

        {/********************************** ICU CHARGES   ****************************/}
        {renderParagraph(data?.icuCharges || "", 531, 488, 143, 18)}

        {/********************************** OT CHARGES   ****************************/}
        {renderParagraph(data?.otCharges || "", 556, 488, 143, 18)}
        {/********************************** PROFESSION FEES SURGEON   ****************************/}
        {renderParagraph(
          data?.professionalFeesSurgeonAnesthetistFeesConsultationCharges || "",
          582,
          488,
          143,
          18
        )}

        {/********************************** MEDICINES + CONSUMABLES   ****************************/}
        {renderParagraph(
          data?.medicinesConsumablesCostOfImplantsIfApplicablePleaseSpecify ||
            "",
          628,
          493,
          143,
          18
        )}
        {/********************************** OTHER HOSPITAL EXPENSES     ****************************/}
        {renderParagraph(data?.otherHospitalExpenses || "", 654, 493, 143, 18)}

        {/********************************** ALL INCLUSIVE PACKAGES ****************************/}
        {renderParagraph(
          data?.allInclusivePackageChargesIfAnyApplicable || "",
          680,
          496,
          143,
          18
        )}
        {/********************************** SUM TOTAL EXPECTED ****************************/}
        {renderParagraph(
          data?.sumTotalExpectedCostOfHospitalization || "",
          706,
          496,
          143,
          18
        )}
        {/********************************** NAME OF TREATING DOCTOR ****************************/}
        {renderParagraph(data?.nameOfTreatingDoctor || "", 816, 380, 220, 18)}

        {/********************************** QUALIFICATION ****************************/}
        {renderParagraph(data?.doctorQualification || "", 847, 378, 220, 18)}

        {/********************************** REGISTRATION WITH STATE CODE ****************************/}
        {renderParagraph(
          data?.registrationNumberWithStateCode || "",
          883,
          378,
          220,
          18
        )}

        {/********************************** PATIENT / INSURER SIGNATURE ****************************/}
        {renderImage(
          docsign.src, // src
          926, // top (pixels from top)
          440, // left (pixels from left)
          135, // width in px
          30, // height in px
          3, // zIndex: place above content
          1 // opacity: 10% for watermark effect
        )}

        {/********************************** HOSPITAL SEAL ****************************/}
        {renderImage(
          hospitalseal.src, // src
          920, // top (pixels from top)
          90, // left (pixels from left)
          150, // width in px
          60, // height in px
          3, // zIndex: place above content
          1 // opacity: 10% for watermark effect
        )}
      </PageWrapper>
    </PageContainer>
  );
};

export default FHPLPage3;
