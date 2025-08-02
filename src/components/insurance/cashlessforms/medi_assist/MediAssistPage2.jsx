import React from "react";
import page2 from "@/assets/form_templates/medi_assist/medi_assist_cashless_claim_page_2.jpg";
import docsign from "@/assets/form_templates/common/doctorsignature.jpg";
import hospitalseal from "@/assets/form_templates/common/hospitalseal.jpg";
import styled, { css } from "styled-components";
import {
  normalizeString,
  parseDOBtoDDMMYYYY,
  parseTimeToHHMM,
} from "./functions";

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
  font-size: 8px;
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
  text-transform: uppercase;
  /* border: 1px solid tomato; */
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
  /* background-color: red; */
`;

const MediAssistPage2 = ({ data }) => {
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

  const renderParagraph = (text, top, left, width, height) => (
    <FieldBox top={top} left={left} width={width} height={height}>
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

  const renderNumberRightAligned = (
    text,
    top,
    left,
    gaps = [],
    defaultGap = 15.3
  ) => {
    const digits = [...(text?.toString() || "")];
    const totalBoxes = 7;
    const paddedDigits = digits.slice(-totalBoxes);
    const emptyBoxes = totalBoxes - paddedDigits.length;
    let offset = 0;

    return Array.from({ length: totalBoxes }).map((_, index) => {
      const charIndex = index - emptyBoxes;
      const char = charIndex >= 0 ? paddedDigits[charIndex] : "";
      const field = (
        <Field key={index} top={top} left={left + offset}>
          {char}
        </Field>
      );
      offset += gaps[index] ?? defaultGap;
      return field;
    });
  };

  const shouldShowNoOtherAilments = () => {
    const chronicFields = [
      "diabetesSinceTf",
      "heartDiseaseSinceTf",
      "hypertensionSinceTf",
      "hyperlipidemiasSinceTf",
      "osteoarthritisSinceTf",
      "asthmaCopdBronchitisSinceTf",
      "cancerSinceTf",
      "alcoholDrugabuseSinceTf",
      "hivstdSinceTf",
      "anyOtherailmentSinceTf",
    ];

    return chronicFields.every((key) => {
      const val = normalizeString(data?.[key]);
      return !val || val === "false" || val === "n/a";
    });
  };

  const renderMonthYearWithGaps = (
    value,
    top,
    left,
    gaps = [15, 16, 15, 16]
  ) => {
    const clean = normalizeString(value).replace("/", "").replaceAll(" ", "");
    const chars = clean.slice(0, 2) + clean.slice(-2);
    let offset = 0;

    return [...chars].map((char, index) => {
      const field = (
        <Field key={index} top={top} left={left + offset}>
          {char}
        </Field>
      );
      offset += gaps[index] ?? 15;
      return field;
    });
  };

  const renderCheckboxTick = (condition, top, left) => {
    const normalized = normalizeString(condition);
    if (normalized && normalized !== "n/a" && normalized !== "false") {
      return (
        <Tick top={top} left={left}>
          ✓
        </Tick>
      );
    }
    return null;
  };

  return (
    <PageContainer>
      <PageWrapper pagebreak={false}>
        <BackgroundImage src={page2.src} alt="Background Form" />
        {/* PER DAY ROOM RENT */}
        {renderNumberRightAligned(
          data?.perDayRoomRentNursingServiceCharges || "",
          102,
          338,
          [15, 16, 15, 16, 15, 15, 15]
        )}
        {/* EXPECTED COST */}
        {renderNumberRightAligned(
          data?.expectedCostForInvestigationDiagnostics || "",
          123,
          338,
          [15, 16, 15, 16, 15, 15, 15]
        )}
        {/* ICU CHARGES */}
        {renderNumberRightAligned(
          data?.icuCharges || "",
          144,
          338,
          [15, 16, 15, 16, 15, 15, 15]
        )}
        {/* OT CHARGES */}
        {renderNumberRightAligned(
          data?.otCharges || "",
          165,
          338,
          [15, 16, 15, 16, 15, 15, 15]
        )}
        {/* PROFESSIONAL FEE CHARGES */}
        {renderNumberRightAligned(
          data?.professionalFeesSurgeonAnesthetistFeesConsultationCharges || "",
          186,
          338,
          [15, 16, 15, 16, 15, 15, 15]
        )}
        {/* MEDICINES + CONSUMABLE */}
        {renderNumberRightAligned(
          data?.medicinesConsumablesCostOfImplantsIfApplicablePleaseSpecify ||
            "",
          206,
          338,
          [15, 16, 15, 16, 15, 15, 15]
        )}
        {/* OTHER HOSPITAL */}
        {renderNumberRightAligned(
          data?.medicinesConsumablesCostOfImplantsIfApplicablePleaseSpecify ||
            "",
          228,
          338,
          [15, 16, 15, 16, 15, 15, 15]
        )}
        {/* ALL INCLUSIVE PACKAGE */}
        {renderNumberRightAligned(
          data?.allInclusivePackageChargesIfAnyApplicable || "",
          248,
          338,
          [15, 16, 15, 16, 15, 15, 15]
        )}
        {/* SUM TOTAL EXPECTED */}
        {renderNumberRightAligned(
          data?.sumTotalExpectedCostOfHospitalization || "",
          269,
          338,
          [15, 16, 15, 16, 15, 15, 15]
        )}

        {/* DIABETES */}
        <EraseArea top={122} left={684} width={10} height={12} />
        <EraseArea top={122} left={699} width={10} height={12} />
        <EraseArea top={122} left={720} width={10} height={12} />
        <EraseArea top={122} left={735} width={10} height={12} />
        {renderCheckboxTick(data?.diabetesSinceTf || "", 120, 462)}
        {renderMonthYearWithGaps(data?.diabetesSince || "", 120, 684, [16, 21])}

        {/* HEART DISEASE */}
        <EraseArea top={144} left={684} width={10} height={12} />
        <EraseArea top={144} left={699} width={10} height={12} />
        <EraseArea top={144} left={720} width={10} height={12} />
        <EraseArea top={144} left={735} width={10} height={12} />
        {renderCheckboxTick(data?.heartDiseaseSinceTf || "", 141, 462)}
        {renderMonthYearWithGaps(
          data?.heartDiseaseSince || "",
          142,
          684,
          [16, 21]
        )}

        {/* HYPERTENSION */}
        <EraseArea top={165} left={684} width={10} height={12} />
        <EraseArea top={165} left={700} width={10} height={12} />
        <EraseArea top={165} left={720} width={10} height={12} />
        <EraseArea top={165} left={735} width={10} height={12} />
        {renderCheckboxTick(data?.hypertensionSinceTf || "", 162, 462)}
        {renderMonthYearWithGaps(
          data?.hypertensionSince || "",
          163,
          685,
          [16, 20]
        )}

        {/* HYPERLIPIDEMIAS */}
        <EraseArea top={185} left={684} width={10} height={12} />
        <EraseArea top={185} left={699} width={10} height={12} />
        <EraseArea top={185} left={720} width={10} height={12} />
        <EraseArea top={185} left={735} width={10} height={12} />
        {renderCheckboxTick(data?.hyperlipidemiasSinceTf || "", 183, 462)}
        {renderMonthYearWithGaps(
          data?.hyperlipidemiasSince || "",
          184,
          684,
          [16, 21]
        )}

        {/* OSTEOARTHRITIS */}
        <EraseArea top={206} left={684} width={10} height={12} />
        <EraseArea top={206} left={700} width={10} height={12} />
        <EraseArea top={206} left={720} width={10} height={12} />
        <EraseArea top={206} left={735} width={10} height={12} />
        {renderCheckboxTick(data?.osteoarthritisSinceTf || "", 204, 462)}
        {renderMonthYearWithGaps(
          data?.osteoarthritisSince || "",
          204,
          684,
          [16, 21]
        )}

        {/* ASTHMA / COPD / BRONCHITIS */}
        <EraseArea top={227} left={684} width={10} height={12} />
        <EraseArea top={227} left={699} width={10} height={12} />
        <EraseArea top={227} left={720} width={10} height={12} />
        <EraseArea top={227} left={735} width={10} height={12} />
        {renderCheckboxTick(data?.asthmaCopdBronchitisSinceTf || "", 224, 462)}
        {renderMonthYearWithGaps(
          data?.asthmaCopdBronchitisSince || "",
          226,
          684,
          [16, 21]
        )}

        {/* CANCER */}
        <EraseArea top={249} left={684} width={10} height={12} />
        <EraseArea top={249} left={699} width={10} height={12} />
        <EraseArea top={249} left={720} width={10} height={12} />
        <EraseArea top={249} left={735} width={10} height={12} />
        {renderCheckboxTick(data?.cancerSinceTf || "", 246, 462)}
        {renderMonthYearWithGaps(data?.cancerSince || "", 247, 684, [16, 21])}

        {/* ALCOHOL OR DRUG ABUSE */}
        <EraseArea top={269} left={684} width={10} height={12} />
        <EraseArea top={269} left={699} width={10} height={12} />
        <EraseArea top={269} left={720} width={10} height={12} />
        <EraseArea top={269} left={735} width={10} height={12} />
        {renderCheckboxTick(data?.alcoholDrugabuseSinceTf || "", 267, 462)}
        {renderMonthYearWithGaps(
          data?.alcoholDrugabuseSince || "",
          267,
          684,
          [16, 21]
        )}

        {/* ANY HIV */}
        <EraseArea top={289} left={684} width={10} height={12} />
        <EraseArea top={289} left={699} width={10} height={12} />
        <EraseArea top={289} left={720} width={10} height={12} />
        <EraseArea top={289} left={735} width={10} height={12} />
        {renderCheckboxTick(data?.hivstdSinceTf || "", 287, 462)}
        {renderMonthYearWithGaps(data?.hivstdSince || "", 287, 684, [16, 21])}

        {/* ANY OTHER AILMENT DETAILS */}
        {renderParagraph(
          shouldShowNoOtherAilments()
            ? "No other ailments"
            : data?.anyOtherailmentRemarks || "No other ailments",
          327,
          478,
          264,
          36
        )}

        {/* NAME OF TREATING DOCTOR */}
        {renderCharByCharWithGaps(
          data?.nameOfTheTreatingDoctor || "",
          413,
          169,
          [15, 17, 15, 14, 15, 16, 15, 16, 15, 16, 15, 14, 15]
        )}

        {/* QUALIFICATION */}
        {renderCharByCharWithGaps(
          data?.doctorQualification || "",
          435,
          169,
          [15, 17, 15, 14, 15, 16, 15, 16, 15, 16, 15, 14, 15]
        )}
        {/* REGISTRATION WITH STATE CODE */}
        {renderCharByCharWithGaps(
          data?.registrationNumberWithStateCode || "",
          435,
          597,
          [15, 17, 15, 15, 15, 17, 15, 16, 15, 16, 15, 14, 15]
        )}

        {/* PATIENT INSURE'S NAME */}
        {renderCharByCharWithGaps(
          data?.patientName || "",
          642,
          172,
          [15, 17, 15, 15, 15, 17, 15, 16, 15, 16, 15, 14, 15]
        )}

        {/* CONTACT NUMBER */}
        {renderCharByCharWithGaps(
          data?.contactNo || "",
          663,
          172,
          [15, 17, 15, 15, 15, 17, 15, 16, 15, 16, 15, 14, 15]
        )}

        {/* EMAIL ID OPTIONAL */}
        {renderCharByCharWithGaps(
          data?.email || "",
          664,
          415,
          [15, 15, 15, 15, 16, 16, 15, 16, 15, 16, 15, 14, 15]
        )}

        {/* PATIENT / INSURER SIGNATURE */}
        {renderImage(docsign.src, 689, 200, 135, 50, 3, 1)}

        {/* DATE DD MM YYYY */}
        <EraseArea top={688} left={445} width={10} height={14} />
        <EraseArea top={688} left={461} width={10} height={14} />
        <EraseArea top={688} left={476} width={10} height={14} />
        <EraseArea top={688} left={491} width={10} height={14} />
        <EraseArea top={688} left={506} width={10} height={14} />
        <EraseArea top={688} left={521} width={10} height={14} />
        <EraseArea top={688} left={537} width={10} height={14} />
        <EraseArea top={688} left={552} width={10} height={14} />
        {renderCharByCharWithGaps(
          parseDOBtoDDMMYYYY(data?.dateAndTimeOfAdmission || ""),
          687,
          446,
          [16, 16, 15, 15, 15, 16, 15, 16, 15, 16, 15, 14, 15]
        )}

        {/* TIME HH MM */}
        <EraseArea top={688} left={615} width={10} height={14} />
        <EraseArea top={688} left={630} width={10} height={14} />
        <EraseArea top={688} left={645} width={10} height={14} />
        <EraseArea top={688} left={660} width={10} height={14} />
        {renderCharByCharWithGaps(
          parseTimeToHHMM(data?.dateAndTimeOfAdmission || ""),
          687,
          616,
          [15, 15, 15, 15]
        )}

        {/* HOSPITAL SEAL */}
        {renderImage(hospitalseal.src, 980, 200, 120, 50, 3, 1)}

        {/* DOCTOR SIGNATURE */}
        {renderImage(docsign.src, 980, 550, 135, 45, 3, 1)}

        {/* DATE DD MM YYYY */}
        <EraseArea top={1036} left={72} width={10} height={14} />
        <EraseArea top={1036} left={87} width={10} height={14} />
        <EraseArea top={1036} left={102} width={10} height={14} />
        <EraseArea top={1036} left={117} width={10} height={14} />
        <EraseArea top={1036} left={133} width={10} height={14} />
        <EraseArea top={1036} left={148} width={10} height={14} />
        <EraseArea top={1036} left={164} width={10} height={14} />
        <EraseArea top={1036} left={179} width={10} height={14} />
        {renderCharByCharWithGaps(
          parseDOBtoDDMMYYYY(data?.dateAndTimeOfSignature || ""),
          1035,
          72,
          [16, 16, 15, 16, 15, 16, 15, 16, 16, 16, 16, 15, 15]
        )}

        {/* TIME HH MM */}
        <EraseArea top={1036} left={235} width={10} height={14} />
        <EraseArea top={1036} left={250} width={10} height={14} />
        <EraseArea top={1036} left={266} width={10} height={14} />
        <EraseArea top={1036} left={281} width={10} height={14} />
        {renderCharByCharWithGaps(
          parseTimeToHHMM(data?.dateAndTimeOfAdmission || ""),
          1035,
          235,
          [16, 16, 15, 15]
        )}
      </PageWrapper>
    </PageContainer>
  );
};

export default MediAssistPage2;
