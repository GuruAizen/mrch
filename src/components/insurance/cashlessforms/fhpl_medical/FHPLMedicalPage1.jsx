import React from "react";
import page1 from "@/assets/form_templates/fhpl/FHPL_MEDICAL_INSURNACE_PAGE_1.jpg";
import styled, { css } from "styled-components";
import docsign from "@/assets/form_templates/common/doctorsignature.jpg";
import hospitalseal from "@/assets/form_templates/common/hospitalseal.jpg";
import {
  ageGaps,
  dobGaps,
  parseAgeToYYMM,
  parseDOBtoDDMMYY,
  parseDOBtoDDMMYYYY,
  parseTimeToHHMM,
  renderCheckboxTick,
  truncateToGaps,
  normalizeString,
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

    ${({ $pagebreak }) =>
      $pagebreak &&
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
  font-size: 10px;
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
  /* border: 1px solid tomato; */
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
  /* text-align: center; */
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

const StyledImage = styled.img`
  position: absolute;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  opacity: ${({ opacity }) => opacity || 1};
  pointer-events: none;
  user-select: none;
  z-index: 3;
`;

const FHPLMedicalPage1 = ({ data }) => {
  const renderCharByCharWithGaps = (
    text,
    top,
    left,
    gaps = [],
    defaultGap = 15.4
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

  const renderCheckboxTick = (condition, top, left) => {
    if (
      condition === true ||
      ["yes", "true", "checked"].includes(normalizeString(condition))
    ) {
      return (
        <Tick top={top} left={left}>
          ✔
        </Tick>
      );
    }
    return null;
  };

  const renderMonthYearWithGaps = (
    value,
    top,
    left,
    gaps = [15, 16, 15, 16]
  ) => {
    const clean = (value || "").replace("/", "").replaceAll(" ", "");
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

  const proposedLineOfTreatmentFn = (keyword) =>
    normalizeString(data?.proposedLineOfTreatment).includes(
      normalizeString(keyword)
    );

  const routeOfDrugAdministrationFn = (keyword) =>
    normalizeString(data?.routeOfDrugAdministration).includes(
      normalizeString(keyword)
    );

  const isEmergencyType = (type = "") =>
    normalizeString(data?.isThisAEmergencyOrPlannedEvent).includes(
      normalizeString(type)
    );

  const safeUpper = (text = "") => {
    const normalized = normalizeString(text);
    if (normalized === "null" || normalized === "undefined") return "";
    return text;
  };

  return (
    <PageContainer>
      <PageWrapper pagebreak={true}>
        <BackgroundImage src={page1.src} alt="Background Form" />
        {renderCharByCharWithGaps(
          safeUpper(data?.nameOfTheHospital || ""),
          58,
          140,
          [
            16, 16, 16, 16, 17, 16, 16, 17, 16, 16, 17, 16, 16, 16, 17, 16, 16,
            17, 16, 16, 17, 16, 16, 17, 16, 16, 16, 17, 16, 16, 17, 16, 16, 17,
            16, 16, 17, 16, 16, 16, 17, 16, 16,
          ]
        )}
        {renderCharByCharWithGaps(
          safeUpper(data?.hospitalLocation || ""),
          78,
          122,
          [
            16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
            16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
            16, 16, 16, 16, 16, 16,
          ]
        )}
        {renderCharByCharWithGaps(
          safeUpper(data?.hospitalId || ""),
          78,
          608,
          [15, 15, 15, 15, 16, 15, 15, 14, 15, 16, 15, 14, 15]
        )}
        {renderCharByCharWithGaps(
          safeUpper(data?.hospitalFaxNo || ""),
          96,
          124,
          [15, 15, 15, 15, 16, 15, 15, 14, 15, 16, 15, 14, 15]
        )}
        {renderCharByCharWithGaps(
          safeUpper(data?.hospitalPhoneNo || ""),
          97,
          463,
          [16, 16, 15, 15, 16, 15, 15, 14, 15, 16, 15, 14, 15]
        )}
        {renderParagraph(
          data?.tollFreePhoneNumber || " - ",
          149,
          150,
          83,
          12.5,
          8
        )}
        {renderParagraph(data?.tollFreeTax || " - ", 165, 150, 83, 12.5, 8)}
        <EraseArea top={204} left={185} width={9} height={12} />
        <EraseArea top={204} left={200} width={9} height={12} />
        <EraseArea top={204} left={218} width={9} height={12} />
        <EraseArea top={204} left={233} width={9} height={12} />
        <EraseArea top={204} left={250} width={9} height={12} />
        <EraseArea top={204} left={265} width={9} height={12} />
        <EraseArea top={204} left={282} width={9} height={12} />
        <EraseArea top={204} left={381} width={9} height={12} />
        <EraseArea top={204} left={398} width={9} height={12} />
        <EraseArea top={204} left={413} width={9} height={12} />
        <EraseArea top={204} left={430} width={9} height={12} />
        <EraseArea top={204} left={447} width={9} height={12} />
        <EraseArea top={204} left={480} width={9} height={12} />
        <EraseArea top={204} left={495} width={9} height={12} />
        <EraseArea top={204} left={512} width={9} height={12} />
        <EraseArea top={204} left={528} width={9} height={12} />
        {renderCharByCharWithGaps(
          safeUpper(data?.patientName || ""),
          200,
          152,
          [17, 17, 17, 17, 17, 17, 17, 17, 15, 16, 15, 15, 15]
        )}
        {normalizeString(data?.gender) === "male" && (
          <Tick top={222} left={151}>
            ✔
          </Tick>
        )}
        {normalizeString(data?.gender) === "female" && (
          <Tick top={222} left={187}>
            ✔
          </Tick>
        )}
        <EraseArea top={225} left={288} width={8} height={10} />
        <EraseArea top={225} left={304} width={8} height={10} />
        <EraseArea top={223} left={354} width={8} height={10} />
        <EraseArea top={223} left={369} width={8} height={10} />
        {renderSingleCharByChar(
          parseAgeToYYMM(data?.age || ""),
          221,
          289,
          ageGaps
        )}
        <EraseArea top={223} left={445} width={8} height={9} />
        <EraseArea top={223} left={459} width={8} height={9} />
        <EraseArea top={223} left={477} width={8} height={9} />
        <EraseArea top={223} left={492} width={8} height={9} />
        <EraseArea top={223} left={510} width={8} height={9} />
        <EraseArea top={223} left={525} width={8} height={9} />
        <EraseArea top={223} left={538} width={8} height={9} />
        <EraseArea top={223} left={553} width={8} height={9} />
        {renderSingleCharByChar(
          parseDOBtoDDMMYYYY(data?.dateOfBirth || ""),
          219,
          445,
          dobGaps
        )}
        {renderCharByCharWithGaps(
          data?.contactNo || "",
          220,
          608,
          [15, 15, 15, 15, 13, 15, 14, 15, 15]
        )}
        {renderCharByCharWithGaps(
          data?.contactNoOfAttendingRelative || "",
          240,
          153,
          [15, 15, 15, 15, 13, 15, 14, 15, 15]
        )}
        {renderCharByCharWithGaps(
          data?.insuredIdCardNo || "",
          240,
          529,
          [14, 14, 14, 16, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14]
        )}
        {renderCharByCharWithGaps(
          truncateToGaps(data?.policyNumber, 19),
          264,
          186,
          [
            19, 19, 19, 19, 19, 19, 19, 21, 19, 19, 21, 21, 21, 19, 19, 19, 19,
            19, 19, 19, 19, 19,
          ]
        )}
        {renderCharByCharWithGaps(
          truncateToGaps(data?.employeeId, 7),
          263,
          617,
          [21, 20, 20, 20, 20, 20, 20]
        )}
        {normalizeString(
          data?.currentlyDoYouHaveAnyOtherMedicalClaimHealthInsurance
        ) === "yes" && (
          <Tick top={287} left={282}>
            ✔
          </Tick>
        )}
        {normalizeString(
          data?.currentlyDoYouHaveAnyOtherMedicalClaimHealthInsurance
        ) === "no" && (
          <Tick top={287} left={328}>
            ✔
          </Tick>
        )}
        {renderCharByCharWithGaps(
          truncateToGaps(data?.currentMedicalInsuranceCompanyName, 17),
          287,
          443,
          [
            17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17,
            17, 17, 17, 17, 17,
          ]
        )}
        {renderParagraph(data?.giveDetails || " - ", 307, 154, 599, 15, 6)}
        {normalizeString(data?.doYouHaveAFamilyPhysician) === "yes" && (
          <Tick top={326} left={172}>
            ✔
          </Tick>
        )}
        {normalizeString(data?.doYouHaveAFamilyPhysician) === "no" && (
          <Tick top={326} left={218}>
            ✔
          </Tick>
        )}
        {renderCharByCharWithGaps(
          truncateToGaps(data?.familyPhysicianName, 22),
          325,
          377,
          [
            16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17,
            17, 17, 17, 17, 17,
          ]
        )}
        {renderCharByCharWithGaps(
          truncateToGaps(data?.contactNo, 10),
          343,
          157,
          [17, 17, 17, 17, 17, 17, 17, 17, 17, 17]
        )}
        {renderCharByCharWithGaps(
          truncateToGaps(data?.nameOfTreatingDoctor, 21),
          378,
          157,
          [
            17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17,
            17, 17, 17, 17, 17,
          ]
        )}
        {renderCharByCharWithGaps(
          truncateToGaps(data?.contactNo, 10),
          377,
          588,
          [17, 17, 17, 17, 17, 17, 17, 17, 17, 17]
        )}
        <EraseArea top={400} left={152} width={262} height={43} />
        {renderParagraph(
          data?.natureOfIllnessWithPresentingComplaints || "",
          400,
          152,
          262,
          43,
          8
        )}

        <EraseArea top={399} left={516} width={237} height={47} />
        {renderParagraph(
          data?.relevantClinicalFindings || "",
          399,
          516,
          237,
          47,
          8
        )}
        {renderParagraph(
          data?.presentAilmentDuration || "",
          458,
          178,
          24,
          13,
          8
        )}
        <EraseArea top={457} left={343} width={8} height={12} />
        <EraseArea top={457} left={359} width={8} height={12} />
        <EraseArea top={457} left={385} width={8} height={12} />
        <EraseArea top={457} left={400} width={8} height={12} />
        <EraseArea top={457} left={424} width={8} height={12} />
        <EraseArea top={457} left={441} width={8} height={12} />
        {renderSingleCharByChar(
          parseDOBtoDDMMYY(data?.dateOfBirth || ""),
          454,
          343,
          [15, 27, 15, 25, 15]
        )}
        <EraseArea top={450} left={514} width={242} height={31} />
        {renderParagraph(
          data?.pastHistoryPresentIllness || "",
          450,
          514,
          242,
          31,
          8
        )}
        <EraseArea top={474} left={156} width={259} height={28} />
        {renderParagraph(
          data?.pastHistoryPresentIllness || "",
          474,
          156,
          259,
          28,
          8
        )}
        {renderCharByCharWithGaps(
          data?.icd10Code || "",
          491,
          538,
          [16, 16, 15, 14, 15, 16, 15, 16, 15, 16, 15, 14, 15]
        )}
        {proposedLineOfTreatmentFn("medical management") && (
          <Tick top={515} left={169}>
            ✔
          </Tick>
        )}
        {proposedLineOfTreatmentFn("surgical management") && (
          <Tick top={515} left={320}>
            ✔
          </Tick>
        )}
        {proposedLineOfTreatmentFn("intensivecare") && (
          <Tick top={515} left={454}>
            ✔
          </Tick>
        )}
        {proposedLineOfTreatmentFn("investigation") && (
          <Tick top={515} left={562}>
            ✔
          </Tick>
        )}
        {proposedLineOfTreatmentFn("non-allopathic treatment") && (
          <Tick top={515} left={646}>
            ✔
          </Tick>
        )}
        <EraseArea top={531} left={153} width={261} height={32} />
        {renderParagraph(
          data?.ifInvestigativeOfMedicalManagementProvideDetails || "",
          531,
          153,
          261,
          32,
          8
        )}
        <EraseArea top={531} left={518} width={241} height={43} />
        {renderParagraph(
          safeUpper(data?.routeOfDrugAdministration || ""),
          531,
          518,
          241,
          43,
          8
        )}
        <EraseArea top={575} left={153} width={265} height={28} />
        {renderParagraph(
          data?.surgicalNameOfSurgery || "",
          575,
          153,
          265,
          28,
          8
        )}
        {renderCharByCharWithGaps(
          truncateToGaps(data?.icd10PcsCode, 10),
          590,
          505,
          [17, 17, 17, 17, 17, 17, 17, 17, 17, 17]
        )}

        <EraseArea top={612} left={153} width={264} height={30} />
        {renderParagraph(
          data?.ifOtherTreatmentDetails || "",
          612,
          153,
          264,
          30,
          8
        )}
        <EraseArea top={611} left={516} width={242} height={28} />
        {renderParagraph(data?.howDidInjuryOccur || "", 611, 516, 242, 28, 8)}

        {normalizeString(data?.isItRta) === "yes" && (
          <Tick top={650} left={204}>
            ✔
          </Tick>
        )}
        {normalizeString(data?.isItRta) === "no" && (
          <Tick top={650} left={235}>
            ✔
          </Tick>
        )}
        <EraseArea top={653} left={344} width={8} height={8} />
        <EraseArea top={653} left={360} width={8} height={8} />
        <EraseArea top={653} left={390} width={8} height={8} />
        <EraseArea top={653} left={408} width={8} height={8} />
        <EraseArea top={653} left={436} width={8} height={8} />
        <EraseArea top={653} left={452} width={8} height={8} />
        {renderCharByCharWithGaps(
          parseDOBtoDDMMYY(data?.dateOfInjury || ""),
          649,
          344,
          [16, 31, 15, 31, 15, 16]
        )}
        {normalizeString(data?.reportedToPolice) === "yes" && (
          <Tick top={650} left={577}>
            ✔
          </Tick>
        )}
        {normalizeString(data?.reportedToPolice) === "no" && (
          <Tick top={650} left={623}>
            ✔
          </Tick>
        )}
        {renderCharByCharWithGaps(
          data?.firNo || "",
          648,
          703,
          [16, 15, 15, 14, 15, 16, 15, 16, 15, 16, 15, 14, 15]
        )}
        {normalizeString(data?.injuryDueToAlcoholConsumption) === "yes" && (
          <Tick top={667} left={296}>
            ✔
          </Tick>
        )}
        {normalizeString(data?.injuryDueToAlcoholConsumption) === "no" && (
          <Tick top={667} left={342}>
            ✔
          </Tick>
        )}
        {normalizeString(data?.testsConductedToEstablish) === "yes" && (
          <Tick top={667} left={514}>
            ✔
          </Tick>
        )}
        {normalizeString(data?.testsConductedToEstablish) === "no" && (
          <Tick top={667} left={560}>
            ✔
          </Tick>
        )}
        {renderParagraph(data?.maternityG || "", 685, 165, 30, 13, 10)}
        {renderParagraph(data?.maternityP || "", 685, 225, 30, 13, 10)}
        {renderParagraph(data?.maternityL || "", 685, 290, 30, 13, 10)}
        {renderParagraph(data?.maternityA || "", 685, 363, 30, 13, 10)}

        <EraseArea top={687} left={628} width={8} height={10} />
        <EraseArea top={687} left={644} width={8} height={10} />
        <EraseArea top={687} left={674} width={8} height={10} />
        <EraseArea top={687} left={690} width={8} height={10} />
        <EraseArea top={687} left={719} width={8} height={10} />
        <EraseArea top={687} left={734} width={8} height={10} />
        {renderCharByCharWithGaps(
          parseDOBtoDDMMYY(data?.expectedDateOfDelivery || ""),
          682,
          628,
          [16, 30, 15, 30, 16, 16]
        )}

        <EraseArea top={720} left={157} width={10} height={14} />
        <EraseArea top={720} left={173} width={10} height={14} />
        <EraseArea top={720} left={205} width={10} height={14} />
        <EraseArea top={720} left={222} width={10} height={14} />
        <EraseArea top={720} left={255} width={10} height={14} />
        <EraseArea top={720} left={271} width={10} height={14} />
        {renderCharByCharWithGaps(
          parseDOBtoDDMMYY(data?.dateOfAdmission || ""),
          718,
          157,
          [16, 33, 16, 33]
        )}
        <EraseArea top={720} left={353} width={10} height={14} />
        <EraseArea top={720} left={369} width={10} height={14} />
        <EraseArea top={720} left={400} width={10} height={14} />
        <EraseArea top={720} left={416} width={10} height={14} />

        {renderCharByCharWithGaps(
          parseTimeToHHMM(data?.dateAndTimeOfAdmission || ""),
          718,
          353,
          [18, 29, 15, 15]
        )}
        {isEmergencyType("an emergency") && (
          <Tick top={743} left={248}>
            ✔
          </Tick>
        )}
        {isEmergencyType("a planned hospitalization event") && (
          <Tick top={743} left={328}>
            ✔
          </Tick>
        )}
        {renderParagraph(
          data?.expectedNoOfDaysStayInHospital || "",
          763,
          190,
          40,
          14,
          8
        )}
        {renderParagraph(data?.roomType || "", 760, 333, 121, 15, 8)}
        {renderNumberRightAligned(
          data?.perDayRoomRentNursingServiceCharges || "",
          778,
          343,
          [18, 18, 18, 18, 18, 18, 18]
        )}
        {renderNumberRightAligned(
          data?.expectedCostForInvestigationDiagnostics || "",
          800,
          343,
          [18, 18, 18, 18, 18, 18, 18]
        )}
        {renderNumberRightAligned(
          data?.icuCharges || "",
          820,
          343,
          [18, 18, 18, 18, 18, 18, 18]
        )}
        {renderNumberRightAligned(
          data?.otCharges || "",
          840,
          343,
          [18, 18, 18, 18, 18, 18, 18]
        )}
        {renderNumberRightAligned(
          data?.professionalFeesSurgeonAnesthetistFeesConsultationCharges || "",
          862,
          343,
          [18, 18, 18, 18, 18, 18, 18]
        )}
        {renderNumberRightAligned(
          data?.medicinesConsumablesCostOfImplantsIfApplicablePleaseSpecify ||
            "",
          883,
          343,
          [18, 18, 18, 18, 18, 18, 18]
        )}
        {renderNumberRightAligned(
          data?.allInclusivePackageChargesIfAnyApplicable || "",
          910,
          343,
          [18, 18, 18, 18, 18, 18, 18]
        )}
        {renderNumberRightAligned(
          data?.sumTotalExpectedCostOfHospitalization || "",
          934,
          343,
          [18, 18, 18, 18, 18, 18, 18]
        )}

        <EraseArea top={730} left={672} width={8} height={10} />
        <EraseArea top={730} left={688} width={8} height={10} />
        <EraseArea top={730} left={720} width={8} height={10} />
        <EraseArea top={730} left={735} width={8} height={10} />

        {renderCheckboxTick(data?.diabetesSinceTf || "", 728, 483)}
        {renderMonthYearWithGaps(data?.diabetesSince || "", 728, 672, [16, 29])}

        <EraseArea top={747} left={672} width={8} height={10} />
        <EraseArea top={747} left={688} width={8} height={10} />
        <EraseArea top={747} left={720} width={8} height={10} />
        <EraseArea top={747} left={735} width={8} height={10} />

        {renderCheckboxTick(data?.heartDiseaseSinceTf || "", 746, 483)}
        {renderMonthYearWithGaps(
          data?.heartDiseaseSince || "",
          744,
          672,
          [16, 29]
        )}
        <EraseArea top={766} left={672} width={8} height={10} />
        <EraseArea top={766} left={688} width={8} height={10} />
        <EraseArea top={766} left={720} width={8} height={10} />
        <EraseArea top={766} left={735} width={8} height={10} />

        {renderCheckboxTick(data?.hypertensionSinceTf || "", 765, 483)}
        {renderMonthYearWithGaps(
          data?.hypertensionSince || "",
          763,
          672,
          [16, 29]
        )}
        <EraseArea top={785} left={672} width={8} height={10} />
        <EraseArea top={785} left={688} width={8} height={10} />
        <EraseArea top={785} left={720} width={8} height={10} />
        <EraseArea top={785} left={735} width={8} height={10} />

        {renderCheckboxTick(data?.hyperlipidemiasSinceTf || "", 785, 483)}
        {renderMonthYearWithGaps(
          data?.hyperlipidemiasSince || "",
          782,
          672,
          [16, 29]
        )}
        <EraseArea top={805} left={672} width={8} height={10} />
        <EraseArea top={805} left={688} width={8} height={10} />
        <EraseArea top={805} left={720} width={8} height={10} />
        <EraseArea top={805} left={735} width={8} height={10} />

        {renderCheckboxTick(data?.osteoarthritisSinceTf || "", 805, 483)}
        {renderMonthYearWithGaps(
          data?.osteoarthritisSince || "",
          801,
          672,
          [16, 29]
        )}
        <EraseArea top={823} left={672} width={8} height={10} />
        <EraseArea top={823} left={688} width={8} height={10} />
        <EraseArea top={823} left={720} width={8} height={10} />
        <EraseArea top={823} left={735} width={8} height={10} />

        {renderCheckboxTick(data?.asthmaCopdBronchitisSinceTf || "", 823, 483)}
        {renderMonthYearWithGaps(
          data?.asthmaCopdBronchitisSince || "",
          820,
          672,
          [16, 29]
        )}
        <EraseArea top={842} left={672} width={8} height={10} />
        <EraseArea top={842} left={688} width={8} height={10} />
        <EraseArea top={842} left={720} width={8} height={10} />
        <EraseArea top={842} left={735} width={8} height={10} />

        {renderCheckboxTick(data?.cancerSinceTf || "", 842, 483)}
        {renderMonthYearWithGaps(data?.cancerSince || "", 840, 672, [16, 29])}

        <EraseArea top={861} left={672} width={8} height={10} />
        <EraseArea top={861} left={688} width={8} height={10} />
        <EraseArea top={861} left={720} width={8} height={10} />
        <EraseArea top={861} left={735} width={8} height={10} />

        {renderCheckboxTick(data?.alcoholDrugabuseSinceTf || "", 861, 483)}
        {renderMonthYearWithGaps(
          data?.alcoholDrugabuseSince || "",
          858,
          672,
          [16, 29]
        )}
        <EraseArea top={879} left={672} width={8} height={10} />
        <EraseArea top={879} left={688} width={8} height={10} />
        <EraseArea top={879} left={720} width={8} height={10} />
        <EraseArea top={879} left={735} width={8} height={10} />

        {renderCheckboxTick(data?.hivstdSinceTf || "", 879, 483)}
        {renderMonthYearWithGaps(data?.hivstdSince || "", 876.5, 672, [16, 29])}

        {renderParagraph(
          data?.anyOtherailmentRemarks || "No other ailments",
          918,
          502,
          242,
          37,
          8
        )}
        <EraseArea top={1013} left={187} width={8} height={10} />
        <EraseArea top={1013} left={203} width={8} height={10} />
        <EraseArea top={1013} left={218} width={8} height={10} />
        <EraseArea top={1013} left={234} width={8} height={10} />
        <EraseArea top={1013} left={250} width={8} height={10} />
        <EraseArea top={1013} left={268} width={8} height={10} />
        <EraseArea top={1013} left={282} width={8} height={10} />
        <EraseArea top={1013} left={380} width={8} height={10} />
        <EraseArea top={1013} left={396} width={8} height={10} />
        <EraseArea top={1013} left={412} width={8} height={10} />
        <EraseArea top={1013} left={428} width={8} height={10} />
        <EraseArea top={1013} left={444} width={8} height={10} />
        <EraseArea top={1013} left={476} width={8} height={10} />
        <EraseArea top={1013} left={493} width={8} height={10} />
        <EraseArea top={1013} left={510} width={8} height={10} />
        <EraseArea top={1013} left={525} width={8} height={10} />
        <EraseArea top={1013} left={574} width={8} height={10} />
        <EraseArea top={1013} left={589} width={8} height={10} />
        <EraseArea top={1013} left={607} width={8} height={10} />
        <EraseArea top={1013} left={623} width={8} height={10} />
        <EraseArea top={1013} left={639} width={8} height={10} />
        <EraseArea top={1013} left={655} width={8} height={10} />
        <EraseArea top={1013} left={688} width={8} height={10} />
        <EraseArea top={1013} left={703} width={8} height={10} />
        <EraseArea top={1013} left={719} width={8} height={10} />
        <EraseArea top={1013} left={734} width={8} height={10} />
        {renderCharByCharWithGaps(
          data?.nameOfTheTreatingDoctor || "",
          1010,
          170,
          [
            16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
            16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
            16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
            16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
          ]
        )}
        {renderCharByCharWithGaps(
          truncateToGaps(data?.doctorQualification, 7),
          1031,
          137,
          [17, 17, 17, 16, 16, 17, 17]
        )}
        {renderCharByCharWithGaps(
          truncateToGaps(data?.registrationNumberWithStateCode, 7),
          1031,
          375,
          [17, 17, 17, 17, 17, 17, 17]
        )}
        <StyledImage
          src={hospitalseal.src}
          top={1060}
          left={200}
          width={120}
          height={40}
          opacity={1}
          alt=""
        />
        <StyledImage
          src={docsign.src}
          top={1060}
          left={530}
          width={135}
          height={42}
          opacity={1}
          alt=""
        />
      </PageWrapper>
    </PageContainer>
  );
};

export default FHPLMedicalPage1;
