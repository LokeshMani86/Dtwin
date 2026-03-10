import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const sendMessage = async ({ message, personaId, userName, topics }) => {
  const response = await axios.post(`${API_URL}/chat`, {
    message,
    personaId,
    userName,
    topics,
  })
  return response.data
}