/****************************** CASHLESS FORM *****************************/
const BACKEND_SERVER = 190;
//SAVE CASHLESS FORM
// export const SAVE_CASHLESS_FORM_DATA = `${BACKEND_SERVER}/savecashlessformdata`;
export const SAVE_CASHLESS_FORM_DATA = `https://smart-crm.in/api/cashlessForm/`;

//GET ALL CASHLESS FORM
// export const GET_ALL_CASHLESS_FORM_DATA = `${BACKEND_SERVER}/getallcashlessformdata`;
export const GET_ALL_CASHLESS_FORM_DATA = `https://smart-crm.in/api/cashlessForm/all`;

//GET CASHLESS FORM BY ID
// export const GET_CASHLESS_FORM_DATA_BY_ID = (id) =>
//   `${BACKEND_SERVER}/getallcashlessformdatabyid/${id}`;
export const GET_CASHLESS_FORM_DATA_BY_ID = (id) =>
  `https://smart-crm.in/api/cashlessForm/${id}`;

//GLOBAL SEARCH IN CASHLESS FORM
export const GLOBAL_SEARCH_CASHLESS_FORM_DATA = (params) => {
  const queryString = new URLSearchParams(params).toString();
  return `https://smart-crm.in/api/cashlessForm/web/all?${queryString}`;
};

//EDIT IN CASHLESS FORM
// export const EDIT_CASHLESS_FORM_DATA = `${BACKEND_SERVER}/cashlessformglobalsearch`;

//DELETE AN OBJECT IN CASHLESS FORM
export const DELETE_CASHLESS_FORM_DATA = (id) =>
  `${BACKEND_SERVER}/deltecashlessformdata/${id}`
;
