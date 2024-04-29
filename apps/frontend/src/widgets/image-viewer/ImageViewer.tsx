import { useEffect, useRef, useState } from 'react';

import { Container } from '@/layouts/container/Container';
import style from './ImageViewer.module.scss';

type ImageViewerProps = {
  base64: string;
  mimeType?: string;
};

export function ImageViewer(props: ImageViewerProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [key, setKey] = useState(0);

  // We force re-rendering due to reacts optimization issue
  // breaking the update whenever props.base64 changes
  // TODO also apply to all the viewers which use base64
  useEffect(() => {
    setKey((val) => val + 1);
  }, [props.base64]);

  useEffect(() => {
    if (ref.current) {
      const target = ref.current;
      const img = new Image();
      img.src = `data:${props.mimeType};base64,${props.base64}`;
      img.onload = () => {
        const ctx = target?.getContext('2d', { willReadFrequently: true });
        target.width = img.naturalWidth;
        target.height = img.naturalHeight;
        ctx?.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, target.width, target.height);
      };
    }
  }, [key]);

  return (
    <Container key={key}>
      <canvas ref={ref} className={style.imageViewer} />
    </Container>
  );
}
