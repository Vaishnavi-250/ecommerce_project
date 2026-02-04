import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BusTrackingState {
  selectedBusId: string | null;
  currentLocation: { latitude: number; longitude: number } | null;
  nextStop: string | null;
  estimatedArrival: number | null;
  busDetails: any | null;
  routeCoordinates: Array<{ latitude: number; longitude: number }>;
  allStops: Array<{ id: string; name: string; latitude: number; longitude: number }>;
  realtimeUpdates: boolean;
}

const initialState: BusTrackingState = {
  selectedBusId: null,
  currentLocation: null,
  nextStop: null,
  estimatedArrival: null,
  busDetails: null,
  routeCoordinates: [],
  allStops: [],
  realtimeUpdates: false,
};

const busTrackingSlice = createSlice({
  name: 'busTracking',
  initialState,
  reducers: {
    selectBus(state, action: PayloadAction<string>) {
      state.selectedBusId = action.payload;
    },
    updateBusLocation(state, action: PayloadAction<{ latitude: number; longitude: number }>) {
      state.currentLocation = action.payload;
    },
    updateNextStop(state, action: PayloadAction<string>) {
      state.nextStop = action.payload;
    },
    updateEstimatedArrival(state, action: PayloadAction<number>) {
      state.estimatedArrival = action.payload;
    },
    setBusDetails(state, action: PayloadAction<any>) {
      state.busDetails = action.payload;
    },
    setRouteCoordinates(state, action: PayloadAction<Array<{ latitude: number; longitude: number }>>) {
      state.routeCoordinates = action.payload;
    },
    setAllStops(state, action: PayloadAction<Array<{ id: string; name: string; latitude: number; longitude: number }>>) {
      state.allStops = action.payload;
    },
    setRealtimeUpdates(state, action: PayloadAction<boolean>) {
      state.realtimeUpdates = action.payload;
    },
    clearBusTracking(state) {
      state.selectedBusId = null;
      state.currentLocation = null;
      state.nextStop = null;
      state.estimatedArrival = null;
      state.busDetails = null;
      state.routeCoordinates = [];
      state.allStops = [];
    },
  },
});

export const {
  selectBus,
  updateBusLocation,
  updateNextStop,
  updateEstimatedArrival,
  setBusDetails,
  setRouteCoordinates,
  setAllStops,
  setRealtimeUpdates,
  clearBusTracking,
} = busTrackingSlice.actions;

export default busTrackingSlice.reducer;
