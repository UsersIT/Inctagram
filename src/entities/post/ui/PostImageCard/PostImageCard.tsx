import React, { ComponentPropsWithoutRef, forwardRef } from 'react'

import clsx from 'clsx'
import Image from 'next/image'

import s from './PostImageCard.module.scss'

type Props = {
  alt?: null | string
  height?: number
  onOpenModal?: () => void
  src: string
  width?: number
} & ComponentPropsWithoutRef<'div'>

export const PostImageCard = forwardRef<HTMLDivElement, Props>(
  ({ alt, className, height, onOpenModal, src, width, ...rest }, ref) => {
    return (
      <div
        className={clsx(s.image, className)}
        {...rest}
        aria-label={alt || "User's post"}
        onClick={onOpenModal}
        ref={ref}
        role={'button'}
        tabIndex={0}
      >
        <Image
          alt={alt || "User's post"}
          className={s.img}
          height={height}
          priority
          src={src}
          width={width}
        />
      </div>
    )
  }
)

PostImageCard.displayName = 'PostImageCard'
