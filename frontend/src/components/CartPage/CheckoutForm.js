import { Button, Row, Spacer, Radio, Input } from '@nextui-org/react';
import { useEffect, useState } from 'react';

import { ApplePayIcon, VisaIcon, PaypalIcon, MasterCardIcon, GooglePayIcon } from '../icons/payment';
import CheckoutIcon from '../icons/checkout';
import AccountDataService from '../../services/account';

import "./CartPage.css";


const CheckoutForm = ({ user, articles, totalPrice, setPopoverVisible }) => {

    const [shipInfo, setShipInfo] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        address2: '',
        city: '',
        state: '',
        country: '',
        postalCode: '',
        payment: '',
        // googleMapLink: 'aaa'
    })

    const [disableCheckout, setDisableCheckout] = useState(true)

    const validateInfo = () => {
        for (var key in shipInfo) {
            if (shipInfo[key] === '') {
                return false
            }
        }
        return true
    }

    const handleChange = (event) => {
        let newInfo = { ...shipInfo }
        newInfo[event.target.name] = event.target.value
        setShipInfo(newInfo)
    }

    const handlePaymentChange = (value) => {
        let newInfo = { ...shipInfo }
        newInfo["payment"] = value
        setShipInfo(newInfo)
    }

    useEffect(() => {
        if (validateInfo()) {
            setDisableCheckout(false)
        } else {
            setDisableCheckout(true)
        }
    }, [shipInfo])

    const checkout = () => {
        console.log("Checking out ...", shipInfo)
        let order = {
            'customer_id': user.id,
            'article_id': articles.map((item) => item.article_id),
            'product_code': articles.map((item) => item.product_code),
            'price': articles.map((item) => item.price),
            'size': articles.map((item) => item.size),
            'num': articles.map((item) => item.num),
            'shipping': 5,
            'total': totalPrice + 5,
            'ship_info': shipInfo
        }
        AccountDataService.addOrder(order)
            .then(response => {
                console.log("New order added")
                setPopoverVisible(true)
            }).catch(e => {
                console.log("Adding order failed:", e)
            })
    }

    return (
        <div css={{ background: "transparent" }}>
            <form>
                <Row css={{}}>
                    <Input
                        bordered
                        size='md'
                        status="default"
                        label="First Name"
                        name="firstName"
                        placeholder=""
                        width='30%'
                        onChange={handleChange}
                    />
                    <Spacer x={0.8} />
                    <Input
                        bordered
                        size='md'
                        status="default"
                        label="Last Name"
                        name="lastName"
                        placeholder=""
                        width='30%'
                        onChange={handleChange}
                    />
                    <Spacer x={1} />
                    <Input
                        bordered
                        size='md'
                        status="default"
                        label="Phone"
                        name="phone"
                        placeholder=""
                        width='40%'
                        onChange={handleChange}
                    />
                </Row>
                <Spacer y={0.5} />
                <Row css={{ justifyContent: "flex-start" }} >
                    <Input
                        bordered
                        size='md'
                        status="default"
                        label="Address"
                        name="address"
                        placeholder="Street Address"
                        initialValue=""
                        width='60%'
                        onChange={handleChange}
                    />
                    <Spacer x={1} />
                    <Input
                        bordered
                        size='md'
                        status="default"
                        label="Address line 2"
                        name="address2"
                        placeholder="Floor, Apt, Unit, .etc"
                        initialValue=""
                        width='40%'
                        onChange={handleChange}
                    />
                </Row>
                <Spacer y={0.5} />
                <Row css={{ justifyContent: "flex-start" }} >
                    <Input
                        bordered
                        size='md'
                        status="default"
                        label="Town/City"
                        name="city"
                        initialValue=""
                        width='25%'
                        onChange={handleChange}
                    />
                    <Spacer x={0.8} />
                    <Input
                        bordered
                        size='md'
                        status="default"
                        label="State"
                        name="state"
                        initialValue=""
                        width='25%'
                        onChange={handleChange}
                    />
                    <Spacer x={0.8} />
                    <Input
                        bordered
                        size='md'
                        status="default"
                        label="Country"
                        name="country"
                        initialValue=""
                        width='25%'
                        onChange={handleChange}
                    />
                    <Spacer x={0.8} />
                    <Input
                        bordered
                        size='md'
                        status="default"
                        label="Postal Code"
                        name="postalCode"
                        width='25%'
                        onChange={handleChange}
                    />
                </Row>
            </form>
            <Spacer y={0.8} />
            <Row justify='center'>
                <Radio.Group size="xs" color="primary" orientation="horizontal" isRequired={true} onChange={handlePaymentChange} >
                    <Radio value="Visa"><VisaIcon size={70} /></Radio>
                    <Radio value="MasterCard"><MasterCardIcon size={70} /></Radio>
                    <Radio value="PayPal"><PaypalIcon size={70} /></Radio>
                    <Radio value="ApplePay"><ApplePayIcon size={70} /></Radio>
                    <Radio value="GooglePay"><GooglePayIcon size={70} /></Radio>
                </Radio.Group>
            </Row>
            <Spacer y={1} />
            <Row justify='center'>
                {
                    disableCheckout ?
                        <Button
                            size="lg"
                            auto
                            color="warning"
                            bordered
                            disabled
                            iconRight={<CheckoutIcon fill="currentColor" strokeWidth='3' size={25} />}
                            onClick={checkout}
                        >
                            Checkout
                        </Button>
                        :
                        <Button
                            size="lg"
                            auto
                            color="warning"
                            shadow
                            iconRight={<CheckoutIcon fill="currentColor" strokeWidth='3' size={25} />}
                            onClick={checkout}
                        >
                            Checkout
                        </Button>
                }

            </Row>
            <Spacer y={2} />
        </div >

    )
}

export default CheckoutForm