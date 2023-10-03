import { useState, useEffect } from 'react';
import restaurantDB from '../api/restaurantDB';
import { MovieFull } from '../interfaces/movieInterface';
import { Cast, CreditsResponse } from '../interfaces/creditsInterface';

interface MovieDetails {
    isLoading: boolean;
    movieFull?: MovieFull;
    cast: Cast[];
}

export const useMovieDetails = (movieId: number) => {

    const [state, setState] = useState<MovieDetails>({
        isLoading: true,
        movieFull: undefined,
        cast: []
    });

    const getMovieDetails = async() => {

        const movieDetailsPromise = await restaurantDB.get<MovieFull>(`/${movieId}`);
        const castPromise = await restaurantDB.get<CreditsResponse>(`/${movieId}/credits`);
        
        const [ movieDetailsResp, castPromiseResp ] = await Promise.all([movieDetailsPromise,castPromise]);

        setState({
            isLoading: false,
            movieFull: movieDetailsResp.data,
            cast: castPromiseResp.data.cast
        })
        
    }

    useEffect(() => {
        getMovieDetails();
    }, []);

    return {
        ...state
    }
}
