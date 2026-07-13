import { Link } from 'react-router-dom';
import type { Post } from '../lib/posts';
import { formatDate } from '../lib/format';

export default function JournalCard({ post }: { post: Post }) {
  const cover = post.images?.[0];
  return (
    <Link to={`/journal/${post.id}`} className="card group">
      <div className="card-media">
        {cover ? (
          <img src={cover} alt={post.title} loading="lazy" />
        ) : (
          <div className="img-placeholder">S</div>
        )}
      </div>
      <div className="card-caption">
        <h3 className="card-title">{post.title}</h3>
        <p className="card-date">{formatDate(post.date)}</p>
      </div>
    </Link>
  );
}
