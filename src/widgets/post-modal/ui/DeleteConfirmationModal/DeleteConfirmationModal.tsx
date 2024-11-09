import React from 'react'

import { useTranslation } from '@/src/shared/hooks'
import { Button, Modal, Typography } from '@/src/shared/ui'

import s from '@/src/widgets/post-modal/ui/ConfirmationEditPostModal/ConfirmationEditPostModal.module.scss'

type DeleteConfirmationModalProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const { t } = useTranslation()

  return (
    <Modal onClose={onClose} open={isOpen} showCloseButton title={t.widgets.postModal.deletePost}>
      <article className={s.conteiner}>
        <Typography variant={'regular-text-16'}>{t.widgets.postModal.confirmDelete}</Typography>
      </article>
      <div className={s.btnConteiner}>
        <Button className={s.btn} onClick={onConfirm} variant={'outlined'}>
          {t.buttons.confirmButtonTitle}
        </Button>
        <Button className={s.btn} onClick={onClose}>
          {t.buttons.cancelButtonTitle}
        </Button>
      </div>
    </Modal>
  )
}
