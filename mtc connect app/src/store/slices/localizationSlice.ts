import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LocalizationState {
  currentLanguage: 'en' | 'hi';
  supportedLanguages: Array<{ code: string; name: string }>;
}

const initialState: LocalizationState = {
  currentLanguage: 'en',
  supportedLanguages: [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
  ],
};

const localizationSlice = createSlice({
  name: 'localization',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<'en' | 'hi'>) {
      state.currentLanguage = action.payload;
    },
  },
});

export const { setLanguage } = localizationSlice.actions;
export default localizationSlice.reducer;
