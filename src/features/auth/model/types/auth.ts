export type RegisterInput = {
  baseUrl?: string
  email: string
  password: string
  userName: string
}

export type RegistrationEmailResendingInput = {
  baseUrl?: string
  email: string
}

export type RecoveryCodeCheckRequest = {
  recoveryCode: string
}

export type NewPasswordRequest = {
  newPassword: string
  recoveryCode: string
}

export type LoginRequest = {
  email: string
  password: string
}

export type PasswordRecoveryRequest = {
  // baseUrl: string
  email: string
  recaptcha: null | string
}

export type LoginResponse = {
  accessToken: string
}

export type LoginByGoogleRequest = {
  code: string
}

export type LoginByGoogleResponse = {
  accessToken: string
  email: string
}

export type MeResponse = {
  email: string
  isBlocked: boolean
  userId: number
  userName: string
}
