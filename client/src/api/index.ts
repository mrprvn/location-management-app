import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await api.post("api/users/login", { email, password });
  return response.data;
};

export const register = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await api.post("api/users/register", {
    name,
    email,
    password,
  });
  return response.data;
};

export const addLocation = async ({
  formData,
  token,
}: {
  formData: { name: string; latitude: string; longitude: string };
  token: string;
}) => {
  const response = await api.post(
    "api/locations/add",
    {
      name: formData.name,
      latitude: formData.latitude,
      longitude: formData.longitude,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getAllLocations = async (token: string) => {
  const response = await api.get("api/locations", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const uploadFile = async ({
  file,
  token,
}: {
  file: File;
  token: string;
}) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("api/locations/upload", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
