export interface Appointment {
  id: number;
  ownerName: string;
  petName: string;
  phone: string;
  date: string;
  time: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | string;
  created_at: string;
}

export interface User {
  id: number;
  username: string;
  role: 'admin' | 'client' | string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
}

export interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  date: string;
  is_read: number;
  replied: number;
  created_at: string;
}
