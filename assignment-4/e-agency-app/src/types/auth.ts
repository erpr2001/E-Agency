export interface AuthResult {
    id: number,
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    gender: string,
    image: string,
    accessToken: string, // JWT accessToken
    refreshToken: string // refreshToken
  }