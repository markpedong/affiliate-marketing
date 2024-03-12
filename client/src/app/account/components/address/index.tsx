import React, { FC, useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'
import { ActionType, ModalForm, ProFormInstance, ProFormSelect, ProFormText } from '@ant-design/pro-components'
import { ADDRESS_TYPE, MODAL_FORM_PROPS, scaleSize, scaleSizeSm } from '@/constants'
import { Popconfirm } from 'antd'
import { motion } from 'framer-motion'
import { useAppSelector } from '@/redux/store'
import { REQUIRED, afterModalformFinish } from '@/constants/helper'
import { InfoItem, addDeliveryInfo, deleteDeliveryInfo, getDeliveryInfo } from '@/api'
import { messageHelper } from '@/constants/antd'
import DeliveryInfo from '@/components/reusable/deliveryInfo'

const Address: FC = () => {
	const { userData } = useAppSelector(s => s.userData)
	const formRef = useRef<ProFormInstance>()
	const actionRef = useRef<ActionType>()
	const [info, setInfo] = useState<InfoItem[]>([])

	const renderSetDefault = (q: InfoItem) => {
		return (
			<Popconfirm title="Default" description="Are you sure to set this as a default address?" onConfirm={() => console.log('default')} okText="Yes" cancelText="No">
				<span className={styles.addressTrigger}>Set as Default</span>
			</Popconfirm>
		)
	}

	const handleDeleteInfo = async (q: InfoItem) => {
		const res = await deleteDeliveryInfo({ user_id: userData?.id, delivery_id: q?.id })
		messageHelper(res)

		const info = await getDeliveryInfo({ user_id: userData?.id })
		setInfo(info?.data)
	}
	
	const renderDeleteInfo = (q: InfoItem) => {
		return (
			<Popconfirm title="Delete" description="Are you sure to delete this address?" onConfirm={() => handleDeleteInfo(q)} okText="Yes" cancelText="No">
				<span className={styles.addressTrigger}>Delete</span>
			</Popconfirm>
		)
	}

	const renderAddEditInfo = (type: string, q?: InfoItem) => {
		const isEdit = type === 'EDIT'
		return (
			<ModalForm
				title={isEdit ? <span>Edit Address</span> : <span className={styles.addModalTitle}>add address</span>}
				trigger={
					isEdit ? (
						<span className={styles.addressTrigger}>Edit</span>
					) : (
						<motion.span className={styles.addBtn} whileTap={scaleSize}>
							New Address
						</motion.span>
					)
				}
				initialValues={isEdit && q}
				grid
				submitter={{
					render: props => (
						<div className={styles.footerBtn}>
							<motion.span whileTap={scaleSize} className={styles.cancelBtn} onClick={() => props?.reset()}>
								Reset
							</motion.span>
							<motion.span whileTap={scaleSize} className={styles.submitBtn} onClick={() => props?.submit()}>
								Submit
							</motion.span>
						</div>
					)
				}}
				onFinish={async params => {
					let res

					if (isEdit) {
						// res = await
					} else {
						res = await addDeliveryInfo({ ...params, user_id: userData?.id })
					}

					const info = await getDeliveryInfo({ user_id: userData?.id })
					setInfo(info?.data)

					return afterModalformFinish(actionRef, res?.message, res?.success, formRef)
				}}>
				<ProFormText colProps={{ span: 12 }} label="First Name" name="first_name" rules={[...REQUIRED]} placeholder="eg: John" />
				<ProFormText colProps={{ span: 12 }} label="Last Name" name="last_name" rules={[...REQUIRED]} placeholder="eg: Smith" />
				<ProFormText colProps={{ span: 12 }} label="Phone Number" name="phone" rules={[...REQUIRED]} placeholder="eg: +639798161248" />
				<ProFormText colProps={{ span: 12 }} label="House" name="house" rules={[...REQUIRED]} placeholder="eg: Blk 65 Lot 20" />
				<ProFormText colProps={{ span: 12 }} label="Street" name="street" rules={[...REQUIRED]} placeholder="eg: Harbor Drive" />
				<ProFormText colProps={{ span: 12 }} label="City" name="city" rules={[...REQUIRED]} placeholder="eg: Manila" />
				<ProFormText colProps={{ span: 12 }} label="Pin Code" name="pin_code" rules={[...REQUIRED]} placeholder="eg: 4684" />
				<ProFormSelect
					colProps={{ span: 12 }}
					label="Address Type"
					name="address_type"
					placeholder="eg: Default Address"
					options={ADDRESS_TYPE?.map(q => ({ ...q, disabled: info?.some(w => w.address_type === q?.value) }))}
				/>
			</ModalForm>
		)
	}

	const fetchInfo = async () => {
		const res = await getDeliveryInfo({ user_id: userData?.id })

		setInfo(res?.data)
	}
	useEffect(() => {
		fetchInfo()
	}, [])
	return (
		<div>
			{renderAddEditInfo('ADD')}
			{info.map(q => (
				<div className={styles.addressContainer} key={q?.id}>
					<DeliveryInfo data={q} />
					<div className={styles.addressOperators}>
						{renderAddEditInfo('EDIT', q)}
						{renderDeleteInfo(q)}
						{renderSetDefault(q)}
					</div>
				</div>
			))}
		</div>
	)
}

export default Address
