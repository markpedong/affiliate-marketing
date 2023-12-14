import { Inter } from 'next/font/google'
import React from 'react'

import StyledComponentsRegistry from '@/lib/antdRegistry'

import { ReduxProvider } from '@/redux/provider'
import '@/styles/global.scss'
import theme from '@/theme/theme'
import { ConfigProvider } from 'antd'
import enUS from 'antd/lib/locale/en_US'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'SOLITUDE',
    description: 'E-Commerce projet that is being written in React and GO',
}

const RootLayout = ({ children }: React.PropsWithChildren) => (
    <html lang="en">
        <body className={inter.className}>
            <ReduxProvider>
                <StyledComponentsRegistry>
                    <ConfigProvider theme={theme} locale={enUS}>
                        {children}
                    </ConfigProvider>
                </StyledComponentsRegistry>
            </ReduxProvider>
        </body>
    </html>
)

export default RootLayout
