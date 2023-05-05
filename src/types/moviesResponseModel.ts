export type MoviesResponseModel = {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: any[];
  total_pages: number;
  total_results: number;
};
