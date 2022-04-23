import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  categories: {},
  subCategories: {},
  status: "idle",
  categoriesOfBrand: [],
  cbStatus: "idle",
  subStatus: "idle",
};

export const getCategoryData = createAsyncThunk(
  "categoryData/getCategoryData",
  async () => {
    const { data } = await axios.get("/ui/sub_categories/");
    return data;
  }
);

export const getSubCategoryData = createAsyncThunk(
  "categoryData/getSubCategoryData",
  async () => {
    const { data } = await axios.get("/ui/sub_categories/");
    return data;
  }
);
export const getCategoryOfBrandData = createAsyncThunk(
  "categoryData/getCategoryOfBrandData",
  async () => {
    const { data } = await axios.get("/ui/categories/");
    return data;
  }
);

const categorySlice = createSlice({
  name: "categoryData",
  initialState,
  extraReducers: {
    [getCategoryData.pending]: (state, action) => {
      state.status = "loading";
    },
    [getCategoryData.fulfilled]: (state, action) => {
      state.status = "success";
      state.categories = action.payload.data;
    },
    [getCategoryData.rejected]: (state, action) => {
      state.status = "failed";
    },

    [getCategoryOfBrandData.pending]: (state, action) => {
      state.cbStatus = "loading";
    },
    [getCategoryOfBrandData.fulfilled]: (state, action) => {
      state.cbStatus = "success";
      state.categoriesOfBrand = action.payload.data;
    },
    [getCategoryOfBrandData.rejected]: (state, action) => {
      state.cbStatus = "failed";
    },

    [getSubCategoryData.pending]: (state, action) => {
      state.subStatus = "loading";
    },
    [getSubCategoryData.fulfilled]: (state, action) => {
      state.subStatus = "success";
      state.subCategories = action.payload.data;
    },
    [getSubCategoryData.rejected]: (state, action) => {
      state.subStatus = "failed";
    },
  },
});

export default categorySlice.reducer;
