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
  public: {
    posts: {
      allByUserIdWithPagination: '/v1/public-posts/user/', // + `${userId}/${endCursorpostId}`
      allWithPagination: '/v1/public-posts/all/', // + `${endCursorpostId}`
      postById: '/v1/public-posts/', // + `${postId}`
    },
    user: {
      avatar: '/v1/users/profile/avatar',
      deleteAvatar: `/v1/users/profile/avatar`,
      profile: '/v1/users/profile',
      uploadAvatar: `/v1/users/profile/avatar`,
      userProfileById: '/v1/public-user/profile/', // + `${profileId}`
      usersCount: '/v1/public-user',
    },
  },
  user: {
    avatar: '/api/v1/users/profile/avatar',
    profile: '/api/v1/users/profile',
  },
} as const
