export default function AvatarSVG({ imageUrl }) {
    return (
        <svg width='160' height='150' viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <path stroke="#68d391" strokeWidth="0.2" fillRule="evenodd" clipRule="evenodd" d="M15.67 7.06599L14.59 5.72599C14.4166 5.50349 14.3096 5.23661 14.281 4.95599L14.091 3.25799C14.0525 2.91869 13.9001 2.60246 13.6588 2.36091C13.4174 2.11936 13.1013 1.96675 12.762 1.92799L11.063 1.73799C10.763 1.70799 10.503 1.57899 10.283 1.40899L8.94499 0.329995C8.6784 0.116923 8.34727 0.000854492 8.00599 0.000854492C7.66472 0.000854492 7.33359 0.116923 7.06699 0.329995L5.72699 1.40999C5.5046 1.5837 5.23771 1.69115 4.95699 1.71999L3.259 1.90999C2.559 1.98999 2.00899 2.54 1.92899 3.239L1.73899 4.93799C1.70899 5.238 1.57999 5.49799 1.40999 5.71799L0.329995 7.05499C0.116923 7.32159 0.000854492 7.65272 0.000854492 7.99399C0.000854492 8.33527 0.116923 8.6664 0.329995 8.93299L1.40999 10.273C1.57999 10.493 1.68999 10.753 1.71999 11.043L1.90999 12.741C1.98999 13.441 2.54 13.991 3.239 14.071L4.93799 14.261C5.238 14.291 5.49799 14.42 5.71799 14.59L7.05699 15.67C7.607 16.109 8.386 16.109 8.935 15.67L10.275 14.59C10.495 14.42 10.755 14.31 11.045 14.28L12.743 14.09C13.443 14.01 13.993 13.46 14.073 12.761L14.263 11.062C14.293 10.762 14.422 10.502 14.592 10.282L15.672 8.943C15.8851 8.6764 16.0011 8.34527 16.0011 8.00399C16.0011 7.66272 15.8851 7.33159 15.672 7.06499L15.67 7.06599Z" fill="url(#pattern0)" />
            <defs>
                <pattern id="pattern0" patternContentUnits="objectBoundingBox" width={1} height={1}>
                    <use xlinkHref="#image0" transform="translate(0 -0.0448114) scale(0.00389105)" />
                </pattern>
                <image id="image0" width="257" height="400" xlinkHref={imageUrl} />
            </defs>
        </svg>
    )
}
