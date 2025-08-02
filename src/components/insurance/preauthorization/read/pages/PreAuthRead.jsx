import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  HeaderSection,
  Title,
  CreateButtonWrapper,
  CreateText,
  SearchSection,
  SearchInput,
  TableWrapper,
  TableData,
  Image,
  CheckBox,
  InputWrapper,
  TextInput,
  Icon,
  View,
  Edit,
  Delete,
  VDE,
  ViewImage,
} from "../styles/preAuthRead";
import {
  DELETE_CASHLESS_FORM_DATA,
  GET_ALL_CASHLESS_FORM_DATA,
  GET_CASHLESS_FORM_DATA_BY_ID,
  getAllSummaryData,
  GLOBAL_SEARCH_CASHLESS_FORM_DATA,
  searchbydischargedateandtime,
  searchByGlobal,
  searchbypatientdob,
  searchbypatientId,
  searchbypatientname,
  searchbysurgeonname,
} from "../../../../../API/ClaimAPI";
import updownArrow from "../../../../../assests/summary/upanddownarrow.png";
import lens from "../../../../../assests/summary/searchlens.png";
import deletebin from "../../../../../assests/summary/deletebin.png";
import viewbin from "../../../../../assests/summary/viewbin.png";
import editbin from "../../../../../assests/summary/editbin.png";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setFilteredCashlessFormData } from "../../slice/preauthSlice";
import Pagination from "./Pagination";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // ✅ This line is CRITICAL
import debounce from "lodash/debounce";

const PreAuthRead = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [globalSearchQuery, setGlobalSearchQuery] = useState("");
  const { filteredCashlessFormData } = useSelector(
    (state) => state.preAuthStore
  );

  const [cashlessFormData, setCashlessFormData] = useState([]);

  // useEffect(() => {
  //   setData(["Discharge", "Discharge Summary List"]);
  // }, [setData]);
  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredCashlessFormData.slice(
    indexOfFirstRow,
    indexOfLastRow
  );
  const totalPages = Math.ceil(filteredCashlessFormData.length / rowsPerPage);

  useEffect(() => {
    fetchAllCashLessFormList();
  }, []);

  const fetchAllCashLessFormList = async () => {
    try {
      const response = await axios.get(GET_ALL_CASHLESS_FORM_DATA);
      if (response.data.code === 200) {
        const cashlessFormData = response.data.data;
        cashlessFormData.forEach((item) => {
          console.log(item.nameOfTreatingDoctor);
        });
      }
      console.log(response.data, "read cashlessform data");

      dispatch(setFilteredCashlessFormData(response.data));

      // dispatch(setFilteredCashlessFormData(cashlessFormData));
      setCurrentPage(1); // Reset to first page on new data fetch
    } catch (error) {
      console.error("Error fetching summary list:", error.message);
    }
  };

  // Global search
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
        const result = response.data?.data || [];
        dispatch(setFilteredCashlessFormData(result));
        setCurrentPage(1);
      } catch (error) {
        console.error("Search error:", error.message);
      }
    }, 700), // 500ms debounce delay
    []
  );
  const handleGlobalSearch = (e) => {
    const { value } = e.target;
    setGlobalSearchQuery(value);
    globalSearch(value);
  };

  /***************************DOWNLOAD AS PDF **********************************8*/
  // const downloadPDF = (item) => {
  //   const doc = new jsPDF();

  //   const fieldMappings = {
  //     cashlessFormId: "Cashless Form ID",
  //     patientName: "Patient Name",
  //     dateOfBirth: "Date of Birth",
  //     status: "Status",
  //     nameOfTheTreatingDoctor: "Treating Doctor",
  //   };

  //   const body = Object.entries(fieldMappings).map(([key, label]) => [
  //     label,
  //     String(item[key] || "N/A"),
  //   ]);

  //   doc.text(`Cashless Form Details`, 10, 10);

  //   autoTable(doc, {
  //     startY: 20,
  //     head: [["Field", "Value"]],
  //     body,
  //     theme: "grid",
  //     didParseCell: function (data) {
  //       const { row, column, cell } = data;
  //       const fieldName = row.raw?.[0]; // Label
  //       const fieldValue = row.raw?.[1]; // Value

  //       // 🔴 Highlight the "Status" field if it's "Rejected"
  //       if (fieldName === "Status" && fieldValue === "Rejected") {
  //         cell.styles.fillColor = [255, 102, 102]; // Light Red
  //         cell.styles.textColor = 0;
  //       }

  //       // 🔵 Color the "Cashless Form ID" label cell
  //       if (column.index === 0 && fieldName === "Cashless Form ID") {
  //         cell.styles.fillColor = [0, 102, 204]; // Blue
  //         cell.styles.textColor = 255;
  //       }
  //     },
  //     styles: {
  //       fontSize: 10,
  //       cellPadding: 4,
  //     },
  //     headStyles: {
  //       fillColor: [22, 160, 133],
  //       textColor: 255,
  //       fontSize: 12,
  //     },
  //   });

  //   doc.save(`${item.patientName || "record"}_Details.pdf`);
  // };

  // Patient Name search
  // const searchByPatientName = async (e) => {
  //   const { name, value } = e.target;
  //   const searchQuery = value.toLowerCase();
  //   dispatch({
  //     type: PROFILE.SEARCH_BY_COLUMN,
  //     payload: { column: name, value },
  //   });
  //   if (!searchQuery.trim()) {
  //     dispatch({
  //       type: PROFILE.SEARCH_SAVED_LIST_BY_CHARACTERS,
  //       payload: state.savedLists,
  //     });
  //     return;
  //   }
  //   try {
  //     const response = await AxiosInstance.get(
  //       `${searchbypatientname}/${searchQuery}`
  //     );
  //     console.log("searchbypatientname", response.data.data);

  //     if (response.data.code === 200) {
  //       const result = response.data?.data || [];
  //       dispatch({
  //         type: PROFILE.SEARCH_SAVED_LIST_BY_CHARACTERS,
  //         payload: result[0] === "not found" ? [] : result,
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Search error:", error.message);
  //   }
  // };

  // // Surgeon Name search
  // const searchBySurgeonName = async (e) => {
  //   const { name, value } = e.target;
  //   const searchQuery = value.toLowerCase();
  //   dispatch({
  //     type: PROFILE.SEARCH_BY_COLUMN,
  //     payload: { column: name, value },
  //   });
  //   if (!searchQuery.trim()) {
  //     dispatch({
  //       type: PROFILE.SEARCH_SAVED_LIST_BY_CHARACTERS,
  //       payload: state.savedLists,
  //     });
  //     return;
  //   }
  //   try {
  //     const response = await AxiosInstance.get(
  //       `${searchbysurgeonname}/${searchQuery}`
  //     );
  //     console.log("searchbysurgeonname", response.data.data);

  //     if (response.data.code === 200) {
  //       const result = response.data?.data || [];
  //       dispatch({
  //         type: PROFILE.SEARCH_SAVED_LIST_BY_CHARACTERS,
  //         payload: result[0] === "not found" ? [] : result,
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Search error:", error.message);
  //   }
  // };

  // // Discharge Date search
  // const searchByDischargeDate = async (e) => {
  //   const { name, value } = e.target;
  //   const searchQuery = value.toLowerCase();
  //   dispatch({
  //     type: PROFILE.SEARCH_BY_COLUMN,
  //     payload: { column: name, value },
  //   });
  //   if (!searchQuery.trim()) {
  //     dispatch({
  //       type: PROFILE.SEARCH_SAVED_LIST_BY_CHARACTERS,
  //       payload: state.savedLists,
  //     });
  //     return;
  //   }
  //   try {
  //     const response = await AxiosInstance.get(
  //       `${searchbydischargedateandtime}/${searchQuery}`
  //     );
  //     console.log("searchbydischargedateandtime", response.data.data);

  //     if (response.data.code === 200) {
  //       const result = response.data?.data || [];
  //       dispatch({
  //         type: PROFILE.SEARCH_SAVED_LIST_BY_CHARACTERS,
  //         payload: result[0] === "not found" ? [] : result,
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Search error:", error.message);
  //   }
  // };

  // // Search by Patient ID
  // const searchByPatientId = async (e) => {
  //   const { name, value } = e.target;
  //   const searchQuery = value.toLowerCase();
  //   dispatch({
  //     type: PROFILE.SEARCH_BY_COLUMN,
  //     payload: { column: name, value },
  //   });
  //   if (!searchQuery.trim()) {
  //     dispatch({
  //       type: PROFILE.SEARCH_SAVED_LIST_BY_CHARACTERS,
  //       payload: state.savedLists,
  //     });
  //     return;
  //   }
  //   try {
  //     const response = await AxiosInstance.get(
  //       `${searchbypatientId}/${searchQuery}`
  //     );
  //     console.log("searchbypatientId", response.data.data);

  //     if (response.data.code === 200) {
  //       const result = response.data?.data || [];
  //       dispatch({
  //         type: PROFILE.SEARCH_SAVED_LIST_BY_CHARACTERS,
  //         payload: result[0] === "not found" ? [] : result,
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Search error:", error.message);
  //   }
  // };

  // // Search by Patient DOB
  // const searchByPatientDOB = async (e) => {
  //   const { name, value } = e.target;
  //   const searchQuery = value.toLowerCase();
  //   dispatch({
  //     type: PROFILE.SEARCH_BY_COLUMN,
  //     payload: { column: name, value },
  //   });
  //   if (!searchQuery.trim()) {
  //     dispatch({
  //       type: PROFILE.SEARCH_SAVED_LIST_BY_CHARACTERS,
  //       payload: state.savedLists,
  //     });
  //     return;
  //   }
  //   try {
  //     const response = await AxiosInstance.get(
  //       `${searchbypatientdob}/${searchQuery}`
  //     );
  //     console.log("searchbypatientdob", response.data.data);

  //     if (response.data.code === 200) {
  //       const result = response.data?.data || [];
  //       dispatch({
  //         type: PROFILE.SEARCH_SAVED_LIST_BY_CHARACTERS,
  //         payload: result[0] === "not found" ? [] : result,
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Search error:", error.message);
  //   }
  // };

  const downloadPDF = (item) => {
    const doc = new jsPDF();

    // Prepare the body: all keys and their values from the item object
    const body = Object.entries(item).map(([key, value]) => [
      key,
      value !== null && value !== undefined ? String(value) : "N/A",
    ]);

    doc.text(`Cashless Form Details`, 10, 10);
    autoTable(doc, {
      startY: 20,
      head: [["Field", "Value"]],
      body,
    });

    // Use patientName or fallback as file name
    doc.save(`${item.patientName || "record"}_Details.pdf`);
  };
  const toggleSelectAll = (e) => {
    // if (e.target.checked) {
    //   const allIds = state.filteredLists.map((item) => item._id);
    //   dispatch({ type: PROFILE.SET_SELECTED_ROWS, payload: allIds });
    // } else {
    //   dispatch({ type: PROFILE.SET_SELECTED_ROWS, payload: [] });
    // }
  };

  const toggleSelectRow = (id) => {
    // const selected = state.selectedRows.includes(id)
    //   ? state.selectedRows.filter((item) => item !== id)
    //   : [...state.selectedRows, id];
    // dispatch({ type: PROFILE.SET_SELECTED_ROWS, payload: selected });
  };

  // View Edit Delete
  const viewCashlessFormData = async (id) => {
    try {
      // const response = await axios.get(GET_CASHLESS_FORM_DATA_BY_ID(id));
      const response = await axios.get(GET_CASHLESS_FORM_DATA_BY_ID(id));
      console.log(response.data, "read cashless form");
      dispatch(setFilteredCashlessFormData(response));

      // if (response.data.code === 200) {
      //   const result = response.data.data;
      //   dispatch(setFilteredCashlessFormData(result));
      // }

      navigate(`/insurnace/preauth/create/${id}`);
    } catch (error) {
      console.error("Edit cashless form data", error.message);
    }
    console.log(id, "Edit cashless form data");
  };

  const editCashlessFormData = async (id) => {
    try {
      const response = await axios.get(GET_CASHLESS_FORM_DATA_BY_ID(id));
      if (response.data.code === 200) {
        const result = response.data.data;
        dispatch(setFilteredCashlessFormData(result));
      }
      navigate(`/insurance/preauth/create/${id}`);
    } catch (error) {
      console.error("Edit cashless form data", error.message);
    }
    console.log(id, "Edit cashless form data");
  };

  const deleteCashlessFormData = async (id) => {
    try {
      const response = await axios.get(`${DELETE_CASHLESS_FORM_DATA(id)}`);
      if (response.data.code === 200) {
        fetchAllCashLessFormList();
      }
    } catch (error) {
      console.error("error", error.message);
    }
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

      <TableWrapper>
        <TableData>
          <table>
            <thead>
              <tr>
                {/* <th>
                  <CheckBox type="checkbox" onChange={toggleSelectAll} />
                </th> */}
                <th>
                  <div>
                    <p>PATIENT ID</p>
                    <Image src={updownArrow} alt="sort" />
                  </div>
                </th>
                <th>
                  <div>
                    <p>PATIENT NAME</p>
                    <Image src={updownArrow} alt="sort" />
                  </div>
                </th>
                <th>
                  <div>
                    <p>MEMBER ID</p>
                    <Image src={updownArrow} alt="sort" />
                  </div>
                </th>
                <th>
                  <div>
                    <p>EMPLOYEE ID</p>
                    <Image src={updownArrow} alt="sort" />
                  </div>
                </th>
                <th>
                  <div>
                    <p>STATUS</p>
                    <Image src={updownArrow} alt="sort" />
                  </div>
                </th>

                <th>
                  <div>
                    <p>DOWNLOAD</p>
                    <Image src={updownArrow} alt="sort" />
                  </div>
                </th>
                <th>
                  <div>
                    <p>Actions</p>
                  </div>
                </th>
              </tr>
              {/* <tr>
                <td></td>
                <td>
                  <InputWrapper>
                    <TextInput
                      type="text"
                      placeholder="Search Patient ID"
                      name="patientId"
                      value={state.columnFilters.patientId || ""}
                      onChange={searchByPatientId}
                    />
                    <Icon src={lens} alt="search" />
                  </InputWrapper>
                </td>
                <td>
                  <InputWrapper>
                    <TextInput
                      type="text"
                      placeholder="Search Patient Name"
                      name="patientName"
                      value={state.columnFilters.patientName || ""}
                      onChange={searchByPatientName}
                    />
                    <Icon src={lens} alt="search" />
                  </InputWrapper>
                </td>
                <td>
                  <InputWrapper>
                    <TextInput
                      type="text"
                      placeholder="Search DOB"
                      name="patientDob"
                      value={state.columnFilters.patientDob || ""}
                      onChange={searchByPatientDOB}
                    />
                    <Icon src={lens} alt="search" />
                  </InputWrapper>
                </td>
                <td>
                  <InputWrapper>
                    <TextInput
                      type="text"
                      placeholder="Search Discharge Date"
                      name="dischargeDate"
                      value={state.columnFilters.dischargeDate || ""}
                      onChange={searchByDischargeDate}
                    />
                    <Icon src={lens} alt="search" />
                  </InputWrapper>
                </td>
                <td>
                  <InputWrapper>
                    <TextInput
                      type="text"
                      placeholder="Search Surgeon Name"
                      name="surgeonName"
                      value={state.columnFilters.surgeonName || ""}
                      onChange={searchBySurgeonName}
                    />
                    <Icon src={lens} alt="search" />
                  </InputWrapper>
                </td>
                <td></td>
              </tr> */}
            </thead>

            <tbody>
              {filteredCashlessFormData.length > 0 ? (
                currentRows.map((item, index) => (
                  <tr key={index}>
                    {/* <td>
                      <CheckBox
                        type="checkbox"
                        checked={filteredCashlessFormData.includes(item._id)}
                        onChange={() => toggleSelectRow(item._id)}
                      />
                    </td> */}
                    <td>{item.cashlessFormId}</td>
                    <td>{item.patientName}</td>
                    <td>{item.memberId}</td>
                    <td>{item.employeeId}</td>
                    <td>{item.status}</td>
                    <td>
                      <button onClick={() => downloadPDF(item)}>
                        Downlaod
                      </button>
                    </td>
                    <td>
                      <VDE>
                        <View
                        // onClick={() => viewCashlessFormData(item.cashlessFormId)}
                        >
                          <ViewImage src={viewbin} alt="view" />
                        </View>
                        <Edit
                        // onClick={() => editCashlessFormData(item.cashlessFormId)}
                        >
                          <ViewImage src={editbin} alt="edit" />
                        </Edit>
                        <Delete
                        // onClick={() => deleteCashlessFormData(item.cashlessFormId)}
                        >
                          <ViewImage src={deletebin} alt="delete" />
                        </Delete>
                      </VDE>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    No results found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </TableData>
      </TableWrapper>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </Container>
  );
};

export default PreAuthRead;
