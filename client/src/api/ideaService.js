import api from "./api";

export async function generateIdea({ storyStart, length, audience, style }) {
  const response = await api.post("/idea", { storyStart, length, audience, style });
  return response.data;
}
