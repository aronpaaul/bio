interface LikeButtonProps {
  count: number
  onClick: () => void
}

export function LikeButton({ count, onClick }: LikeButtonProps) {
  return (
    <button type="button" className="likeButton" onClick={onClick}>
      👍 {count}
    </button>
  )
}
