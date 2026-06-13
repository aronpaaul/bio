interface RingButtonProps {
  label: string
  onClick: () => void
}

export function RingButton({ label, onClick }: RingButtonProps) {
  return (
    <button type="button" className="ringButton" onClick={onClick}>
      {label}
    </button>
  )
}
