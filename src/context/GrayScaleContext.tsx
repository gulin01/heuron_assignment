import React, { createContext, useState, useContext, ReactNode } from 'react'

// Define the context shape
interface GrayscaleContextType {
  grayscale: boolean
  toggleGrayscale: () => void
}

// Create the context with default values
const GrayscaleContext = createContext<GrayscaleContextType | undefined>(
  undefined
)

// Context provider component
export const GrayscaleProvider = ({ children }: { children: ReactNode }) => {
  const [grayscale, setGrayscale] = useState(false)

  // Toggle grayscale filter
  const toggleGrayscale = () => setGrayscale((prev) => !prev)

  return (
    <GrayscaleContext.Provider value={{ grayscale, toggleGrayscale }}>
      {children}
    </GrayscaleContext.Provider>
  )
}

// Custom hook to use the grayscale context
export const useGrayscale = () => {
  const context = useContext(GrayscaleContext)
  if (!context) {
    throw new Error('useGrayscale must be used within a GrayscaleProvider')
  }
  return context
}
