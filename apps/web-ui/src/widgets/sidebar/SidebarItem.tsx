import { ReactElement } from "react";
import style from "./SidebarItem.module.scss";

type SidebarItemProps = {
  title: string;
  icon: ReactElement;
  onClick: () => void;
};

export function SidebarItem(props: SidebarItemProps) {
  return (
    <li className={style.sidebarItem} onClick={props.onClick}>
      <i>{props.icon}</i>
      <h3>{props.title}</h3>
    </li>
  );
}
