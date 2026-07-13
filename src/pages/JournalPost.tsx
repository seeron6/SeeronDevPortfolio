import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getPost, type Post } from '../lib/posts';
import { formatDate } from '../lib/format';
import Reveal from '../components/Reveal';

export default function JournalPost() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null | undefined>(undefined);

  useEffect(() => {
    if (!id) return;
    let alive = true;
    getPost(id)
      .then((p) => alive && setPost(p))
      .catch(() => alive && setPost(null));
    return () => {
      alive = false;
    };
  }, [id]);

  if (post === undefined) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="label">Loading…</p>
      </div>
    );
  }

  if (post === null) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="font-display text-4xl text-fg">Entry not found</h1>
        <Link to="/" className="btn mt-8">
          <ArrowLeft size={15} /> Back to journal
        </Link>
      </div>
    );
  }

  const [cover, ...rest] = post.images ?? [];

  return (
    <article className="mx-auto max-w-3xl px-6 pt-6 pb-10">
      <Link to="/" className="link-underline inline-flex items-center gap-2 text-sm" style={{ letterSpacing: '0.12em' }}>
        <ArrowLeft size={15} /> Journal
      </Link>

      <Reveal>
        <header className="mt-10">
          <p className="label mb-4">{formatDate(post.date)}</p>
          <h1
            className="font-display text-fg"
            style={{ fontSize: 'clamp(2.1rem, 5vw, 3.6rem)', lineHeight: 1.05 }}
          >
            {post.title}
          </h1>
        </header>
      </Reveal>

      {cover && (
        <Reveal delay={80}>
          <img
            src={cover}
            alt={post.title}
            className="mt-10 w-full border border-line-soft"
            style={{ maxHeight: '70vh', objectFit: 'cover' }}
          />
        </Reveal>
      )}

      <Reveal delay={120}>
        <div className="prose-serif mt-10 whitespace-pre-line">{post.description}</div>
      </Reveal>

      {rest.length > 0 && (
        <div className="mt-10 flex flex-col gap-4">
          {rest.map((src, i) => (
            <Reveal key={i} delay={40}>
              <img src={src} alt={`${post.title} — ${i + 2}`} className="w-full border border-line-soft" />
            </Reveal>
          ))}
        </div>
      )}

      <div className="mt-16">
        <Link to="/" className="btn">
          <ArrowLeft size={15} /> Back to journal
        </Link>
      </div>
    </article>
  );
}
