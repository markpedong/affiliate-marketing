import { Jost } from 'next/font/google'
import React from 'react'

import StyledComponentsRegistry from '@/lib/antdRegistry'

import '@/styles/global.scss'
import theme from '@/theme/theme'
import { ConfigProvider } from 'antd'
import enUS from 'antd/lib/locale/en_US'
import ReduxProvider from '@/redux/provider'
import Navigation from '@/app/components/navigation'
import Footer from '@/app/components/footer'

const jost = Jost({ subsets: ['latin'] })

export const metadata = {
    title: 'SOLITUDE',
    description: 'E-Commerce projet that is being written in React and GO',
}

const RootLayout = ({ children }: React.PropsWithChildren) => (
    <html lang="en">
        <body className={jost.className}>
            <ReduxProvider>
                <StyledComponentsRegistry>
                    <ConfigProvider theme={theme} locale={enUS}>
                        <Navigation />
                        {children}
                        <Footer />
                    </ConfigProvider>
                </StyledComponentsRegistry>
            </ReduxProvider>
        </body>
    </html>
)

export default RootLayout
