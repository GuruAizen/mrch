import claimsSlice from "@/redux/insurance/claimsSlice";
import preAuthorizationSlice from "@/redux/insurance/preAuthorizationSlice";

const { configureStore } = require("@reduxjs/toolkit");

const  store = configureStore({
  reducer: {
    /**************************************INSURANCE *********************************/
    preAuthStore:preAuthorizationSlice,
    claimsStore:claimsSlice,
  },
});
export default store;