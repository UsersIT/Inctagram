import React from 'react'
import { usePagination } from 'react-use-pagination'

import { useGetMyPaymentsQuery } from '@/src/features/businessAccountSubscription'
import { useTranslation } from '@/src/shared/hooks'
import { Pagination, Spinner, Table, Typography } from '@/src/shared/ui'

import s from './SettingsMyPaymentsTab.module.scss'

export const SettingsMyPaymentsTab = () => {
  const { data: payments, isLoading } = useGetMyPaymentsQuery()
  const { t } = useTranslation()

  const { currentPage, endIndex, pageSize, setPage, setPageSize, startIndex, totalPages } =
    usePagination({
      initialPageSize: 10,
      totalItems: payments?.length || 0,
    })

  const getSubscriptionType = (type: string) => {
    switch (type) {
      case 'MONTHLY':
        return '1 month'
      case 'WEEKLY':
        return '7 days'
      case 'DAY':
        return '1 day'
      default:
        return type
    }
  }

  const getPaymentType = (type: string) => {
    switch (type) {
      case 'STRIPE':
        return 'Stripe'
      case 'PAYPAL':
        return 'PayPal'
      default:
        return type
    }
  }

  return (
    <div className={s.wrapper}>
      <div className={s.tableWrapper}>
        <Table.Root className={s.table}>
          <Table.Header>
            <Table.Row>
              <Table.Cell>{t.pages.myPayments.dataOfPayment}</Table.Cell>
              <Table.Cell>{t.pages.myPayments.endDateOfSubscription}</Table.Cell>
              <Table.Cell>{t.pages.myPayments.price}</Table.Cell>
              <Table.Cell>{t.pages.myPayments.subscriptionType}</Table.Cell>
              <Table.Cell>{t.pages.myPayments.paymentType}</Table.Cell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {isLoading && (
              <Table.Row>
                <Table.Cell className={s.utilityCell} colSpan={5}>
                  <div className={s.utility}>
                    <Spinner />
                  </div>
                </Table.Cell>
              </Table.Row>
            )}
            {!isLoading && !payments && (
              <Table.Row>
                <Table.Cell className={s.utilityCell} colSpan={5}>
                  <div className={s.utility}>
                    <Typography>{t.pages.myPayments.noPayments}</Typography>
                  </div>
                </Table.Cell>
              </Table.Row>
            )}
            {!isLoading &&
              payments &&
              payments.length > 0 &&
              payments.slice(startIndex, endIndex).map((payment, index) => (
                <Table.Row key={index}>
                  <Table.Cell>
                    {new Date(payment.dateOfPayment).toLocaleDateString('ru-RU')}
                  </Table.Cell>
                  <Table.Cell>
                    {new Date(payment.endDateOfSubscription).toLocaleDateString('ru-RU')}
                  </Table.Cell>
                  <Table.Cell>${payment.price}</Table.Cell>
                  <Table.Cell>{getSubscriptionType(payment.subscriptionType)}</Table.Cell>
                  <Table.Cell>{getPaymentType(payment.paymentType)}</Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table.Root>
      </div>
      <Pagination
        currentPage={currentPage}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        pageSize={pageSize}
        pageSizeOptions={[5, 10, 20]}
        totalPages={totalPages}
      />
    </div>
  )
}
