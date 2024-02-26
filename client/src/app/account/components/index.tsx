'use client'

import { TProduct } from '@/api'
import isAuth from '@/components/isAuth'
import { USER_TYPES } from '@/constants'
import { useAppSelector } from '@/redux/store'
import { Col, Flex, Row, Tabs } from 'antd'
import { Cormorant, Inter, Jost } from 'next/font/google'
import { FC } from 'react'
import AddProduct from './addProduct'
import ProductsAdded from './addedProduct'
import Address from './address'
import Orders from './orders'
import styles from './styles.module.scss'

const inter = Inter({ weight: '400', subsets: ['latin'] })
const jost = Jost({ weight: '400', subsets: ['latin'] })

type Props = {
	products: TProduct[]
}

const Account: FC<Props> = () => {
	const { userData, type, sellerData } = useAppSelector(state => state.userData)
	const { darkMode } = useAppSelector(state => state.boolean)
	const seller = type === USER_TYPES.SELLER

	return (
		<>
			<Flex className={styles.profileHeader} vertical gap={5} justify="center">
				<span className={styles.nameHeader}>Welcome back, {userData?.first_name || sellerData?.seller_name}</span>
				<span className={jost.className}>{userData?.id ? 'Enjoy shopping with ease and happiness.' : 'Sell your products with ease and happiness!'}</span>
			</Flex>
			<div className={styles.tabsContainer}>
				<Tabs
					type="card"
					defaultActiveKey={seller ? 'products' : 'orders'}
					items={[
						{ key: 'orders', label: 'ORDERS', children: <Orders /> },
						{ key: 'products', label: 'ADD PRODUCT', children: <AddProduct /> },
						{ key: 'listed_products', label: 'PRODUCTS ADDED', children: <ProductsAdded /> },
						{ key: 'address', label: 'ADDRESS', children: <Address /> }
					].filter(item => !(item.key === 'products' && !seller) && !(item.key === 'orders' && seller) && !(item.key === 'address' && seller) && !(item.key === 'listed_products' && !seller))}
				/>
			</div>
		</>
	)
}

export default isAuth(Account)
