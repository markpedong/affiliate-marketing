'use client'

import { Flex, Menu, Space } from 'antd'
import { MenuProps } from 'antd/lib'
import { FC, useEffect } from 'react'
import styles from './styles.module.scss'
import Link from 'next/link'
import { jost } from '@/app/page'

const MenuItem: FC<{ url: string }> = ({ url }) => (
    <Link
        href={`/${url}`}
        className={jost.className}
        style={{ letterSpacing: '0.1rem', textTransform: 'uppercase', color: 'black' }}>
        {url.toUpperCase()}
    </Link>
)
const items: MenuProps['items'] = [
    {
        label: <MenuItem url="products" />,
        key: 'products',
    },
    {
        label: <MenuItem url="brands" />,
        key: 'brands',
    },
    {
        label: <MenuItem url="deals" />,
        key: 'deals',
    },
    {
        label: <MenuItem url="services" />,
        key: 'services',
    },
]

const Footer: FC = () => {
    return (
        <div className={styles.footerWrapper}>
            <Flex justify="center" align="center" vertical gap={5}>
                <Menu mode="horizontal" items={items} disabledOverflow />
                <Space size={30} className={styles.socialMediaContainer}>
                    <span>FACEBOOK</span>
                    <span>INSTAGRAM</span>
                    <span>SNAPCHAT</span>
                </Space>
            </Flex>
        </div>
    )
}

export default Footer
