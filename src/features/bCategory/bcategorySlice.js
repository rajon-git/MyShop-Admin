import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import bCategoryService from "../bCategory/bCategoryService";

export const getCategories = createAsyncThunk(
  "blogCategory/get-blogCategories",
  async (thunkAPI) => {
    try {
      return await bCategoryService.getBlogCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAbCategory = createAsyncThunk(
  "blogCategory/get-blogCategory",
  async (id, thunkAPI) => {
    try {
      return await bCategoryService.getBlogCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createNewblogCat = createAsyncThunk(
  "blogCategory/create-blogCategory",
  async (catData, thunkAPI) => {
    try {
      return await bCategoryService.createBlogCategory(catData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateAbCategory= createAsyncThunk(
  "blogCategory/update-blogCategory",
  async (bCategory, thunkAPI) => {
    try {
      return await bCategoryService.updateBlogCategory(bCategory);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAbCategory = createAsyncThunk(
  "blogCategory/delete-blogCategory",
  async (id, thunkAPI) => {
    try {
      return await bCategoryService.deleteBlogCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState  = createAction("Reset_all");
const initialState = {
  bCategories: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const bCategorySlice = createSlice({
  name: "bCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.bCategories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createNewblogCat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewblogCat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createBlogCategory  = action.payload;
      })
      .addCase(createNewblogCat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAbCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAbCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.bCategoryName  = action.payload.title;
      })
      .addCase(getAbCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateAbCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAbCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedbCategory  = action.payload;
      })
      .addCase(updateAbCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteAbCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAbCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedbCategory  = action.payload;
      })
      .addCase(deleteAbCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, ()=> initialState);
  },
});

export default bCategorySlice.reducer;
