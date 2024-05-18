import style from "./DesktopLayoutHeader.module.scss";
import { useTabMenuImmerStore } from "./DesktopLayoutHeaderMenu.store";

export function DesktopLayoutHeader() {
  return <header className={style.desktopLayoutHeader}></header>;
}
