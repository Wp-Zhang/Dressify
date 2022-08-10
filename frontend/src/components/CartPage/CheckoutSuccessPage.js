import { Button, Modal, Image } from '@nextui-org/react';
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
            <Modal.Header justify='center'>
                <Image src="./logo.png" alt="products logo" width={90} />
            </Modal.Header>
            <Modal.Body css={{ textAlign: "center" }}>
                <Button onClick={() => {
                    navigate("/order")
                }}>
                    Jump to "My Order" page
                </Button>
            </Modal.Body>
        </Modal>
    );
}

export default CheckoutPopover;