const CheckoutIcon = ({
    fill = "none",
    // color = "rgb(141,141,141)",
    strokeWidth = "2px",
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
            strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
            {...props}
        >
            <path d="M327.33866666 347.81866666m-40.96 0a40.96 40.96 0 1 0 81.92 0 40.96 40.96 0 1 0-81.92 0Z" fill={fill} strokeWidth={strokeWidth} p-id="17032"></path>
            <path d="M683.17866666 347.81866666m-40.96 0a40.96 40.96 0 1 0 81.92 0 40.96 40.96 0 1 0-81.92 0Z" fill={fill} strokeWidth={strokeWidth} p-id="17033"></path>
            <path d="M505.51466666 545.96266666c-112.128 0-203.776-91.136-203.776-203.776 0-14.336 11.264-25.6 25.6-25.6s25.6 11.264 25.6 25.6C352.93866666 426.66666666 421.54666666 494.76266666 505.51466666 494.76266666s152.576-68.608 152.576-152.576c0-14.336 11.264-25.6 25.6-25.6s25.6 11.264 25.6 25.6c-0.512 112.64-91.648 203.776-203.776 203.776z" fill={fill} strokeWidth={strokeWidth} p-id="17034"></path>
            <path d="M825.51466666 919.72266666H188.58666666c-45.568 0-82.432-36.864-82.432-82.432v-2.048l45.568-635.904c0.512-45.056 37.376-81.408 82.432-81.408H779.94666666c45.056 0 81.92 36.352 82.432 81.408L907.94666666 836.26666666v1.024c0 45.056-36.864 82.432-82.432 82.432z m-667.648-81.92c0.512 16.896 14.336 30.208 31.232 30.208H826.02666666c16.896 0 30.72-13.824 31.232-30.208l-46.08-636.416v-1.024c0-17.408-13.824-31.232-31.232-31.232H234.15466666c-17.408 0-31.232 13.824-31.232 31.232v2.048l-45.056 635.392z" fill={fill} strokeWidth={strokeWidth} p-id="17035"></path>

        </svg>
    );
};


export default CheckoutIcon
