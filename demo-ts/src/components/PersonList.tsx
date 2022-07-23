type PersonListProps = {
    names: {
        first: string
        last: string
    }[]
}
export const PersonList = (props: PersonListProps) => {
    return(
        <div>
            {props.names.map((n,i)=> (<h2 key={i}>{n.first} {n.last}</h2>))}
        </div>
    )
}