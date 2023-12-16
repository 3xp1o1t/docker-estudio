export const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

export interface User {
  id?: number;
  name: string;
  email: string;
  action?: string;
}
