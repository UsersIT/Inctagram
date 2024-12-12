import { ComponentProps } from 'react'

import { clsx } from 'clsx'

import s from './Table.module.scss'

const Root = ({ className, ...props }: ComponentProps<'table'>) => {
  return <table className={clsx(s.root, className)} {...props} />
}

const Header = ({ className, ...props }: ComponentProps<'thead'>) => {
  return <thead className={clsx(s.header, className)} {...props} />
}

const Body = ({ className, ...props }: ComponentProps<'tbody'>) => {
  return <tbody className={clsx(s.body, className)} {...props} />
}

const Row = ({ className, ...props }: ComponentProps<'tr'>) => {
  return <tr className={clsx(s.row, className)} {...props} />
}

const Cell = ({ className, ...props }: ComponentProps<'td'>) => {
  return <td className={clsx(s.cell, className)} {...props} />
}

export const Table = {
  Body,
  Cell,
  Header,
  Root,
  Row,
}
