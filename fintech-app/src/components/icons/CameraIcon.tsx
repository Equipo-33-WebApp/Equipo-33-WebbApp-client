import type React from "react";
import type { IconProps } from ".";

export const CameraIcon: React.FC<IconProps> = ({ classname = "w-5 h-5" }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 64 64" 
      enable-background="new 0 0 64 64" 
      fill="currentColor"
      className={classname}
    >
      <g stroke-width="0"></g>
      <g stroke-linecap="round" stroke-linejoin="round"></g>
      <g> 
        <g> 
          <path fill="currentColor" d="M60,10H49.656l-6.828-6.828C42.078,2.422,41.062,2,40,2H24c-1.062,0-2.078,0.422-2.828,1.172L14.344,10H4 c-2.211,0-4,1.789-4,4v44c0,2.211,1.789,4,4,4h56c2.211,0,4-1.789,4-4V14C64,11.789,62.211,10,60,10z M32,50 c-8.836,0-16-7.164-16-16s7.164-16,16-16s16,7.164,16,16S40.836,50,32,50z"></path> 
          <circle fill="currentColor" cx="32" cy="34" r="8"></circle> 
        </g> 
      </g>
    </svg>
  )
}



