import type { StyleProps } from "src/type/props";

function 소나기({ className, style }: StyleProps) {
  return (
    <svg
      {...{ className, style }}
      width="52"
      height="61"
      viewBox="0 0 52 61"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_b_421_912)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M43.7157 29.8586C43.923 29.8758 44.1327 29.8845 44.3446 29.8845C48.3396 29.8845 51.5782 26.7761 51.5782 22.9417C51.5782 20.5292 50.2962 18.4041 48.3504 17.1598C48.8098 16.0538 49.0625 14.8472 49.0625 13.584C49.0625 8.24919 44.5566 3.92447 38.9984 3.92447C36.746 3.92447 34.6664 4.63465 32.9894 5.83446C30.8994 2.34771 26.9787 0 22.4868 0C16.3865 0 11.3399 4.32979 10.5009 9.96215C10.4602 9.9617 10.4194 9.96147 10.3786 9.96147C4.64665 9.96147 0 14.4213 0 19.9229C0 25.4243 4.64655 29.8842 10.3784 29.8843V29.8844H43.7157V29.8586Z"
          fill="#C2C2C2"
        />
      </g>
      <path
        d="M17.2236 37.5129C17.2236 39.664 15.76 41.4079 13.9546 41.4079C12.1491 41.4079 10.6855 39.664 10.6855 37.5129C10.6855 35.7484 11.9075 33.9667 13.1486 32.3085C13.5493 31.773 14.3599 31.773 14.7606 32.3085C16.0017 33.9667 17.2236 35.7484 17.2236 37.5129Z"
        fill="#BCEAFE"
      />
      <path
        d="M40.6814 37.5129C40.6814 39.664 39.2178 41.4079 37.4124 41.4079C35.6069 41.4079 34.1433 39.664 34.1433 37.5129C34.1433 35.7484 35.3652 33.9667 36.6063 32.3085C37.0071 31.773 37.8176 31.773 38.2184 32.3085C39.4595 33.9667 40.6814 35.7484 40.6814 37.5129Z"
        fill="#BCEAFE"
      />
      <path
        d="M17.2236 52.0419C17.2236 54.1931 15.76 55.937 13.9546 55.937C12.1491 55.937 10.6855 54.1931 10.6855 52.0419C10.6855 50.2774 11.9075 48.4958 13.1486 46.8375C13.5493 46.3021 14.3599 46.3021 14.7606 46.8375C16.0017 48.4958 17.2236 50.2774 17.2236 52.0419Z"
        fill="#9EE2FF"
      />
      <path
        d="M40.6814 52.0419C40.6814 54.1931 39.2178 55.937 37.4124 55.937C35.6069 55.937 34.1433 54.1931 34.1433 52.0419C34.1433 50.2774 35.3652 48.4958 36.6063 46.8375C37.0071 46.3021 37.8176 46.3021 38.2184 46.8375C39.4595 48.4958 40.6814 50.2774 40.6814 52.0419Z"
        fill="#9EE2FF"
      />
      <path
        d="M29.0584 41.8718C29.0584 44.0229 27.5948 45.7668 25.7893 45.7668C23.9839 45.7668 22.5203 44.0229 22.5203 41.8718C22.5203 40.1073 23.7422 38.3256 24.9833 36.6674C25.384 36.1319 26.1946 36.1319 26.5953 36.6674C27.8364 38.3256 29.0584 40.1073 29.0584 41.8718Z"
        fill="#BCEAFE"
      />
      <path
        d="M29.0584 56.4008C29.0584 58.552 27.5948 60.2959 25.7893 60.2959C23.9839 60.2959 22.5203 58.552 22.5203 56.4008C22.5203 54.6363 23.7422 52.8547 24.9833 51.1964C25.384 50.661 26.1946 50.661 26.5953 51.1964C27.8364 52.8547 29.0584 54.6363 29.0584 56.4008Z"
        fill="#9EE2FF"
      />
      <defs>
        <filter
          id="filter0_b_421_912"
          x="-4"
          y="-4"
          width="59.5781"
          height="37.8845"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImage" stdDeviation="2" />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_421_912"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_421_912"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
export { 소나기 };
