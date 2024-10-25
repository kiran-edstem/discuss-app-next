'use client'

import { NextUIProvider } from "@nextui-org/react"

interface ProviderProps {
    children: React.ReactNode
}

const Providers = ({ children }: ProviderProps) => {
    return (
        <NextUIProvider>
            {children}
        </NextUIProvider>
    );
}

export default Providers;
