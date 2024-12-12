import { CSSProperties, JSX, ReactNode, useState } from 'react'

import { ArrowDown } from '@/src/shared/assets/icons'
import { ScrollArea, ScrollBar } from '@/src/shared/ui'
import * as Label from '@radix-ui/react-label'
import * as SelectPrimitive from '@radix-ui/react-select'
import clsx from 'clsx'

import s from './Select.module.scss'

export type Option = {
  disabled?: boolean
  icon?: JSX.Element
  label?: number | string
  value: string
}

export type SelectProps = {
  className?: string
  disabled?: boolean
  isOpen?: boolean
  label?: string
  maxHeight?: number
  name?: string
  onValueChange?: (value: string) => void
  options: Option[]
  placeholder?: ReactNode
  setIsOpen?: (isOpen: boolean) => void
  value?: string
  variant?: 'default' | 'language' | 'pagination'
  width?: CSSProperties['width']
}

export const Select = (props: SelectProps) => {
  const {
    className,
    disabled = false,
    isOpen = false,
    label,
    maxHeight = 158,
    name,
    onValueChange,
    options,
    placeholder,
    setIsOpen,
    value = '',
    variant = 'default',
    width = '100%',
  } = props

  const [open, setOpen] = useState(isOpen)

  const onOpenChangeHandler = () => {
    if (!disabled) {
      setIsOpen ? setIsOpen(!isOpen) : setOpen(!open)
    }
  }
  const classNames = {
    content: clsx(s.content, s[variant], className),
    icon: clsx(s.icon, s[variant]),
    item: clsx(s.item, s[variant]),
    itemContent: clsx(s.itemContent),
    itemLabel: clsx(s.itemLabel, s[variant]),
    label: clsx(s.label),
    trigger: clsx(s.trigger, s[variant], label && s.defaultWithLabel),
    value: clsx(s.value),
  }

  const isPagination = variant === 'pagination'

  return (
    <Label.Root>
      {label && (
        <label className={classNames.label} onClick={onOpenChangeHandler}>
          {label}
        </label>
      )}
      <SelectPrimitive.Root
        {...{
          disabled,
          name,
          onOpenChange: onOpenChangeHandler,
          onValueChange,
          open,
          value,
        }}
      >
        <SelectPrimitive.Trigger className={classNames.trigger} style={{ width }}>
          <SelectPrimitive.Value className={classNames.value} placeholder={placeholder} />
          <SelectPrimitive.Icon className={classNames.icon}>
            <ArrowDown height={isPagination ? 16 : 24} width={isPagination ? 16 : 24} />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            className={classNames.content}
            position={'popper'}
            sideOffset={-1}
          >
            <SelectPrimitive.Viewport asChild>
              <ScrollArea maxHeight={maxHeight}>
                {options.map(option => (
                  <SelectPrimitive.Item
                    className={classNames.item}
                    disabled={option.disabled}
                    key={option.value}
                    value={option.value}
                  >
                    <SelectPrimitive.ItemText asChild>
                      <div className={classNames.itemContent}>
                        {option.icon && <>{option.icon}</>}
                        {option.label && (
                          <span className={classNames.itemLabel}>{option.label}</span>
                        )}
                      </div>
                    </SelectPrimitive.ItemText>
                  </SelectPrimitive.Item>
                ))}
                <ScrollBar orientation={'horizontal'} />
              </ScrollArea>
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    </Label.Root>
  )
}
