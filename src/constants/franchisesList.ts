import IMovie from '@models/Movie';

export interface FranchiseList {
  id: number;
  keywords?: string[];
}
export interface FranchiseListResponse extends FranchiseList {
  title: string;
  movies: IMovie[];
}

const franchisesList: FranchiseList[] = [
  { id: 1, keywords: ['Spider-Man'] },
  { id: 2, keywords: ['Batman', 'The Dark Knight'] },
  { id: 3, keywords: ['X-Men', 'The Wolverine', 'Logan'] },
  { id: 4, keywords: ['Avengers'] },
  { id: 5, keywords: ['Superman', 'Man of Steel'] },
];

export default franchisesList;
