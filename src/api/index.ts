export const login = async (login?: string | null) => {
  const response = await fetch(process.env.VUE_APP_SERVER_URL + '/login', {
    method: 'POST',
    body: JSON.stringify({ login }),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

export const register = async (login: string) => {
  const response = await fetch(process.env.VUE_APP_SERVER_URL + '/register', {
    method: 'POST',
    body: JSON.stringify({ login }),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

export const logout = async () => {
  const response = await fetch(process.env.VUE_APP_SERVER_URL + '/logout', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

export const push = async (data: any) => {
  const response = await fetch(process.env.VUE_APP_SERVER_URL + '/push', {
    method: 'POST',
    body: JSON.stringify({ data }),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};
