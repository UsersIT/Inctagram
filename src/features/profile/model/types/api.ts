import { ImageType } from '../../../posts/model/types/api'

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
  country: string
  createdAt: string
  dateOfBirth: string
  firstName: string
  id: number
  lastName: string
  region: string
  userName: string
}

export type FollowerOrFollowingProfile = Pick<
  GetProfileResponse,
  'avatars' | 'createdAt' | 'id' | 'userName'
> & {
  isFollowedBy: boolean
  isFollowing: boolean
  userId: number
}

export type GetFollowersOrFollowingResponse = {
  items: FollowerOrFollowingProfile[]
  nextCursor: number
  page: number
  pageSize: number
  pagesCount: number
  prevCursor: number
  totalCount: number
}

export type GetFollowersOrFollowingResponseParams = {
  query?: {
    cursor?: number
    pageNumber?: number
    pageSize?: number
    search?: string
  }
  username: string
}

export type GetPublicUserProfileByIdResponse = {
  aboutMe: string
  avatars: ImageType[]
  id: number
  userName: string
}

type GetUsersResponseItems = Omit<GetProfileResponse, 'aboutMe' | 'city' | 'dateOfBirth'>

export type GetUsersResponse = {
  items: GetUsersResponseItems[]
  nextCursor: number
  page: number
  pageSize: number
  pagesCount: number
  prevCursor: number
  totalCount: number
}

export type GetUsersArgsType = {
  cursor: number
  pageNumber?: number
  pageSize?: number
  search?: string
}
export type GetUserResponse = Omit<GetProfileResponse, 'createdAt'> & {
  followersCount: number
  followingCount: number
  isFollowedBy: boolean
  isFollowing: boolean
  publicationsCount: number
}
