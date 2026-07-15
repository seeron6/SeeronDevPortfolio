import { useEffect, useRef, useState } from 'react';
import { Lock, LogOut, Trash2, Pencil, Star, X, ImagePlus, Plus } from 'lucide-react';
import { getAuthStatus, login, logout } from '../lib/auth';
import { getPosts, createPost, updatePost, deletePost, type Post } from '../lib/posts';
import {
  getGalleryItems,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  type GalleryItem,
} from '../lib/gallery';
import { getProjects, createProject, updateProject, deleteProject, type Project } from '../lib/projects';
import {
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience,
  type Role,
} from '../lib/experience';
import { uploadImageDataUrl } from '../lib/uploadImage';
import ImageCropper from '../components/ImageCropper';
import { formatDate } from '../lib/format';

const todayISO = () => new Date().toISOString().slice(0, 10);

export default function Admin() {
  const [authed, setAuthed] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    getAuthStatus().then(setAuthed);
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-6 pt-10 pb-4 md:pt-16">
      {authed === undefined ? (
        <p className="label py-24 text-center">Loading…</p>
      ) : authed ? (
        <Dashboard onSignOut={() => setAuthed(false)} />
      ) : (
        <LoginForm onSuccess={() => setAuthed(true)} />
      )}
    </div>
  );
}

function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await login(password);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-sm py-20">
      <div className="mb-8 flex flex-col items-center text-center">
        <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-line text-fg-dim">
          <Lock size={18} />
        </span>
        <p className="label mb-2">Admin</p>
        <h1 className="font-display text-fg" style={{ fontSize: '2rem' }}>
          Sign in
        </h1>
      </div>
      <form onSubmit={submit} className="flex flex-col gap-4">
        <input
          className="field"
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoFocus
        />
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button className="btn btn-solid justify-center" disabled={busy} type="submit">
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}

type Tab = 'journal' | 'gallery' | 'projects' | 'experience';

function Dashboard({ onSignOut }: { onSignOut: () => void }) {
  const [tab, setTab] = useState<Tab>('journal');

  async function signOut() {
    await logout();
    onSignOut();
  }

  return (
    <div className="py-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
          {(['journal', 'gallery', 'projects', 'experience'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="nav-link"
              data-active={tab === t}
              style={{ padding: '6px 2px' }}
            >
              {t}
            </button>
          ))}
        </div>
        <button className="btn" onClick={signOut}>
          <LogOut size={15} /> Sign out
        </button>
      </div>

      {tab === 'journal' ? (
        <JournalManager />
      ) : tab === 'gallery' ? (
        <GalleryManager />
      ) : tab === 'projects' ? (
        <ProjectsManager />
      ) : (
        <ExperienceManager />
      )}
    </div>
  );
}

/* ─────────────────────────── Journal ─────────────────────────── */

interface Draft {
  id?: string;
  date: string;
  title: string;
  description: string;
  images: string[];
}

const emptyDraft = (): Draft => ({ date: todayISO(), title: '', description: '', images: [] });

function JournalManager() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [draft, setDraft] = useState<Draft>(emptyDraft());
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [cropFile, setCropFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const refresh = () => getPosts().then(setPosts).catch(() => {});
  useEffect(() => {
    refresh();
  }, []);

  const editing = Boolean(draft.id);

  async function onCropConfirm(dataUrl: string) {
    const file = cropFile;
    setCropFile(null);
    setUploading(true);
    setError('');
    try {
      const url = await uploadImageDataUrl(dataUrl, file?.name);
      setDraft((d) => ({ ...d, images: [...d.images, url] }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed.');
    } finally {
      setUploading(false);
    }
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const input = {
        date: draft.date,
        title: draft.title.trim(),
        description: draft.description.trim(),
        images: draft.images,
      };
      if (draft.id) await updatePost(draft.id, input);
      else await createPost(input);
      setDraft(emptyDraft());
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed.');
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!window.confirm('Delete this entry? This cannot be undone.')) return;
    try {
      await deletePost(id);
      if (draft.id === id) setDraft(emptyDraft());
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed.');
    }
  }

  function edit(post: Post) {
    setDraft({
      id: post.id,
      date: post.date,
      title: post.title,
      description: post.description,
      images: post.images ?? [],
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="mt-10">
      <form onSubmit={save}>
        <h2 className="font-display text-fg" style={{ fontSize: '1.8rem' }}>
          {editing ? 'Edit entry' : 'New entry'}
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-[180px_1fr]">
          <label className="flex flex-col gap-2">
            <span className="label">Date</span>
            <input
              className="field"
              type="date"
              value={draft.date}
              onChange={(e) => setDraft({ ...draft, date: e.target.value })}
              required
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="label">Title</span>
            <input
              className="field"
              type="text"
              placeholder="What happened?"
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              required
            />
          </label>
        </div>

        <label className="mt-4 flex flex-col gap-2">
          <span className="label">Description</span>
          <textarea
            className="field"
            placeholder="Tell the story…"
            value={draft.description}
            onChange={(e) => setDraft({ ...draft, description: e.target.value })}
            rows={5}
          />
        </label>

        <div className="mt-5">
          <span className="label">Images</span>
          <ThumbRow
            images={draft.images}
            onRemove={(url) => setDraft((d) => ({ ...d, images: d.images.filter((u) => u !== url) }))}
            onCover={(url) =>
              setDraft((d) => ({ ...d, images: [url, ...d.images.filter((u) => u !== url)] }))
            }
            onAdd={() => fileRef.current?.click()}
            uploading={uploading}
          />
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) setCropFile(f);
              e.target.value = '';
            }}
          />
          <p className="mt-2 text-xs text-fg-faint">
            First image is the cover. You'll frame each photo before it uploads.
          </p>
        </div>

        {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

        <div className="mt-6 flex gap-3">
          <button className="btn btn-solid" disabled={saving || uploading} type="submit">
            <Plus size={15} /> {saving ? 'Saving…' : editing ? 'Update entry' : 'Publish entry'}
          </button>
          {editing && (
            <button type="button" className="btn" onClick={() => setDraft(emptyDraft())}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="mt-16">
        <h2 className="font-display text-fg" style={{ fontSize: '1.8rem' }}>
          Entries <span className="text-fg-faint">({posts.length})</span>
        </h2>
        <div className="mt-6 flex flex-col">
          {posts.map((post) => (
            <div key={post.id} className="flex items-center gap-4 border-b border-line py-4">
              <Thumb src={post.images?.[0]} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-fg">{post.title}</p>
                <p className="text-xs text-fg-faint">{formatDate(post.date)}</p>
              </div>
              <IconBtn title="Edit" onClick={() => edit(post)}>
                <Pencil size={16} />
              </IconBtn>
              <IconBtn title="Delete" danger onClick={() => remove(post.id)}>
                <Trash2 size={16} />
              </IconBtn>
            </div>
          ))}
          {posts.length === 0 && <p className="py-6 text-sm text-fg-faint">No entries yet.</p>}
        </div>
      </div>

      {cropFile && (
        <ImageCropper
          file={cropFile}
          aspect={3 / 2}
          onCancel={() => setCropFile(null)}
          onConfirm={onCropConfirm}
        />
      )}
    </div>
  );
}

/* ─────────────────────────── Gallery ─────────────────────────── */

interface GalleryDraft {
  id?: string;
  title: string;
  image: string;
}

const emptyGalleryDraft = (): GalleryDraft => ({ title: '', image: '' });

function GalleryManager() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [draft, setDraft] = useState<GalleryDraft>(emptyGalleryDraft());
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [cropFile, setCropFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const refresh = () => getGalleryItems().then(setItems).catch(() => {});
  useEffect(() => {
    refresh();
  }, []);

  const editing = Boolean(draft.id);

  async function onCropConfirm(dataUrl: string) {
    const file = cropFile;
    setCropFile(null);
    setUploading(true);
    setError('');
    try {
      const url = await uploadImageDataUrl(dataUrl, file?.name);
      setDraft((d) => ({ ...d, image: url }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed.');
    } finally {
      setUploading(false);
    }
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.image) {
      setError('Add a photo first.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const input = { title: draft.title.trim(), image: draft.image };
      if (draft.id) await updateGalleryItem(draft.id, input);
      else await createGalleryItem(input);
      setDraft(emptyGalleryDraft());
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed.');
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!window.confirm('Delete this photo?')) return;
    try {
      await deleteGalleryItem(id);
      if (draft.id === id) setDraft(emptyGalleryDraft());
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed.');
    }
  }

  function edit(item: GalleryItem) {
    setDraft({ id: item.id, title: item.title, image: item.image });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="mt-10">
      <form onSubmit={save}>
        <h2 className="font-display text-fg" style={{ fontSize: '1.8rem' }}>
          {editing ? 'Edit photo' : 'Add photo'}
        </h2>

        <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-start">
          <div>
            <span className="label">Photo</span>
            <div className="mt-3">
              {draft.image ? (
                <div className="group relative h-40 w-32 overflow-hidden border border-line">
                  <img src={draft.image} alt="" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      type="button"
                      onClick={() => setDraft((d) => ({ ...d, image: '' }))}
                      className="text-white/80 hover:text-white"
                      title="Remove"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                  className="flex h-40 w-32 flex-col items-center justify-center gap-1 border border-dashed border-line text-fg-faint transition-colors hover:border-fg-faint hover:text-fg-dim"
                >
                  {uploading ? (
                    <span className="text-xs">Uploading…</span>
                  ) : (
                    <>
                      <ImagePlus size={18} />
                      <span className="text-xs">Add</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          <label className="flex flex-1 flex-col gap-2">
            <span className="label">Title</span>
            <input
              className="field"
              type="text"
              placeholder="Caption (optional)"
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            />
          </label>
        </div>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) setCropFile(f);
            e.target.value = '';
          }}
        />

        {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

        <div className="mt-6 flex gap-3">
          <button className="btn btn-solid" disabled={saving || uploading} type="submit">
            <Plus size={15} /> {saving ? 'Saving…' : editing ? 'Update photo' : 'Add to gallery'}
          </button>
          {editing && (
            <button type="button" className="btn" onClick={() => setDraft(emptyGalleryDraft())}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="mt-16">
        <h2 className="font-display text-fg" style={{ fontSize: '1.8rem' }}>
          Photos <span className="text-fg-faint">({items.length})</span>
        </h2>
        <div className="mt-6 flex flex-col">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 border-b border-line py-4">
              <Thumb src={item.image} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-fg">{item.title || <span className="text-fg-faint">Untitled</span>}</p>
              </div>
              <IconBtn title="Edit" onClick={() => edit(item)}>
                <Pencil size={16} />
              </IconBtn>
              <IconBtn title="Delete" danger onClick={() => remove(item.id)}>
                <Trash2 size={16} />
              </IconBtn>
            </div>
          ))}
          {items.length === 0 && <p className="py-6 text-sm text-fg-faint">No photos yet.</p>}
        </div>
      </div>

      {cropFile && (
        <ImageCropper
          file={cropFile}
          aspectOptions={[
            { label: 'Portrait', value: 4 / 5 },
            { label: 'Landscape', value: 3 / 2 },
            { label: 'Square', value: 1 },
          ]}
          onCancel={() => setCropFile(null)}
          onConfirm={onCropConfirm}
        />
      )}
    </div>
  );
}

/* ─────────────────────────── Projects ─────────────────────────── */

interface ProjectDraft {
  id?: string;
  sort_order: number;
  title: string;
  award: string;
  date: string;
  tags: string;
  summary: string;
  highlights: string;
  link: string;
  image: string;
}

const emptyProjectDraft = (): ProjectDraft => ({
  sort_order: 0,
  title: '',
  award: '',
  date: '',
  tags: '',
  summary: '',
  highlights: '',
  link: '',
  image: '',
});

function ProjectsManager() {
  const [items, setItems] = useState<Project[]>([]);
  const [draft, setDraft] = useState<ProjectDraft>(emptyProjectDraft());
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [cropFile, setCropFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const refresh = () => getProjects().then(setItems).catch(() => {});
  useEffect(() => {
    refresh();
  }, []);

  const editing = Boolean(draft.id);

  async function onCropConfirm(dataUrl: string) {
    const file = cropFile;
    setCropFile(null);
    setUploading(true);
    setError('');
    try {
      const url = await uploadImageDataUrl(dataUrl, file?.name);
      setDraft((d) => ({ ...d, image: url }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed.');
    } finally {
      setUploading(false);
    }
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const input = {
        sort_order: Number(draft.sort_order) || 0,
        title: draft.title.trim(),
        award: draft.award.trim(),
        date: draft.date.trim(),
        tags: draft.tags.split(',').map((s) => s.trim()).filter(Boolean),
        image: draft.image,
        summary: draft.summary.trim(),
        highlights: draft.highlights.split('\n').map((s) => s.trim()).filter(Boolean),
        link: draft.link.trim(),
      };
      if (draft.id) await updateProject(draft.id, input);
      else await createProject(input);
      setDraft(emptyProjectDraft());
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed.');
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!window.confirm('Delete this project?')) return;
    try {
      await deleteProject(id);
      if (draft.id === id) setDraft(emptyProjectDraft());
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed.');
    }
  }

  function edit(p: Project) {
    setDraft({
      id: p.id,
      sort_order: p.sort_order ?? 0,
      title: p.title,
      award: p.award,
      date: p.date,
      tags: (p.tags ?? []).join(', '),
      summary: p.summary,
      highlights: (p.highlights ?? []).join('\n'),
      link: p.link ?? '',
      image: p.image,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="mt-10">
      <form onSubmit={save}>
        <h2 className="font-display text-fg" style={{ fontSize: '1.8rem' }}>
          {editing ? 'Edit project' : 'New project'}
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-[110px_1fr]">
          <label className="flex flex-col gap-2">
            <span className="label">Order</span>
            <input
              className="field"
              type="number"
              value={draft.sort_order}
              onChange={(e) => setDraft({ ...draft, sort_order: Number(e.target.value) })}
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="label">Title</span>
            <input
              className="field"
              type="text"
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              required
            />
          </label>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="label">Award / subtitle</span>
            <input
              className="field"
              type="text"
              placeholder="Winner · Cloudinary Track, LA Hacks"
              value={draft.award}
              onChange={(e) => setDraft({ ...draft, award: e.target.value })}
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="label">Date</span>
            <input
              className="field"
              type="text"
              placeholder="Apr 2026"
              value={draft.date}
              onChange={(e) => setDraft({ ...draft, date: e.target.value })}
            />
          </label>
        </div>

        <label className="mt-4 flex flex-col gap-2">
          <span className="label">Summary</span>
          <textarea
            className="field"
            rows={2}
            value={draft.summary}
            onChange={(e) => setDraft({ ...draft, summary: e.target.value })}
          />
        </label>

        <label className="mt-4 flex flex-col gap-2">
          <span className="label">Highlights (one per line)</span>
          <textarea
            className="field"
            rows={4}
            value={draft.highlights}
            onChange={(e) => setDraft({ ...draft, highlights: e.target.value })}
          />
        </label>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="label">Tags (comma-separated)</span>
            <input
              className="field"
              type="text"
              placeholder="React, Node.js, Cloudinary"
              value={draft.tags}
              onChange={(e) => setDraft({ ...draft, tags: e.target.value })}
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="label">Link (optional)</span>
            <input
              className="field"
              type="url"
              placeholder="https://…"
              value={draft.link}
              onChange={(e) => setDraft({ ...draft, link: e.target.value })}
            />
          </label>
        </div>

        <div className="mt-5">
          <span className="label">Cover image</span>
          <div className="mt-3">
            {draft.image ? (
              <div className="group relative h-28 w-44 overflow-hidden border border-line">
                <img src={draft.image} alt="" className="h-full w-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    type="button"
                    onClick={() => setDraft((d) => ({ ...d, image: '' }))}
                    className="text-white/80 hover:text-white"
                    title="Remove"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="flex h-28 w-44 flex-col items-center justify-center gap-1 border border-dashed border-line text-fg-faint transition-colors hover:border-fg-faint hover:text-fg-dim"
              >
                {uploading ? <span className="text-xs">Uploading…</span> : (<><ImagePlus size={18} /><span className="text-xs">Add</span></>)}
              </button>
            )}
          </div>
        </div>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) setCropFile(f);
            e.target.value = '';
          }}
        />

        {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

        <div className="mt-6 flex gap-3">
          <button className="btn btn-solid" disabled={saving || uploading} type="submit">
            <Plus size={15} /> {saving ? 'Saving…' : editing ? 'Update project' : 'Add project'}
          </button>
          {editing && (
            <button type="button" className="btn" onClick={() => setDraft(emptyProjectDraft())}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="mt-16">
        <h2 className="font-display text-fg" style={{ fontSize: '1.8rem' }}>
          Projects <span className="text-fg-faint">({items.length})</span>
        </h2>
        <div className="mt-6 flex flex-col">
          {items.map((p) => (
            <div key={p.id} className="flex items-center gap-4 border-b border-line py-4">
              <Thumb src={p.image} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-fg">{p.title}</p>
                <p className="truncate text-xs text-fg-faint">{p.award}</p>
              </div>
              <IconBtn title="Edit" onClick={() => edit(p)}>
                <Pencil size={16} />
              </IconBtn>
              <IconBtn title="Delete" danger onClick={() => remove(p.id)}>
                <Trash2 size={16} />
              </IconBtn>
            </div>
          ))}
          {items.length === 0 && <p className="py-6 text-sm text-fg-faint">No projects yet.</p>}
        </div>
      </div>

      {cropFile && (
        <ImageCropper file={cropFile} aspect={3 / 2} onCancel={() => setCropFile(null)} onConfirm={onCropConfirm} />
      )}
    </div>
  );
}

/* ─────────────────────────── Experience ─────────────────────────── */

interface RoleDraft {
  id?: string;
  sort_order: number;
  company: string;
  team: string;
  title: string;
  period: string;
  location: string;
  points: string;
}

const emptyRoleDraft = (): RoleDraft => ({
  sort_order: 0,
  company: '',
  team: '',
  title: '',
  period: '',
  location: '',
  points: '',
});

function ExperienceManager() {
  const [items, setItems] = useState<Role[]>([]);
  const [draft, setDraft] = useState<RoleDraft>(emptyRoleDraft());
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const refresh = () => getExperience().then(setItems).catch(() => {});
  useEffect(() => {
    refresh();
  }, []);

  const editing = Boolean(draft.id);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const input = {
        sort_order: Number(draft.sort_order) || 0,
        company: draft.company.trim(),
        team: draft.team.trim(),
        title: draft.title.trim(),
        period: draft.period.trim(),
        location: draft.location.trim(),
        points: draft.points.split('\n').map((s) => s.trim()).filter(Boolean),
      };
      if (draft.id) await updateExperience(draft.id, input);
      else await createExperience(input);
      setDraft(emptyRoleDraft());
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed.');
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!window.confirm('Delete this role?')) return;
    try {
      await deleteExperience(id);
      if (draft.id === id) setDraft(emptyRoleDraft());
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed.');
    }
  }

  function edit(r: Role) {
    setDraft({
      id: r.id,
      sort_order: r.sort_order ?? 0,
      company: r.company,
      team: r.team ?? '',
      title: r.title,
      period: r.period,
      location: r.location,
      points: (r.points ?? []).join('\n'),
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="mt-10">
      <form onSubmit={save}>
        <h2 className="font-display text-fg" style={{ fontSize: '1.8rem' }}>
          {editing ? 'Edit role' : 'New role'}
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-[110px_1fr]">
          <label className="flex flex-col gap-2">
            <span className="label">Order</span>
            <input
              className="field"
              type="number"
              value={draft.sort_order}
              onChange={(e) => setDraft({ ...draft, sort_order: Number(e.target.value) })}
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="label">Company</span>
            <input
              className="field"
              type="text"
              value={draft.company}
              onChange={(e) => setDraft({ ...draft, company: e.target.value })}
              required
            />
          </label>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="label">Title</span>
            <input
              className="field"
              type="text"
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              required
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="label">Team (optional)</span>
            <input
              className="field"
              type="text"
              placeholder="via Brainweber Inc."
              value={draft.team}
              onChange={(e) => setDraft({ ...draft, team: e.target.value })}
            />
          </label>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="label">Period</span>
            <input
              className="field"
              type="text"
              placeholder="Mar 2025 – Present"
              value={draft.period}
              onChange={(e) => setDraft({ ...draft, period: e.target.value })}
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="label">Location</span>
            <input
              className="field"
              type="text"
              placeholder="Remote"
              value={draft.location}
              onChange={(e) => setDraft({ ...draft, location: e.target.value })}
            />
          </label>
        </div>

        <label className="mt-4 flex flex-col gap-2">
          <span className="label">Bullet points (one per line)</span>
          <textarea
            className="field"
            rows={5}
            value={draft.points}
            onChange={(e) => setDraft({ ...draft, points: e.target.value })}
          />
        </label>

        {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

        <div className="mt-6 flex gap-3">
          <button className="btn btn-solid" disabled={saving} type="submit">
            <Plus size={15} /> {saving ? 'Saving…' : editing ? 'Update role' : 'Add role'}
          </button>
          {editing && (
            <button type="button" className="btn" onClick={() => setDraft(emptyRoleDraft())}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="mt-16">
        <h2 className="font-display text-fg" style={{ fontSize: '1.8rem' }}>
          Roles <span className="text-fg-faint">({items.length})</span>
        </h2>
        <div className="mt-6 flex flex-col">
          {items.map((r) => (
            <div key={r.id ?? r.company} className="flex items-center gap-4 border-b border-line py-4">
              <div className="min-w-0 flex-1">
                <p className="truncate text-fg">{r.title}</p>
                <p className="truncate text-xs text-fg-faint">
                  {r.company} · {r.period}
                </p>
              </div>
              <IconBtn title="Edit" onClick={() => edit(r)}>
                <Pencil size={16} />
              </IconBtn>
              <IconBtn title="Delete" danger onClick={() => r.id && remove(r.id)}>
                <Trash2 size={16} />
              </IconBtn>
            </div>
          ))}
          {items.length === 0 && <p className="py-6 text-sm text-fg-faint">No roles yet.</p>}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── shared bits ─────────────────────────── */

function ThumbRow({
  images,
  onRemove,
  onCover,
  onAdd,
  uploading,
}: {
  images: string[];
  onRemove: (url: string) => void;
  onCover: (url: string) => void;
  onAdd: () => void;
  uploading: boolean;
}) {
  return (
    <div className="mt-3 flex flex-wrap gap-3">
      {images.map((url, i) => (
        <div key={url} className="group relative h-24 w-32 overflow-hidden border border-line">
          <img src={url} alt="" className="h-full w-full object-cover" />
          {i === 0 && (
            <span
              className="absolute left-1 top-1 rounded px-1.5 py-0.5 text-[10px] font-medium"
              style={{ background: 'rgba(0,0,0,0.7)', color: 'var(--color-accent)' }}
            >
              COVER
            </span>
          )}
          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
            {i !== 0 && (
              <button type="button" title="Make cover" onClick={() => onCover(url)} className="text-white/80 hover:text-white">
                <Star size={16} />
              </button>
            )}
            <button type="button" title="Remove" onClick={() => onRemove(url)} className="text-white/80 hover:text-white">
              <X size={16} />
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={onAdd}
        disabled={uploading}
        className="flex h-24 w-32 flex-col items-center justify-center gap-1 border border-dashed border-line text-fg-faint transition-colors hover:border-fg-faint hover:text-fg-dim"
      >
        {uploading ? (
          <span className="text-xs">Uploading…</span>
        ) : (
          <>
            <ImagePlus size={18} />
            <span className="text-xs">Add</span>
          </>
        )}
      </button>
    </div>
  );
}

function Thumb({ src }: { src?: string }) {
  return (
    <div className="h-14 w-20 shrink-0 overflow-hidden border border-line-soft bg-surface">
      {src ? <img src={src} alt="" className="h-full w-full object-cover" /> : null}
    </div>
  );
}

function IconBtn({
  children,
  title,
  danger,
  onClick,
}: {
  children: React.ReactNode;
  title: string;
  danger?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`p-2 text-fg-faint transition-colors ${danger ? 'hover:text-red-400' : 'hover:text-fg'}`}
    >
      {children}
    </button>
  );
}
