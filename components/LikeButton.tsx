import { HandThumbUpIcon as ThumbUpSolid } from "@heroicons/react/24/solid"
import { HandThumbUpIcon as ThumbUpOutline } from "@heroicons/react/24/outline"
import React, { MouseEventHandler } from "react"

interface LikeButtonProps {
  liked: boolean
}

export default function LikeButton({ liked }: LikeButtonProps) {
  const [likedState, setLikedState] = React.useState(liked)

  const handleLikes: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    setLikedState(!likedState)
  }

  return (
    <button onClick={handleLikes} className="btn btn-square btn-sm btn-link">
      {likedState
        ? <ThumbUpSolid className="w-6 h-6" />
        : <ThumbUpOutline className="w-6 h-6" />
      }
    </button>
  )
}