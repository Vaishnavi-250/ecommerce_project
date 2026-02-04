import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import busTrackingReducer from './slices/busTrackingSlice';
import ticketingReducer from './slices/ticketingSlice';
import autorickshawReducer from './slices/autorickshawSlice';
import localizationReducer from './slices/localizationSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    busTracking: busTrackingReducer,
    ticketing: ticketingReducer,
    autorickshaw: autorickshawReducer,
    localization: localizationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['HYDRATE'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
