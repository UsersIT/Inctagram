import { Google } from '@/src/shared/assets/icons'
import { Button } from '@/src/shared/ui'

import { useGoogleAuth } from '../../model/services/useGoogleAuth'

export const GoogleAuthButton = () => {
  const googleAuth = useGoogleAuth()

  return (
    <Button onClick={() => googleAuth()} variant={'text'}>
      <Google height={36} viewBox={'0 0 24 24'} width={36} />
    </Button>
  )
}
