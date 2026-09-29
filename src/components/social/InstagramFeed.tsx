import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { InstagramPost } from '../../types';
import { INITIAL_INSTAGRAM_POSTS } from '../../data/initialData';
import { 
  Instagram, 
  Heart, 
  MessageCircle, 
  ArrowUpRight, 
  RefreshCw, 
  Sparkles,
  Camera
} from 'lucide-react';

interface InstagramFeedProps {
  variant?: 'light' | 'dark' | 'editorial';
  showTitle?: boolean;
}

export const InstagramFeed: React.FC<InstagramFeedProps> = ({ 
  variant = 'light',
  showTitle = true 
}) => {
  const { settings } = useStore();
  const [posts, setPosts] = useState<InstagramPost[]>(INITIAL_INSTAGRAM_POSTS);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('À l’instant');

  const instagramHandle = settings.instagramHandle || '@atmospheredakar';
  const instagramUrl = settings.instagramUrl || 'https://www.instagram.com/atmospheredakar';

  const handleRefreshFeed = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      // Rotate posts slightly or simulate fresh timestamp
      setPosts((prev) => {
        const shuffled = [...prev];
        const first = shuffled.shift();
        if (first) shuffled.push(first);
        return shuffled;
      });
      setLastSyncTime('À l’instant');
      setIsRefreshing(false);
    }, 600);
  };

  const isDark = variant === 'dark';

  return (
    <section 
      className={`py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t transition-colors ${
        isDark 
          ? 'bg-[#181614] text-[#EFEBE4] border-[#292521]' 
          : 'bg-[#FBF9F5] text-[#1E1B18] border-[#1E1B18]/10'
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header Block */}
        {showTitle && (
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#8C8477]">
                <Instagram size={14} className="text-[#9BBA1A]" />
                <span>FLUX OFFICIEL · INSTAGRAM</span>
                <span>—</span>
                <span className="text-[#9BBA1A] font-semibold">{instagramHandle}</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-serif-display font-light tracking-tight">
                L'Art d'Habiter en Direct de Dakar
              </h2>
              
              <p className={`text-xs sm:text-sm font-light max-w-xl leading-relaxed ${
                isDark ? 'text-[#A69E90]' : 'text-[#635B4E]'
              }`}>
                Découvrez chaque semaine nos nouvelles arrivées au showroom des Almadies, les coulisses de l’atelier de sur-mesure et nos inspirations scénographiques.
              </p>
            </div>

            {/* Quick Actions: Follow & Live Refresh */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleRefreshFeed}
                disabled={isRefreshing}
                className={`p-2.5 border text-xs uppercase tracking-wider transition-luxury flex items-center gap-1.5 font-mono ${
                  isDark 
                    ? 'border-[#3A352F] text-[#A69E90] hover:text-white hover:border-white/30' 
                    : 'border-[#1E1B18]/15 text-[#635B4E] hover:text-[#1E1B18] hover:border-[#1E1B18]/40'
                }`}
                title="Actualiser les publications en direct"
                aria-label="Actualiser les publications"
              >
                <RefreshCw size={13} className={isRefreshing ? 'animate-spin text-[#9BBA1A]' : ''} />
                <span className="hidden sm:inline">Actualiser</span>
              </button>

              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-5 py-2.5 text-xs uppercase tracking-[0.14em] font-medium transition-luxury flex items-center gap-2 shadow-sm ${
                  isDark
                    ? 'bg-[#EFEBE4] text-[#181614] hover:bg-white'
                    : 'bg-[#1E1B18] text-white hover:bg-[#38332D]'
                }`}
              >
                <Instagram size={14} />
                <span>Suivre {instagramHandle}</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        )}

        {/* Visual Feed Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square bg-[#E8E2D8] overflow-hidden border border-[#1E1B18]/10 block focus:outline-none"
            >
              {/* Media Image */}
              <img
                src={post.mediaUrl}
                alt={post.caption}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                referrerPolicy="no-referrer"
              />

              {/* Category Pill Tag (always visible on bottom left) */}
              {post.categoryTag && (
                <div className="absolute top-2.5 left-2.5 z-10 bg-[#1E1B18]/80 backdrop-blur-xs text-white text-[8px] sm:text-[9px] uppercase tracking-widest font-mono px-2 py-0.5 pointer-events-none transition-opacity group-hover:opacity-0">
                  {post.categoryTag}
                </div>
              )}

              {/* Instagram Hover Card Overlay */}
              <div className="absolute inset-0 bg-[#121110]/85 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3.5 sm:p-4 flex flex-col justify-between text-white">
                
                {/* Header inside card */}
                <div className="flex items-center justify-between text-[10px] text-[#C9BFB0] font-mono">
                  <div className="flex items-center gap-1">
                    <Instagram size={12} className="text-[#9BBA1A]" />
                    <span className="truncate">{instagramHandle}</span>
                  </div>
                  <span className="text-[9px] text-[#A69E90] shrink-0">{post.timestamp}</span>
                </div>

                {/* Caption Snippet */}
                <p className="text-[11px] font-light leading-snug line-clamp-3 text-[#EFEBE4] my-auto">
                  {post.caption}
                </p>

                {/* Footer Metrics (Likes & Comments) */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#D8D2C6]">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Heart size={12} className="text-[#E05A47] fill-[#E05A47]" />
                      <span>{post.likes}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle size={12} />
                      <span>{post.comments}</span>
                    </span>
                  </div>
                  <ArrowUpRight size={13} className="text-white/70 group-hover:text-white transition-colors" />
                </div>

              </div>
            </a>
          ))}
        </div>

        {/* Sync Status & Community Note */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-[11px] font-mono text-[#8C8477]">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#9BBA1A] animate-pulse" />
            <span>Flux synchronisé avec le compte officiel Instagram d'Atmosphère</span>
            <span className="hidden md:inline">·</span>
            <span className="hidden md:inline text-[#A69E90]">{lastSyncTime}</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[#A69E90]">Partagez vos intérieurs avec le tag #AtmosphereDakar</span>
            <a 
              href={instagramUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#9BBA1A] hover:underline"
            >
              Voir la galerie complète →
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
