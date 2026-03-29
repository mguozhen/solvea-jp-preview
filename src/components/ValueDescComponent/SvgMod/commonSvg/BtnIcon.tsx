
interface BtnIconProps {
    color?: string;
}

export default function BtnIcon({ color = 'white' }: BtnIconProps) {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.66602 4.66675H11.3327V11.3334M4.66602 11.3334L11.3327 4.66675" stroke={color} strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}