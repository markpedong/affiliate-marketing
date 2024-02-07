import React from 'react'
import styles from './styles.module.scss'
import classNames from 'classnames'
import { CloseOutlined } from '@ant-design/icons'

const NavBanner = () => {
	return (
		<div className={classNames(styles.navWrapper)}>
			<span>
				Sign up and get 20% off to your first order. <p>Sign Up Now</p>
			</span>
			<CloseOutlined />
		</div>
	)
}

export default NavBanner
