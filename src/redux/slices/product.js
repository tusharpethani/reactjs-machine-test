import { createSlice } from "@reduxjs/toolkit";
// utils
import axios from "../../utils/axios";
//
import { dispatch } from "../store";

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  allFood: [],
  quantity: [],
};

const slice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET PRODUCTS
    getProductsSuccess(state, action) {
      state.isLoading = false;
      state.allFood = action.payload;
    },

    increaseQuantity(state, action) {
      const { activeTab, position } = action.payload;
      const lstTmp = state.allFood.map((allMain, allIndex) => {
        if (allIndex === 0) {
          return {
            ...allMain,
            table_menu_list: allMain.table_menu_list.map((main, mainIndex) => {
              if (activeTab === mainIndex) {
                return {
                  ...main,
                  category_dishes: main.category_dishes.map((sub, subIndex) => {
                    if (subIndex === position) {
                      return {
                        ...sub,
                        quantity: sub.quantity + 1,
                      };
                    } else {
                      return sub;
                    }
                  }),
                };
              } else {
                return main;
              }
            }),
          };
        } else {
          return allMain;
        }
      });

      state.allFood = lstTmp;
    },

    decreaseQuantity(state, action) {
      const { activeTab, position } = action.payload;
      const lstTmp = state.allFood.map((allMain, allIndex) => {
        if (allIndex === 0) {
          return {
            ...allMain,
            table_menu_list: allMain.table_menu_list.map((main, mainIndex) => {
              if (activeTab === mainIndex) {
                return {
                  ...main,
                  category_dishes: main.category_dishes.map((sub, subIndex) => {
                    if (subIndex === position) {
                      return {
                        ...sub,
                        quantity: sub.quantity - 1,
                      };
                    } else {
                      return sub;
                    }
                  }),
                };
              } else {
                return main;
              }
            }),
          };
        } else {
          return allMain;
        }
      });

      state.allFood = lstTmp;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { increaseQuantity, decreaseQuantity } = slice.actions;

// ----------------------------------------------------------------------

export function getAllFoods() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        "/v3/db0018c8-5982-4d89-a54f-f51fe14d3c89"
      );
      let tmpdata = response.data.data.map((obj) => {
        return {
          ...obj,
          table_menu_list: obj.table_menu_list.map((sub) => {
            return {
              ...sub,
              category_dishes: sub.category_dishes.map((sub) => {
                return {
                  ...sub,
                  quantity: 0,
                };
              }),
            };
          }),
        };
      });
      dispatch(slice.actions.getProductsSuccess(tmpdata));
      return tmpdata;
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
