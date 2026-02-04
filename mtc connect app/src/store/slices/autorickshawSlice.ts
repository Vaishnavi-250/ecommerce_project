import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AutorickshawState {
  nearbyAutorickshaws: Array<{
    id: string;
    driverName: string;
    rating: number;
    vehicleNumber: string;
    currentLocation: { latitude: number; longitude: number };
    estimatedFare: number;
    distance: number;
  }>;
  selectedAutorickshaw: any | null;
  activeRide: any | null;
  rideHistory: any[];
}

const initialState: AutorickshawState = {
  nearbyAutorickshaws: [],
  selectedAutorickshaw: null,
  activeRide: null,
  rideHistory: [],
};

const autorickshawSlice = createSlice({
  name: 'autorickshaw',
  initialState,
  reducers: {
    setNearbyAutorickshaws(state, action: PayloadAction<AutorickshawState['nearbyAutorickshaws']>) {
      state.nearbyAutorickshaws = action.payload;
    },
    selectAutorickshaw(state, action: PayloadAction<any>) {
      state.selectedAutorickshaw = action.payload;
    },
    setActiveRide(state, action: PayloadAction<any>) {
      state.activeRide = action.payload;
    },
    addRideToHistory(state, action: PayloadAction<any>) {
      state.rideHistory.push(action.payload);
    },
    endRide(state) {
      if (state.activeRide) {
        state.rideHistory.push(state.activeRide);
      }
      state.activeRide = null;
      state.selectedAutorickshaw = null;
    },
    clearAutorickshaw(state) {
      state.selectedAutorickshaw = null;
      state.activeRide = null;
    },
  },
});

export const {
  setNearbyAutorickshaws,
  selectAutorickshaw,
  setActiveRide,
  addRideToHistory,
  endRide,
  clearAutorickshaw,
} = autorickshawSlice.actions;

export default autorickshawSlice.reducer;
