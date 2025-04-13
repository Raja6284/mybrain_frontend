
// import { createContext, useContext, useState, ReactNode } from "react";

// interface ActiveContentContextType {
//     activeContent: string;
//     setActiveContent: (content: string) => void;
//   }

// // Create Context
// const activeContentContext = createContext();

// // Provider Component
// export const activeContentProvider = ({ children }) => {
//     const [activeContent, setActiveContent] = useState("all"); // Default to testnet

//     return (
//         <activeContentContext.Provider value={{activeContent, setActiveContent}}>
//             {children}
//         </activeContentContext.Provider>
//     );
// };

// // Custom Hook for Easy Access
// export const useNetwork = () => useContext(activeContentContext);




// import { createContext, useContext, useState, ReactNode, useMemo } from "react";

// // Define the shape of your context
// interface ActiveContentContextType {
//   activeContent: string;
//   setActiveContent: (content: string) => void;
// }

// // Create context with a default undefined value
// const ActiveContentContext = createContext<ActiveContentContextType | undefined>(undefined);

// // Define props for the provider
// interface ActiveContentProviderProps {
//   children: ReactNode;
// }

// // Provider Component
// export const ActiveContentProvider = ({ children }: ActiveContentProviderProps) => {
//   const [activeContent, setActiveContent] = useState<string>("all");

//   // Memoize the context value to prevent unnecessary re-renders
//   const contextValue = useMemo(
//     () => ({ activeContent, setActiveContent }),
//     [activeContent]
//   );

//   return (
//     <ActiveContentContext.Provider value={contextValue}>
//       {children}
//     </ActiveContentContext.Provider>
//   );
// };

// // Custom hook for accessing the context
// export const useActiveContent = () => {
//   const context = useContext(ActiveContentContext);
//   if (context === undefined) {
//     throw new Error("useActiveContent must be used within an ActiveContentProvider");
//   }
//   return context;
// };