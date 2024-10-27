/* eslint-disable import/extensions */
import { useEffect } from 'react'

import { ArrowIosBack, ArrowIosForwardOutline } from '@/src/shared/assets/icons'
import clsx from 'clsx'
import Image from 'next/image'
import SwiperCore from 'swiper'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import s from './Carousel.module.scss'

export type Props = {
  buttonsClassName?: string
  imagesUrl?: { url: string }[]
  onNextClick?: (index: number) => void
  onPrevClick?: (index: number) => void
} & Omit<SwiperProps, 'modules' | 'navigation' | 'pagination' | 'slidesPerView' | 'spaceBetween'>

export const Carousel = ({
  buttonsClassName,
  className,
  imagesUrl = [],
  onNextClick,
  onPrevClick,
  ...props
}: Props) => {
  useEffect(() => {
    const swiperEl = document.querySelector('.swiper-container') as HTMLElement & {
      swiper: SwiperCore
    }

    if (swiperEl?.swiper) {
      const swiperInstance = swiperEl.swiper

      swiperInstance.on('slideChange', () => {
        if (swiperInstance.activeIndex > swiperInstance.previousIndex && onNextClick) {
          onNextClick(swiperInstance.activeIndex)
        } else if (swiperInstance.activeIndex < swiperInstance.previousIndex && onPrevClick) {
          onPrevClick(swiperInstance.activeIndex)
        }
      })
    }
  }, [onNextClick, onPrevClick])

  if (imagesUrl.length === 0) {
    return null
  }

  return (
    <Swiper
      className={clsx(s['post-single-slider'], className)}
      modules={[Navigation, Pagination]}
      navigation={{
        nextEl: imagesUrl.length > 1 ? '.swiper-button-next' : null,
        prevEl: imagesUrl.length > 1 ? '.swiper-button-prev' : null,
      }}
      pagination={{ clickable: imagesUrl.length > 1 }}
      slidesPerView={1}
      spaceBetween={0}
      {...props}
    >
      {imagesUrl.map((image, index) => (
        <SwiperSlide className={s['swiper-slide']} key={image.url}>
          <Image
            alt={`Slide ${index}`}
            className={s.image}
            fill
            priority
            sizes={'70vw'}
            src={image.url}
          />
        </SwiperSlide>
      ))}
      {imagesUrl.length > 1 && (
        <>
          <div
            className={clsx('swiper-button-next', s['custom-button'], buttonsClassName)}
            onClick={e => e.stopPropagation()}
            role={'button'}
          >
            <ArrowIosForwardOutline />
          </div>
          <div
            className={clsx('swiper-button-prev', s['custom-button'], buttonsClassName)}
            onClick={e => e.stopPropagation()}
            role={'button'}
          >
            <ArrowIosBack />
          </div>
        </>
      )}
    </Swiper>
  )
}
