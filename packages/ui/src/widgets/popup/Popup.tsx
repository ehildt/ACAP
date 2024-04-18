import cn from 'classnames';
import { useEffect, useState } from 'react';
import { FaCircleXmark } from 'react-icons/fa6';

import { Button } from '@/atomics/button/Button';
import { NeonButton } from '@/atomics/neon-button/NeonButton';
import { Pulse } from '@/effects/animate/pulse/Pulse';
import { Line } from '@/layouts/line/Line';
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
              <div className={style.modalHeaderFarRightInfoBar}>{props.infoBar}</div>
              <Pulse to={1.2} ms={750} mode="passive">
                <Button
                  style={{ padding: '0px' }}
                  iconBefore={<FaCircleXmark color="darkviolet" size={'1.4rem'} />}
                  onClick={() => {
                    setIsFaded(true);
                    setTimeout(() => props.onCancel?.(), props.ms ?? 350);
                  }}
                />
              </Pulse>
            </div>
          </div>
          <div className={style.modalContent}>{props.children}</div>
          <div className={style.modalFooter}>
            <Line style={{ marginInline: 'auto', gap: '2rem' }}>
              {props.onClick && (
                <NeonButton
                  neonColor="yellowgreen"
                  text="save"
                  faulty={[2]}
                  onClick={() => {
                    setIsFaded(true);
                    setTimeout(() => {
                      props.onClick?.();
                      props.onCancel?.();
                    }, props.ms ?? 350);
                  }}
                />
              )}

              {props.onCancel && (
                <NeonButton
                  text="cancel"
                  faulty={[1, 5]}
                  onClick={() => {
                    setIsFaded(true);
                    setTimeout(() => {
                      props.onCancel?.();
                    }, props.ms ?? 350);
                  }}
                />
              )}
            </Line>
          </div>
        </div>
      </div>
    )
  );
}
