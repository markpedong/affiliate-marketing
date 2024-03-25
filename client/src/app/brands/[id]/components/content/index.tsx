'use client'

import { RatingItem, SellerData, TProduct } from '@/api'
import React, { FC } from 'react'
import styles from './styles.module.scss'
import { FaStar, FaStore } from 'react-icons/fa'
import { RiUserFollowFill, RiUserUnfollowFill } from 'react-icons/ri'
import dayjs from 'dayjs'
import Image from 'next/image'
import { Tabs, TabsProps } from 'antd'

type Props = { data: SellerData; products: TProduct[]; reviews: RatingItem[] }
const Content: FC<Props> = ({ data, products, reviews }) => {
	console.log(data, products, reviews)

	const items: TabsProps['items'] = [
		{
			key: '1',
			label: 'Tab 1',
			children: 'Content of Tab Pane 1'
		},
		{
			key: '2',
			label: 'Tab 2',
			children: 'Content of Tab Pane 2'
		},
		{
			key: '3',
			label: 'Tab 3',
			children: 'Content of Tab Pane 3'
		}
	]

	return (
		<div className={styles.mainWrapper}>
			<div className={styles.headerWrapper}>
				<div className={styles.nameContainer}>
					<Image src={data?.avatar} alt="avatar" height={100} width={100} />
					<div className={styles.name}>
						<span>{data?.seller_name}</span>
					</div>
				</div>
				<div className={styles.headerContainer}>
					<div className={styles.header}>
						<FaStore />
						<span>Products:</span>
						<span>{data?.products}</span>
					</div>
					<div className={styles.header}>
						<RiUserUnfollowFill />
						<span>Followers:</span>
						<span>{data?.followers}</span>
					</div>
					<div className={styles.header}>
						<RiUserFollowFill />
						<span>Joined:</span>
						<span>
							{dayjs(+data?.created_at).get('month') === 0
								? `${dayjs(+data?.created_at).get('days')} days ago`
								: `${dayjs(+data?.created_at).get('month')} months ago`}{' '}
						</span>
					</div>
				</div>
				<div className={styles.headerContainer}>
					<div className={styles.header}>
						<FaStar />
						<span>Rating:</span>
						<span>{data?.rating}</span>
					</div>
					<div></div>
					<div></div>
				</div>
			</div>
			<div className={styles.mainContainer}>
				<Tabs items={items} />
			</div>
		</div>
	)
}

export default Content
