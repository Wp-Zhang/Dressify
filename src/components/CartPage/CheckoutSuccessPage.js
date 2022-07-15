import { Button, Modal, Image } from '@nextui-org/react';

function CheckoutPopover({ visible, setVisible }) {

    return (
        <Modal
            closeButton
            blur
            preventClose
            aria-labelledby="checkoutSuccess"
            open={visible}
            onClose={() => setVisible(false)}
        >
            <Modal.Header justify='center'>
                <Image src="./logo.png" alt="products logo" width={90} />
            </Modal.Header>
            <Modal.Body css={{ textAlign: "center" }}>
                <Button onClick={() => setVisible(false)}>
                    Jump to "My Order" page
                </Button>
            </Modal.Body>
        </Modal>
    );
}

export default CheckoutPopover;