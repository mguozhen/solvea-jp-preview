export default function SvgLawFirm({ color = '#6B7280' }: { color?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2.66667V13.3333" stroke={color} strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5.33333 4.66667L8 2.66667L10.6667 4.66667" stroke={color} strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 6.66667C4 6.29872 4.29872 6 4.66667 6H11.3333C11.7013 6 12 6.29872 12 6.66667V12.6667C12 13.4025 11.4026 14 10.6667 14H5.33333C4.59745 14 4 13.4025 4 12.6667V6.66667Z" stroke={color} strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 10H10" stroke={color} strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}
