export interface Show {
    id: string;
    title: string;
    type: 'movie' | 'play' | 'concert' | 'opera';
    genre: string[];
    duration: number; // in minutes
    rating: number;
    releaseDate: string;
    description: string;
    cast: string[];
    director?: string;
    language: string;
    subtitles?: string[];
    poster: string;
    backdrop: string;
    trailer?: string;
    price: {
      standard: number;
      premium?: number;
      vip?: number;
    };
    featured?: boolean;
  }
  
  export const shows: Show[] = [
    {
      id: '1',
      title: 'Phantom of the Opera',
      type: 'play',
      genre: ['Musical', 'Drama', 'Romance'],
      duration: 150,
      rating: 4.8,
      releaseDate: '2023-10-15',
      description: 'The Phantom of the Opera is a musical with music by Andrew Lloyd Webber. Based on the French novel by Gaston Leroux, its central plot revolves around a beautiful soprano, Christine Daaé, who becomes the obsession of a mysterious, disfigured musical genius living in the subterranean labyrinth beneath the Paris Opéra House.',
      cast: ['Sarah Brightman', 'Michael Crawford', 'Steve Barton'],
      director: 'Harold Prince',
      language: 'English',
      poster: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434',
      backdrop: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212',
      price: {
        standard: 75,
        premium: 120,
        vip: 200
      },
      featured: true
    },
    {
      id: '2',
      title: 'Hamilton',
      type: 'play',
      genre: ['Musical', 'Historical', 'Drama'],
      duration: 165,
      rating: 4.9,
      releaseDate: '2023-09-20',
      description: 'Hamilton is a musical with music, lyrics, and book by Lin-Manuel Miranda. It tells the story of American Founding Father Alexander Hamilton through music that draws heavily from hip hop, as well as R&B, pop, soul, and traditional-style show tunes.',
      cast: ['Lin-Manuel Miranda', 'Leslie Odom Jr.', 'Phillipa Soo'],
      director: 'Thomas Kail',
      language: 'English',
      poster: 'https://images.unsplash.com/photo-1503095396549-807759245b35',
      backdrop: 'https://images.unsplash.com/photo-1507924538820-ede94a04019d',
      price: {
        standard: 80,
        premium: 150,
        vip: 250
      },
      featured: true
    },
    {
      id: '3',
      title: 'The Lion King',
      type: 'play',
      genre: ['Musical', 'Family', 'Drama'],
      duration: 150,
      rating: 4.7,
      releaseDate: '2023-11-05',
      description: "The Lion King is a musical based on the 1994 Disney animated film of the same name with music by Elton John and lyrics by Tim Rice. Directed by Julie Taymor, the musical features actors in animal costumes as well as giant, hollow puppets.",
      cast: ['Tshidi Manye', 'L. Steven Taylor', 'Brandon A. McCall'],
      director: 'Julie Taymor',
      language: 'English',
      poster: 'https://images.unsplash.com/photo-1559223607-a43c990c692c',
      backdrop: 'https://images.unsplash.com/photo-1605123728007-d43b775011d1',
      price: {
        standard: 70,
        premium: 110,
        vip: 180
      }
    },
    {
      id: '4',
      title: 'Wicked',
      type: 'play',
      genre: ['Musical', 'Fantasy', 'Drama'],
      duration: 165,
      rating: 4.6,
      releaseDate: '2023-08-30',
      description: "Wicked is a musical with music and lyrics by Stephen Schwartz and book by Winnie Holzman. It is based on the 1995 Gregory Maguire novel Wicked: The Life and Times of the Wicked Witch of the West, an alternative telling of the 1939 film The Wizard of Oz and L. Frank Baum's classic 1900 novel.",
      cast: ['Idina Menzel', 'Kristin Chenoweth', 'Joel Grey'],
      director: 'Joe Mantello',
      language: 'English',
      poster: 'https://images.unsplash.com/photo-1551041777-ed277b8dd348',
      backdrop: 'https://images.unsplash.com/photo-1516450360452-9312f5463ebf',
      price: {
        standard: 65,
        premium: 100,
        vip: 170
      }
    },
    {
      id: '5',
      title: 'Swan Lake',
      type: 'opera',
      genre: ['Ballet', 'Classical', 'Romance'],
      duration: 180,
      rating: 4.9,
      releaseDate: '2023-12-10',
      description: "Swan Lake is a ballet composed by Pyotr Ilyich Tchaikovsky in 1875–76. Despite its initial failure, it is now one of the most popular ballets of all time. The scenario, initially in two acts, was fashioned from Russian and German folk tales.",
      cast: ['Misty Copeland', 'Roberto Bolle', 'Svetlana Zakharova'],
      director: 'Kevin McKenzie',
      language: 'None',
      poster: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434',
      backdrop: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3',
      price: {
        standard: 90,
        premium: 140,
        vip: 220
      },
      featured: true
    },
    {
      id: '6',
      title: 'Les Misérables',
      type: 'play',
      genre: ['Musical', 'Historical', 'Drama'],
      duration: 170,
      rating: 4.7,
      releaseDate: '2023-07-15',
      description: "Les Misérables is a sung-through musical adaptation of Victor Hugo's 1862 novel of the same name, by Claude-Michel Schönberg (music), Alain Boublil and Jean-Marc Natel (original French lyrics), and Herbert Kretzmer (English lyrics).",
      cast: ['Alfie Boe', 'Nick Jonas', 'Lea Salonga'],
      director: 'Trevor Nunn',
      language: 'English',
      poster: 'https://images.unsplash.com/photo-1468164016595-6108e4c60c8b',
      backdrop: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf',
      price: {
        standard: 75,
        premium: 120,
        vip: 190
      }
    },
    {
      id: '7',
      title: 'Chicago',
      type: 'play',
      genre: ['Musical', 'Crime', 'Comedy'],
      duration: 150,
      rating: 4.5,
      releaseDate: '2023-09-05',
      description: "Chicago is an American musical with music by John Kander, lyrics by Fred Ebb, and book by Ebb and Bob Fosse. Set in Chicago during the jazz age, the musical is based on a 1926 play of the same title by reporter Maurine Dallas Watkins, about actual criminals and the crimes on which she reported.",
      cast: ['Renée Zellweger', 'Catherine Zeta-Jones', 'Richard Gere'],
      director: 'Walter Bobbie',
      language: 'English',
      poster: 'https://images.unsplash.com/photo-1506157786151-b8491531f063',
      backdrop: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4',
      price: {
        standard: 60,
        premium: 95,
        vip: 160
      }
    },
    {
      id: '8',
      title: 'The Nutcracker',
      type: 'opera',
      genre: ['Ballet', 'Classical', 'Fantasy'],
      duration: 135,
      rating: 4.6,
      releaseDate: '2023-12-20',
      description: "The Nutcracker is a two-act ballet, originally choreographed by Marius Petipa and Lev Ivanov with a score by Pyotr Ilyich Tchaikovsky. The libretto is adapted from E. T. A. Hoffmann's story 'The Nutcracker and the Mouse King'.",
      cast: ['Misty Copeland', 'James Whiteside', 'Isabella Boylston'],
      director: 'Alexei Ratmansky',
      language: 'None',
      poster: 'https://images.unsplash.com/photo-1545167496-c1e092d383a2',
      backdrop: 'https://images.unsplash.com/photo-1514306191717-452ec28c7814',
      price: {
        standard: 85,
        premium: 130,
        vip: 200
      }
    }
  ];