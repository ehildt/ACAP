import cn from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { FaCircleXmark } from 'react-icons/fa6';

import { Button } from '@/atomics/button/Button';
import { FlickerContainer } from '@/effects/animate/flicker/FlickerContainer';
import { FlickerText } from '@/effects/animate/flicker/FlickerText';
import { Pulse } from '@/effects/animate/pulse/Pulse';
import { Line } from '@/layouts/line/Line';
import { CSSCustomVariables, PopupProps } from './Popup.modal';
import style from './Popup.module.scss';

/**
 * @param onClose - handler for closing the popup
 * @param onClick - onClick callback; also calls onClose
 * @param onCancel - onCancel callback; also calls onCancel
 */
export function Popup(props: PopupProps) {
  const [isFaded, setIsFaded] = useState(true);

  const cssCustomVariables: CSSCustomVariables = {
    '--time-popup--fadeOut': `${props.ms}ms`,
    '--size-popup--width': props.width,
    '--size-popup--height': props.height,
  };

  useEffect(() => {
    if (props.isOpen) setIsFaded(false);
  }, [props.isOpen]);

  const closeModal = () => {
    setIsFaded(true);
    setTimeout(props.onClose, props.ms);
  };

  const onClickProxy = useCallback(
    (action?: any) => {
      closeModal();
      setTimeout(() => action?.(), props.ms);
    },
    [props.ms],
  );

  return (
    props.isOpen && (
      <div className={cn([style.modalOverlay, { [style.modalOverlayFadeOut]: isFaded }])} style={cssCustomVariables}>
        <div className={style.modal}>
          <div className={style.modalHeader}>
            <h1 className={style.modalHeaderTitle}>{props.title}</h1>
            <div className={style.modalHeaderFarRight}>
              <div className={style.modalHeaderFarRightInfoBar}>{props.infoBar}</div>
              {!props.hideXButton && (
                <Pulse to={1.2} ms={750} mode="passive">
                  <Button
                    style={{ padding: '0px' }}
                    iconBefore={<FaCircleXmark color={props.closeGlyphColer} size={props.closeGlyphSize} />}
                    onClick={() => onClickProxy()}
                  />
                </Pulse>
              )}
            </div>
          </div>
          <div className={style.modalContent} style={props.contentStyle}>
            {props.children}
          </div>
          <div className={style.modalFooter}>
            <Line style={{ marginInline: 'auto', gap: '5rem' }}>
              {props.onClick && (
                <FlickerContainer color="#9ACD32">
                  <button onClick={() => onClickProxy(props.onClick)} style={{ padding: '0.5rem' }}>
                    <FlickerText text="submit" color="#9ACD32" />
                  </button>
                </FlickerContainer>
              )}
              {props.onCancel && (
                <FlickerContainer color="#FF00FF">
                  <button onClick={() => onClickProxy(props.onClick)} style={{ padding: '0.5rem' }}>
                    <FlickerText text="cancel" color="#FF00FF" />
                  </button>
                </FlickerContainer>
              )}
            </Line>
          </div>
        </div>
      </div>
    )
  );
}

Popup.defaultProps = {
  closeGlyphColer: '#FF004F', // Folly Red
  closeGlyphSize: '1.4rem',
  ms: 350,
} as PopupProps;
