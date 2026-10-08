export interface ExplorePhoto {
  id: string;
  url: string;
  tags: string[];
  likes: number;
}

const px = (id: number, slug = 'photo') =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=400`;

export const exploreCategories = ['All', 'Nature', 'Events', 'Food', 'Culture', 'Sunset', 'Weather', 'Seasons'];

// Image IDs reused from the original project's mock data
export const explorePhotos: ExplorePhoto[] = [
  { id: 'e1', url: px(417074), tags: ['Nature', 'Sunset', 'Seasons'], likes: 3420 },
  { id: 'e2', url: px(1040880), tags: ['Culture', 'Events'], likes: 2890 },
  { id: 'e3', url: px(1366919), tags: ['Nature', 'Weather'], likes: 1560 },
  { id: 'e4', url: 'https://images.pexels.com/photos/158163/clouds-cloudporn-weather-lookup-158163.jpeg?auto=compress&cs=tinysrgb&w=400', tags: ['Sunset', 'Weather'], likes: 4120 },
  { id: 'e5', url: px(466685), tags: ['Culture', 'Events'], likes: 980 },
  { id: 'e6', url: px(1287145), tags: ['Nature', 'Seasons'], likes: 2210 },
  { id: 'e7', url: px(220453), tags: ['Culture'], likes: 1730 },
  { id: 'e8', url: px(415829), tags: ['Events', 'Food'], likes: 2040 },
  { id: 'e9', url: px(1239291), tags: ['Food', 'Culture'], likes: 1320 },
];
