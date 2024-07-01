import { Buffer } from 'buffer';
import { useEffect, useRef, useState } from 'react';

import { Container } from '@/layouts/container/Container';

import style from './ImageViewer.module.scss';

type ImageViewerProps = {
  file?: File;
};

export function ImageViewer({ file }: ImageViewerProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [key, setKey] = useState(0);
  const [buffer, setBuffer] = useState<Buffer>();

  useEffect(() => {
    if (file) {
      file.arrayBuffer().then((ab) => setBuffer(Buffer.from(ab)));
      setKey((val) => val + 1);
    }
  }, [file]);

  useEffect(() => {
    if (ref.current) {
      const target = ref.current;
      const img = new Image();
      img.src = `data:${file?.type};base64,${buffer?.toString('base64')}`;
      img.onload = () => {
        const ctx = target?.getContext('2d', { willReadFrequently: true });
        target.width = img.naturalWidth;
        target.height = img.naturalHeight;
        ctx?.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, target.width, target.height);
      };
    }
  }, [key, buffer]);

  return (
    <Container key={key}>
      <canvas ref={ref} className={style.imageViewer} />
    </Container>
  );
}
