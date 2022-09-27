function simpleState<T>(
    init: T
): [() => T, (v: T) => void]{
    let str: T = init;
    return [
        () => str,
        (v: T) => {
            str = v;
        }
    ]
}
const [state, setState] = simpleState(1)

console.log(state())
setState(23)
console.log(state())

const [state2, setState2] = simpleState<string | null>(null)
console.log(state2())
setState2("null")
console.log(state2())

interface Rank<RankItem> {
    item: RankItem;
    rank: number;
}

function ranker<RankItem>(
    items: RankItem[], 
    rank: (v: RankItem) => number
): RankItem[] {
    
    const ranks: Rank<RankItem>[] = items.map((item) => ({
        item, 
        rank: rank(item)
    }));
    ranks.sort((a,b) => a.rank - b.rank);
    return ranks.map((rank) => rank.item);
}
interface Pokemon{
    name: string;
    hp: number;
}
const pokemon: Pokemon[] = [
    {
        name: "Bulbasaur",
        hp: 20,
    },
    {
        name: "Charmander",
        hp: 40,
    },
]
const ranks = ranker(pokemon, ({hp}) => hp)
console.log(ranks)