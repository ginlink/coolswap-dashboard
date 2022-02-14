/// <reference types="react-scripts" />

interface Window {
  ethereum?: {
    isMetamask?: boolean
    on?: (...args: any[]) => void
    removeListener?: (...args: any[]) => void
  }
}

// declare module '@mui/material/styles' {
//   interface Theme {
//     status: {
//       danger: string
//     },
//   }
//   interface ThemeOptions {
//     status?: {
//       danger?: string
//     }
//   }
// }
