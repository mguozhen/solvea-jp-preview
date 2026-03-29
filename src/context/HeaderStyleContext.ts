import React from 'react';

export default React.createContext<{
  primaryButton?: {
    backgroundColor?: string;
    color?: string;
    borderColor?: string;
  };
  defaultButton?: {
    backgroundColor?: string;
    color?: string;
    borderColor?: string;
  };
  backgroundColor?: string;
}>({});
