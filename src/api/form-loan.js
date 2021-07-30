import axios from "axios";

export const fetchApiAnalyst = async (path, data) => {
  try {
    const url = `http://localhost:8000/${path}`;
    const res = await axios.post(url, data);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};
