'use server'

import { GoogleGenAI } from '@google/genai'

export async function sendMessage({ message, history }) {
  if (!message || typeof message !== 'string') {
    throw new Error('A message is required.')
  }

  const apiKey = process.env.AGENT_API_KEY
  const model = process.env.AGENT_MODEL

  if (!apiKey || !model) {
    throw new Error('The agent is not configured.')
  }

  const ai = new GoogleGenAI({ apiKey })
  const conversation = (history || [])
    .map(({ role, content }) => `${role === 'assistant' ? 'Agent' : 'User'}: ${content}`)
    .concat(`User: ${message}`)
    .join('\n')

  const interaction = await ai.interactions.create({
    model,
    input: conversation,
  })

  if (!interaction.output_text) {
    throw new Error('The agent returned no response.')
  }

  return interaction.output_text
}
