import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Ticket {
  id: string;
  busNumber: string;
  pickupPoint: string;
  dropPoint: string;
  date: string;
  time: string;
  fare: number;
  seatNumber: string;
  qrCode: string;
  status: 'confirmed' | 'expired' | 'used';
}

interface TicketingState {
  tickets: Ticket[];
  selectedTicket: Ticket | null;
  bookingHistory: Ticket[];
}

const initialState: TicketingState = {
  tickets: [],
  selectedTicket: null,
  bookingHistory: [],
};

const ticketingSlice = createSlice({
  name: 'ticketing',
  initialState,
  reducers: {
    addTicket(state, action: PayloadAction<Ticket>) {
      state.tickets.push(action.payload);
      state.bookingHistory.push(action.payload);
    },
    selectTicket(state, action: PayloadAction<Ticket>) {
      state.selectedTicket = action.payload;
    },
    removeTicket(state, action: PayloadAction<string>) {
      state.tickets = state.tickets.filter(ticket => ticket.id !== action.payload);
    },
    updateTicketStatus(state, action: PayloadAction<{ id: string; status: 'confirmed' | 'expired' | 'used' }>) {
      const ticket = state.tickets.find(t => t.id === action.payload.id);
      if (ticket) {
        ticket.status = action.payload.status;
      }
    },
    clearSelectedTicket(state) {
      state.selectedTicket = null;
    },
  },
});

export const { addTicket, selectTicket, removeTicket, updateTicketStatus, clearSelectedTicket } = ticketingSlice.actions;
export default ticketingSlice.reducer;
