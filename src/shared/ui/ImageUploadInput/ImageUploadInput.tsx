import { ChangeEvent, ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import { ZodEffects } from 'zod'

import s from './ImageUploadInput.module.scss'

import { Typography } from '../Typography/Typography'

export type ImageUploadInputProps = {
  error?: (error: string) => void
  schema: ZodEffects<any>
  setFile: (file: File) => void
  trigger: ReactNode
} & ComponentPropsWithoutRef<'input'>

export const ImageUploadInput = forwardRef<ElementRef<'input'>, ImageUploadInputProps>(
  ({ className, error, name, schema, setFile, trigger, ...rest }, ref) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const file = e.target.files[0]
        const validationResult = schema.safeParse(file)

        if (file && validationResult.success) {
          setFile(file)
        } else {
          if (!validationResult.success) {
            const errorMessage = validationResult.error.issues[0].message

            error?.(errorMessage)
          }
        }
      }
    }

    return (
      <Typography as={'label'} className={className} htmlFor={name}>
        {trigger}
        <input
          className={s.inputFile}
          id={name}
          onChange={onChangeHandler}
          ref={ref}
          type={'file'}
          {...rest}
        />
      </Typography>
    )
  }
)

ImageUploadInput.displayName = 'ImageUploadInput'
