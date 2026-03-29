
export default function SvgRestaurant({ color = '#6B7280' }: { color?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 1.33325V5.99992C2 6.73325 2.6 7.33325 3.33333 7.33325H6C6.73589 7.33325 7.33333 6.73581 7.33333 5.99992V1.33325M4.66667 1.33325V14.6666M14 9.99992V1.33325C12.1591 1.33325 10.6667 2.82564 10.6667 4.66659V8.66659C10.6667 9.39992 11.2667 9.99992 12 9.99992L2 1.33325M2 1.33325V5.99992" stroke={color} strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}