import { Button, Modal, Image, Text, Spacer, Container } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';

function CheckoutPopover({ visible, setVisible }) {
    const navigate = useNavigate();

    return (
        <Modal
            closeButton
            blur
            preventClose
            aria-labelledby="checkoutSuccess"
            open={visible}
            onClose={() => setVisible(false)}
            onOpen={
                () => {
                    console.log("SHOW!!")
                    confetti({
                        zIndex: 10000,
                        spread: 270,
                        particleCount: 200
                    });
                }
            }
        >
            <Modal.Header justify='center' style={{ paddingBottom: 0 }}>
                <Image src="./logo.png" alt="products logo" width={90} />
            </Modal.Header>
            <Modal.Body css={{ textAlign: "center" }}>
                <Text h4 style={{ fontFamily: "Montserrat-SemiBold" }}>
                    Thank you for your order!
                </Text>
                <Spacer y={0.1} />
                <Container display='flex' justify='center'>
                    <Button
                        auto
                        flat
                        color="warning"
                        onClick={() => {
                            navigate("/order")
                        }}
                    >
                        Jump to "My Order"
                    </Button>
                </Container>
                <Spacer y={0.1} />
            </Modal.Body>
        </Modal>
    );
}

export default CheckoutPopover;