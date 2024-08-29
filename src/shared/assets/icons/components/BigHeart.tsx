import { Ref, SVGProps, forwardRef, memo } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={24}
    ref={ref}
    width={24}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <g clipPath={'url(#a)'}>
      <path
        d={
          'M12.0004 21C11.8688 21.0007 11.7383 20.9755 11.6165 20.9258C11.4946 20.876 11.3838 20.8027 11.2904 20.71L3.52036 12.93C2.54572 11.9452 1.99902 10.6156 1.99902 9.22999C1.99902 7.84442 2.54572 6.51481 3.52036 5.52999C4.50262 4.5505 5.83319 4.00046 7.22036 4.00046C8.60753 4.00046 9.9381 4.5505 10.9204 5.52999L12.0004 6.60999L13.0804 5.52999C14.0626 4.5505 15.3932 4.00046 16.7804 4.00046C18.1675 4.00046 19.4981 4.5505 20.4804 5.52999C21.455 6.51481 22.0017 7.84442 22.0017 9.22999C22.0017 10.6156 21.455 11.9452 20.4804 12.93L12.7104 20.71C12.6169 20.8027 12.5061 20.876 12.3843 20.9258C12.2624 20.9755 12.132 21.0007 12.0004 21ZM7.22036 5.99999C6.79704 5.99807 6.37754 6.08017 5.98617 6.24152C5.5948 6.40288 5.23933 6.64028 4.94036 6.93999C4.33642 7.54711 3.9974 8.36863 3.9974 9.22499C3.9974 10.0813 4.33642 10.9029 4.94036 11.51L12.0004 18.58L19.0604 11.51C19.6643 10.9029 20.0033 10.0813 20.0033 9.22499C20.0033 8.36863 19.6643 7.54711 19.0604 6.93999C18.444 6.35769 17.6283 6.03328 16.7804 6.03328C15.9325 6.03328 15.1167 6.35769 14.5004 6.93999L12.7104 8.73999C12.6174 8.83371 12.5068 8.90811 12.3849 8.95888C12.2631 9.00965 12.1324 9.03578 12.0004 9.03578C11.8683 9.03578 11.7376 9.00965 11.6158 8.95888C11.4939 8.90811 11.3833 8.83371 11.2904 8.73999L9.50036 6.93999C9.20139 6.64028 8.84592 6.40288 8.45455 6.24152C8.06318 6.08017 7.64368 5.99807 7.22036 5.99999Z'
        }
        fill={'currentColor'}
      />
    </g>
    <defs>
      <clipPath id={'a'}>
        <path d={'M0 0h24v24H0z'} fill={'currentColor'} />
      </clipPath>
    </defs>
  </svg>
)

export const BigHeart = memo(forwardRef(SvgComponent))
