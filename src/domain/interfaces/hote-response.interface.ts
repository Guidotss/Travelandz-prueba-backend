export interface HotelResponse {
  from: number;
  to: number;
  total: number;
  auditData: AuditData;
  hotels: Hotel[];
}

export interface AuditData {
  processTime: string;
  timestamp: string;
  requestHost: string;
  serverId: string;
  environment: string;
  release: string;
}

export interface Hotel {
  code: number;
  name: Name;
  address: Address;
}

export interface Address {
  content: string;
  street: string;
  number: string;
  floor?: string;
  door?: string;
}

export interface Name {
  content: string;
}
