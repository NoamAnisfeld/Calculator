import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Theme as RadixTheme } from '@radix-ui/themes'
import './index.css'
import '@radix-ui/themes/styles.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RadixTheme>
            <App />
        </RadixTheme>
    </StrictMode>,
)
