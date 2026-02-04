import axios, { AxiosInstance } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://api.mtcconnect.com/v1'; // Replace with actual backend URL

class APIService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
    });

    this.api.interceptors.request.use(
      async (config) => {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  // Authentication endpoints
  async login(email: string, password: string) {
    return this.api.post('/auth/login', { email, password });
  }

  async signup(email: string, password: string, fullName: string, phone: string) {
    return this.api.post('/auth/signup', { email, password, fullName, phone });
  }

  async logout() {
    await AsyncStorage.removeItem('authToken');
    return this.api.post('/auth/logout');
  }

  // Bus endpoints
  async searchBuses(pickupLocation: string, dropLocation: string, date: string) {
    return this.api.get('/buses/search', {
      params: { pickupLocation, dropLocation, date },
    });
  }

  async getBusDetails(busId: string) {
    return this.api.get(`/buses/${busId}`);
  }

  async getBusRoute(busId: string) {
    return this.api.get(`/buses/${busId}/route`);
  }

  async getBusRealTimeLocation(busId: string) {
    return this.api.get(`/buses/${busId}/location`);
  }

  async getNearbyBuses(latitude: number, longitude: number, radius: number = 5) {
    return this.api.get('/buses/nearby', {
      params: { latitude, longitude, radius },
    });
  }

  // Ticketing endpoints
  async bookTicket(busId: string, selectedSeats: string[], pickupPoint: string, dropPoint: string) {
    return this.api.post('/tickets/book', {
      busId,
      selectedSeats,
      pickupPoint,
      dropPoint,
    });
  }

  async getTickets() {
    return this.api.get('/tickets/my-tickets');
  }

  async getTicketDetails(ticketId: string) {
    return this.api.get(`/tickets/${ticketId}`);
  }

  async cancelTicket(ticketId: string) {
    return this.api.post(`/tickets/${ticketId}/cancel`);
  }

  async getAvailableSeats(busId: string, date: string) {
    return this.api.get(`/buses/${busId}/seats`, {
      params: { date },
    });
  }

  // Payment endpoints
  async initiatePayment(amount: number, ticketId: string) {
    return this.api.post('/payments/initiate', { amount, ticketId });
  }

  async verifyPayment(paymentId: string, transactionId: string) {
    return this.api.post('/payments/verify', { paymentId, transactionId });
  }

  // Autorickshaw endpoints
  async getNearbyAutorickshaws(latitude: number, longitude: number) {
    return this.api.get('/autorickshaw/nearby', {
      params: { latitude, longitude },
    });
  }

  async bookAutorickshaw(autoId: string, pickupLocation: { latitude: number; longitude: number }, dropLocation: { latitude: number; longitude: number }) {
    return this.api.post('/autorickshaw/book', {
      autoId,
      pickupLocation,
      dropLocation,
    });
  }

  async getAutorickshawDetails(autoId: string) {
    return this.api.get(`/autorickshaw/${autoId}`);
  }

  async updateAutorickshawLocation(rideId: string, latitude: number, longitude: number) {
    return this.api.post(`/autorickshaw/${rideId}/location`, { latitude, longitude });
  }

  async endAutorickshawRide(rideId: string) {
    return this.api.post(`/autorickshaw/${rideId}/end`);
  }

  // User profile
  async getUserProfile() {
    return this.api.get('/users/profile');
  }

  async updateUserProfile(data: any) {
    return this.api.put('/users/profile', data);
  }

  async getSavedPlaces() {
    return this.api.get('/users/saved-places');
  }

  async addSavedPlace(name: string, latitude: number, longitude: number) {
    return this.api.post('/users/saved-places', { name, latitude, longitude });
  }
}

export default new APIService();
