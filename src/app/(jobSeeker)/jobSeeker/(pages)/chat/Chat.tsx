'use client'
import React, { useState } from 'react'

export default function Chat() {
      const [selectedChat, setSelectedChat] = useState<number>(1)
  const [newMessage, setNewMessage] = useState("")

  const chatUsers = [
    {
      id: 1,
      name: "Robert Fox",
      avatar: "/api/placeholder/40/40",
      lastMessage: "Hi, I want make",
      timestamp: "12:35 am",
    },
    {
      id: 2,
      name: "Guy Hawkins",
      avatar: "/api/placeholder/40/40",
      lastMessage: "Hi, I want make",
      timestamp: "12:55 am",
    },
    {
      id: 3,
      name: "Guy Hawkins",
      avatar: "/api/placeholder/40/40",
      lastMessage: "Hi, I want make",
      timestamp: "12:55 am",
    },
    {
      id: 4,
      name: "Guy Hawkins",
      avatar: "/api/placeholder/40/40",
      lastMessage: "Hi, I want make",
      timestamp: "12:55 am",
    },
    {
      id: 5,
      name: "Guy Hawkins",
      avatar: "/api/placeholder/40/40",
      lastMessage: "Hi, I want make",
      timestamp: "12:55 am",
    },
    {
      id: 6,
      name: "Guy Hawkins",
      avatar: "/api/placeholder/40/40",
      lastMessage: "Hi, I want make",
      timestamp: "12:55 am",
    },
    {
      id: 7,
      name: "Guy Hawkins",
      avatar: "/api/placeholder/40/40",
      lastMessage: "Hi, I want make",
      timestamp: "12:55 am",
    },
    {
      id: 8,
      name: "Guy Hawkins",
      avatar: "/api/placeholder/40/40",
      lastMessage: "Hi, I want make",
      timestamp: "12:55 am",
    },
    {
      id: 9,
      name: "Guy Hawkins",
      avatar: "/api/placeholder/40/40",
      lastMessage: "Hi, I want make",
      timestamp: "12:55 am",
    },
  ]

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "other",
      content:
        "SM Technology is a forward-thinking tech company specializing in innovative digital solutions, IT services, and software development.",
      timestamp: "12:35 am",
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 2,
      sender: "user",
      content: "Hello, I'm Saifur Rahman, UI/UX Designer. I have a quick question regarding your company details.",
      timestamp: "12:36 am",
      isRead: true,
    },
    {
      id: 3,
      sender: "other",
      content:
        "SM Technology is a forward-thinking tech company specializing in innovative digital solutions, IT services, and software development.",
      timestamp: "12:37 am",
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 4,
      sender: "user",
      content: "Thank you for this information",
      timestamp: "12:38 am",
      isRead: true,
    },
  ])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        sender: "user",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isRead: false,
      }
      setMessages([...messages, message])
      setNewMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }
    return (
        <div className='max-w-[1034px] mx-auto my-16 shadow-lg'>
            {/* Header */}
            <div className="flex items-center justify-between p-4 shadow-md bg-white">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <img
                            src="/api/placeholder/40/40"
                            alt="Saifur Rahman"
                            className="w-10 h-10 rounded-full object-cover bg-teal-700"
                        />
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-primary rounded-full border-2 border-white" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-base md:text-xl ">Saifur Rahman</h3>
                    </div>
                </div>
                <span className="text-sm md:text-[18px] underline text-subtitle hidden sm:block">Interview scheduler</span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 px-2 py-4 sm:px-6 bg-gray-50">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`flex items-end gap-2 max-w-xs sm:max-w-sm md:max-w-md mx-4 sm:mx-6 ${message.sender === "user" ? "flex-row-reverse" : "flex-row"
                                }`}
                        >
                            {message.sender === "other" && (
                                <img
                                    src={message.avatar || "/placeholder.svg"}
                                    alt="Avatar"
                                    className="w-8 h-8 rounded-full object-cover bg-teal-600"
                                />
                            )}

                            <div
                                className={`relative px-4 py-2 rounded-2xl ${message.sender === "user"
                                        ? "bg-primary text-white"
                                        : "bg-neutral-200 text-gray-800 border border-gray-200"
                                    }`}
                            >
                                <p className="text-sm">{message.content}</p>
                                {message.sender === "user" && (
                                    <div className="absolute -bottom-1 -right-1">
                                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                            <span className="text-white text-xs font-bold">SAT</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {message.sender === "user" && (
                            <div className="flex items-center ml-2 text-xs text-gray-500">
                                {message.isRead && (
                                    <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                )}
                                <span className="ml-1">{message.timestamp}</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Message Input */}
            <div className="bg-white border-t border-gray-200 p-4">
                <div className="flex items-center gap-3">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="w-12 h-12 bg-primary hover:bg-green-600 disabled:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
                    >
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}
