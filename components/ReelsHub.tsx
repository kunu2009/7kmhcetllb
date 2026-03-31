import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ExternalLink, Maximize2, Minimize2, ChevronLeft, ChevronRight, Newspaper, CalendarDays, RefreshCw } from 'lucide-react';
import { ReelNewsItem, fetchReelNews } from '../services/geminiService';

const PAGE_SIZE = 12;
const REELS_CACHE_PREFIX = 'lawranker_reels_cache_v1';

const SOURCE_BADGE_CLASS: Record<string, string> = {
  'Primary API': 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700/50',
  'RSS Fallback': 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700/50',
  Cache: 'bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600'
};

const getSourceBadgeClass = (tag: ReelNewsItem['confidenceTag']) => {
  if (!tag) return SOURCE_BADGE_CLASS['RSS Fallback'];
  return SOURCE_BADGE_CLASS[tag] || SOURCE_BADGE_CLASS['RSS Fallback'];
};

const formatDateInput = (date: Date) => date.toISOString().split('T')[0];

const getYesterday = () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return formatDateInput(date);
};

const getLast7DayStart = () => {
  const date = new Date();
  date.setDate(date.getDate() - 7);
  return formatDateInput(date);
};

const ReelsHub: React.FC = () => {
  const [category, setCategory] = useState<'all' | 'legal' | 'business' | 'tech' | 'sports' | 'world'>('all');
  const [selectedDate, setSelectedDate] = useState('');
  const [items, setItems] = useState<ReelNewsItem[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [activeReelIndex, setActiveReelIndex] = useState<number | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [activeDatePreset, setActiveDatePreset] = useState<'none' | 'today' | 'yesterday' | 'last7'>('none');

  const getCacheKey = () => `${REELS_CACHE_PREFIX}:${category}:${activeDatePreset}:${selectedDate || 'none'}`;

  const readCachedItems = (): ReelNewsItem[] => {
    try {
      const raw = localStorage.getItem(getCacheKey());
      if (!raw) return [];
      const parsed = JSON.parse(raw) as { items?: ReelNewsItem[] };
      if (!Array.isArray(parsed?.items)) return [];
      return parsed.items.map((item) => ({
        ...item,
        sourceType: 'cache',
        confidenceTag: 'Cache'
      }));
    } catch {
      return [];
    }
  };

  const writeCachedItems = (newsItems: ReelNewsItem[]) => {
    try {
      localStorage.setItem(getCacheKey(), JSON.stringify({ items: newsItems.slice(0, 24), savedAt: Date.now() }));
    } catch {
      // Ignore cache write failure (quota/private mode).
    }
  };

  const loadPage = useCallback(async (startOffset: number, append: boolean) => {
    if (append) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }

    setError(null);
    if (!append) {
      setInfoMessage(null);
    }

    const fetched = await fetchReelNews({
      category,
      date: activeDatePreset === 'last7' ? undefined : (selectedDate || undefined),
      fromDate: activeDatePreset === 'last7' ? getLast7DayStart() : undefined,
      offset: startOffset,
      limit: PAGE_SIZE
    });

    if (!fetched.length && !append) {
      const cached = readCachedItems();
      if (cached.length) {
        setItems(cached);
        setHasMore(false);
        setOffset(cached.length);
        setInfoMessage('Live results are unavailable right now. Showing your last cached reels for this filter.');
        setLoading(false);
        setLoadingMore(false);
        return;
      }

      setError('No news found for this filter right now. Please retry or clear date/category filters.');
    }

    setItems((prev) => {
      const next = append ? [...prev, ...fetched] : fetched;
      const map = new Map<string, ReelNewsItem>();
      next.forEach((item) => map.set(item.id + item.url, item));
      return Array.from(map.values());
    });

    if (!append && fetched.length) {
      writeCachedItems(fetched);
      if (category !== 'all' || selectedDate || activeDatePreset !== 'none') {
        setInfoMessage('Showing best available reels for your selected filter.');
      }
    }

    setHasMore(fetched.length === PAGE_SIZE);
    setOffset(startOffset + fetched.length);

    setLoading(false);
    setLoadingMore(false);
  }, [category, selectedDate, activeDatePreset]);

  const refreshFeed = useCallback(() => {
    setOffset(0);
    setHasMore(true);
    setItems([]);
    loadPage(0, false);
  }, [loadPage]);

  useEffect(() => {
    refreshFeed();
  }, [category, selectedDate, activeDatePreset]);

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const target = sentinelRef.current;
    if (!target) return;

    const observer = new IntersectionObserver((entries) => {
      const first = entries[0];
      if (!first.isIntersecting || loading || loadingMore || !hasMore) return;
      loadPage(offset, true);
    }, { rootMargin: '300px' });

    observer.observe(target);
    return () => observer.disconnect();
  }, [offset, loading, loadingMore, hasMore, loadPage]);

  const openFullscreen = (index: number) => setActiveReelIndex(index);
  const closeFullscreen = () => setActiveReelIndex(null);

  const stepReel = (step: 1 | -1) => {
    if (activeReelIndex === null) return;
    const next = activeReelIndex + step;
    if (next < 0 || next >= items.length) return;
    setActiveReelIndex(next);
  };

  useEffect(() => {
    if (activeReelIndex === null) return;
    const keyHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeFullscreen();
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') stepReel(1);
      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') stepReel(-1);
    };
    window.addEventListener('keydown', keyHandler);
    return () => window.removeEventListener('keydown', keyHandler);
  }, [activeReelIndex, items.length]);

  const fullScreenItem = useMemo(() => {
    if (activeReelIndex === null) return null;
    return items[activeReelIndex] || null;
  }, [activeReelIndex, items]);

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="bg-indigo-900 text-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-lg relative overflow-hidden">
        <h2 className="text-lg md:text-2xl font-bold mb-2 flex items-center gap-2">
          <Newspaper className="w-5 h-5 md:w-6 md:h-6" /> Reels News
        </h2>
        <p className="text-indigo-200 text-xs md:text-sm mb-5 max-w-2xl">
          Infinite feed: keep scrolling and more reels load automatically. Pick category or a specific date to see past news snapshots.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-3">
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value as typeof category)}
            className="bg-white/10 border border-indigo-400/30 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
          >
            <option value="all" className="text-gray-900">All</option>
            <option value="legal" className="text-gray-900">Legal</option>
            <option value="business" className="text-gray-900">Business</option>
            <option value="tech" className="text-gray-900">Tech</option>
            <option value="sports" className="text-gray-900">Sports</option>
            <option value="world" className="text-gray-900">World</option>
          </select>

          <div className="relative md:col-span-2">
            <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-200" />
            <input
              type="date"
              value={selectedDate}
              onChange={(event) => {
                setSelectedDate(event.target.value);
                setActiveDatePreset('none');
              }}
              max={new Date().toISOString().split('T')[0]}
              className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-white/10 border border-indigo-400/30 text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <button
            onClick={refreshFeed}
            disabled={loading || loadingMore}
            className="inline-flex items-center justify-center gap-2 bg-yellow-400 text-indigo-900 font-bold px-4 py-2.5 rounded-lg hover:bg-yellow-300 transition-colors text-sm"
          >
            <RefreshCw className={`w-4 h-4 ${(loading || loadingMore) ? 'animate-spin' : ''}`} /> Refresh
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          <button
            onClick={() => {
              setSelectedDate(formatDateInput(new Date()));
              setActiveDatePreset('today');
            }}
            className="px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/20 text-xs font-medium"
          >
            Today
          </button>
          <button
            onClick={() => {
              setSelectedDate(getYesterday());
              setActiveDatePreset('yesterday');
            }}
            className="px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/20 text-xs font-medium"
          >
            Yesterday
          </button>
          <button
            onClick={() => {
              setSelectedDate('');
              setActiveDatePreset('last7');
            }}
            className="px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/20 text-xs font-medium"
            title="Shows results from last 7 days window"
          >
            Last 7 Days
          </button>
          <button
            onClick={() => {
              setSelectedDate('');
              setActiveDatePreset('none');
            }}
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium border border-white/20"
          >
            Clear Date
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-xl p-4 text-sm flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <span>{error}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={refreshFeed}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-600 text-white hover:bg-red-700"
            >
              Retry
            </button>
            <button
              onClick={() => {
                setCategory('all');
                setSelectedDate('');
                setActiveDatePreset('none');
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-red-400/40 hover:bg-red-100 dark:hover:bg-red-900/30"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}

      {infoMessage && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 text-amber-800 dark:text-amber-200 rounded-xl p-4 text-sm">
          {infoMessage}
        </div>
      )}

      {loading && items.length === 0 && (
        <div className="space-y-4 animate-pulse">
          {[0, 1, 2].map((i) => (
            <div key={i} className="min-h-[40vh] bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="h-44 md:h-56 bg-gray-200 dark:bg-gray-700" />
              <div className="p-4 md:p-6 space-y-3">
                <div className="h-3 w-28 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-6 w-4/5 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-4 w-11/12 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-10 w-36 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
            </div>
          ))}
        </div>
      )}

      {items.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
              {items.length} reels loaded {hasMore ? '• keep scrolling for more' : '• reached current feed end'}
            </p>
            <button
              onClick={() => openFullscreen(0)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-medium hover:bg-indigo-700"
            >
              <Maximize2 className="w-3.5 h-3.5" /> Full Screen
            </button>
          </div>

          <div className="h-[72vh] overflow-y-auto snap-y snap-mandatory space-y-4 pr-1 custom-scrollbar">
            {items.map((item, index) => (
              <article key={item.id + item.url} className="snap-start min-h-[64vh] bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col">
                {item.imageUrl && !failedImages[item.id] ? (
                  <div className="h-48 md:h-60 bg-gray-100 dark:bg-gray-700 overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      onError={() => setFailedImages((prev) => ({ ...prev, [item.id]: true }))}
                    />
                  </div>
                ) : (
                  <div className="h-48 md:h-60 bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-900/40 dark:to-violet-900/20 flex items-center justify-center">
                    <Newspaper className="w-12 h-12 text-indigo-500/70" />
                  </div>
                )}

                <div className="p-4 md:p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-medium">{item.category || category}</span>
                      <span className={`px-2 py-1 rounded-full border text-[10px] font-semibold uppercase tracking-wider ${getSourceBadgeClass(item.confidenceTag)}`}>
                        {item.confidenceTag || 'RSS Fallback'}
                      </span>
                    </div>
                    <span>{item.publishedAt || 'Latest'}</span>
                  </div>

                  <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white leading-snug mb-3">{item.title}</h3>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-5 flex-1">{item.summary}</p>

                  <div className="flex items-center justify-between gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <span className="text-xs text-gray-500 dark:text-gray-400 truncate">Source: {item.source || 'News Feed'}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openFullscreen(index)}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-indigo-200 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300 text-xs md:text-sm font-medium hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
                      >
                        <Maximize2 className="w-3.5 h-3.5" /> Full
                      </button>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-white text-xs md:text-sm font-medium ${item.url === '#' ? 'bg-gray-400 pointer-events-none' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                      >
                        Read Full <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
            <div ref={sentinelRef} className="h-8" />
          </div>
          {(loadingMore || loading) && <p className="text-xs text-gray-400 text-center py-2">Loading more reels...</p>}
        </div>
      )}

      {fullScreenItem && activeReelIndex !== null && (
        <div className="fixed inset-0 z-[95] bg-black text-white flex flex-col" onTouchStart={(event) => setTouchStartY(event.changedTouches[0]?.clientY ?? null)} onTouchEnd={(event) => {
          const endY = event.changedTouches[0]?.clientY;
          if (touchStartY === null || typeof endY !== 'number') return;
          const delta = endY - touchStartY;
          if (delta > 50) stepReel(-1);
          if (delta < -50) stepReel(1);
        }}>
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/15 bg-black/70 backdrop-blur-sm">
            <span className="text-xs uppercase tracking-wider text-gray-300">Reel {activeReelIndex + 1} / {items.length}</span>
            <div className="flex items-center gap-2">
              <button onClick={() => stepReel(-1)} disabled={activeReelIndex === 0} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30"><ChevronLeft className="w-4 h-4" /></button>
              <button onClick={() => stepReel(1)} disabled={activeReelIndex === items.length - 1} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30"><ChevronRight className="w-4 h-4" /></button>
              <button onClick={closeFullscreen} className="p-2 rounded-lg bg-white/10 hover:bg-white/20"><Minimize2 className="w-4 h-4" /></button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <article className="min-h-full max-w-3xl mx-auto flex flex-col">
              {fullScreenItem.imageUrl && !failedImages[`fs-${fullScreenItem.id}`] ? (
                <div className="h-[42vh] bg-gray-900 overflow-hidden">
                  <img
                    src={fullScreenItem.imageUrl}
                    alt={fullScreenItem.title}
                    className="w-full h-full object-cover"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={() => setFailedImages((prev) => ({ ...prev, [`fs-${fullScreenItem.id}`]: true }))}
                  />
                </div>
              ) : (
                <div className="h-[42vh] bg-gradient-to-br from-gray-900 to-indigo-950 flex items-center justify-center">
                  <Newspaper className="w-14 h-14 text-indigo-300/70" />
                </div>
              )}

              <div className="p-5 md:p-7 flex-1 flex flex-col bg-gray-950">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 rounded-full bg-indigo-500/20 text-indigo-300">{fullScreenItem.category || category}</span>
                    <span className={`px-2 py-1 rounded-full border text-[10px] font-semibold uppercase tracking-wider ${getSourceBadgeClass(fullScreenItem.confidenceTag)}`}>
                      {fullScreenItem.confidenceTag || 'RSS Fallback'}
                    </span>
                  </div>
                  <span>{fullScreenItem.publishedAt || 'Latest'}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold leading-tight mb-4">{fullScreenItem.title}</h3>
                <p className="text-sm md:text-base text-gray-200 leading-relaxed mb-8 flex-1">{fullScreenItem.summary}</p>
                <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/15">
                  <span className="text-xs text-gray-400">Source: {fullScreenItem.source || 'News Feed'}</span>
                  <a href={fullScreenItem.url} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold ${fullScreenItem.url === '#' ? 'bg-gray-500 pointer-events-none' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
                    Read Full Article <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReelsHub;
