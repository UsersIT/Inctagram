type Avatar = {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}
type Parent = {
  avatars: Avatar[]
  id: number
  username: string
}

export type Comment = {
  answerCount: number
  content: string
  createdAt: string
  from: Parent
  id: number
  isLiked: boolean
  likeCount: number
  postId: number
}
