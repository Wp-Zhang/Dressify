import "../../fonts/fonts.css";

const Logo = ({
    size,
    height,
    width,
    className,
    ...props
}) => {
    return (
        <svg
            width={size || width || 1432}
            height={size || height || 597}
            viewBox="0 0 31 32"
            xmlns="http://www.w3.org/2000/svg"
            overflow="hidden"
            className={className}
            {...props}
        >
            <defs>
                <clipPath id="clip0"><rect x="1981" y="1772" width="1432" height="597" /></clipPath>
            </defs>
            <g clip-path="url(#clip0)" transform="translate(-1981 -1772)">
                <text font-family="Lora,Lora_MSFontService,sans-serif" font-weight="400" font-size="284" transform="matrix(1 0 0 1 2152.24 2125)">D<tspan font-size="284" x="213.354" y="0">ressify</tspan></text><rect x="2090.5" y="1816.5" width="1214" height="419" stroke="#000000" strokeWidth="20.625" stroke-miterlimit="8" fill="none" />
            </g>
        </svg>
    );
};

export default Logo