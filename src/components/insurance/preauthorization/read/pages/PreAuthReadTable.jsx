import React, { useEffect, useState, useCallback } from "react";
import debounce from "lodash/debounce";
import {
  Container,
  HeaderSection,
  Title,
  CreateButtonWrapper,
  CreateText,
  SearchSection,
  SearchInput,
} from "../styles/preAuthRead";
import updownArrow from "@/assets/insurance/preauth/upanddownarrow.png";
import viewbin from "@/assets/common/viewbin.png";
import editbin from "@/assets/common/editbin.png";
import deletebin from "@/assets/common/deletebin.png";
import downloadicon from "@/assets/common/downloadicon.png";

import { useDispatch, useSelector } from "react-redux";
import Pagination from "./Pagination";

import { isNull } from "lodash";
import { setFilteredCashlessFormData } from "@/redux/insurance/preAuthorizationSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  HeaderContent,
  SortIcon,
  StyledDataTable,
} from "../styles/preAuthReadTable";
import Image from "next/image";
import {
  GET_ALL_CASHLESS_FORM_DATA,
  GET_CASHLESS_FORM_DATA_BY_ID,
  DELETE_CASHLESS_FORM_DATA,
  GLOBAL_SEARCH_CASHLESS_FORM_DATA,
} from "@/components/API/insurance/PreAuthorizationAPI";
import { insuranceForms } from "./functions";

const PreAuthReadTable = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { filteredCashlessFormData } = useSelector(
    (state) => state.preAuthStore
  );

  const [globalSearchQuery, setGlobalSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);

  const rowsPerPage = 10;

  useEffect(() => {
    fetchAllCashLessFormList();
  }, []);

  const fetchAllCashLessFormList = async () => {
    try {
      const response = await axios.get(GET_ALL_CASHLESS_FORM_DATA);
      console.log(response, "from data");

      if (response.status === 200) {
        const result = response.data;
        console.log(result, "cashlessform result");

        // dispatch(setFilteredCashlessFormData(result));
        dispatch(setFilteredCashlessFormData(insuranceForms));
        setCurrentPage(1);
      }
    } catch (error) {
      console.error("Error fetching summary list:", error.message);
    }
  };

  const globalSearch = useCallback(
    debounce(async (searchText) => {
      const params = {
        draw: 5,
        start: 0,
        length: 100,
        "search[value]": searchText,
      };
      try {
        const response = await axios.get(
          GLOBAL_SEARCH_CASHLESS_FORM_DATA(params)
        );
        dispatch(setFilteredCashlessFormData(response.data?.data || []));
        setCurrentPage(1);
      } catch (error) {
        console.error("Search error:", error.message);
      }
    }, 700),
    []
  );

  const handleGlobalSearch = (e) => {
    const value = e.target.value;
    setGlobalSearchQuery(value);
    globalSearch(value);
  };

  const viewCashlessFormData = async (id) => {
    try {
      const response = await axios.get(GET_CASHLESS_FORM_DATA_BY_ID(id));
      dispatch(setFilteredCashlessFormData(response));
    } catch (error) {
      console.error("View form error", error.message);
    }
  };

  const editCashlessFormData = async (id) => {
    try {
      const response = await axios.get(GET_CASHLESS_FORM_DATA_BY_ID(id));
      console.log(response, "edit cashless form data");
      if (response.status === 200) {
        const result = [response.data];
        // const result = response.data;
        dispatch(setFilteredCashlessFormData(result));
        if (filteredCashlessFormData.length > 1) {
          // router.push(`/insurance/preauth/create/${id}`);
        }
      }
    } catch (error) {
      console.error("Edit error", error.message);
    }
  };

  const deleteCashlessFormData = async (id) => {
    try {
      const response = await axios.get(DELETE_CASHLESS_FORM_DATA(id));
      if (response.data.code === 200) {
        fetchAllCashLessFormList();
      }
    } catch (error) {
      console.error("Delete error", error.message);
    }
  };

  const handleSort = (column, direction) => {
    setSortColumn(column.id);
    setSortDirection(direction);
  };

  // const getCashlessFormUrl = (cashlessFormName, id) => {
  //   const cashlessFormRoutes = {
  //     "medi assist": "mediassistcashlessform",
  //     fhplmedical: "fhplmedicalcashlessform",
  //     fhplhealth: "fhplhealthcashlessform",
  //     raksha: "rakshacashlessform",
  //     "star health": "starhealthcashlessform",
  //     "icici lombard": "iciciform",
  //     "hdfc ergo": "hdfcergoform",
  //     "max bupa": "maxbupaform",
  //     reliance: "relianceform",
  //     "bajaj allianz": "bajajform",
  //     "aditya birla": "adityabirlaform",
  //     "future generali": "futureform",
  //     "united india": "unitedform",
  //     "new india": "newindiaform",
  //     oriental: "orientalform",
  //     "national insurance": "nationalform",
  //     cholamandalam: "cholaform",
  //     "universal sompo": "sompoform",
  //     "tata aig": "tataaigform",
  //     "sbi general": "sbiform",
  //     "iffco tokio": "iffcoform",
  //   };

  //   const normalizedFormName = cashlessFormName.toLowerCase();

  //   const matchedKey = Object.keys(cashlessFormRoutes).find((key) =>
  //     normalizedFormName.includes(key)
  //   );

  //   if (matchedKey) {
  //     return `/forms/${cashlessFormRoutes[matchedKey]}/${id}`;
  //   } else {
  //     console.warn("No match found for:", cashlessFormName);
  //     return null;
  //   }
  // };
  const getCashlessFormUrl = (cashlessFormName, id) => {
    // Map of form name keywords to route paths
    const cashlessFormRoutes = {
      "medi assist": "mediassistcashlessform",
      fhplmedical: "fhplmedicalcashlessform",
      fhplhealth: "fhplhealthcashlessform",
      aegon: "aegonhealthcashlessform",
      "star health": "starhealthcashlessform",
      raksha: "rakshacashlessform",
      "icici lombard": "iciciform",
      "hdfc ergo": "hdfcergohealthinsurancecashlessform",
      "max bupa": "maxbupaform",
      reliance: "relianceform",
      "bajaj allianz": "bajajhealthinsurancecashlessform",
      "aditya birla": "adityabirlacashlessform",
      "future generali": "futureform",
      "united india": "unitedform",
      "new india": "newindiaform",
      oriental: "orientalform",
      "national insurance": "nationalform",
      cholamandalam: "cholaform",
      "universal sompo": "sompoform",
      "tata aig": "tataaigform",
      "sbi general": "sbiform",
      "iffco tokio": "iffcoform",
    };

    if (!cashlessFormName || !id) {
      console.warn("Invalid arguments passed to getCashlessFormUrl");
      return null;
    }

    const normalizedFormName = cashlessFormName.toLowerCase();

    // Find a matching key based on whether the form name includes it
    const matchedKey = Object.keys(cashlessFormRoutes).find((key) =>
      normalizedFormName.includes(key)
    );

    if (matchedKey) {
      return `/forms/${cashlessFormRoutes[matchedKey]}/${id}`;
    } else {
      console.warn("No matching route found for form name:", cashlessFormName);
      return null;
    }
  };

  const openAndAutoCloseWindow = (cashlessFormName, id) => {
    // console.log(cashlessFormName,id);

    // const url = getCashlessFormUrl("Medi Assist", id);
    // const url = getCashlessFormUrl("fhplhealth", id);
    // const url = getCashlessFormUrl("fhplmedical", id);
    const url = getCashlessFormUrl(cashlessFormName, id);
    // const url = getCashlessFormUrl("star health", id);
    // const url = getCashlessFormUrl("aegon", id);
    if (!url) return; // Add this check

    const newWindow = window.open(url, "_blank");

    if (!newWindow) return;

    newWindow.onload = () => {
      // ✅ Close the window only when the Escape (Esc) key is pressed
      newWindow.document.body.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          newWindow.close();
        }

        /*
        🔑 Only reacts to:
        - Escape key (Esc)
      */
      });
    };
  };

  const columns = [
    {
      id: "cashlessFormId",
      //   id: "uhid",
      name: (
        <HeaderContent>
          <span>PATIENT ID</span>
          {/* <span>UHID</span> */}
          <SortIcon src={updownArrow} alt="sort" />
          {/* {sortColumn === "cashlessFormId" && (
            <span className="sort-text">
              {sortDirection === "asc" ? "ASCENDING" : "DESCENDING"}
            </span>
          )} */}
        </HeaderContent>
      ),
      selector: (row) => row.cashlessFormId,
      sortable: true,
    },
    {
      id: "patientName",
      name: (
        <HeaderContent>
          <span>PATIENT NAME</span>
          <SortIcon src={updownArrow} alt="sort" />
          {/* {sortColumn === "patientName" && (
            <span className="sort-text">
              {sortDirection === "asc" ? "ASCENDING" : "DESCENDING"}
            </span>
          )} */}
        </HeaderContent>
      ),
      selector: (row) => row.patientName,
      sortable: true,
    },
    {
      id: "Payer Name",
      name: (
        <HeaderContent>
          <span>PAYER NAME</span>
          <SortIcon src={updownArrow} alt="sort" />
          {/* {sortColumn === "memberId" && (
            <span className="sort-text">
              {sortDirection === "asc" ? "ASCENDING" : "DESCENDING"}
            </span>
          )} */}
        </HeaderContent>
      ),
      selector: (row) => row.payerName,
      sortable: true,
    },
    {
      id: "employeeId",
      name: (
        <HeaderContent>
          <span>EMPLOYEE ID</span>
          <SortIcon src={updownArrow} alt="sort" />
          {/* {sortColumn === "employeeId" && (
            <span className="sort-text">
              {sortDirection === "asc" ? "ASCENDING" : "DESCENDING"}
            </span>
          )} */}
        </HeaderContent>
      ),
      selector: (row) => row.employeeId,
      sortable: true,
    },
    {
      id: "status",
      name: (
        <HeaderContent>
          <span>STATUS</span>
          <SortIcon src={updownArrow} alt="sort" />
          {/* {sortColumn === "status" && (
            <span className="sort-text">
              {sortDirection === "asc" ? "ASCENDING" : "DESCENDING"}
            </span>
          )} */}
        </HeaderContent>
      ),
      selector: (row) => row.status,
      sortable: true,
    },
    // {
    //   id: "download",
    //   name: (
    //     <HeaderContent>
    //       <span>DOWNLOAD</span>
    //     </HeaderContent>
    //   ),
    //   cell: (row) => (
    //     <button onClick={() => openAndAutoCloseWindow()}>Download</button>
    //   ),
    // },
    {
      id: "actions",
      name: (
        <HeaderContent>
          <span>ACTIONS</span>
        </HeaderContent>
      ),
      cell: (row) => (
        <div style={{ display: "flex", gap: "12px" }}>
          <Image
            src={viewbin}
            className="w-5 h-5 cursor-pointer hover:scale-105 transition-transform"
            alt="view"
            onClick={() => viewCashlessFormData(row.cashlessFormId)}
          />
          <Image
            src={editbin}
            className="w-5 h-5 cursor-pointer hover:scale-105 transition-transform"
            alt="edit"
            onClick={() => editCashlessFormData(row.cashlessFormId)}
          />
          <Image
            src={deletebin}
            className="w-5 h-5 cursor-pointer hover:scale-105 transition-transform"
            alt="delete"
            onClick={() => deleteCashlessFormData(row.cashlessFormId)}
          />
          <Image
            src={downloadicon}
            className="w-5 h-5 cursor-pointer hover:scale-105 transition-transform"
            alt="delete"
            title="Download"
            onClick={() =>
              openAndAutoCloseWindow(row.formName, row.cashlessFormId)
            }
            style={{ cursor: "pointer" }}
          />
        </div>
      ),
    },
  ];
  const customStyles = {
    cells: {
      style: {
        height: "54px",
        // paddingLeft: "12px",
        // paddingRight: "12px",
        // borderRight: "8px solid white",
      },
    },
  };

  return (
    <Container>
      <HeaderSection>
        <Title>Cashless Form List</Title>
        <CreateButtonWrapper
          onClick={() => navigate("/insurance/preauth/create")}
        >
          <CreateText>CREATE</CreateText>
        </CreateButtonWrapper>
      </HeaderSection>

      <SearchSection onSubmit={(e) => e.preventDefault()}>
        <SearchInput
          type="search"
          placeholder="Search"
          value={globalSearchQuery}
          onChange={handleGlobalSearch}
        />
      </SearchSection>

      <StyledDataTable
        columns={columns}
        data={filteredCashlessFormData.slice(
          (currentPage - 1) * rowsPerPage,
          currentPage * rowsPerPage
        )}
        pagination={false}
        onSort={handleSort}
        // sortServer
        // sortIcon={isNull}
        highlightOnHover
        striped
        dense
        // You can add custom className to style header if needed
        className="rdtable"
        customStyles={customStyles}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredCashlessFormData.length / rowsPerPage)}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </Container>
  );
};

export default PreAuthReadTable;
