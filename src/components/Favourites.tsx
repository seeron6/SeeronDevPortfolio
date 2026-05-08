import DetailView from './DetailView';
import InkText from './InkText';

type Item = { name: string; note: string; image: string };

const artists: Item[] = [
  {
    name: 'Drake',
    note: 'Passionfruit · Jungle · Marvins Room',
    image: 'https://globalnews.ca/wp-content/uploads/2018/05/drake-christopher-polk-gettyimages-668971436-1.jpg?quality=65&strip=all',
  },
  {
    name: 'Partynextdoor',
    note: 'CELIBACY · Break from Toronto · Persian Rugs',
    image: 'https://wallpapers.com/images/hd/partynextdoor-two-album-cover-tw5k9nt157sr3l0g.jpg',
  },
  {
    name: 'Pino',
    note: 'how it goes · Can’t Leave Alone · Pendulum',
    image: 'https://toolost.s3.us-east-2.amazonaws.com/news/attach/5d954495a3a04993a23fa3069a834e51.jpg',
  },
];

const books: Item[] = [
  {
    name: 'The Subtle Art of Not Giving a F*ck',
    note: 'Mark Manson',
    image: 'https://m.media-amazon.com/images/I/71QKQ9mwV7L._AC_UF1000,1000_QL80_.jpg',
  },
  {
    name: 'Undeniable',
    note: 'Cameron Hanes',
    image: 'https://mpd-biblio-covers.imgix.net/9781250398246.jpg?v=2&w=900&dpr=2',
  },
  {
    name: 'Meditations',
    note: 'Marcus Aurelius',
    image: 'https://cdn.kobo.com/book-images/20145e72-9430-4dee-aa27-aa0978e85fb5/353/569/90/False/meditations-278.jpg',
  },
  {
    name: 'Can’t Hurt Me',
    note: 'David Goggins',
    image: 'https://cdn.kobo.com/book-images/c4f18b89-3756-43f7-80b5-bea5ce80b98e/1200/1200/False/can-t-hurt-me.jpg',
  },
  {
    name: 'The Psychology of Money',
    note: 'Morgan Housel',
    image: 'https://cdn.kobo.com/book-images/abc06bac-de97-41cf-8dfb-403077d6cd0b/353/569/90/False/the-psychology-of-money-15.jpg',
  },
];

const shows: Item[] = [
  {
    name: 'Suits',
    note: 'Legal Drama',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSczx8CGOIcC2MYrSpMa7WfoCSkOeqkNRDdggds4Eglbwszasu8YowxAEzabZdDnA-43RoGnA&s=10',
  },
  {
    name: 'The Last Kingdom',
    note: 'Historical Fiction',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqxJQlHnefj9_w3qB7HI7qO67THUXUekDIcGb7N1oPn017Bu1h-rOyiu3hovBrQHcMGgtbkDrtmpBUGJI5U9ALHchJQGjLTfRvnLB9YnK6&s=10',
  },
  {
    name: 'Top Boy',
    note: 'UK Crime Drama',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVludB00xmb-0__xTfCHMvyDADoiiplZ0_mbvotH98nw&s',
  },
  {
    name: 'Outer Banks',
    note: 'Action Adventure',
    image: 'https://i.pinimg.com/736x/b0/90/0c/b0900c82dc95b78941d7354382f99df9.jpg',
  },
  {
    name: 'The Gentlemen',
    note: 'Action Comedy',
    image: 'https://static0.colliderimages.com/wordpress/wp-content/uploads/sharedimages/2025/10/03207934_poster_w780.jpg?q=50&fit=contain&w=480&dpr=1.5',
  },
];

function Card({ item, index }: { item: Item; index: number }) {
  const tilt = index % 2 === 0 ? -2 : 2;
  return (
    <div className="favourite-card">
      <div
        className="parchment-frame"
        style={{
          padding: '6px',
          width: '72px',
          flexShrink: 0,
          transform: `rotate(${tilt}deg)`,
        }}
      >
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="block w-full h-auto aspect-square object-cover"
          style={{ filter: 'sepia(0.18) contrast(1.04)' }}
        />
      </div>
      <div className="favourite-card-text">
        <div className="serif text-ink text-base md:text-[1.05rem] leading-tight font-medium">
          {item.name}
        </div>
        <div className="serif italic text-ink-faded text-sm leading-snug mt-1">
          {item.note}
        </div>
      </div>
    </div>
  );
}

function Section({ kicker, label, items }: { kicker: string; label: string; items: Item[] }) {
  return (
    <section className="favourite-section">
      <header className="text-center md:text-left mb-6 pb-3 border-b border-ink-faded/25">
        <div className="serif italic text-ink-faded text-[10px] md:text-xs smallcaps mb-1">
          {kicker}
        </div>
        <h3 className="serif italic font-medium text-ink text-2xl md:text-3xl leading-none">
          {label}
        </h3>
      </header>
      <ul className="space-y-5 list-none p-0 m-0">
        {items.map((item, i) => (
          <li key={item.name}>
            <Card item={item} index={i} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function Favourites() {
  return (
    <DetailView id="favourites" chapter="Chapter IV" title="What I’m Loving">
      <div className="max-w-3xl mx-auto mb-12 md:mb-16 text-center">
        <InkText className="serif italic text-ink-soft text-base md:text-lg leading-[1.85]">
          {`A short ledger of what's been on rotation: the artists I keep returning to, the books on the nightstand, the shows I never finish but always restart.`}
        </InkText>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-x-10 md:gap-y-12">
        <Section kicker="heavy rotation"  label="Artists" items={artists} />
        <Section kicker="on the nightstand" label="Books"  items={books}   />
        <Section kicker="watch history"   label="Shows"   items={shows}   />
      </div>
    </DetailView>
  );
}
