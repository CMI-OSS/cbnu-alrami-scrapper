import { IconProps } from "src/type/props";

function CMIAppLogo({ size }: Omit<IconProps, "stroke">) {
  return (
    <svg
      width={size}
      height="100%"
      viewBox="0 0 30 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.47007 2.47007V6.7864H0V2.32717C0 1.04191 1.04191 0 2.32717 0H27.6722C28.9575 0 29.9994 1.04191 29.9994 2.32717V6.7864H27.5294V2.47007H2.47007ZM0 20.6829V17.8891H2.47007V20.54H12.678C13.6233 20.54 14.4746 21.1118 14.8322 21.9868L14.9997 22.3966L15.1672 21.9868C15.5248 21.1118 16.3762 20.54 17.3214 20.54H27.5294V17.8891H29.9994V20.6829C29.9994 21.9682 28.9575 23.0101 27.6723 23.0101H17.4174L16.6484 24.8915C16.045 26.3678 13.9544 26.3679 13.351 24.8915L12.582 23.0101H2.32717C1.04191 23.0101 0 21.9682 0 20.6829ZM7.81168 13.39C8.53816 13.39 9.12709 12.7718 9.12709 12.0092C9.12709 11.2466 8.53816 10.6284 7.81168 10.6284C7.0852 10.6284 6.49627 11.2466 6.49627 12.0092C6.49627 12.7718 7.0852 13.39 7.81168 13.39ZM16.2939 12.0092C16.2939 12.7718 15.7049 13.39 14.9784 13.39C14.252 13.39 13.663 12.7718 13.663 12.0092C13.663 11.2466 14.252 10.6284 14.9784 10.6284C15.7049 10.6284 16.2939 11.2466 16.2939 12.0092ZM22.1449 13.39C22.8714 13.39 23.4603 12.7718 23.4603 12.0092C23.4603 11.2466 22.8714 10.6284 22.1449 10.6284C21.4184 10.6284 20.8295 11.2466 20.8295 12.0092C20.8295 12.7718 21.4184 13.39 22.1449 13.39Z"
        fill="url(#paint0_linear_5290_125)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_5290_125"
          x1="14.9997"
          y1="0"
          x2="14.9997"
          y2="25.9988"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E13535" />
          <stop offset="1" stopColor="#DF3C93" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export { CMIAppLogo };