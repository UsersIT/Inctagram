export const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL
export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : process.env.NEXT_PUBLIC_BASE_URL

export const apiEndpoints = {
  auth: {
    checkRecoveryCode: '/v1/auth/check-recovery-code',
    github: '/v1/auth/github/login',
    google: '/v1/auth/google/login',
    login: '/v1/auth/login',
    logout: '/v1/auth/logout',
    me: '/v1/auth/me',
    newPassword: '/v1/auth/new-password',
    passwordRecovery: '/v1/auth/password-recovery',
    registration: '/v1/auth/registration',
    registrationConfirmation: '/v1/auth/registration-confirmation',
    registrationEmailResending: '/v1/auth/registration-email-resending',
    updateTokens: '/v1/auth/update-tokens',
  },
  followingAndFollowers: {
    following: 'v1/users/following',
    userFollowers: (username: string) => `/v1/users/${username}/followers`,
    userFollowing: (username: string) => `/v1/users/${username}/following`,
  },
  posts: {
    image: '/v1/posts/image',
    posts: '/v1/posts',
    postsByUsername: (username: string) => `/v1/posts/${username}`,
  },
  profile: {
    avatar: '/v1/users/profile/avatar',
    profile: '/v1/users/profile',
  },
  public: {
    posts: {
      allByUserIdWithPagination: '/v1/public-posts/user/', // + `${userId}/${endCursorpostId}`
      allWithPagination: '/v1/public-posts/all/', // + `${endCursorpostId}`
      comments: (postId: number) => `/v1/public-posts/${postId}/comments/`,
      postById: (postId: number) => `/v1/public-posts/${postId}`,
    },
    user: {
      userProfileById: '/v1/public-user/profile/', // + `${profileId}`
      users: '/v1/users/',
      usersCount: '/v1/public-user/',
    },
  },
  subscriptions: {
    subscribe: '/v1/subscriptions',
  },
} as const
