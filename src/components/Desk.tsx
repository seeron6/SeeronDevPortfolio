import { ReactNode } from 'react';

/**
 * The scene wrapper. The wooden desk + scroll + quill + inkwell + pencils
 * are all part of the user's `/scroll.png` image now (rendered by
 * <Scroll>) — this component just pass-throughs children.
 */
export default function Desk({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
