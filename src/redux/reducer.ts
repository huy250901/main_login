import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { createAction } from "@reduxjs/toolkit";

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
  Products: IData[];
  ProductByID: any;
  InforUser: any;
}

interface IInforUser {
  name: string;
  email: string;
  avatar: string;
  description: string;
  state: number;
  region: number;
}

const initialState: IDatas = {
  Products: [],
  ProductByID: {},
  InforUser: {},
};

export const logout = createAction("auth/logout");

export const fetchInforUser = createAsyncThunk(
  "data/fecthInforUser",
  async (data: any) => {
    const response = await fetch(
      "http://api.training.div3.pgtest.co/api/v1/user",
      {
        headers: {
          Authorization: data,
          // data.user.token,
          // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQxOSwiaWF0IjoxNjgyNTgwNjAyfQ.nO-4LrST0bInLbZqYw0ACFYrcH9K9uksZE2dklAeTfI",
          // data
        },
      }
    );
    const result = await response.json();
    return result;
  }
);

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

export const fetchDataProductById = createAsyncThunk(
  "data/fetchDataProductById",
  async (data: any) => {
    const response = await fetch(
      `http://api.training.div3.pgtest.co/api/v1/product/${data.id}`,
      {
        headers: { Authorization: data.token },
      }
    );
    const result = await response.json();
    return result;
  }
);

export const fetchUpdateProduct = createAsyncThunk(
  "data/fetchUpdateProduct",
  async (data: any) => {
    const response = await fetch(
      "http://api.training.div3.pgtest.co/api/v1/product",
      {
        method: "POST",
        body: JSON.stringify({
          id: data.id,
          status: data.status,
          date: data.date,
          client: data.client,
          currency: data.currency,
          total: data.total,
          invoice: data.invoice,
        }),
        headers: {
          Authorization: data.token,
        },
      }
    );
    const result = await response.json();
    return result;
  }
);

export const fetchDeleteProduct = createAsyncThunk(
  "data/fetchDeleteProduct",
  async (data: any) => {
    const response = await fetch(
      `http://api.training.div3.pgtest.co/api/v1/product/${data.id}`,
      {
        headers: { Authorization: data.token },
      }
    );
    const result = await response.json();
    return result;
  }
);

export const fetchLogout = createAsyncThunk(
  "data/fetchLogout",
  async (data: any) => {
    const response = await fetch(
      `http://api.training.div3.pgtest.co/api/v1/product/${data.id}`,
      {
        headers: { Authorization: data },
      }
    );
    const result = await response.json();
    return result;
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataAllProduct.fulfilled, (state, action) => {
        state.Products = action.payload.data;
      })
      .addCase(fetchDataProductById.fulfilled, (state, action) => {
        state.ProductByID = action.payload.data;
      })
      .addCase(fetchInforUser.fulfilled, (state, action) => {
        state.InforUser = action.payload.data;
      });
    // .addCase(fetchLogout.fulfilled, (state, action) => {
    //   state.InforUser.token = "";
    //   Cookies.remove("token");
    // });
    // .addCase(logout, (state, action)) => {
    //   Cookies.remove("token");
    // }
  },
});

const { reducer } = dataSlice;

export default reducer;
