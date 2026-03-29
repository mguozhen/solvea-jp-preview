
export default function SvgRealEstate({ color = '#6B7280' }: { color?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 14V8.66667C10 8.29872 9.70128 8 9.33333 8H6.66667C6.29872 8 6 8.29872 6 8.66667V14" stroke={color} strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 6.66666C1.99991 6.27408 2.17283 5.90141 2.47267 5.64799L7.13933 1.64799C7.63626 1.22801 8.36374 1.22801 8.86067 1.64799L13.5273 5.64799C13.8272 5.90141 14.0001 6.27408 14 6.66666V12.6667C14 13.4025 13.4026 14 12.6667 14H3.33333C2.59745 14 2 13.4025 2 12.6667V6.66666" stroke={color} strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
        </svg>)
}