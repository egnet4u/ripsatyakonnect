import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: {
    country: "India",
    state: [],
    city: [],
    language: [""],
  },
};

const filtersSlice = createSlice({
  name: "filtersData",
  initialState,
  reducers: {
    setFilterValues: (state, action) => {
      if (action.payload.value) {
        state.filters[action.payload.name] = action.payload.value;
      } else {
        if (action.payload.name === "tier") {
          state.filters[action.payload.name] = 0;
        } else {
          state.filters[action.payload.name] = "";
        }
      }
    },
    setCheckbox: (state, action) => {
      if (action.payload.value === true) {
        state.filters[action.payload.name] = state.filters.primary_categories
          ? state.filters.primary_categories
          : [];
      } else {
        delete state.filters.secondary_categories;
      }
    },
    setMutlipleCheckbox: (state, action) => {
      if (action.payload.checked) {
        if (state.filters[action.payload.name]) {
          state.filters[action.payload.name].push(action.payload.value);
        } else {
          state.filters[action.payload.name] = [action.payload.value];
        }
      } else {
        if (state.filters[action.payload.name]) {
          state.filters[action.payload.name] = state.filters[
            action.payload.name
          ].filter((option) => option !== action.payload.value);
        } else {
        }
      }
    },
    setMinMaxRange: (state, action) => {
      state.filters[`min_${action.payload.name}`] = action.payload.value[0];
      state.filters[`max_${action.payload.name}`] = action.payload.value[1];
    },
    setRangeOnInputChange: (state, action) => {
      if (action.payload.value === "") {
        state.filters[`${action.payload.type}_${action.payload.name}`] = 0;
      } else {
        state.filters[`${action.payload.type}_${action.payload.name}`] =
          action.payload.value;
      }
    },
    resetValues: (state, action) => {
      if (action.payload.name === "country") {
        state.filters[action.payload.name] = "";
      } else {
        state.filters[action.payload.name] = [];
      }
    },
    setLanguage: (state, action) => {
      if (action.payload.value) {
        state.filters.language[0] = action.payload.value;
      } else {
        state.filters.language[0] = "";
      }
    },
    resetFilters: () => initialState,
  },
});

export const {
  setFilterValues,
  resetFilters,
  setCheckbox,
  setMutlipleCheckbox,
  setMinMaxRange,
  setRangeOnInputChange,
  resetValues,
  setLanguage,
} = filtersSlice.actions;
export default filtersSlice.reducer;
