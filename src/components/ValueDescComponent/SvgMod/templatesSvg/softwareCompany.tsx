
export default function SvgSoftwareCompany({ color = '#6B7280' }: { color?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2.6661 2H13.3328C14.0687 2 14.6661 2.59745 14.6661 3.33333V10C14.6661 10.7359 14.0687 11.3333 13.3328 11.3333H2.6661C1.93021 11.3333 1.33276 10.7359 1.33276 10V3.33333C1.33276 2.59745 1.93021 2 2.6661 2V2" stroke={color} strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5.33276 13.9999H10.6661M7.99943 11.3333V13.9999" stroke={color} strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}