import * as React from 'react'
import { Ref, SVGProps, forwardRef, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={24}
    ref={ref}
    viewBox={'0 0 24 24'}
    width={24}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <defs>
      <clipPath id={'a'}>
        <path d={'M0 0h24v24H0z'} fill={'currentColor'} fillOpacity={0} />
      </clipPath>
    </defs>
    <path d={'M0 0h24v24H0z'} fill={'none'} />
    <g clipPath={'url(#a)'}>
      <path
        d={
          'M13.83 19c-.15 0-.3-.04-.44-.1-.13-.07-.25-.16-.34-.28l-4.83-5.99c-.15-.18-.23-.41-.23-.64 0-.23.08-.46.23-.63l5-6.01c.17-.2.41-.33.67-.35.27-.03.53.06.74.22a1.035 1.035 0 0 1 .13 1.42L10.29 12l4.32 5.36c.12.14.2.32.22.51.02.19-.01.38-.09.55-.08.18-.21.32-.37.42-.17.1-.35.16-.54.16Z'
        }
        fill={'currentColor'}
      />
    </g>
  </svg>
)

export const ArrowIosBack = memo(forwardRef(SvgComponent))
