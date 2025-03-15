

import { CrossIcon } from "./icons/CrossIcon";
import { Button } from './Button';
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";

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
    RandomLink = "random link"
}

export function CreateContentModel({ open, onClose }) {
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const [type, setType] = useState<contentType>();
    const [text, setText] = useState('');

    // Close modal when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        }

        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open, onClose]);

    // Handle ESC key press
    useEffect(() => {
        function handleEscKey(event) {
            if (event.key === "Escape") {
                onClose();
            }
        }

        if (open) {
            document.addEventListener("keydown", handleEscKey);
        }
        return () => {
            document.removeEventListener("keydown", handleEscKey);
        };
    }, [open, onClose]);

    async function handleCreateContent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;

        if (!title || !link) {
            alert("Please fill in all fields");
            return;
        }

        try {
            await axios.post(`${BACKEND_URL}/api/v1/content`, {
                "link": link,
                "title": title,
                "type": type
            }, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            });

            onClose();
            alert("Your content was added successfully");
        } catch (error) {
            console.error("Error adding content:", error);
            alert("Failed to add content. Please try again.");
        }
    }

    async function handleCreateTextOrCode() {
        const title = titleRef.current?.value;
        //const link = "not applicable";

        if (!title || !text.trim()) {
            alert("Please fill in all fields");
            return;
        }

        try {
            await axios.post(`${BACKEND_URL}/api/v1/content`, {
                "title": title,
                "type": type,
                "text": text
            }, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            });

            onClose();
            alert("Your content was added successfully");
        } catch (error) {
            console.error("Error adding content:", error);
            alert("Failed to add content. Please try again.");
        }
    }

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50">
            <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm"></div>

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <div
                    ref={modalRef}
                    className="bg-white rounded-lg shadow-xl w-full max-w-md animate-fadeIn overflow-y-auto max-h-[90vh]"
                >
                    <div className="flex justify-between items-center p-4 border-b">
                        <h2 className="text-lg font-semibold">Add New Content</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                            aria-label="Close modal"
                        >
                            <CrossIcon />
                        </button>
                    </div>

                    <div className="p-4">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Content Type
                                </label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                    {Object.values(contentType).map((contentTypeValue) => (
                                        <Button
                                            key={contentTypeValue}
                                            text={contentTypeValue}
                                            variant={type === contentTypeValue ? "primary" : "secondary"}
                                            onClick={() => setType(contentTypeValue)}
                                            fullWidth={true}
                                        />
                                    ))}
                                </div>
                            </div>

                            {(type === "youtube" || type === "twitter" || type === "linkedin" || type === "instagram") && (
                                <div>
                                    <div className="space-y-4">
                                        <Input reference={titleRef} placeholder="Title" />
                                        <Input reference={linkRef} placeholder="Link" />
                                    </div>
                                    <div className="flex flex-wrap gap-2 p-4 border-t">
                                        <Button
                                            variant="secondary"
                                            text="Cancel"
                                            onClick={onClose}
                                            fullWidth={false}
                                        />
                                        <Button
                                            variant="primary"
                                            text="Add Content"
                                            onClick={handleCreateContent}
                                            fullWidth={false}
                                        />
                                    </div>
                                </div>
                            )}

                            {(type === "text" || type === "code") && (
                                <div>
                                    <div className="space-y-4">
                                        <Input reference={titleRef} placeholder="Title" />
                                        <textarea
                                            className="
                                                w-full
                                                min-h-[150px]
                                                sm:min-h-[200px]
                                                resize-y
                                                overflow-auto
                                                border
                                                border-gray-200
                                                rounded-md
                                                bg-transparent
                                                p-3
                                                mt-2
                                                font-inherit
                                                text-base
                                                shadow-sm
                                                focus:outline-none
                                                focus:ring-2
                                                focus:ring-blue-500
                                                focus:border-transparent
                                            "
                                            value={text}
                                            onChange={(e) => setText(e.target.value)}
                                            placeholder="Enter the text or code here ...."
                                        />
                                    </div>
                                    <div className="flex justify-end gap-2 p-4 border-t">
                                        <Button
                                            variant="secondary"
                                            text="Cancel"
                                            onClick={onClose}
                                            fullWidth={false}
                                        />
                                        <Button
                                            variant="primary"
                                            text="Add Content"
                                            onClick={handleCreateTextOrCode}
                                            fullWidth={false}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface InputProps {
    placeholder: string;
    reference: React.RefObject<HTMLInputElement>;
}

export function Input({ reference, placeholder }: InputProps) {
    return (
        <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {placeholder}
            </label>
            <input
                type="text"
                placeholder={`Enter ${placeholder.toLowerCase()}`}
                ref={reference}
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
            />
        </div>
    );
}