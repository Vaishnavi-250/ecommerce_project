import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://localhost:5000/api';

export const apiCall = async (endpoint, options = {}) => {
  const token = await AsyncStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await axios({
      url: `${API_BASE_URL}${endpoint}`,
      ...options,
      headers
    });
    return response.data;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// Auth APIs
export const auth = {
  register: (username, email, password) =>
    apiCall('/auth/register', {
      method: 'POST',
      data: { username, email, password }
    }),
  login: (email, password) =>
    apiCall('/auth/login', {
      method: 'POST',
      data: { email, password }
    })
};

// User APIs
export const user = {
  getProfile: () => apiCall('/users/profile'),
  updateProfile: (data) =>
    apiCall('/users/profile', {
      method: 'PUT',
      data
    }),
  getStats: () => apiCall('/users/stats')
};

// Quiz APIs
export const quizzes = {
  getAll: (category, difficulty) => {
    let url = '/quizzes';
    const params = [];
    if (category) params.push(`category=${category}`);
    if (difficulty) params.push(`difficulty=${difficulty}`);
    if (params.length) url += `?${params.join('&')}`;
    return apiCall(url);
  },
  getById: (id) => apiCall(`/quizzes/${id}`),
  submit: (id, answers) =>
    apiCall(`/quizzes/${id}/submit`, {
      method: 'POST',
      data: { answers }
    })
};

// Mission APIs
export const missions = {
  getAll: () => apiCall('/missions'),
  getById: (id) => apiCall(`/missions/${id}`),
  accept: (id) =>
    apiCall(`/missions/${id}/accept`, { method: 'POST' }),
  complete: (id) =>
    apiCall(`/missions/${id}/complete`, { method: 'POST' })
};

// Eco Actions APIs
export const ecoActions = {
  log: (data) =>
    apiCall('/eco-actions', {
      method: 'POST',
      data
    }),
  getUserActions: (userId) => apiCall(`/eco-actions/user/${userId}`),
  verify: (id) =>
    apiCall(`/eco-actions/${id}/verify`, { method: 'PATCH' })
};

// Leaderboard APIs
export const leaderboard = {
  getGlobal: (limit, offset) => apiCall(`/leaderboard?limit=${limit}&offset=${offset}`),
  getByCategory: (category, limit) =>
    apiCall(`/leaderboard/category/${category}?limit=${limit}`),
  getUserRank: (userId) => apiCall(`/leaderboard/user/${userId}`)
};
