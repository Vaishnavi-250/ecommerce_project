import QRCode from 'qrcode.react';
import { Platform } from 'react-native';

export interface TicketData {
  ticketNumber: string;
  busNumber: string;
  pickupPoint: string;
  dropPoint: string;
  date: string;
  time: string;
  seatNumber: string;
  fare: number;
  passengerName: string;
}

export class QRCodeGenerator {
  static generateTicketQRCode(ticketData: TicketData): string {
    const qrData = JSON.stringify({
      type: 'MTC_BUS_TICKET',
      version: '1.0',
      data: ticketData,
      timestamp: new Date().toISOString(),
    });

    return qrData;
  }

  static generateDigitalPassQRCode(passData: any): string {
    const qrData = JSON.stringify({
      type: 'MTC_DIGITAL_PASS',
      version: '1.0',
      data: passData,
      timestamp: new Date().toISOString(),
    });

    return qrData;
  }

  static encodeTicketForQR(ticketData: TicketData): string {
    return this.generateTicketQRCode(ticketData);
  }

  static decodeTicketFromQR(qrData: string): TicketData | null {
    try {
      const parsed = JSON.parse(qrData);
      if (parsed.type === 'MTC_BUS_TICKET') {
        return parsed.data;
      }
    } catch (error) {
      console.error('Error decoding QR code:', error);
    }
    return null;
  }

  static generateMonthlyPassQRCode(passId: string, userName: string, validUntil: string): string {
    return JSON.stringify({
      type: 'MTC_MONTHLY_PASS',
      passId,
      userName,
      validUntil,
      timestamp: new Date().toISOString(),
    });
  }

  static generate7DayPassQRCode(passId: string, userName: string, validUntil: string): string {
    return JSON.stringify({
      type: 'MTC_7DAY_PASS',
      passId,
      userName,
      validUntil,
      timestamp: new Date().toISOString(),
    });
  }
}

export default QRCodeGenerator;
