import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

const CATEGORIES = [
  { id: 'movies', name: 'Фильмы', icon: 'Film' },
  { id: 'series', name: 'Сериалы', icon: 'Tv' },
  { id: 'anime', name: 'Аниме', icon: 'Sparkles' },
  { id: 'cartoons', name: 'Мультфильмы', icon: 'Baby' },
  { id: 'dorama', name: 'Дорамы', icon: 'Heart' },
];

const TRAILERS = [
  { id: 1, title: 'Дюна: Часть вторая', category: 'movies', year: 2024, videoId: 'Way9Dexny3w', views: '12M', thumbnail: 'https://img.youtube.com/vi/Way9Dexny3w/maxresdefault.jpg' },
  { id: 2, title: 'Оппенгеймер', category: 'movies', year: 2023, videoId: 'uYPbbksJxIg', views: '8M', thumbnail: 'https://img.youtube.com/vi/uYPbbksJxIg/maxresdefault.jpg' },
  { id: 3, title: 'Атака Титанов: Финал', category: 'anime', year: 2023, videoId: 'SlNpRThS9t8', views: '5M', thumbnail: 'https://img.youtube.com/vi/SlNpRThS9t8/maxresdefault.jpg' },
  { id: 4, title: 'Последние из нас', category: 'series', year: 2023, videoId: 'uLtkt8BonwM', views: '15M', thumbnail: 'https://img.youtube.com/vi/uLtkt8BonwM/maxresdefault.jpg' },
  { id: 5, title: 'Человек-паук: Через вселенные', category: 'cartoons', year: 2023, videoId: 'shW9i6k8cB0', views: '20M', thumbnail: 'https://img.youtube.com/vi/shW9i6k8cB0/maxresdefault.jpg' },
  { id: 6, 'Бизнес-предложение', category: 'dorama', year: 2022, videoId: 'vxNe2FMwS2s', views: '3M', thumbnail: 'https://img.youtube.com/vi/vxNe2FMwS2s/maxresdefault.jpg' },
  { id: 7, title: 'Джон Уик 4', category: 'movies', year: 2023, videoId: 'qEVUtrk8_B4', views: '18M', thumbnail: 'https://img.youtube.com/vi/qEVUtrk8_B4/maxresdefault.jpg' },
  { id: 8, title: 'Клинок, рассекающий демонов', category: 'anime', year: 2023, videoId: 'a9tq0aS5Zu8', views: '7M', thumbnail: 'https://img.youtube.com/vi/a9tq0aS5Zu8/maxresdefault.jpg' },
  { id: 9, title: 'Властелин колец: Кольца власти', category: 'series', year: 2022, videoId: 'x8UAUAuKNcU', views: '25M', thumbnail: 'https://img.youtube.com/vi/x8UAUAuKNcU/maxresdefault.jpg' },
  { id: 10, title: 'Элементарно', category: 'cartoons', year: 2023, videoId: 'hXzcyx9V0xw', views: '10M', thumbnail: 'https://img.youtube.com/vi/hXzcyx9V0xw/maxresdefault.jpg' },
  { id: 11, title: 'Барби', category: 'movies', year: 2023, videoId: 'pBk4NYhWNMM', views: '30M', thumbnail: 'https://img.youtube.com/vi/pBk4NYhWNMM/maxresdefault.jpg' },
  { id: 12, title: 'Игра в кальмара 2', category: 'series', year: 2024, videoId: 'oqxAJKy0ii4', views: '40M', thumbnail: 'https://img.youtube.com/vi/oqxAJKy0ii4/maxresdefault.jpg' },
];

const FEATURED_TRAILER = TRAILERS[0];

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTrailer, setSelectedTrailer] = useState<typeof TRAILERS[0] | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  const filteredTrailers = TRAILERS.filter(trailer => {
    const matchesSearch = trailer.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || trailer.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const openPlayer = (trailer: typeof TRAILERS[0]) => {
    setSelectedTrailer(trailer);
    setIsPlayerOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
                <Icon name="Play" size={28} className="fill-primary" />
                ТРЕЙЛЕР
              </h1>
              <nav className="hidden md:flex gap-6">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    selectedCategory === 'all' ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  Все
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      selectedCategory === cat.id ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <Icon name="Bell" size={20} className="text-muted-foreground cursor-pointer hover:text-primary transition-colors" />
              <Icon name="User" size={20} className="text-muted-foreground cursor-pointer hover:text-primary transition-colors" />
            </div>
          </div>
        </div>
      </header>

      <main className="pt-20">
        <section className="relative h-[70vh] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={FEATURED_TRAILER.thumbnail}
              alt={FEATURED_TRAILER.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 netflix-gradient" />
          </div>
          <div className="relative container mx-auto px-4 h-full flex flex-col justify-end pb-20">
            <div className="max-w-2xl">
              <Badge variant="secondary" className="mb-4 bg-primary/20 text-primary border-primary">
                {CATEGORIES.find(c => c.id === FEATURED_TRAILER.category)?.name}
              </Badge>
              <h2 className="text-5xl font-bold mb-4">{FEATURED_TRAILER.title}</h2>
              <div className="flex items-center gap-4 mb-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Icon name="Calendar" size={16} />
                  <span>{FEATURED_TRAILER.year}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Eye" size={16} />
                  <span>{FEATURED_TRAILER.views} просмотров</span>
                </div>
              </div>
              <div className="flex gap-4">
                <Button size="lg" className="gap-2" onClick={() => openPlayer(FEATURED_TRAILER)}>
                  <Icon name="Play" size={20} />
                  Смотреть трейлер
                </Button>
                <Button size="lg" variant="secondary" className="gap-2">
                  <Icon name="Share2" size={20} />
                  Поделиться
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Поиск трейлеров..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4">Категории</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {CATEGORIES.map((category) => (
                <Card
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`cursor-pointer hover-scale transition-all ${
                    selectedCategory === category.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border'
                  }`}
                >
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      selectedCategory === category.id ? 'bg-primary/20' : 'bg-muted'
                    }`}>
                      <Icon name={category.icon as any} size={20} className={
                        selectedCategory === category.id ? 'text-primary' : 'text-muted-foreground'
                      } />
                    </div>
                    <span className="font-semibold">{category.name}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <h3 className="text-2xl font-bold mb-6">
            {searchQuery ? 'Результаты поиска' : selectedCategory === 'all' ? 'Все трейлеры' : CATEGORIES.find(c => c.id === selectedCategory)?.name}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrailers.map((trailer) => (
              <Card
                key={trailer.id}
                className="group cursor-pointer overflow-hidden bg-card border-border hover-scale movie-card-shadow"
                onClick={() => openPlayer(trailer)}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={trailer.thumbnail}
                    alt={trailer.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Icon name="Play" size={32} className="fill-white text-white ml-1" />
                    </div>
                  </div>
                  <Badge className="absolute top-3 left-3 bg-black/70">
                    {CATEGORIES.find(c => c.id === trailer.category)?.name}
                  </Badge>
                  <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/70 text-xs font-semibold">
                    {trailer.views} просмотров
                  </div>
                </div>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2 line-clamp-2">{trailer.title}</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="Calendar" size={14} />
                    <span>{trailer.year}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTrailers.length === 0 && (
            <div className="text-center py-20">
              <Icon name="Film" size={48} className="mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Трейлеры не найдены</p>
            </div>
          )}
        </section>
      </main>

      <Dialog open={isPlayerOpen} onOpenChange={setIsPlayerOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black border-0">
          <DialogHeader className="sr-only">
            <DialogTitle>{selectedTrailer?.title}</DialogTitle>
          </DialogHeader>
          {selectedTrailer && (
            <div className="relative">
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${selectedTrailer.videoId}?autoplay=1`}
                  title={selectedTrailer.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="p-6 bg-card">
                <Badge variant="secondary" className="mb-3">
                  {CATEGORIES.find(c => c.id === selectedTrailer.category)?.name}
                </Badge>
                <h3 className="text-2xl font-bold mb-3">{selectedTrailer.title}</h3>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Icon name="Calendar" size={16} />
                    <span>{selectedTrailer.year}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Eye" size={16} />
                    <span>{selectedTrailer.views} просмотров</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">О проекте</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>О нас</li>
                <li>Контакты</li>
                <li>Реклама</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Категории</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {CATEGORIES.map(cat => (
                  <li key={cat.id} className="cursor-pointer hover:text-primary" onClick={() => setSelectedCategory(cat.id)}>
                    {cat.name}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Помощь</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>FAQ</li>
                <li>Правила</li>
                <li>Поддержка</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Социальные сети</h4>
              <div className="flex gap-4">
                <Icon name="Youtube" size={20} className="text-muted-foreground cursor-pointer hover:text-primary transition-colors" />
                <Icon name="Twitter" size={20} className="text-muted-foreground cursor-pointer hover:text-primary transition-colors" />
                <Icon name="Instagram" size={20} className="text-muted-foreground cursor-pointer hover:text-primary transition-colors" />
              </div>
            </div>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            © 2024 Трейлер. Все трейлеры взяты из YouTube.
          </div>
        </div>
      </footer>
    </div>
  );
}
