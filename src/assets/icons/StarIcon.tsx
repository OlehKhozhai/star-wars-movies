import { FC } from "react";

type StarIconProps = {
  fill?: string;
  className?: string;
};

export const StarIcon: FC<StarIconProps> = ({ fill = "grey", className = "" }) => (
  <svg className={className} height="25" width="23" fill={fill}>
    <polygon
      points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78"
      style={{ fillRule: "nonzero" }}
    />
  </svg>
);
