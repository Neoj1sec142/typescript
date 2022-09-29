// import fetch from 'node-fetch'
// #18 @ 2:38 Need Internet to install node-fetch
interface PokemonResults{
    count: number;
    next?: string;
    previous?: string;
    results: {
        name: string;
        url: string;
    }[];
}