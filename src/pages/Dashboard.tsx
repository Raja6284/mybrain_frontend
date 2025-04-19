

import { useEffect, useState } from "react"
import { Button } from "../components/Button"
import { PlusIcon } from "../components/icons/PlusIcon"
 import { ShareIcon } from "../components/icons/ShareIcon"
import Card from "../components/Card"
import { CreateContentModel } from "../components/CreateContentModel"
import { Sidebar } from "../components/Sidebar"
import { useContent } from "./hooks/useContent"
import axios from "axios"
import { BACKEND_URL } from "../../config"
import { TextIcon } from "../components/icons/TextIcon"
import { useActiveContent } from "./contexts/activeContentContext"
import { useUsername } from "./hooks/useUsername"

export default function Dashboard() {
  const [contentCreatePop, setContentCreatePop] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(true) // Loading state
  const { contents, refresh } = useContent()
  const { activeContent } = useActiveContent()

  // Map sidebar names to content types
  // const typeMap: Record<string, string> = {
  //   'All': 'all',
  //   'Tweets': 'twitter',
  //   'Videos': 'youtube',
  //   'Docs': 'document',
  //   'Links': 'randomLink'
  // }

  const typeMap: Record<string, string> = {
    All: "all",
    Youtube: "youtube",
    Twitter: "twitter",
    LinkedIn: "linkedin",
    Instagram: "instagram",
    Document: "document",
    Text: "text",
    Image: "image",
    Code: "code",
    Email: "email",
    RandomLink: "randomLink",
  }
  
  const { username, loading: usernameLoading } = useUsername()

  // Filter contents based on activeContent
  const filteredContents =
    activeContent === 'All'
      ? contents
      : contents.filter(c => c.type === typeMap[activeContent])

  useEffect(() => {
    setLoading(true)
    Promise.resolve(refresh()).finally(() => setLoading(false))
  }, [contentCreatePop])

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarOpen && window.innerWidth < 1024) {
        // Check if click is outside sidebar
        const sidebarElement = document.querySelector(".sidebar")
        const hamburgerButton = document.querySelector(".hamburger-button")

        if (
          sidebarElement &&
          !sidebarElement.contains(event.target) &&
          hamburgerButton &&
          !hamburgerButton.contains(event.target)
        ) {
          setSidebarOpen(false)
        }
      }
    }

    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [sidebarOpen])

  async function handleShareContent() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/brain/share`,
        {
          share: true,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
      )

      const shareUrl = `${BACKEND_URL}/api/v1/brain/${response.data.hash}`
      window.navigator.clipboard.writeText(shareUrl)
      alert("Share URL copied to clipboard!")
    } catch (error) {
      console.error("Error sharing content:", error)
      alert("Failed to generate share link")
    }
  }

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-10 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-6 left-6 z-20">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="hamburger-button p-2 rounded-full bg-white text-black shadow-md hover:bg-gray-200 transition-colors"
        >
          {sidebarOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Sidebar */}
      <div className="sidebar">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <div className="flex-1 lg:ml-72 overflow-auto">
        <div className="p-6 max-w-7xl mx-auto">
          <CreateContentModel
            open={contentCreatePop}
            onClose={() => {
              setContentCreatePop(false)
            }}
          />

          {/* <div className="flex flex-col sm:flex-row sm:justify-end gap-3 mb-8 mt-14 lg:mt-6">
          <div className="flex items-center gap-2 mb-6">
            <span className="font-semibold text-white text-lg break-all">@{username}</span>
          </div>
            <Button
              onClick={() => {
                setContentCreatePop(true)
              }}
              variant="primary"
              text="Add Content"
              startIcon={<PlusIcon />}
            />
            <Button onClick={handleShareContent} variant="secondary" text="Share" startIcon={<ShareIcon />} />
          </div> */}


<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 mt-14 lg:mt-6">
  {/* Username always on the left, wraps on mobile */}
  <span className="font-semibold text-white text-lg break-all">
    {usernameLoading ? "Loading..." : `@${username}'s Brain`}
  </span>
  {/* Buttons stack on mobile, row on desktop */}
  <div className="flex flex-col sm:flex-row gap-3">
    
    <Button
      onClick={() => setContentCreatePop(true)}
      variant="primary"
      text="Add Content"
      startIcon={<PlusIcon />}
    />
    <Button
      onClick={handleShareContent}
      variant="secondary"
      text="Share"
      startIcon={<ShareIcon />}
    />
  </div>
</div>



          {loading ? (
            <div className="text-center py-20 text-gray-400 bg-gray-900 rounded-lg border border-gray-800 mt-8">
              <div className="flex justify-center mb-4">
                <TextIcon className="w-12 h-12 text-gray-600 animate-spin" />
              </div>
              <p className="text-lg font-medium text-gray-300">Loading...</p>
            </div>
          ) : filteredContents.length === 0 ? (
            <div className="text-center py-20 text-gray-400 bg-gray-900 rounded-lg border border-gray-800 mt-8">
              <div className="flex justify-center mb-4">
                <TextIcon className="w-12 h-12 text-gray-600" />
              </div>
              <p className="text-lg font-medium text-gray-300">
                {activeContent === 'All'
                  ? "No content yet"
                  : `No ${activeContent.toLowerCase()} found`}
              </p>
              <p className="mt-2">Click "Add Content" to get started!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-8">
              {[...filteredContents].reverse().map((c) => (
                <Card key={c._id} content={c} onDelete={refresh} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
