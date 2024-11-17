'use client'

import React, { createContext, useContext, useState } from 'react';
import { useToast } from "@/hooks/use-toast"

type ErrorContextType = {
  showError: (error: Error | string) => void;
};

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export function ErrorProvider({ children }: { children: React.ReactNode }) {
    const { toast } = useToast();
  
    const showError = (error: Error | string) => {
      if (typeof error === 'string') {
        toast({
          variant: "destructive",
          title: "Error",
          description: error,
        });
      } else {
        toast({
          variant: "destructive",
          description: error.message,
        });
      }
    };
  
    return (
      <ErrorContext.Provider value={{ showError }}>
        {children}
      </ErrorContext.Provider>
    );
  }
  
  export const useError = () => {
    const context = useContext(ErrorContext);
    if (!context) {
      throw new Error('useError must be used within an ErrorProvider');
    }
    return context;
  };