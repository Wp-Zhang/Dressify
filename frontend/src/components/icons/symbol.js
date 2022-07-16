const Minus = ({
    fill = "#000000",
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
            viewBox="0 0 1025 1024"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            fill={fill} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
            {...props}
        >
            <path d="M980.8 555.2H43.2C17.6 555.2 0 537.6 0 512s17.6-43.2 43.2-43.2h939.2c25.6 0 43.2 17.6 43.2 43.2-1.6 25.6-19.2 43.2-44.8 43.2z" p-id="3849"></path>
        </svg>
    );
};

const Plus = ({
    fill = "#000000",
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
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            fill={fill} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
            {...props}
        >
            <path d="M976.074883 468.068643H552.736349V43.132605c0-25.560062-17.572543-43.132605-43.132605-43.132605s-43.132605 17.572543-43.132605 43.132605v426.533542H43.132605C17.572543 468.068643 0 485.641186 0 511.201248s17.572543 43.132605 43.132605 43.132605h424.936038v426.533542c0 25.560062 17.572543 43.132605 43.132605 43.132605s43.132605-17.572543 43.132605-43.132605V552.736349h424.936038c25.560062 0 43.132605-17.572543 43.132605-43.132605-3.195008-23.962559-20.767551-41.535101-46.327613-41.535101z" p-id="6879"></path>
        </svg>
    );

};

export { Minus, Plus }