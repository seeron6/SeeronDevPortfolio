import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Data
const artists = [
  {
    name: "Drake",
    image: "https://globalnews.ca/wp-content/uploads/2018/05/drake-christopher-polk-gettyimages-668971436-1.jpg?quality=65&strip=all",
    tracks: ["Passionfruit", "Jungle", "Marvins Room"]
  },
  {
    name: "Partynextdoor",
    image: "https://wallpapers.com/images/hd/partynextdoor-two-album-cover-tw5k9nt157sr3l0g.jpg",
    tracks: ["CELIBACY", "Break from Toronto", "Persian Rugs"]
  },
  {
    name: "Pino",
    image: "https://toolost.s3.us-east-2.amazonaws.com/news/attach/5d954495a3a04993a23fa3069a834e51.jpg", 
    tracks: ["how it goes", "Can't Leave Alone", "Pendulum"]
  }
];

const books = [
  { 
    title: "THE SUBTLE ART OF NOT GIVING A F*CK", 
    image: "https://m.media-amazon.com/images/I/71QKQ9mwV7L._AC_UF1000,1000_QL80_.jpg", 
    author: "Mark Manson",
    color: "#e64d33" // Adding specific colors to match your reference image
  },
  { 
    title: "Undeniable", 
    image: "https://mpd-biblio-covers.imgix.net/9781250398246.jpg?v=2&w=900&dpr=2", 
    author: "Cameron Hanes",
    color: "#8e8e8e"
  },
  { 
    title: "Meditations", 
    image: "https://cdn.kobo.com/book-images/20145e72-9430-4dee-aa27-aa0978e85fb5/353/569/90/False/meditations-278.jpg", 
    author: "Marcus Aurelius",
    color: "#222222"
  },
  { 
    title: "Can't Hurt Me", 
    image: "https://cdn.kobo.com/book-images/c4f18b89-3756-43f7-80b5-bea5ce80b98e/1200/1200/False/can-t-hurt-me.jpg", 
    author: "David Goggins",
    color: "#b5b5b5"
  },
  { 
    title: "Psychology of Money", 
    image: "https://cdn.kobo.com/book-images/abc06bac-de97-41cf-8dfb-403077d6cd0b/353/569/90/False/the-psychology-of-money-15.jpg", 
    author: "Morgan Housel",
    color: "#1a1a1a"
  }
];

const shows = [
  { 
    title: "Suits", 
    desc: "Legal Drama", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSczx8CGOIcC2MYrSpMa7WfoCSkOeqkNRDdggds4Eglbwszasu8YowxAEzabZdDnA-43RoGnA&s=10" 
  },
  { 
    title: "The Last Kingdom", 
    desc: "Historical Fiction", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqxJQlHnefj9_w3qB7HI7qO67THUXUekDIcGb7N1oPn017Bu1h-rOyiu3hovBrQHcMGgtbkDrtmpBUGJI5U9ALHchJQGjLTfRvnLB9YnK6&s=10" 
  },
  { 
    title: "Top Boy", 
    desc: " UK Crime Drama", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVludB00xmb-0__xTfCHMvyDADoiiplZ0_mbvotH98nw&s" 
  },
  { 
    title: "Outer Banks", 
    desc: "Action Adventure", 
    image: "https://i.pinimg.com/736x/b0/90/0c/b0900c82dc95b78941d7354382f99df9.jpg" 
  },
  { 
    title: "The Gentlemen", 
    desc: "Action Comedy", 
    image: "https://static0.colliderimages.com/wordpress/wp-content/uploads/sharedimages/2025/10/03207934_poster_w780.jpg?q=50&fit=contain&w=480&dpr=1.5" 
  }
];

export default function Lifestyle() {
  const [hoveredBook, setHoveredBook] = useState<number | null>(null);

  return (
    <section className="py-24 px-4 md:px-12 bg-primary text-primary border-t border-theme transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-light mb-16 tracking-tighter">
          Lifestyle <span className="text-accent">Archive</span>
        </h2>

        {/* Spotify Section */}
        <div className="mb-24">
          <h3 className="text-xl font-mono mb-8 opacity-70">HEAVY_ROTATION</h3>
          <div className="flex flex-col md:flex-row gap-4 h-[600px] md:h-[400px]">
            {artists.map((artist, i) => (
              <motion.div
                key={i}
                className="relative overflow-hidden rounded-xl cursor-pointer flex-1 group"
                whileHover={{ flexGrow: 3 }}
                transition={{ duration: 0.5, ease: "circOut" }}
              >
                 <ImageWithFallback 
                    src={artist.image} 
                    alt={artist.name} 
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" 
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                 
                 <div className="absolute bottom-0 left-0 p-6 w-full">
                    <h4 className="text-3xl font-bold text-white mb-2">{artist.name}</h4>
                    <motion.div 
                      className="overflow-hidden h-0 group-hover:h-auto opacity-0 group-hover:opacity-100 transition-all duration-500"
                    >
                       <ul className="space-y-1 mt-4">
                          {artist.tracks.map((t, idx) => (
                             <li key={idx} className="text-sm font-mono text-gray-300 flex items-center gap-2">
                                <span className="text-accent">▶</span> {t}
                             </li>
                          ))}
                       </ul>
                    </motion.div>
                 </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Books & Shows Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Horizontal Bookshelf */}
            <div>
               <h3 className="text-xl font-mono mb-8 opacity-70">BOOK_SHELF</h3>
               <div className="flex items-end justify-center gap-2 h-[400px] w-full overflow-hidden px-4">
                  {books.map((book, i) => {
                     const isHovered = hoveredBook === i;

                     return (
                        <motion.div
                           key={i}
                           onMouseEnter={() => setHoveredBook(i)}
                           onMouseLeave={() => setHoveredBook(null)}
                           className="relative cursor-pointer overflow-hidden rounded-sm shadow-2xl flex-shrink-0"
                           initial={false}
                           animate={{ 
                              width: isHovered ? "240px" : "60px",
                              height: isHovered ? "340px" : "320px",
                           }}
                           transition={{ type: "spring", stiffness: 300, damping: 30 }}
                           style={{ 
                              backgroundColor: book.color,
                           }}
                        >
                           {/* The Full Cover (Visible on Hover) */}
                           <motion.div 
                              className="absolute inset-0 w-full h-full"
                              animate={{ opacity: isHovered ? 1 : 0 }}
                              transition={{ duration: 0.3 }}
                           >
                               <img 
                                 src={book.image} 
                                 alt={book.title} 
                                 className="w-full h-full object-cover"
                               />
                               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent p-4 flex flex-col justify-end">
                                  <p className="text-[10px] font-mono text-accent uppercase">{book.author}</p>
                                  <h4 className="font-bold text-white text-sm leading-tight">{book.title}</h4>
                               </div>
                           </motion.div>

                           {/* The Spine (Visible when not hovered) */}
                           <motion.div 
                              className="absolute inset-0 flex items-center justify-center p-2"
                              animate={{ opacity: isHovered ? 0 : 1 }}
                           >
                              <span className="text-sm font-bold uppercase tracking-tighter text-white/90 whitespace-nowrap -rotate-90 origin-center">
                                 {book.title}
                              </span>
                           </motion.div>
                        </motion.div>
                     );
                  })}
               </div>
               {/* Shelf Bottom Line */}
               <div className="h-1 w-full bg-white/10 rounded-full mt-1" />
            </div>

            {/* Netflix Carousel */}
            <div>
                <h3 className="text-xl font-mono mb-8 opacity-70">WATCH_HISTORY</h3>
                <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 no-scrollbar h-[400px] items-center">
                   {shows.map((show, i) => (
                      <div 
                        key={i} 
                        className="flex-shrink-0 w-64 h-80 rounded-xl relative snap-center overflow-hidden group border border-theme"
                        style={{ 
                           backgroundImage: `linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.8) 100%), url(${show.image})`,
                           backgroundSize: 'cover',
                           backgroundPosition: 'center'
                        }}                      >
                         <div className="absolute inset-0 flex items-center justify-center text-6xl font-black text-white/10 uppercase break-all p-4">
                            {show.title.substring(0, 3)}
                         </div>
                         
                         {/* Glass Overlay */}
                         <div className="absolute inset-0 bg-glass opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 backdrop-blur-sm">
                            <h4 className="text-2xl font-bold text-white leading-none mb-2">{show.title}</h4>
                            <p className="text-sm font-mono text-accent">{show.desc}</p>
                         </div>
                      </div>
                   ))}
                </div>
            </div>

        </div>
      </div>
    </section>
  );
}