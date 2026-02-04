import WebSocket from 'react-native-websocket';

class RealtimeTrackingService {
  private ws: WebSocket | null = null;
  private url = 'wss://ws.mtcconnect.com/tracking'; // Replace with actual WebSocket URL
  private listeners: Map<string, (data: any) => void> = new Map();

  connect() {
    try {
      this.ws = new WebSocket(this.url);

      this.ws.onopen = () => {
        console.log('WebSocket connected');
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          const { type, busId, payload } = data;

          if (type === 'location_update' && busId) {
            const listener = this.listeners.get(`bus_${busId}`);
            if (listener) {
              listener(payload);
            }
          }

          // Emit to all listeners
          this.listeners.forEach((callback, key) => {
            if (key === 'all') {
              callback(data);
            }
          });
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      this.ws.onclose = () => {
        console.log('WebSocket disconnected');
        // Attempt to reconnect after 3 seconds
        setTimeout(() => this.connect(), 3000);
      };
    } catch (error) {
      console.error('Error connecting to WebSocket:', error);
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.listeners.clear();
  }

  subscribe(busId: string, callback: (data: any) => void) {
    this.listeners.set(`bus_${busId}`, callback);

    // Send subscription message to server
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        type: 'subscribe',
        busId,
      }));
    }
  }

  unsubscribe(busId: string) {
    this.listeners.delete(`bus_${busId}`);

    // Send unsubscription message to server
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        type: 'unsubscribe',
        busId,
      }));
    }
  }

  subscribeToAll(callback: (data: any) => void) {
    this.listeners.set('all', callback);
  }

  isConnected(): boolean {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN;
  }
}

export default new RealtimeTrackingService();
