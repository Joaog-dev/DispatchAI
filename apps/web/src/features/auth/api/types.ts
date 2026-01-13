export type AuthLoginRequest = {
  email: string;
  password: string;
};

export type UserRole = "dispatcher" | "driver";

export type AuthRegisterRequest = {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
};

export type AuthRegisterResponse = {
  id: string;
  displayName: string;
  email: string;
  role: UserRole;
};

export type AuthResponse = {
  token: string;
  userId: string;
  name: string;
  email: string;
  roles: UserRole[];
  expiresAt: string;
};

export type AuthMeResponse = {
  userId: string;
  name: string;
  email: string;
  roles: UserRole[];
};
