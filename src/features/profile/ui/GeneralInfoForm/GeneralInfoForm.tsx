import React, { ComponentProps, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { routes } from '@/src/shared/constants/routes'
import { useTranslation } from '@/src/shared/hooks'
import {
  Button,
  ControlledDatePicker,
  ControlledTextArea,
  ControlledTextField,
} from '@/src/shared/ui'
import { getMinAgeDate } from '@/src/shared/utility'
import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

import s from './GeneralInfoForm.module.scss'

import { useLazyGetProfileQuery, useUpdateProfileMutation } from '../../api/profileApi'
import {
  GeneralInfoFormValues,
  generalInfoValidationSchema,
} from '../../model/schemas/generalInfoValidationSchema'
import { CitySelect } from '../CitySelect/CitySelect'

export const GeneralInfoForm = ({ className }: ComponentProps<'form'>) => {
  const { t } = useTranslation()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [getProfile, { data: profile, isLoading: isProfileLoading }] = useLazyGetProfileQuery()
  const [cityDisplayValue, setCityDisplayValue] = useState('')
  const [updateProfile, { isLoading: isUpdateProfileLoading }] = useUpdateProfileMutation()
  const [isYoungerThan13, setIsYoungerThan13] = useState(false)
  const {
    clearErrors,
    control,
    formState: { isDirty, isValid },
    getValues,
    handleSubmit,
    reset,
    resetField,
    setError,
    setValue,
    trigger,
    watch,
  } = useForm<GeneralInfoFormValues>({
    defaultValues: {
      aboutMe: '',
      city: '',
      dateOfBirth: null,
      firstName: '',
      lastName: '',
      userName: '',
    },
    mode: 'all',
    resolver: zodResolver(generalInfoValidationSchema(t)),
  })

  const onSubmit: SubmitHandler<GeneralInfoFormValues> = data => {
    const trimmedData = {
      ...data,
      aboutMe: data.aboutMe.trim().replace(/\n{2,}/g, '\n\n'),
    }

    updateProfile(trimmedData)
      .unwrap()
      .then(() => {
        toast.success(t.profile.updatedProfile)
        setValue('aboutMe', trimmedData.aboutMe)
        const textArea = document.querySelector('textarea[name="aboutMe"]') as HTMLTextAreaElement

        if (textArea) {
          textArea.value = trimmedData.aboutMe
          textArea.setSelectionRange(0, 0)
        }
        reset(data)
      })
      .catch(err => {
        const errorField = err?.data?.messages[0]?.field
        const credentialsErrorField = errorField as keyof Pick<
          GeneralInfoFormValues,
          'aboutMe' | 'firstName' | 'lastName' | 'userName'
        >
        const messages: Partial<GeneralInfoFormValues> = {
          userName: t.validation.usernameExists,
        }

        if (err?.data && errorField === credentialsErrorField) {
          setError(credentialsErrorField, {
            message: messages[credentialsErrorField] as string,
            type: 'custom',
          })
        } else {
          toast.error(t.errors.somethingWentWrong)
        }
      })
  }

  useEffect(() => {
    getProfile()
      .unwrap()
      .then(res => {
        setValue('userName', searchParams?.get('userName') ?? res.userName ?? '')
        setValue('firstName', searchParams?.get('firstName') ?? res.firstName ?? '')
        setValue('lastName', searchParams?.get('lastName') ?? res.lastName ?? '')
        setValue(
          'dateOfBirth',
          new Date(searchParams?.get('dateOfBirth') || res.dateOfBirth) ?? null
        )
        setValue('city', searchParams?.get('city') ?? res.city ?? '')
        setValue(
          'aboutMe',
          searchParams?.get('aboutMe') ?? res.aboutMe?.trim().replace(/\n{2,}/g, '\n\n') ?? ''
        )
        setCityDisplayValue(res.city ?? '')

        void trigger()
      })
      .catch(res => {
        console.error(res)
        toast.error(t.errors.somethingWentWrong)
      })
  }, [getProfile, setValue, t.errors.somethingWentWrong, trigger])

  const onPrivacyPolicyClick = async (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault()

    const values = getValues()
    const params = new URLSearchParams({
      ...values,
      aboutMe: values.aboutMe.trim().replace(/\n{2,}/g, '\n\n'),
      city: values.city ?? '',
      dateOfBirth: values.dateOfBirth?.toISOString() ?? '',
    })

    await router.replace({ pathname: window.location.pathname, query: params.toString() })

    void router.push({ pathname: routes.PRIVACY_POLICY, query: null })
  }

  useEffect(() => {
    const subscriptionBirth = watch((value, { name }) => {
      if (name === 'dateOfBirth') {
        const dateOfBirth = value.dateOfBirth

        if (dateOfBirth && dateOfBirth < new Date()) {
          setIsYoungerThan13(dateOfBirth > getMinAgeDate(13))
        } else {
          setIsYoungerThan13(false)
        }
      }
    })

    const subscriptionAll = watch(() => {
      if (searchParams?.toString() !== '') {
        void router.replace({ pathname: window.location.pathname, query: null })
      }
    })

    return () => {
      subscriptionBirth.unsubscribe()
      subscriptionAll.unsubscribe()
    }
  }, [watch])

  const dateOfBirth = watch('dateOfBirth')

  return (
    <form className={clsx(s.form, className)} onSubmit={handleSubmit(onSubmit)} tabIndex={-1}>
      <ControlledTextField
        control={control}
        disabled={isProfileLoading || isUpdateProfileLoading}
        isRequired
        label={t.label.username}
        name={'userName'}
      />

      <ControlledTextField
        control={control}
        disabled={isProfileLoading || isUpdateProfileLoading}
        isRequired
        label={t.label.firstName}
        name={'firstName'}
      />

      <ControlledTextField
        control={control}
        disabled={isProfileLoading || isUpdateProfileLoading}
        isRequired
        label={t.label.lastName}
        name={'lastName'}
      />

      <ControlledDatePicker
        control={control}
        disabled={isProfileLoading || isUpdateProfileLoading}
        hasPrivacyPolicyLink={isYoungerThan13}
        label={t.label.dateOfBirth}
        name={'dateOfBirth'}
        onPrivacyPolicyClick={onPrivacyPolicyClick}
        value={
          dateOfBirth instanceof Date && !isNaN(dateOfBirth.getTime())
            ? dateOfBirth.toISOString()
            : undefined
        }
      />

      <CitySelect
        clearErrors={clearErrors}
        control={control}
        disabled={isProfileLoading || isUpdateProfileLoading}
        displayValue={cityDisplayValue}
        name={'city'}
        onClear={() => setCityDisplayValue('')}
        resetField={resetField}
        setError={setError}
      />

      <ControlledTextArea
        control={control}
        disabled={isProfileLoading || isUpdateProfileLoading}
        label={t.label.aboutMe}
        name={'aboutMe'}
      />

      <div className={s.divider} />

      <Button
        className={s.saveChangesButton}
        disabled={isProfileLoading || isUpdateProfileLoading || !isValid || !isDirty}
        isLoading={isUpdateProfileLoading}
        type={'submit'}
      >
        {t.buttons.save}
      </Button>
    </form>
  )
}
