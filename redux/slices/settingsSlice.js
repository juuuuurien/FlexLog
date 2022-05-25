import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  settings: {
    username: "",
    maxes: { squat: 0, bench: 0, deadlift: 0 },
    weightUnits: "lb",
    darkTheme: false,
  },
};

export const fetchSettings = createAsyncThunk("fetchSettings", async () => {
  try {
    const data = await AsyncStorage.getItem("userSettings");
    const settings = JSON.parse(data);
    return settings;
  } catch (error) {
    console.warn(err);
  }
});

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    updateMaxes: (state, action) => {
      state.settings.maxes = { ...state.settings.maxes, ...action.payload };
    },
    updateWeightUnits: (state, action) => {
      state.settings.weightUnits = action.payload;
    },
    setDarkTheme: (state, action) => {
      const _darkTheme = action.payload;
      state.settings.darkTheme = _darkTheme;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        console.log("WAAAHAHAHASHAHAHAH", action.payload);
        state.settings = action.payload;
        state.loading = false;
      });
  },
});

export const { updateMaxes, updateWeightUnits, setDarkTheme } =
  settingsSlice.actions;
export default settingsSlice.reducer;
