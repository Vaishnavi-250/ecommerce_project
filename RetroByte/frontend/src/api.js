const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
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
      body: JSON.stringify({ username, email, password })
    }),
  login: (email, password) =>
    apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    })
};

// User APIs
export const user = {
  getProfile: () => apiCall('/users/profile'),
  updateProfile: (data) =>
    apiCall('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
  getStats: () => apiCall('/users/stats')
};

// Quiz APIs
export const quizzes = {
  getAll: (category, difficulty) => {
    let url = '/quizzes';
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (difficulty) params.append('difficulty', difficulty);
    if (params.toString()) url += `?${params}`;
    return apiCall(url);
  },
  getById: (id) => apiCall(`/quizzes/${id}`),
  submit: (id, answers) =>
    apiCall(`/quizzes/${id}/submit`, {
      method: 'POST',
      body: JSON.stringify({ answers })
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
      body: JSON.stringify(data)
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

// Rewards APIs
export const rewards = {
  getRewards: () => apiCall('/rewards'),
  getAvailableBadges: () => apiCall('/rewards/badges/available'),
  awardBadge: (badgeId) =>
    apiCall('/rewards/badges/award', {
      method: 'POST',
      body: JSON.stringify({ badgeId })
    }),
  redeem: (rewardType, amount) =>
    apiCall('/rewards/redeem', {
      method: 'POST',
      body: JSON.stringify({ rewardType, amount })
    })
};
