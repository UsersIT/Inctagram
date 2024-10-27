import { ComponentProps, FC } from 'react'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@radix-ui/react-dialog'
import { clsx } from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'

import s from './Modal.module.scss'

import { ArrowIosBack, Close } from '../../assets/icons'
import { useTranslation } from '../../hooks'
import { Button } from '../Button/Button'

export type ModalSize = 'lg' | 'md' | 'sm' | 'xlg'

export type ModalProps = {
  onClose?: () => void
  onNextButton?: () => void
  onPreviousButton?: () => void
  open: boolean
  showCloseButton?: boolean
  showNextButton?: boolean
  showPreviousButton?: boolean
  size?: ModalSize
  title?: string
} & ComponentProps<'div'>

const dropIn = {
  exit: {
    opacity: 0,
    y: '100vh',
  },
  hidden: {
    opacity: 0,
    x: '-50%',
    y: '-100vh',
  },
  visible: {
    opacity: 1,
    transition: {
      damping: 25,
      duration: 0.1,
      stiffness: 500,
      type: 'spring',
    },
    x: '-50%',
    y: '-50%',
  },
}

export const Modal: FC<ModalProps> = props => {
  const {
    children,
    className,
    onClose,
    onNextButton,
    onPreviousButton,
    open,
    showCloseButton = false,
    showNextButton = false,
    showPreviousButton = false,
    size = 'md',
    title,
  } = props

  const { t } = useTranslation()

  function handleModalClosed() {
    onClose?.()
  }

  const classNames = {
    closeButton: s.closeButton,
    content: clsx(className, s.content, s[size]),
    contentBox: s.contentBox,
    header: s.header,
    overlay: s.overlay,
    title: s.title,
  }

  return (
    <Dialog onOpenChange={handleModalClosed} open={open}>
      <AnimatePresence>
        {open && (
          <DialogPortal forceMount>
            <DialogOverlay asChild>
              <motion.div
                animate={{ opacity: 1 }}
                className={classNames.overlay}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
              />
            </DialogOverlay>
            <DialogContent asChild className={classNames.content} forceMount>
              <motion.div animate={'visible'} exit={'exit'} initial={'hidden'} variants={dropIn}>
                <header className={classNames.header}>
                  {showPreviousButton && (
                    <Button
                      className={s.previousButton}
                      onClick={onPreviousButton}
                      variant={'text'}
                    >
                      <ArrowIosBack />
                    </Button>
                  )}

                  <DialogTitle asChild>
                    <h2 className={classNames.title}>{title}</h2>
                  </DialogTitle>

                  {showCloseButton && (
                    <DialogClose className={classNames.closeButton}>
                      <Close />
                    </DialogClose>
                  )}
                  {showNextButton && (
                    <Button className={s.nextButton} onClick={onNextButton} variant={'text'}>
                      {t.buttons.next}
                    </Button>
                  )}
                </header>
                <div className={classNames.contentBox}>{children}</div>
              </motion.div>
            </DialogContent>
          </DialogPortal>
        )}
      </AnimatePresence>
    </Dialog>
  )
}
