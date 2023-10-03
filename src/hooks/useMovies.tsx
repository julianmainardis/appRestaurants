import { useEffect, useState } from 'react';
import restaurantDB from '../api/restaurantDB';
import { Movie, RestaurantDBMoviesResponse } from '../interfaces/movieInterface';

interface MoviesState {
    nowPlaying: Movie[];
    popular: Movie[];
    topRated: Movie[];
    upcoming: Movie[];
}

export const useMovies = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [moviesState, setMoviesState] = useState<MoviesState>({
        nowPlaying: [],
        popular: [],
        topRated: [],
        upcoming: [],
    });

    const getMovies = async() => {

        const nowPlayingPromise = restaurantDB.get<RestaurantDBMoviesResponse>('/now_playing');
        const popularPromise = restaurantDB.get<RestaurantDBMoviesResponse>('/popular');
        const topRatedPromise = restaurantDB.get<RestaurantDBMoviesResponse>('/top_rated');
        const upcomingPromise = restaurantDB.get<RestaurantDBMoviesResponse>('/upcoming');

        const response = await Promise.all([
            nowPlayingPromise,
            popularPromise,
            topRatedPromise,
            upcomingPromise
        ]);

        setMoviesState({
            nowPlaying: response[0].data.results,
            popular: response[1].data.results,
            topRated: response[2].data.results,
            upcoming: response[3].data.results,
        })
        
        setIsLoading(false);
    }
    
    useEffect(() => {
        // now_playing
        getMovies();
    }, [])

    return {
        ...moviesState,
        isLoading
    }
}
