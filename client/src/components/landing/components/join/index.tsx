'use client'

import { Col, Flex, Row } from 'antd'
import React, { FC } from 'react'
import styles from './styles.module.scss'
import Image from 'next/image'
import img1 from '@/public/assets/forgotModalCover.png'
import img2 from '@/public/assets/logo.png'
import img3 from '@/public/assets/loginModalCover.png'
import img4 from '@/public/assets/signUpModalCover.png'

const Join: FC = () => {
    return (
        <Row className={styles.joinContainer} justify="center">
            <Col span={0} xl={7}>
                <Flex className={styles.joinImageContainer} wrap="wrap">
                    <Image src={img1} alt="logo1" />
                    <Image src={img2} alt="logo1" />
                    <Image src={img3} alt="logo1" />
                    <Image src={img4} alt="logo1" />
                </Flex>
            </Col>
            <Col span={24} xl={10}>
                <Flex className={styles.middleContainer} justify="center" align="center" vertical>
                    <h1>Join #solitude</h1>
                    <span>FOLLOW US ON INSTAGRAM</span>
                </Flex>
            </Col>
            <Col span={0} xl={7}>
                <Flex className={styles.joinImageContainer} wrap="wrap">
                    <Image src={img1} alt="logo1" />
                    <Image src={img2} alt="logo1" />
                    <Image src={img3} alt="logo1" />
                    <Image src={img4} alt="logo1" />
                </Flex>
            </Col>
        </Row>
    )
}

export default Join
