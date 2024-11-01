import React, { ComponentPropsWithoutRef, forwardRef } from 'react'

import { ImageIcon } from '@/src/shared/assets/icons'
import clsx from 'clsx'
import Image from 'next/image'

import s from './PostImageCard.module.scss'

type Props = {
  alt?: null | string
  height?: number
  onOpenModal?: () => void
  src: null | string
  width?: number
} & ComponentPropsWithoutRef<'div'>

export const PostImageCard = forwardRef<HTMLDivElement, Props>(
  ({ alt, className, height, onOpenModal, src, width, ...rest }, ref) => {
    const imageSizes = '(max-width: 576px) 100vw, (max-width: 1200px) 50vw, 30vw'

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        onOpenModal?.()
      }
    }

    return (
      <div
        className={clsx(s.image, className)}
        {...rest}
        aria-label={alt || "User's post"}
        onClick={onOpenModal}
        onKeyDown={handleKeyDown}
        ref={ref}
        role={'button'}
        tabIndex={0}
      >
        {src ? (
          <Image
            alt={alt || "User's post"}
            className={s.img}
            height={height}
            priority
            sizes={imageSizes}
            src={src}
            width={width}
          />
        ) : (
          <div className={s.placeholder}>
            <ImageIcon className={s.placeholderIcon} />
          </div>
        )}
      </div>
    )
  }
)

PostImageCard.displayName = 'PostImageCard'
