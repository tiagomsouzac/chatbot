'use client'

import { useRef, useState } from 'react'
import { sendMessage } from './chat'

export default function HomePage() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const textareaRef = useRef(null)

  async function handleSubmit(event) {
    event?.preventDefault()
    const content = input.trim()

    if (!content || isLoading) return

    const userMessage = { role: 'user', content }
    setMessages((current) => [...current, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const reply = await sendMessage({ message: content, history: messages })
      setMessages((current) => [...current, { role: 'assistant', content: reply }])
    } catch (error) {
      setMessages((current) => [
        ...current,
        { role: 'assistant', content: error.message || 'Something went wrong. Please try again.' },
      ])
    } finally {
      setIsLoading(false)
      textareaRef.current?.focus()
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSubmit(event)
    }
  }

  return (
    <main className="chat-shell">
      <section className="chat-panel" aria-label="Chat with an AI agent">
        <header className="chat-header">
          <div>
            <p className="eyebrow">NORTHSTAR / CONVERSATION</p>
            <h1>Talk to an agent</h1>
          </div>
        </header>

        <div className="message-list" aria-live="polite">
          {messages.length === 0 ? (
            <div className="empty-state">
              <span className="empty-mark">+</span>
              <h2>What are you working on?</h2>
              <p>Start a conversation with your configured agent.</p>
            </div>
          ) : (
            messages.map((message, index) => (
              <article className={`message ${message.role}`} key={`${message.role}-${index}`}>
                <span className="message-label">{message.role === 'user' ? 'You' : 'Agent'}</span>
                <p>{message.content}</p>
              </article>
            ))
          )}
          {isLoading && <div className="typing-indicator">Agent is thinking<span>...</span></div>}
        </div>

        <form className="composer" onSubmit={handleSubmit}>
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message your agent..."
            rows="1"
            aria-label="Message your agent"
            disabled={isLoading}
          />
          <button type="submit" disabled={!input.trim() || isLoading} aria-label="Send message">
            <span>Send</span>
            <span aria-hidden="true">↗</span>
          </button>
        </form>
        <p className="composer-hint">Enter to send · Shift + Enter for a new line</p>
      </section>
    </main>
  )
}