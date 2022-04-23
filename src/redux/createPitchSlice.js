import { createSlice } from "@reduxjs/toolkit";
import { format } from "date-fns";

const initialState = {
  data: {
    // brief: "",
    // budget: "",
    campaign_given_name: "",
    // brand_category: "",
    // client_email: "",
    // client_name: "",
    // client_phone: "",
    company_name: "",
    content_preference: [],
    // delivery_date: "",
    // location: "",
    // number_of_influencers: "",
    request_date: format(new Date(), "yyyy-MM-dd"),
    // requirement: "",
    // email_subject_line: "",
    tier: [],
    // internal_lead: "",
    team_members: [],
    attachment_filename: [],
    platform: "",
    /** In the "InitialAddFileData" we are store the file  data for new "Django Api" */
    //InitialAddFileData:[],
  },
};

const createPitchSlice = createSlice({
  name: "createPitchData",
  initialState,
  reducers: {
    setField: (state, action) => {
      state.data[action.payload.name] = action.payload.value;
    },
    setTeam: (state, action) => {
      if (state.data.team_members.includes(action.payload.value)) {
        state.data.team_members.splice(
          state.data.team_members.indexOf(action.payload.value),
          1
        );
      } else {
        state.data.team_members = [
          ...state.data.team_members,
          action.payload.value,
        ];
      }
    },
    addAttachment: (state, action) => {
      state.data.attachment_filename = [
        ...state.data.attachment_filename,
        { name: action.payload.name, size: action.payload.size },
      ];
    },
    initialFilesAdd:(state,action)=>{
      //console.log("createPitchSlice",action.payload.formData );
     // state.data.InitialAddFileData = [ ...state.data.InitialAddFileData  , 
     //   {formData:action.payload.formData , size: action.payload.size },];
    },
    removeAttachment: (state, action) => {
      let foundIndex = state.data.attachment_filename.findIndex(
        (file) => file.name === action.payload.name
      );
      if (foundIndex !== -1) {
        state.data.attachment_filename.splice(foundIndex, 1);
      }
    },
    setList: (state, action) => {
      state.data.type_of_campaign[0] = action.payload.value;
    },
    reset: () => initialState,
  },
});

export const {
  setField,
  reset,
  setTeam,
  addAttachment,
  removeAttachment,
  initialFilesAdd,
  setList,
} = createPitchSlice.actions;
export default createPitchSlice.reducer;
