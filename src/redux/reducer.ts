import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

export interface IData {
  id: number;
  status: string;
  date: string;
  client: string;
  currency: string;
  total: string;
  invoice: string;
}

interface IDatas {
  datas: IData[];
}

const initialState: IDatas = {
  datas: [],
};

export const fetchDataAllProduct = createAsyncThunk(
  "data/fetchDataAllProduct",

  async (data: string) => {
    const response = await fetch(
      "http://api.training.div3.pgtest.co/api/v1/product",

      {
        method: "GET",

        headers: {
          Authorization: `Bearer ${data}`,
        },
      }
    );

    const result = await response.json();

    console.log(result);

    return result;
  }
);

const dataSlice = createSlice({
  name: "data",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(
      fetchDataAllProduct.fulfilled,
      (state, action) => {
        state.datas = action.payload;
      }
    );
  },
});

export const {} = dataSlice.actions;

const { reducer } = dataSlice;

export default reducer;
