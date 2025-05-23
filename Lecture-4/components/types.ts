// Redux state types
export interface User {
    userId: string;
    email: string;
    role: string;
}

export interface AuthState {
    user: User | null;
}

export interface RootState {
    auth: AuthState;
}
