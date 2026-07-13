import { useCallback, useEffect, useState } from 'react';
import Cropper, { type Area } from 'react-easy-crop';
import { Check, X, ZoomIn } from 'lucide-react';

const MAX_OUTPUT = 1800;
const JPEG_QUALITY = 0.85;

async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Could not read image.'));
    img.src = src;
  });
}

/** Draws the selected crop area (natural pixels) to a canvas, capped in size. */
async function getCroppedDataUrl(imageSrc: string, area: Area): Promise<string> {
  const image = await loadImage(imageSrc);
  const scale = Math.min(1, MAX_OUTPUT / Math.max(area.width, area.height));
  const outW = Math.max(1, Math.round(area.width * scale));
  const outH = Math.max(1, Math.round(area.height * scale));

  const canvas = document.createElement('canvas');
  canvas.width = outW;
  canvas.height = outH;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas not supported.');
  ctx.drawImage(image, area.x, area.y, area.width, area.height, 0, 0, outW, outH);
  return canvas.toDataURL('image/jpeg', JPEG_QUALITY);
}

interface Props {
  file: File;
  /** Target aspect ratio (width / height), e.g. 3/2 or 4/5. */
  aspect: number;
  onCancel: () => void;
  onConfirm: (dataUrl: string) => void;
}

export default function ImageCropper({ file, aspect, onCancel, onConfirm }: Props) {
  const [imageSrc] = useState(() => URL.createObjectURL(file));
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [area, setArea] = useState<Area | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => () => URL.revokeObjectURL(imageSrc), [imageSrc]);

  const onCropComplete = useCallback((_area: Area, pixels: Area) => setArea(pixels), []);

  async function confirm() {
    if (!area) return;
    setBusy(true);
    try {
      const dataUrl = await getCroppedDataUrl(imageSrc, area);
      onConfirm(dataUrl);
    } catch {
      setBusy(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[70] flex flex-col"
      style={{ background: 'rgba(6,6,7,0.96)', backdropFilter: 'blur(4px)' }}
    >
      <div className="flex items-center justify-between px-6 py-4">
        <p className="label">Frame your photo</p>
        <button
          onClick={onCancel}
          aria-label="Cancel"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-fg-dim transition-colors hover:text-fg"
        >
          <X size={17} />
        </button>
      </div>

      {/* Crop area — must be position:relative with a real height for react-easy-crop */}
      <div className="relative mx-auto w-full max-w-3xl flex-1" style={{ minHeight: 0 }}>
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          minZoom={1}
          maxZoom={4}
          restrictPosition
          showGrid
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
      </div>

      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-6 py-5">
        <div className="flex items-center gap-3">
          <ZoomIn size={16} className="text-fg-faint" />
          <input
            type="range"
            min={1}
            max={4}
            step={0.01}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full accent-[var(--color-accent)]"
            aria-label="Zoom"
          />
        </div>
        <p className="text-center text-xs text-fg-faint">
          Drag to reposition · pinch or use the slider to zoom
        </p>
        <div className="flex justify-end gap-3">
          <button type="button" className="btn" onClick={onCancel} disabled={busy}>
            Cancel
          </button>
          <button type="button" className="btn btn-solid" onClick={confirm} disabled={busy}>
            <Check size={15} /> {busy ? 'Processing…' : 'Use photo'}
          </button>
        </div>
      </div>
    </div>
  );
}
