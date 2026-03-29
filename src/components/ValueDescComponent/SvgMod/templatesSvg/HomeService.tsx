export default function SvgHomeService({ color = '#6B7280' }: { color?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2.66667L3.33333 6.66667V12.6667C3.33333 13.4025 3.93078 14 4.66667 14H11.3333C12.0692 14 12.6667 13.4025 12.6667 12.6667V6.66667L8 2.66667Z" stroke={color} strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 14V9.33333C6 8.96538 6.29872 8.66667 6.66667 8.66667H9.33333C9.70128 8.66667 10 8.96538 10 9.33333V14" stroke={color} strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11.3333 6.66667L13.3333 4.66667" stroke={color} strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12.6667 5.33333L14.6667 3.33333" stroke={color} strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}
