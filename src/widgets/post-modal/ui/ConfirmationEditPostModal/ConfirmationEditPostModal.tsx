import React from 'react'

import { useTranslation } from '@/src/shared/hooks'
import { Button, Modal, Typography } from '@/src/shared/ui'

import s from './ConfirmationEditPostModal.module.scss'

type ConfirmationModalProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export const ConfirmationEditPostModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const { t } = useTranslation()

  return (
    <Modal onClose={onClose} open={isOpen} showCloseButton title={t.widgets.postModal.confirmClose}>
      <article className={s.conteiner}>
        <Typography className={s.modalText} variant={'regular-text-16'}>
          {t.widgets.postModal.confirmCloseMessage}
        </Typography>
        <div className={s.btnConteiner}>
          <Button className={s.btn} onClick={onConfirm} variant={'outlined'}>
            {t.buttons.confirmButtonTitle}
          </Button>
          <Button className={s.btn} onClick={onClose}>
            {t.buttons.cancelButtonTitle}
          </Button>
        </div>
      </article>
    </Modal>
  )
}
