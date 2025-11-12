import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

const GENRES = ['Боевик', 'Драма', 'Комедия', 'Фантастика', 'Триллер', 'Ужасы'];
const QUALITIES = ['4K', '1080p', '720p'];
const YEARS = ['2024', '2023', '2022', '2021', '2020'];

const MOVIES = [
  { id: 1, title: 'Дюна: Часть вторая', year: 2024, genre: 'Фантастика', quality: '4K', rating: 8.7, image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&h=1200&fit=crop' },
  { id: 2, title: 'Оппенгеймер', year: 2023, genre: 'Драма', quality: '4K', rating: 8.5, image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=1200&fit=crop' },
  { id: 3, title: 'Крид 3', year: 2023, genre: 'Боевик', quality: '1080p', rating: 7.9, image: 'https://images.unsplash.com/photo-1517438476312-10d79c077509?w=800&h=1200&fit=crop' },
  { id: 4, title: 'Барби', year: 2023, genre: 'Комедия', quality: '4K', rating: 7.3, image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=1200&fit=crop' },
  { id: 5, title: 'Джон Уик 4', year: 2023, genre: 'Боевик', quality: '4K', rating: 8.2, image: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=800&h=1200&fit=crop' },
  { id: 6, title: 'Гонка', year: 2024, genre: 'Триллер', quality: '1080p', rating: 7.8, image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=1200&fit=crop' },
  { id: 7, title: 'Темная сторона', year: 2023, genre: 'Ужасы', quality: '1080p', rating: 7.1, image: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=800&h=1200&fit=crop' },
  { id: 8, title: 'Космическая одиссея', year: 2024, genre: 'Фантастика', quality: '4K', rating: 8.4, image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&h=1200&fit=crop' },
  { id: 9, title: 'Паразиты', year: 2019, genre: 'Триллер', quality: '4K', rating: 8.6, image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&h=1200&fit=crop' },
  { id: 10, title: 'Интерстеллар', year: 2014, genre: 'Фантастика', quality: '4K', rating: 8.7, image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=1200&fit=crop' },
  { id: 11, title: 'Начало', year: 2010, genre: 'Фантастика', quality: '4K', rating: 8.8, image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=1200&fit=crop' },
  { id: 12, title: 'Темный рыцарь', year: 2008, genre: 'Боевик', quality: '4K', rating: 9.0, image: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=800&h=1200&fit=crop' },
  { id: 13, title: 'Побег из Шоушенка', year: 1994, genre: 'Драма', quality: '1080p', rating: 9.3, image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=1200&fit=crop' },
  { id: 14, title: 'Форрест Гамп', year: 1994, genre: 'Драма', quality: '1080p', rating: 8.8, image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=1200&fit=crop' },
  { id: 15, title: 'Крёстный отец', year: 1972, genre: 'Драма', quality: '1080p', rating: 9.2, image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=1200&fit=crop' },
  { id: 16, title: 'Матрица', year: 1999, genre: 'Фантастика', quality: '4K', rating: 8.7, image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&h=1200&fit=crop' },
  { id: 17, title: 'Гладиатор', year: 2000, genre: 'Боевик', quality: '4K', rating: 8.5, image: 'https://images.unsplash.com/photo-1517438476312-10d79c077509?w=800&h=1200&fit=crop' },
  { id: 18, title: 'Молчание ягнят', year: 1991, genre: 'Триллер', quality: '1080p', rating: 8.6, image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&h=1200&fit=crop' },
  { id: 19, title: 'Звёздные войны', year: 1977, genre: 'Фантастика', quality: '4K', rating: 8.6, image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&h=1200&fit=crop' },
  { id: 20, title: 'Криминальное чтиво', year: 1994, genre: 'Триллер', quality: '1080p', rating: 8.9, image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&h=1200&fit=crop' },
  { id: 21, title: 'Аватар 2', year: 2025, genre: 'Фантастика', quality: '4K', rating: 8.3, image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&h=1200&fit=crop' },
  { id: 22, title: 'Миссия невыполнима 8', year: 2025, genre: 'Боевик', quality: '4K', rating: 8.1, image: 'https://images.unsplash.com/photo-1517438476312-10d79c077509?w=800&h=1200&fit=crop' },
];

const FEATURED_MOVIE = MOVIES[0];

const COLLECTIONS = [
  {
    id: 'top100',
    title: 'Топ 100 фильмов по рейтингу',
    description: 'Лучшие фильмы всех времён по версии IMDb',
    icon: 'Trophy',
    movies: MOVIES.filter(m => m.rating >= 8.5).sort((a, b) => b.rating - a.rating).slice(0, 10)
  },
  {
    id: 'top2025',
    title: 'Топ 2025 года',
    description: 'Самые ожидаемые премьеры этого года',
    icon: 'Sparkles',
    movies: MOVIES.filter(m => m.year === 2025 || m.year === 2024).sort((a, b) => b.rating - a.rating)
  },
  {
    id: 'new',
    title: 'Только что добавили',
    description: 'Свежие поступления в каталог',
    icon: 'Flame',
    movies: MOVIES.slice(0, 8)
  },
  {
    id: '4k',
    title: '4K коллекция',
    description: 'Фильмы в максимальном качестве',
    icon: 'MonitorPlay',
    movies: MOVIES.filter(m => m.quality === '4K')
  },
];

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedQuality, setSelectedQuality] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [activeSection, setActiveSection] = useState('home');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);

  const filteredMovies = MOVIES.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesQuality = selectedQuality === 'all' || movie.quality === selectedQuality;
    const matchesYear = selectedYear === 'all' || movie.year.toString() === selectedYear;
    return matchesSearch && matchesQuality && matchesYear;
  });

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold text-primary">КИНОТЕАТР</h1>
              <nav className="hidden md:flex gap-6">
                {['Главная', 'Каталог', 'Жанры', 'Новинки', 'Подборки', 'Избранное'].map((item) => (
                  <button
                    key={item}
                    onClick={() => setActiveSection(item.toLowerCase())}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      activeSection === item.toLowerCase() ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    {item}
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
              src={FEATURED_MOVIE.image}
              alt={FEATURED_MOVIE.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 netflix-gradient" />
          </div>
          <div className="relative container mx-auto px-4 h-full flex flex-col justify-end pb-20">
            <div className="max-w-2xl">
              <h2 className="text-5xl font-bold mb-4">{FEATURED_MOVIE.title}</h2>
              <div className="flex items-center gap-4 mb-6">
                <Badge variant="secondary" className="bg-primary/20 text-primary border-primary">
                  {FEATURED_MOVIE.quality}
                </Badge>
                <div className="flex items-center gap-1">
                  <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold">{FEATURED_MOVIE.rating}</span>
                  <span className="text-muted-foreground text-sm">IMDb</span>
                </div>
                <span className="text-muted-foreground">{FEATURED_MOVIE.year}</span>
                <Badge variant="outline">{FEATURED_MOVIE.genre}</Badge>
              </div>
              <div className="flex gap-4">
                <Button size="lg" className="gap-2">
                  <Icon name="Play" size={20} />
                  Смотреть
                </Button>
                <Button size="lg" variant="secondary" className="gap-2">
                  <Icon name="Info" size={20} />
                  Подробнее
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
                placeholder="Поиск фильмов..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedQuality} onValueChange={setSelectedQuality}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Качество" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все качества</SelectItem>
                {QUALITIES.map((quality) => (
                  <SelectItem key={quality} value={quality}>{quality}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Год" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все годы</SelectItem>
                {YEARS.map((year) => (
                  <SelectItem key={year} value={year}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold">Подборки</h3>
              <Button variant="ghost" size="sm" className="gap-2">
                Все подборки
                <Icon name="ArrowRight" size={16} />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {COLLECTIONS.map((collection) => (
                <Card
                  key={collection.id}
                  className="group cursor-pointer overflow-hidden bg-card border-border hover-scale movie-card-shadow"
                  onClick={() => setSelectedCollection(collection.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-3">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Icon name={collection.icon as any} size={24} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg mb-1">{collection.title}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">{collection.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="Film" size={14} />
                      <span>{collection.movies.length} фильмов</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {selectedCollection && (
            <div className="mb-8 p-6 rounded-lg bg-secondary/20 border border-border">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">
                    {COLLECTIONS.find(c => c.id === selectedCollection)?.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {COLLECTIONS.find(c => c.id === selectedCollection)?.description}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedCollection(null)}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {COLLECTIONS.find(c => c.id === selectedCollection)?.movies.map((movie, index) => (
                  <Card key={movie.id} className="group cursor-pointer overflow-hidden bg-card border-border hover-scale">
                    <div className="relative aspect-[2/3] overflow-hidden">
                      {selectedCollection === 'top100' && (
                        <div className="absolute top-2 left-2 z-10 w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold text-lg">
                          {index + 1}
                        </div>
                      )}
                      <img
                        src={movie.image}
                        alt={movie.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center">
                        <Button size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full">
                          <Icon name="Play" size={24} />
                        </Button>
                      </div>
                      <Badge className="absolute top-2 right-2 bg-primary/90">{movie.quality}</Badge>
                    </div>
                    <CardContent className="p-3">
                      <h4 className="font-semibold text-sm mb-1 truncate">{movie.title}</h4>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1">
                          <Icon name="Star" size={12} className="text-yellow-500 fill-yellow-500" />
                          <span className="font-medium">{movie.rating}</span>
                        </div>
                        <span className="text-muted-foreground">{movie.year}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-4">Популярные жанры</h3>
            <div className="flex flex-wrap gap-2">
              {GENRES.map((genre) => (
                <Badge key={genre} variant="secondary" className="cursor-pointer hover-scale">
                  {genre}
                </Badge>
              ))}
            </div>
          </div>

          <h3 className="text-2xl font-bold mb-6">
            {searchQuery ? 'Результаты поиска' : 'Рекомендуем посмотреть'}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMovies.map((movie) => (
              <Card
                key={movie.id}
                className="group cursor-pointer overflow-hidden bg-card border-border hover-scale movie-card-shadow"
              >
                <div className="relative aspect-[2/3] overflow-hidden">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center">
                    <Button
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
                    >
                      <Icon name="Play" size={24} />
                    </Button>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(movie.id);
                    }}
                    className="absolute top-2 right-2 p-2 rounded-full bg-black/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <Icon
                      name="Heart"
                      size={20}
                      className={favorites.includes(movie.id) ? 'fill-primary text-primary' : 'text-white'}
                    />
                  </button>
                  <Badge className="absolute top-2 left-2 bg-primary/90">
                    {movie.quality}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2 truncate">{movie.title}</h4>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Icon name="Star" size={14} className="text-yellow-500 fill-yellow-500" />
                      <span className="font-medium">{movie.rating}</span>
                    </div>
                    <span className="text-muted-foreground">{movie.year}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredMovies.length === 0 && (
            <div className="text-center py-20">
              <Icon name="Film" size={48} className="mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Фильмы не найдены</p>
            </div>
          )}
        </section>
      </main>

      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>О нас</li>
                <li>Вакансии</li>
                <li>Пресс-центр</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Справка</li>
                <li>Контакты</li>
                <li>FAQ</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Правовая информация</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Условия использования</li>
                <li>Конфиденциальность</li>
                <li>Cookie</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Социальные сети</h4>
              <div className="flex gap-4">
                <Icon name="Facebook" size={20} className="text-muted-foreground cursor-pointer hover:text-primary transition-colors" />
                <Icon name="Twitter" size={20} className="text-muted-foreground cursor-pointer hover:text-primary transition-colors" />
                <Icon name="Instagram" size={20} className="text-muted-foreground cursor-pointer hover:text-primary transition-colors" />
              </div>
            </div>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            © 2024 Кинотеатр. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}