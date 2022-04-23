import { configureStore } from "@reduxjs/toolkit";

import createPitchReducer from "./createPitchSlice";
import influencerInfoReducer from "./influencerInfoSlice";
import categoryReducer from "./categorySlice";
import countryReducer from "./countrySlice";
import stateReducer from "./stateSlice";
import cityReducer from "./citySlice";
import tierReducer from "./tierSlice";
import languageReducer from "./languageSlice";
import filterResultReducer from "./filterResultSlice";
import taskPageReducer from "./taskPageSlice";
import listMixesReducer from "./listMixesSlice";
import campaignDataReducer from "./campaignSlice";
import userDataReducer from "./userSlice";
import locationReducer from "./locationSlice";
import requirementReducer from "./requirementSlice";
import allUsersReducer from "./allUsersSlice";
import contentPreferenceReducer from "./contentPreferenceSlice";
import filtersReducer from "./filtersSlice";
import notesReducer from "./notesSlice";

export default configureStore({
  reducer: {
    createPitchData: createPitchReducer,
    filtersData: filtersReducer,
    influencerInfoData: influencerInfoReducer,
    categoryData: categoryReducer,
    countryData: countryReducer,
    stateData: stateReducer,
    cityData: cityReducer,
    tierData: tierReducer,
    locationData: locationReducer,
    requirementData: requirementReducer,
    contentPreferenceData: contentPreferenceReducer,
    allUsersData: allUsersReducer,
    languageData: languageReducer,
    filterResultData: filterResultReducer,
    pitchData: taskPageReducer,
    listMixesData: listMixesReducer,
    campaignData: campaignDataReducer,
    userData: userDataReducer,
    note: notesReducer,
  },
});
