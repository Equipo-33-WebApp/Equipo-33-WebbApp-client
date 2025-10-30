import type React from "react";
import type { IconProps } from ".";

export const DotFilledIcon: React.FC<IconProps> = ({ classname = "w-5 h-5" }) => {
  return (
    <svg 
      viewBox="0 0 15 15" 
      fill="currentColor" 
      xmlns="http://www.w3.org/2000/svg"
      className={classname}
    >
      <path d="M9.875 7.5C9.875 8.81168 8.81168 9.875 7.5 9.875C6.18832 9.875 5.125 8.81168 5.125 7.5C5.125 6.18832 6.18832 5.125 7.5 5.125C8.81168 5.125 9.875 6.18832 9.875 7.5Z" fill="currentColor">
      </path>
    </svg>
  )
}





