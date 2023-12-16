export const API = 'http://localhost:4000';

export interface User {
  id: number;
  name: string;
  email: string;
  action?: string;
}
