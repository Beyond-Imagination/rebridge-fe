import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg'

export function KaKaoLoginIcon() {
    return (
        <Svg width={50} height={50} viewBox="0 0 40 40" fill="none">
            <Rect width="40" height="40" rx="20" fill="#FEE500" />
            <Path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M20.0001 10.6666C14.4769 10.6666 10 14.1255 10 18.3914C10 21.0445 11.7316 23.3833 14.3684 24.7744L13.2589 28.8272C13.1609 29.1854 13.5705 29.4708 13.885 29.2633L18.7482 26.0536C19.1586 26.0932 19.5757 26.1163 20.0001 26.1163C25.5228 26.1163 30 22.6576 30 18.3914C30 14.1255 25.5228 10.6666 20.0001 10.6666Z"
                fill="black"
            />
        </Svg>
    )
}

export function GoogleLoginIcon() {
    return (
        <Svg width={50} height={50} viewBox="0 0 40 40" fill="none">
            <Rect x="0.25" y="0.25" width="39.5" height="39.5" rx="19.75" fill="white" />
            <Rect x="0.25" y="0.25" width="39.5" height="39.5" rx="19.75" stroke="#C6C6CF" stroke-width="0.5" />
            <Rect width="24" height="24" transform="translate(8 8)" fill="white" />
            <Path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M31.04 20.2614C31.04 19.4459 30.9668 18.6618 30.8309 17.9091H20V22.3575H26.1891C25.9225 23.795 25.1123 25.013 23.8943 25.8284V28.7139H27.6109C29.7855 26.7118 31.04 23.7637 31.04 20.2614Z"
                fill="#4285F4"
            />
            <Path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M19.9999 31.4998C23.1049 31.4998 25.7081 30.47 27.6108 28.7137L23.8942 25.8282C22.8644 26.5182 21.5472 26.9259 19.9999 26.9259C17.0047 26.9259 14.4694 24.903 13.5651 22.1848H9.72308V25.1644C11.6154 28.9228 15.5044 31.4998 19.9999 31.4998Z"
                fill="#34A853"
            />
            <Path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.5652 22.1851C13.3352 21.4951 13.2045 20.758 13.2045 20.0001C13.2045 19.2421 13.3352 18.5051 13.5652 17.8151V14.8355H9.72318C8.94432 16.388 8.5 18.1444 8.5 20.0001C8.5 21.8557 8.94432 23.6121 9.72318 25.1646L13.5652 22.1851Z"
                fill="#FBBC05"
            />
            <Path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M19.9999 13.0739C21.6883 13.0739 23.2042 13.6541 24.396 14.7936L27.6944 11.4952C25.7029 9.63955 23.0997 8.5 19.9999 8.5C15.5044 8.5 11.6154 11.077 9.72308 14.8355L13.5651 17.815C14.4694 15.0968 17.0047 13.0739 19.9999 13.0739Z"
                fill="#EA4335"
            />
        </Svg>
    )
}

export function NaverLoginIcon() {
    return (
        <Svg width={50} height={50} viewBox="0 0 40 40" fill="none">
            <Rect width="40" height="40" rx="20" fill="#03C75A" />
            <G clip-path="url(#clip0_59_316)">
                <Path d="M22.8491 20.5627L16.9169 12H12V28H17.1509V19.436L23.0831 28H28V12H22.8491V20.5627Z" fill="white" />
            </G>
            <Defs>
                <ClipPath id="clip0_59_316">
                    <Rect width="16" height="16" fill="white" transform="translate(12 12)" />
                </ClipPath>
            </Defs>
        </Svg>
    )
}
