export type Avatar = {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}

export type AddAvatarResponse = {
  avatar: Avatar | null
}

export type GetProfileResponse = {
  aboutMe: string
  avatars: Avatar[]
  city: string
  createdAt: string
  dateOfBirth: string
  firstName: string
  id: number
  lastName: string
}