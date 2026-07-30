interface RegisterRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

interface LoginRequest {
  email: string;
  password: string;
}
