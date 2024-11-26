import { Actor } from "../actor/actor.model";
import { Director } from "../director/director.model";
import { Genero } from "../genero/genero.model";
import { Plataforma } from "../plataforma/plataforma.model";
import { Review } from "./review.model";
import { Trailer } from "./trailer.model";

export interface Pelicula {
    id: string;
    title: string;
    poster: string;
    duration: number;
    country: string;
    releaseDate: Date;
    popularity: number;
    director?: Director;
    actors?: Array<Actor>;
    genre?: Genero;
    platforms?: Array<Plataforma>;
    reviews?: Array<Review>;
    youtubeTrailer?: Trailer;
}