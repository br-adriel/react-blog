export function storeRefeshToken(refreshToken: string) {
  localStorage.setItem('refreshToken', refreshToken);
}

export function storeToken(token: string) {
  localStorage.setItem('token', token);
}

export function getStoredRefeshToken() {
  localStorage.getItem('refreshToken');
}

export function getStoredToken() {
  localStorage.getItem('token');
}
