import React from 'react';
import { ArrowUpRight, Bookmark } from 'lucide-react';
import { BlogArticle } from '../types';

interface ArticleCardProps {
  article: BlogArticle;
  onRead: (article: BlogArticle) => void;
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string) => void;
  isReadToday?: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onRead,
  isBookmarked,
  onToggleBookmark,
  isReadToday = false
}) => {
  return (
    <article className="group bg-white rounded-xl border border-[#E7E2D9] overflow-hidden hover:border-[#D0C7B7] hover:shadow-md transition-all duration-200 flex flex-col">
      {/* Image container with fallback */}
      <div className="relative aspect-[16/9] w-full bg-[#EFECE6] overflow-hidden">
        <img
          src={article.heroImage}
          alt={article.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
          {isReadToday && (
            <span className="text-[11px] font-mono font-medium text-emerald-800 bg-emerald-50/90 backdrop-blur-xs px-2 py-1 rounded-full border border-emerald-200 shadow-2xs">
              ✓ Citit azi
            </span>
          )}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(article.id);
            }}
            title={isBookmarked ? 'Elimină din salvate' : 'Salvează pentru mai târziu'}
            className={`p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
              isBookmarked
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-white/80 text-[#3F464E] hover:bg-white hover:text-[#15191E]'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Zero-Pill Unboxed Metadata with Typographic Separator */}
          <div className="flex items-center gap-2 text-xs text-[#717A84]">
            <span className="font-medium text-[#292F36]">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span>Nivel {article.level}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readTime}</span>
            {isReadToday && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-700 font-semibold">Citit astăzi</span>
              </>
            )}
          </div>

          {/* Title */}
          <h2
            onClick={() => onRead(article)}
            className="text-lg sm:text-xl font-serif font-bold text-[#191E24] leading-snug group-hover:text-amber-800 transition-colors cursor-pointer text-balance"
          >
            {article.title}
          </h2>

          {/* Excerpt */}
          <p className="text-sm text-[#5B636B] line-clamp-3 leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        {/* Takeaway footer strip */}
        <div className="pt-3 border-t border-[#F0ECE4] flex items-center justify-between">
          <div className="text-xs text-[#7A828B] truncate max-w-[80%]">
            <span className="font-medium text-[#3E454D]">Regulă cheie:</span> {article.keyTakeaway}
          </div>
          <button
            type="button"
            onClick={() => onRead(article)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#191E24] group-hover:text-amber-800 transition-colors shrink-0 cursor-pointer ml-2"
          >
            <span>Citește</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </article>
  );
};
