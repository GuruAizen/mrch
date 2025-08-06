"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { GET_CASHLESS_FORM_DATA_BY_ID } from "@/components/API/insurance/PreAuthorizationAPI";
import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import { mainFilledData } from "../medi_assist/functions";

import AdityaBirlaPage1 from "./AdityaBirlaPage1";
import AdityaBirlaPage2 from "./AdityaBirlaPage2";
import AdityaBirlaPage3 from "./AdityaBirlaPage3";
import AdityaBirlaPage4 from "./AdityaBirlaPage4";
import AdityaBirlaForm from "./AdityaBirlaForm";

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
  visibility: ${({ $isLoaded }) => ($isLoaded ? "visible" : "hidden")};

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

const AdityaBirlaHealthInsuranceDashboard = ({ id }) => {
  const [error, setError] = useState("");
  const [data, setData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    if (!id) {
      alert(id, "id is missing");
      setError("ID is missing");
      setIsLoaded(true); // Allow rendering even on error to show error message
      return;
    }
    const fetchData = async (id) => {
      try {
        const response = await axios.get(GET_CASHLESS_FORM_DATA_BY_ID(id));
        if (response.status === 200) {
          const result = response.data;
          console.log(result, "aditya birla cashless form data result");
          setData(result);
        }
      } catch (error) {
        console.error("aditya birla Cashless form data: ", error.message);
        setError("Failed to fetch data");
      } finally {
        setIsLoaded(true);
      }
    };
    fetchData(id);
  }, [id]);

  return (
    <PrintContainer $isLoaded={isLoaded}>
      <GlobalStyles />
      {error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : !isLoaded ? (
        <LoadingMessage>Loading...</LoadingMessage>
      ) : (
        <>
          <AdityaBirlaForm data={mainFilledData} />
          
        </>
      )}
    </PrintContainer>
  );
};

export default AdityaBirlaHealthInsuranceDashboard;
