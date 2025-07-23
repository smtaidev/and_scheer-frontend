"use client"

import type React from "react"
import { X } from "lucide-react"

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
  confirmButtonClass?: string
  illustration?: React.ReactNode
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure",
  message = "This action cannot be undone.",
  confirmText = "Yes, Confirm",
  cancelText = "No, Cancel",
  confirmButtonClass = "bg-red-500 hover:bg-red-600 text-white",
  illustration,
}: ConfirmationModalProps) {
  if (!isOpen) return null

  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  const handleCancel = () => {
    onClose()
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Modal content */}
        <div className="p-8 text-center">
          {/* Illustration */}
          <div className="mb-6">
            {illustration || (
              <div className="w-20 h-20 mx-auto mb-4">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Simple person with question mark illustration */}
                  <circle cx="50" cy="30" r="12" fill="#FFA07A" />
                  <rect x="42" y="42" width="16" height="20" rx="8" fill="#FFA07A" />
                  <rect x="38" y="62" width="8" height="15" rx="4" fill="#FFA07A" />
                  <rect x="54" y="62" width="8" height="15" rx="4" fill="#FFA07A" />
                  <circle cx="65" cy="25" r="8" fill="#4A90E2" opacity="0.8" />
                  <text x="65" y="30" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                    ?
                  </text>
                </svg>
              </div>
            )}
          </div>

          {/* Title */}
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h2>

          {/* Message */}
          <p className="text-gray-600 mb-8">{message}</p>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              {cancelText}
            </button>
            <button
              onClick={handleConfirm}
              className={`flex-1 px-6 py-3 rounded-lg transition-colors font-medium ${confirmButtonClass}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
