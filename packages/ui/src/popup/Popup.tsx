import cn from 'classnames';
import { ReactNode, useEffect, useState } from 'react';
import { FaCircleXmark } from 'react-icons/fa6';

import { Scale } from '@/animation/scale/Scale';

import { Button } from '..';
import style from './Popup.module.scss';

type PopupProps = {
  onClick?: () => void;
  onClose?: () => void;
  title?: string;
  children: ReactNode;
};

export function Popup(props: PopupProps) {
  const [isFaded, setIsFaded] = useState(true);

  useEffect(() => {
    setIsFaded(false);
  }, []);

  return (
    <div className={cn([style.modalOverlay, { [style.modalOverlayFadeOut]: isFaded }])}>
      <div className={style.modal}>
        <div className={style.modalHeader}>
          <h1 className={style.modalHeaderTitle}>{props.title}</h1>
          <div className={style.modalHeaderFarRight}>
            <Scale x2={1.25} y2={1.25}>
              <Button
                iconBefore={<FaCircleXmark color="darkviolet" />}
                onClick={() => {
                  setIsFaded(true);
                  setTimeout(() => {
                    props.onClose?.();
                  }, 250);
                }}
                style={{ padding: '0px' }}
              />
            </Scale>
          </div>
        </div>
        <div className={style.modalContent}>{props.children}</div>
        <div className={style.modalFooter} />
      </div>
    </div>
  );
}
