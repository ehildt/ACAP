import cn from 'classnames';
import { useEffect, useState } from 'react';
import { FaCircleXmark } from 'react-icons/fa6';

import { Pulse } from '@/effects/animate/Pulse';

import { Button } from '@/atomics/button/Button';
import { CSSCustomVariables, PopupProps } from './Popup.modal';
import style from './Popup.module.scss';

// TODO: allow setting icon colors
export function Popup(props: PopupProps) {
  const [isFaded, setIsFaded] = useState(true);

  const cssCustomVariables: CSSCustomVariables = {
    '--time-popup--fadeOut': props.ms ? `${props.ms}ms` : '350ms',
    '--size-popup--width': props.width,
    '--size-popup--height': props.height,
  };

  useEffect(() => {
    if (props.isOpen) setIsFaded(false);
  }, [props.isOpen]);

  return (
    props.isOpen && (
      <div className={cn([style.modalOverlay, { [style.modalOverlayFadeOut]: isFaded }])} style={cssCustomVariables}>
        <div className={style.modal}>
          <div className={style.modalHeader}>
            <h1 className={style.modalHeaderTitle}>{props.title}</h1>
            <div className={style.modalHeaderFarRight}>
              <Pulse to={1.2} ms={750} mode="passive">
                <Button
                  style={{ padding: '0px' }}
                  iconBefore={props.onCloseIcon ?? <FaCircleXmark color="darkviolet" />}
                  onClick={() => {
                    setIsFaded(true);
                    setTimeout(() => props.onClose?.(), props.ms ?? 350);
                  }}
                />
              </Pulse>
            </div>
          </div>
          <div className={style.modalContent}>{props.children}</div>
          <div className={style.modalFooter} />
        </div>
      </div>
    )
  );
}
