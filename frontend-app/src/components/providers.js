import React, { useEffect } from 'react'
import { ThemeProvider } from 'next-themes'
import { UIProvider } from '../context/UIContext'
import { checkHealth } from '../utils/api'

export function Providers({ children }) {
  // Health check on app load
  useEffect(() => {
    const checkApiHealth = async () => {
      try {
        const health = await checkHealth();
        console.log('API Health:', health);
      } catch (error) {
        console.warn('API Health Check Failed:', error.message);
      }
    };
    
    checkApiHealth();
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <UIProvider>
        {children}
      </UIProvider>
    </ThemeProvider>
  )
}
