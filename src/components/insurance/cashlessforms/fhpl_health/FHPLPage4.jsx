import React from "react";
import page4 from "@/assets/form_templates/fhpl/FHPL_PAGE_4.jpg";
import docsign from "@/assets/form_templates/common/doctorsignature.jpg";
import hospitalseal from "@/assets/form_templates/common/hospitalseal.jpg";
import { getTimeFromDate, getValidFormattedDate } from "./functions";
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
  min-width: ${({ width }) => width}px;
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

const FHPLPage4 = ({ data }) => {
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
        // border: "1px solid red",
      }}
    >
      {text || ""}
    </FieldBox>
  );
  return (
    <PageContainer>
      <PageWrapper pageBreak={false}>
        <BackgroundImage src={page4.src} alt="Background Form" />

        {/**********************************  PATIENT / INSURED NAME  ****************************/}
        {renderParagraph(data?.patientName || "", 398, 273, 177, 16)}

        {/**********************************  CONTACT NUMBER   ****************************/}
        {renderParagraph(data?.contactNo || "", 416, 219, 144, 16)}
        {/**********************************  EMAIL    ****************************/}
        {renderParagraph(data?.email || "", 416, 489, 144, 16)}

        {/********************************** PATIENT / INSURED SIGNATURE ****************************/}
        {renderImage(
          docsign.src, // src
          434, // top (pixels from top)
          300, // left (pixels from left)
          100, // width in px
          22, // height in px
          3, // zIndex: place above content
          1 // opacity: 10% for watermark effect
        )}

        {/**********************************  DATE   ****************************/}
        {renderParagraph(
          getValidFormattedDate(data?.dateAndTimeOfSignature) || "",
          452,
          139,
          144,
          16
        )}

        {/**********************************  TIME   ****************************/}
        {renderParagraph(
          getTimeFromDate(data?.dateAndTimeOfSignature) || "",
          452,
          413,
          144,
          16
        )}
        {/********************************** HOSPITAL SEAL ****************************/}
        {renderImage(
          hospitalseal.src, // src
          954, // top (pixels from top)
          180, // left (pixels from left)
          100, // width in px
          52, // height in px
          3, // zIndex: place above content
          1 // opacity: 10% for watermark effect
        )}
        {/********************************** PATIENT / INSURED SIGNATURE ****************************/}
        {renderImage(
          docsign.src, // src
          954, // top (pixels from top)
          620, // left (pixels from left)
          100, // width in px
          52, // height in px
          3, // zIndex: place above content
          1 // opacity: 10% for watermark effect
        )}

        {/**********************************  DATE   ****************************/}
        {renderParagraph(
          getValidFormattedDate(data?.hospitalDateAndTimeOfSignature) || "",
          1020,
          139,
          144,
          16
        )}

        {/**********************************  TIME   ****************************/}
        {renderParagraph(
          getTimeFromDate(data?.hospitalDateAndTimeOfSignature) || "",
          1020,
          533,
          144,
          16
        )}
      </PageWrapper>
    </PageContainer>
  );
};

export default FHPLPage4;
