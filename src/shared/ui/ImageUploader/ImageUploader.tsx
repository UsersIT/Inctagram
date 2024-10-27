import React, { useState } from 'react'

import { useTranslation } from '@/src/shared/hooks'
import { clsx } from 'clsx'
import { ZodEffects } from 'zod'

import s from './ImageUploader.module.scss'

import { ImageIcon } from '../../assets/icons'
import { Button } from '../Button/Button'
import { ImageUploadInput } from '../ImageUploadInput/ImageUploadInput'
import { Typography } from '../Typography/Typography'

export type ImageUploaderProps = {
  schema: ZodEffects<any>
  setFile: (file: File) => void
} & React.ComponentProps<'input'>

export const ImageUploader = ({ className, schema, setFile, ...rest }: ImageUploaderProps) => {
  const [error, setError] = useState('')
  const { t } = useTranslation()

  const classes = {
    button: s.button,
    container: clsx(s.container, { [s.error]: error }, className),
    errorMassage: clsx(s.massage, { [s.error]: error }),
    errorWrapper: clsx(s.errorContainer, { [s.error]: error }),
    iconWrapper: s.svgWrapper,
  }

  return (
    <div className={classes.container}>
      {error ? (
        <div className={classes.errorWrapper}>
          <Typography as={'span'} className={classes.errorMassage} variant={'bold-text-14'}>
            {t.errors.errorWord}{' '}
          </Typography>
          <Typography as={'span'} className={classes.errorMassage} variant={'regular-text-16'}>
            {error}
          </Typography>
        </div>
      ) : null}
      <div className={classes.iconWrapper}>
        <ImageIcon />
      </div>
      <ImageUploadInput
        error={setError}
        schema={schema}
        setFile={setFile}
        trigger={
          <Button as={'h3'} className={classes.button} fullWidth>
            {t.buttons.imageUploader}
          </Button>
        }
        {...rest}
      />
    </div>
  )
}
