export const CloseIcon = ({ onClick, className }: { onClick: () => void; className?: string }) => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      style={{ cursor: 'pointer' }}
      className={className}
    >
      <rect y="0" width="3" height="3" fill="#303030" />
      <rect x="3" y="3" width="3" height="3" fill="#303030" />
      <rect x="6" y="6" width="3" height="3" fill="#303030" />
      <rect x="3" y="9" width="3" height="3" fill="#303030" />
      <rect y="12" width="3" height="3" fill="#303030" />
      <rect x="15" y="3" width="3" height="3" transform="rotate(180 15 3)" fill="#303030" />
      <rect x="12" y="6" width="3" height="3" transform="rotate(180 12 6)" fill="#303030" />
      <rect x="9" y="9" width="3" height="3" transform="rotate(180 9 9)" fill="#303030" />
      <rect x="12" y="12" width="3" height="3" transform="rotate(180 12 12)" fill="#303030" />
      <rect x="15" y="15" width="3" height="3" transform="rotate(180 15 15)" fill="#303030" />
    </svg>
  );
};
