
export default function SvgHairSalon({ color = '#6B7280' }: { color?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 4C2 5.10383 2.89617 6 4 6C5.10383 6 6 5.10383 6 4C6 2.89617 5.10383 2 4 2C2.89617 2 2 2.89617 2 4H2" stroke={color} strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5.41309 5.41341L7.99975 8.00008M13.3331 2.66675L5.41309 10.5867" stroke={color} strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 12C2 13.1038 2.89617 14 4 14C5.10383 14 6 13.1038 6 12C6 10.8962 5.10383 10 4 10C2.89617 10 2 10.8962 2 12H2" stroke={color} strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9.86621 9.8667L13.3329 13.3334" stroke={color} strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}