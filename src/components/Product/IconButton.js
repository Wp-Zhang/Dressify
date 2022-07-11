import { styled } from '@nextui-org/react';

export const IconButton = styled('button', {
    // reset button styles
    background: "rgba(255, 255, 255, 0.5)",
    backdropFilter: "blur(5px)",
    border: 'none',
    padding: 0,
    margin: 0,
    // styles
    width: '40px',
    dflex: 'center',
    borderRadius: '$rounded',
    cursor: 'pointer',
    transition: 'opacity 0.25s ease 0s, transform 0.25s ease 0s',
    svg: {
        size: '100%',
        padding: '28%',
        transition: 'transform 0.25s ease 0s, opacity 200ms ease-in-out 50ms',
        boxShadow: '0 5px 20px -5px rgba(0, 0, 0, 0.1)',
    },
    '&:hover': {
        opacity: 0.8
    },
    '&:active': {
        transform: 'scale(0.9)',
        // svg: {
        //     transform: 'translate(24px, -24px)',
        //     opacity: 0
        // }
    }
});
