// import { createContext, useContext, useState, ReactNode, useMemo,useEffect } from "react";

// // 1. Define the shape of your context
// interface ActiveContentContextType {
//   activeContent: string;
//   setActiveContent: (content: string) => void;
// }

// // 2. Create context with a default undefined value
// const ActiveContentContext = createContext<ActiveContentContextType | undefined>(undefined);

// // 3. Define props for the provider
// interface ActiveContentProviderProps {
//   children: ReactNode;
// }

// // // 4. Provider Component
// // export const ActiveContentProvider = ({ children }: ActiveContentProviderProps) => {
// //   const [activeContent, setActiveContent] = useState<string>("all");

// //   // Memoize the context value to prevent unnecessary re-renders
// //   const contextValue = useMemo(
// //     () => ({ activeContent, setActiveContent }),
// //     [activeContent]
// //   );

// //   return (
// //     <ActiveContentContext.Provider value={contextValue}>
// //       {children}
// //     </ActiveContentContext.Provider>
// //   );
// // };

// // In your context file (activeContentContext.tsx)
// export const ActiveContentProvider = ({ children }: ActiveContentProviderProps) => {
//     // Initialize state from localStorage or default to "all"
//     const [activeContent, setActiveContent] = useState<string>(() => {
//       const saved = localStorage.getItem("activeContent");
//       return saved !== null ? saved : "all"; // Default to "all" if no saved value
//     });
  
//     // Save to localStorage whenever activeContent changes
//     useEffect(() => {
//       localStorage.setItem("activeContent", activeContent);
//     }, [activeContent]);
  
//     // Rest of your provider code remains the same
//     const contextValue = useMemo(
//       () => ({ activeContent, setActiveContent }),
//       [activeContent]
//     );
  
//     return (
//       <ActiveContentContext.Provider value={contextValue}>
//         {children}
//       </ActiveContentContext.Provider>
//     );
//   };
  

// // 5. Custom hook for accessing the context
// export const useActiveContent = () => {
//   const context = useContext(ActiveContentContext);
//   if (context === undefined) {
//     throw new Error("useActiveContent must be used within an ActiveContentProvider");
//   }
//   return context;
// };






import { createContext, useContext, useState, ReactNode, useMemo, useEffect } from "react";

// Define the shape of your context
interface ActiveContentContextType {
  activeContent: string;
  setActiveContent: (content: string) => void;
}

// Create context with a default undefined value
const ActiveContentContext = createContext<ActiveContentContextType | undefined>(undefined);

// Define props for the provider
interface ActiveContentProviderProps {
  children: ReactNode;
}

// Provider Component
export const ActiveContentProvider = ({ children }: ActiveContentProviderProps) => {
  // Initialize state from localStorage or default to "all"
  const [activeContent, setActiveContent] = useState<string>(() => {
    const saved = localStorage.getItem("activeContent");
    return saved !== null ? saved : "all"; // Default to "all" if no saved value
  });

  // Save to localStorage whenever activeContent changes
  useEffect(() => {
    localStorage.setItem("activeContent", activeContent);
  }, [activeContent]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({ activeContent, setActiveContent }),
    [activeContent]
  );

  return (
    <ActiveContentContext.Provider value={contextValue}>
      {children}
    </ActiveContentContext.Provider>
  );
};

// Custom hook for accessing the context
export const useActiveContent = () => {
  const context = useContext(ActiveContentContext);
  if (context === undefined) {
    throw new Error("useActiveContent must be used within an ActiveContentProvider");
  }
  return context;
};
