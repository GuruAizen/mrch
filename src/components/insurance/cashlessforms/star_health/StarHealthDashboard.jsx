"use client";
import React, { useEffect, useState } from "react";
import StarHealthPage1 from "./StarHealthPage1";
import StarHealthPage2 from "./StarHealthPage2";
import StarHealthPage3 from "./StarHealthPage3";
import StarHealthPage4 from "./StarHealthPage4";
import StarHealthPage5 from "./StarHealthPage5";
import StarHealthPage6 from "./StarHealthPage6";
import StarHealthPage7 from "./StarHealthPage7";
import axios from "axios";
import { GET_CASHLESS_FORM_DATA_BY_ID } from "@/components/API/insurance/PreAuthorizationAPI";
import { mainFilledData } from "../medi_assist/functions";
import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

const GlobalStyles = createGlobalStyle`
  html {
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    padding: 0;
    background: #fff;
    overflow-x: hidden;
  }

  @media print {
    body {
      margin: 0;
      padding: 0;
      overflow: hidden;
      width: 210mm;
    }

    * {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      box-sizing: border-box;
    }

    @page {
      size: A4 portrait;
      margin: 0;
    }

    html {
      width: 210mm;
      transform: scale(1);
    }
  }
`;

const PrintContainer = styled.div`
  position: relative;
  width: 210mm;
  margin: 0 auto;
  display: block;
  visibility: ${({ isLoaded }) => (isLoaded ? "visible" : "hidden")};

  @media print {
    visibility: visible;
    break-inside: avoid;
  }
`;

const LoadingMessage = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 18px;
  font-family: Arial, sans-serif;
  color: #000;
`;

const StarHealthDashboard = ({ id }) => {
  const [error, setError] = useState("");
  const [data, setData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    if (!id) {
      setError("ID is missing");
      setIsLoaded(true); // Allow rendering even on error to show error message
      return;
    }
    const fetchData = async (id) => {
      try {
        const response = await axios.get(GET_CASHLESS_FORM_DATA_BY_ID(id));
        if (response.status === 200) {
          const result = response.data;
          console.log(
            result,
            "star health insurance cashless form data result"
          );
          setData(result);
        }
      } catch (error) {
        console.error(
          "star health insurance Cashless form data: ",
          error.message
        );
        setError("Failed to fetch data");
      } finally {
        setIsLoaded(true);
      }
    };
    fetchData(id);
  }, [id]);

  return (
    <PrintContainer isLoaded={isLoaded}>
      <GlobalStyles />
      {error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : !isLoaded ? (
        <LoadingMessage>Loading...</LoadingMessage>
      ) : (
        <>
          <StarHealthPage1 data={mainFilledData} />
          <StarHealthPage2 data={mainFilledData} />
          <StarHealthPage3 data={mainFilledData} />
          <StarHealthPage4 data={mainFilledData} />
          <StarHealthPage5 data={mainFilledData} />
          <StarHealthPage6 data={mainFilledData} />
          <StarHealthPage7 data={mainFilledData} />
        </>
      )}
    </PrintContainer>
  );
};

export default StarHealthDashboard;
