import axios from "axios";

const BASE_URL = "https://t4e-testserver.onrender.com/api";

export const getToken = async () => {
  const res = await axios.post(`${BASE_URL}/public/token`, {
    studentId: "E0423038",   // ✅ correct
    password: "649089",
    set: "SetA",
  });

  return res.data;
};

export const getDataset = async (token, dataUrl) => {
  const res = await axios.get(`${BASE_URL}${dataUrl}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.data;
};
