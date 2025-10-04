import api from "./api";

export async function generateIdea({ topic, length, audience, style }) {
  const response = await api.post("/idea", { topic, length, audience, style });
  return response.data;
}
