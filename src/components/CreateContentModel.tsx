

"use client"

import type React from "react"

import { CrossIcon } from "./icons/CrossIcon"
import { Button } from "./Button"
import { useRef, useState, useEffect } from "react"
import axios from "axios"
import { BACKEND_URL } from "../../config"
import { useActiveContent } from '../pages/contexts/activeContentContext';

enum contentType {
  Youtube = "youtube",
  Twitter = "twitter",
  LinkedIn = "linkedin",
  Instagram = "instagram",
  Document = "document",
  Text = "text",
  Image = "image",
  Code = "code",
  Email = "email",
  RandomLink = "randomLink",
}

export function CreateContentModel({ open, onClose }) {
  const titleRef = useRef<HTMLInputElement>(null)
  const linkRef = useRef<HTMLInputElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const [type, setType] = useState<contentType>()
  const [text, setText] = useState("")
  // const {activeContent,setActiveContent} = useActiveContent()

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
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
    function handleEscKey(event) {
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

  async function handleCreateContent() {
    const title = titleRef.current?.value
    const link = linkRef.current?.value

    if (!title || !link) {
      alert("Please fill in all fields")
      return
    }

    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/content`,
        {
          link: link,
          title: title,
          type: type,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
      )

      onClose()
      alert("Your content was added successfully")
    } catch (error) {
      console.error("Error adding content:", error)
      alert("Failed to add content. Please try again.")
    }
  }

  async function handleCreateTextOrCode() {
    const title = titleRef.current?.value

    if (!title || !text.trim()) {
      alert("Please fill in all fields")
      return
    }

    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/content`,
        {
          title: title,
          type: type,
          text: text,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
      )

      onClose()
      alert("Your content was added successfully")
    } catch (error) {
      console.error("Error adding content:", error)
      alert("Failed to add content. Please try again.")
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm"></div>

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <style jsx>{`
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
            <h2 className="text-xl font-semibold text-white">Add New Content</h2>
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
              <div>
                <label className="block text-sm font-medium text-white mb-2">Content Type</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {Object.values(contentType).map((contentTypeValue) => (
                    <Button
                      key={contentTypeValue}
                      text={contentTypeValue}
                      variant={type === contentTypeValue ? "primary" : "outline"}
                      onClick={() => setType(contentTypeValue)}
                      fullWidth={true}
                      size="small"
                    />
                  ))}
                </div>
              </div>

{/* <div>
  <label className="block text-sm font-medium text-white mb-2">Content Type</label>
  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
    {Object.values(contentType).map((contentTypeValue) => (
      <Button
        key={contentTypeValue}
        text={contentTypeValue}
        variant={type === contentTypeValue ? "primary" : "outline"}
        onClick={() => setType(contentTypeValue)}
        fullWidth={true}
        size="small"
        className="truncate overflow-hidden text-ellipsis"
      />
    ))}
  </div>
</div> */}


              {(type === "youtube" || type === "twitter" || type === "linkedin" || type === "instagram" || type == "randomLink") && (
                <div>
                  <div className="space-y-4">
                    <Input reference={titleRef} placeholder="Title" />
                    <Input reference={linkRef} placeholder="Link" />
                  </div>
                  <div 
                    className="flex justify-end gap-3 pt-5 mt-5"
                    style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}
                  >
                    <Button variant="outline" text="Cancel" onClick={onClose} fullWidth={false} />
                    <Button variant="primary" text="Add Content" onClick={handleCreateContent} fullWidth={false} />
                  </div>
                </div>
              )}

              {(type === "text" || type === "code") && (
                <div>
                  <div className="space-y-4">
                    <Input reference={titleRef} placeholder="Title" />
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
                    <Button variant="primary" text="Add Content" onClick={handleCreateTextOrCode} fullWidth={false} />
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

interface InputProps {
  placeholder: string
  reference: React.RefObject<HTMLInputElement>
  type?: string
}

export function Input({ reference, placeholder, type = "text" }: InputProps) {
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


