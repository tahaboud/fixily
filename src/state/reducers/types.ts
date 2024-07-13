import {
  Category,
  ChatRoom,
  Commune,
  ErrorResponse,
  Job,
  JobUser,
  Notification,
  PreviousJob,
  SubCategory,
  User,
  Wilaya,
} from "../../types";

interface Detail {
  state_code?: string;
  detail?: Array<string> | string;
}

export interface AuthState {
  userIsLoading: boolean;
  isAuthenticated: boolean;
  isArtisan: boolean;
  token: string | null;
  data: User | null;
  detail: Detail | null;
  errors: { type: string; errors: Array<ErrorResponse> } | null;
  userDataFetchedFromToken: boolean;
  notifications: {
    unseen_notifications_count: number;
    notifications: Array<Notification>;
  } | null;
}

export interface PaymentReceipt {
  id: string;
  user: JobUser;
  receipt: string;
  status: "approved" | "denied" | "pending";
}

export interface AdminState {
  adminIsLoading: boolean;
  data: Array<User> | null;
  details: Detail | null;
  errors: { type: string; errors: Array<ErrorResponse> } | null;
  paymentReceipts: Array<PaymentReceipt> | null;
}

export interface ServicesState {
  servicesIsLoading: boolean;
  categories: Array<Category> | null;
  subCategories: Array<SubCategory> | null;
  wilayas: Array<Wilaya> | null;
  communes: Array<Commune> | null;
  jobs: Array<Job> | null;
  previousJobs: Array<PreviousJob> | null;
  errors: { type: string; errors: Array<ErrorResponse> } | null;
  details: string | null;
}

export interface ChatState {
  chatIsLoading: boolean;
  rooms: Array<ChatRoom> | null;
  errors: { type: string; errors: Array<ErrorResponse> } | null;
}
