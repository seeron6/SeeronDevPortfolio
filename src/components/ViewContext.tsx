import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import {
  BookOpen, Briefcase, Layers, Wrench, Heart, Camera, Mail,
  type LucideIcon,
} from 'lucide-react';

export type View =
  | 'overview'
  | 'experience'
  | 'projects'
  | 'skills'
  | 'favourites'
  | 'gallery'
  | 'contact';

export const VIEWS: { id: View; label: string; Icon: LucideIcon }[] = [
  { id: 'overview',   label: 'Cover',      Icon: BookOpen  },
  { id: 'experience', label: 'Experience', Icon: Briefcase },
  { id: 'projects',   label: 'Projects',   Icon: Layers    },
  { id: 'skills',     label: 'Skills',     Icon: Wrench    },
  { id: 'favourites', label: 'Loving',     Icon: Heart     },
  { id: 'gallery',    label: 'Gallery',    Icon: Camera    },
  { id: 'contact',    label: 'Contact',    Icon: Mail      },
];

type Ctx = {
  view: View;
  setView: (v: View) => void;
  back: () => void;
};

const ViewCtx = createContext<Ctx | null>(null);

export function ViewProvider({ children }: { children: ReactNode }) {
  const [view, setViewState] = useState<View>('overview');

  const setView = useCallback((v: View) => {
    setViewState(v);
  }, []);

  const back = useCallback(() => setViewState('overview'), []);

  return (
    <ViewCtx.Provider value={{ view, setView, back }}>{children}</ViewCtx.Provider>
  );
}

export function useView() {
  const v = useContext(ViewCtx);
  if (!v) throw new Error('useView must be inside ViewProvider');
  return v;
}
