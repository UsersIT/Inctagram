import { Ref, SVGProps, forwardRef, memo } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={'24'}
    ref={ref}
    viewBox={'0 0 24 24'}
    width={'24'}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <g clipPath={'url(#clip0_309_6046)'}>
      <path
        d={
          'M21 6.00001H16V4.33001C15.9765 3.68982 15.7002 3.08506 15.2316 2.6483C14.7629 2.21153 14.1402 1.9784 13.5 2.00001H10.5C9.85975 1.9784 9.23706 2.21153 8.76843 2.6483C8.2998 3.08506 8.02346 3.68982 8 4.33001V6.00001H3C2.73478 6.00001 2.48043 6.10536 2.29289 6.2929C2.10536 6.48043 2 6.73479 2 7.00001C2 7.26522 2.10536 7.51958 2.29289 7.70711C2.48043 7.89465 2.73478 8.00001 3 8.00001H4V19C4 19.7957 4.31607 20.5587 4.87868 21.1213C5.44129 21.6839 6.20435 22 7 22H17C17.7956 22 18.5587 21.6839 19.1213 21.1213C19.6839 20.5587 20 19.7957 20 19V8.00001H21C21.2652 8.00001 21.5196 7.89465 21.7071 7.70711C21.8946 7.51958 22 7.26522 22 7.00001C22 6.73479 21.8946 6.48043 21.7071 6.2929C21.5196 6.10536 21.2652 6.00001 21 6.00001ZM10 4.33001C10 4.17001 10.21 4.00001 10.5 4.00001H13.5C13.79 4.00001 14 4.17001 14 4.33001V6.00001H10V4.33001ZM18 19C18 19.2652 17.8946 19.5196 17.7071 19.7071C17.5196 19.8946 17.2652 20 17 20H7C6.73478 20 6.48043 19.8946 6.29289 19.7071C6.10536 19.5196 6 19.2652 6 19V8.00001H18V19Z'
        }
        fill={'white'}
      />
    </g>
    <defs>
      <clipPath id={'clip0_309_6046'}>
        <rect fill={'white'} height={'24'} width={'24'} />
      </clipPath>
    </defs>
  </svg>
)

export const Trash = memo(forwardRef(SvgComponent))
