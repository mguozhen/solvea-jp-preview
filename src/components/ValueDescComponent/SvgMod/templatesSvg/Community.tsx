
export default function SvgCommunity({ color = '#6B7280' }: { color?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10.6672 14.0001V12.6668C10.6672 11.195 9.4723 10.0001 8.00053 10.0001H4.00053C2.52876 10.0001 1.33386 11.195 1.33386 12.6668V14.0001M10.6672 2.08545C11.8433 2.39036 12.6647 3.45176 12.6647 4.66678C12.6647 5.8818 11.8433 6.94321 10.6672 7.24812M14.6672 14.0001V12.6668C14.6663 11.4515 13.8439 10.3906 12.6672 10.0868" stroke={color} strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3.33386 4.66667C3.33386 6.13844 4.52876 7.33333 6.00053 7.33333C7.4723 7.33333 8.6672 6.13844 8.6672 4.66667C8.6672 3.19489 7.4723 2 6.00053 2C4.52876 2 3.33386 3.19489 3.33386 4.66667H3.33386" stroke={color} strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}