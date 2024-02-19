import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Item } from "../../router/view/interfaces";
import { RootState } from "../store";
import axios, { AxiosResponse } from "axios";

const sideMenu: Item[] = [];

export const fetchSideMenu = createAsyncThunk<Item[], void, { state: RootState }>(
    'sideMenu/fetchSideMenu',
    async (_, thunkApi) => {
        try {
            const sideMenuData: AxiosResponse<{ data: Item[] }> = await axios.get('http://localhost:8080/pressRelease/sideMenuList');
            // console.log('sideMenuData... ', sideMenuData);
            return sideMenuData.data.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
)

const sideMenuSlice = createSlice({
    initialState: sideMenu,
    name: 'sideMenu',
    reducers: {
        // 設置 sideMenu 是否開啟關閉
        setSideMenu(state, action: PayloadAction<Pick<Item, 'id'>>) {
           return state.map(s => {
                const flag = s.id === action.payload.id;
                if (flag) {
                    const open = s.open === undefined ? true : !s.open;
                    return {...s, open};
                } 
                return {...s}
            })
        },
        // 初次啟動 sideMenu 組件時判斷當前路由，並對匹配的路由自動開啟 
        setFirstOpenMenu(state, action: PayloadAction<Pick<Item, 'url'>>) {
            const parentMenu = state.find(menu => menu.childrens?.some(child => child.url === action.payload.url));
            if (parentMenu) {
                const updatedMenu = state.map(e => e.id === parentMenu.id ? {...e, open : true} : {...e});
                return updatedMenu;
            }
            return state
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchSideMenu.fulfilled, (_state, action) => {
            // _state = action.payload;
            return action.payload
        })
    }
})


export const selectAllSideMenu = (state: RootState) => state.sideMenu;
export const { setSideMenu, setFirstOpenMenu } = sideMenuSlice.actions;
export default sideMenuSlice.reducer;