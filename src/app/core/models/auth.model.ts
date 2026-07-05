export interface loginCredentials {
  username: string;
  password: string; 
  tenantId: string;
}

export interface authResponse {
  accessToken: string;
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
  };
}

export interface refreshTokenResponse {
  accessToken: string;
}
