import axios from "axios";

const ACCESS_KEY = "q7yAniHypMkgmXP7jND9pFhhLFqPK1Me3vIT1qv-VaA";
const instance = axios.create({
  baseURL: "https://api.unsplash.com/",
  headers: {
    Authorization: `Client-ID ${ACCESS_KEY}`,
  },
});

export const fetchImages = async (query, page = 1, perPage = 12) => {
  const response = await instance.get("/search/photos", {
    params: { query, page, per_page: perPage },
  });
  return response.data;
};
