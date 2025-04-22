"use client"

import type React from "react"

import { CrossIcon } from "./icons/CrossIcon"
import { Button } from "./Button"
import { useRef, useState, useEffect } from "react"
import axios from "axios"
import { BACKEND_URL } from "../../config"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

interface EditContentModalProps {
  open: boolean
  onClose: () => void
  content: {
    _id: string
    type: string
    title: string
    link?: string
    text?: string
  }
  onUpdate: (updated: any) => void
}



export function EditContentModal({ open, onClose, content, onUpdate }:EditContentModalProps) {
  const titleRef = useRef<HTMLInputElement>(null)
  const linkRef = useRef<HTMLInputElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const [text, setText] = useState("")
  
  // Set initial values when modal opens with content
  useEffect(() => {
    if (content && open) {
      if (content.text && text === "") {  // Only set if text is empty
        setText(content.text)
      }
    }
  }, [open]) 

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event:MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open, onClose])

  // Handle ESC key press
  useEffect(() => {
    function handleEscKey(event:KeyboardEvent) {
      if (event.key === "Escape") {
        onClose()
      }
    }

    if (open) {
      document.addEventListener("keydown", handleEscKey)
    }
    return () => {
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [open, onClose])

  async function handleUpdateLinkContent() {
    const title = titleRef.current?.value
    const link = linkRef.current?.value

    if (!title || !link) {
      toast.error("Please fill in all fields")
      return
    }

    try {
      const response = await axios.put(
        `${BACKEND_URL}/api/v1/content/${content._id}`,
        {
          link: link,
          title: title,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
      )

      onClose()
      onUpdate(response.data)
      toast.success("Your content was updated successfully")
    } catch (error) {
      console.error("Error updating content:", error)
      toast.error("Failed to update content. Please try again.")  
    }
  }

  async function handleUpdateTextOrCode() {
    const title = titleRef.current?.value

    if (!title || !text.trim()) {
      toast.error("Please fill in all fields")
      return
    }

    try {
      const response = await axios.put(
        `${BACKEND_URL}/api/v1/content/${content._id}`,
        {
          title: title,
          text: text,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
      )

      onClose()
      onUpdate(response.data)
      toast.success("Your content was updated successfully")  
    } catch (error) {
      console.error("Error updating content:", error)
      toast.error("Failed to update content. Please try again.")  
    }
  }

  if (!open || !content) return null

  return (
    <div className="fixed inset-0 z-50">
      <ToastContainer position="top-center" />
      <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm"></div>

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <style>{`
          div::-webkit-scrollbar {
            display: none;
          }
          textarea::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        
        <div
          ref={modalRef}
          className="rounded-lg w-full max-w-md animate-fadeIn bg-black"
          style={{ 
            maxHeight: "90vh", 
            overflowY: "auto", 
            msOverflowStyle: "none", 
            scrollbarWidth: "none",
            boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.1), 0 4px 24px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05) inset",
            border: "1px solid rgba(255, 255, 255, 0.15)"
          }}
        >
          <div 
            className="flex justify-between items-center p-5"
            style={{
              borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
              background: "linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0) 100%)"
            }}
          >
            <h2 className="text-xl font-semibold text-white">Edit Content</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white hover:bg-opacity-10"
              aria-label="Close modal"
            >
              <CrossIcon />
            </button>
          </div>

          <div className="p-5">
            <div className="space-y-5">
              {(content.type === "youtube" || content.type === "twitter" || content.type === "linkedin" || content.type === "instagram" || content.type === "randomLink") && (
                <div>
                  <div className="space-y-4">
                    <Input reference={titleRef} placeholder="Title" defaultValue={content.title} />
                    <Input reference={linkRef} placeholder="Link" defaultValue={content.link} />
                  </div>
                  <div 
                    className="flex justify-end gap-3 pt-5 mt-5"
                    style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}
                  >
                    <Button variant="outline" text="Cancel" onClick={onClose} fullWidth={false} />
                    <Button variant="primary" text="Update Content" onClick={handleUpdateLinkContent} fullWidth={false} />
                  </div>
                </div>
              )}

              {(content.type === "text" || content.type === "code") && (
                <div>
                  <div className="space-y-4">
                    <Input reference={titleRef} placeholder="Title" defaultValue={content.title} />
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Content</label>
                      <textarea
                        className="w-full h-40 rounded-md bg-black p-3 font-mono text-sm text-white focus:outline-none focus:ring-1 focus:ring-white focus:border-transparent"
                        style={{ 
                          msOverflowStyle: "none", 
                          scrollbarWidth: "none",
                          border: "1px solid rgba(255, 255, 255, 0.15)",
                          background: "rgba(0, 0, 0, 0.3)",
                          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.3) inset"
                        }}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Enter the text or code here..."
                      />
                    </div>
                  </div>
                  <div 
                    className="flex justify-end gap-3 pt-5 mt-5"
                    style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}
                  >
                    <Button variant="outline" text="Cancel" onClick={onClose} fullWidth={false} />
                    <Button variant="primary" text="Update Content" onClick={handleUpdateTextOrCode} fullWidth={false} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// interface InputProps {
//   placeholder: string
//   reference: React.RefObject<HTMLInputElement>
//   type?: string
//   defaultValue?: string
// }

interface InputProps {
  placeholder: string
  reference: React.RefObject<HTMLInputElement | null>  // ✅ allow null
  type?: string
  defaultValue?: string
}




export function Input({ reference, placeholder, type = "text", defaultValue = "" }: InputProps) {
  useEffect(() => {
    if (reference.current && defaultValue) {
      reference.current.value = defaultValue
    }
  }, [reference, defaultValue])
  
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-white mb-2">{placeholder}</label>
      <input
        type={type}
        placeholder={`Enter ${placeholder.toLowerCase()}`}
        ref={reference}
        className="w-full px-4 py-2.5 rounded-md bg-black text-white focus:outline-none transition-all"
        style={{ 
          border: "1px solid rgba(255, 255, 255, 0.15)",
          background: "rgba(0, 0, 0, 0.3)",
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.3) inset"
        }}
      />
    </div>
  )
}