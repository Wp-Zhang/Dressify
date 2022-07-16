const CloseIcon = ({
    fill = "none",
    color = "rgb(141,141,141)",
    strokeWidth = "2",
    filled,
    size,
    height,
    width,
    label,
    className,
    ...props
}) => {
    return (
        <svg
            width={size || width || 18}
            height={size || height || 18}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            fill={fill} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
            {...props}
        >
            <path d="M18 6L6 18M6 6l12 12"></path>
        </svg>
    );
};

export default CloseIcon