import { getAuthToken } from "../context/auth-context";
import { CALL_API } from "../utils/const";

export async function getAllUsers(dipslayObject) {
  const { page, perPage } = dipslayObject;
  const token = getAuthToken();
  const result = await fetch(
    `${CALL_API}/users?page=${page}&perPage=${perPage}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  const data = await result.json();

  if (!result.ok) {
    throw new Error("Could not obtain the users info");
  }
  return { users: data.users, totalUsers: data.totalUsers };
}

export async function getAllUserLabel() {
  const token = getAuthToken();
  const result = await fetch(`${CALL_API}/users-format`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await result.json();

  if (!result.ok) {
    throw new Error("Could not obtain the users info");
  }
  console.log(data);
  return { users: data.users };
}

export async function getUserById(userId) {
  const token = getAuthToken();
  const result = await fetch(`${CALL_API}/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await result.json();

  if (!result.ok) {
    throw new Error("Could not obtain the user info");
  }

  return data.result;
}

export async function login(userData) {
  const { email, password } = userData;
  const token = getAuthToken();
  const result = await fetch(`${CALL_API}/login`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  const data = await result.json();

  if (!result.ok) {
    throw new Error("Was imposible to log in");
  }

  return data.token;
}

export async function signUp(userData) {
  const { email, password, confirmPassword, firstName, lastName, phone } =
    userData;
  const token = getAuthToken();
  const response = await fetch(`${CALL_API}/signup`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Was imposible to create this new user");
  }
  return data.userId;
}

export async function updateUsuario(userData) {
  const { email, firstName, lastName, phone } = userData;
  const token = getAuthToken();
  const result = await fetch(`${CALL_API}/users`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
    }),
  });

  const data = await result.json();

  if (!result.ok) {
    throw new Error("Cant not update the user");
  }

  return data.isSaved;
}

export async function resetPassword(userData) {
  const { newPassword, confirmNewPassword } = userData;
  const token = getAuthToken();
  const response = await fetch(`${CALL_API}/reset}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      newPassword: newPassword,
      confirmNewPassword: confirmNewPassword,
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Was imposible to reset the password of this new user");
  }
  return data.isSaved;
}

export async function deleteUser(userId) {
  const token = getAuthToken();
  const response = await fetch(`${CALL_API}/users/${userId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Was imposible to delete this user");
  }
  return data.isDeleted;
}
