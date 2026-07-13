import { useEffect, useState } from 'react';
import { getPosts, type Post } from '../lib/posts';
import Reveal from '../components/Reveal';
import JournalCard from '../components/JournalCard';

export default function Home() {
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    let alive = true;
    getPosts()
      .then((p) => alive && setPosts(p))
      .catch(() => alive && setPosts([]));
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div>
      {/* Intro */}
      <section className="mx-auto max-w-6xl px-6 pt-10 pb-14 md:pt-16">
        <Reveal>
          <p className="label mb-5">The Journal</p>
          <h1 className="font-display text-fg" style={{ fontSize: 'clamp(2.4rem, 6vw, 4.6rem)', lineHeight: 1.02 }}>
            What I&apos;m building, breaking,
            <br className="hidden sm:block" /> and shipping.
          </h1>
          <p className="prose-serif mt-6 max-w-2xl text-fg-dim">
            A running log of the work — hackathons, launches, milestones, and the
            small moments in between. Newest first.
          </p>
        </Reveal>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-6xl px-6">
        {posts === null ? (
          <GridSkeleton />
        ) : posts.length === 0 ? (
          <p className="prose-serif py-20 text-center text-fg-faint">
            Nothing here yet — the first entry is on its way.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.id} delay={(i % 3) * 90}>
                <JournalCard post={post} />
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse border border-line-soft bg-surface"
          style={{ aspectRatio: '3 / 2' }}
        />
      ))}
    </div>
  );
}
