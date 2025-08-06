import React from "react";
import page5 from "@/assets/form_templates/aegon_life/aegon_life_page5.jpg";
import docsign from "@/assets/form_templates/common/doctorsignature.jpg";
import hospitalseal from "@/assets/form_templates/common/hospitalseal.jpg";
import styled, { css } from "styled-components";
import {
  ageGaps,
  dobGaps,
  getDateOnly,
  getTimeFromDate,
  getValidFormattedDate,
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

const AegonPage5 = ({ data }) => {
  const renderCharByChar = (text, top, left, gap) => {
    if (!text) return null;
    return [...(text || "")].map((char, index) => (
      <Field key={index} top={top} left={left + index * gap}>
        {char}
      </Field>
    ));
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
  return (
    <PageContainer>
      <PageWrapper pagebreak={true}>
        <BackgroundImage src={page5.src} alt="Background Form" />
        {/**********************************  PATIENT / INSURED NAME  ****************************/}
        {renderParagraph(data?.patientName || "", 436, 243, 387, 16)}

        {/**********************************  CONTACT NUMBER   ****************************/}
        {renderParagraph(data?.contactNo || "", 464, 199, 144, 16)}
        {/**********************************  EMAIL    ****************************/}
        {renderParagraph(data?.email || "", 464, 515, 194, 16)}

        {/********************************** PATIENT / INSURED SIGNATURE ****************************/}
        {renderImage(
          docsign.src, // src
          484, // top (pixels from top)
          290, // left (pixels from left)
          100, // width in px
          22, // height in px
          3, // zIndex: place above content
          1 // opacity: 10% for watermark effect
        )}

        {/********************************** PATIENT / INSURER DATE   ****************************/}
        {renderParagraph(
          getValidFormattedDate(data?.dateAndTimeOfSignature) || "",
          516,
          145,
          164,
          16
        )}

        {/**********************************  TIME   ****************************/}
        {renderParagraph(
          getTimeFromDate(data?.dateAndTimeOfSignature) || "",
          516,
          392,
          144,
          16
        )}
        {/**********************************  DATE   ****************************/}
        {renderParagraph(
          getValidFormattedDate(data?.hospitalDateAndTimeOfSignature) || "",
          956,
          82,
          144,
          16
        )}

        {/**********************************  TIME   ****************************/}
        {renderParagraph(
          getTimeFromDate(data?.hospitalDateAndTimeOfSignature) || "",
          957,
          273,
          144,
          16
        )}

        {/********************************** PATIENT / INSURER SIGNATURE ****************************/}
        {renderImage(
          docsign.src, // src
          920, // top (pixels from top)
          520, // left (pixels from left)
          135, // width in px
          30, // height in px
          3, // zIndex: place above content
          1 // opacity: 10% for watermark effect
        )}

        {/********************************** HOSPITAL SEAL ****************************/}
        {renderImage(
          hospitalseal.src, // src
          900, // top (pixels from top)
          130, // left (pixels from left)
          150, // width in px
          60, // height in px
          3, // zIndex: place above content
          1 // opacity: 10% for watermark effect
        )}
      </PageWrapper>
    </PageContainer>
  );
};

export default AegonPage5;
