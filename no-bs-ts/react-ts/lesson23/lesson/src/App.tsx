import React, {useCallback, useEffect, useReducer, useRef, useState} from 'react'
import './App.css';

const Heading = ({title}: {title: string}) => {
  return <h2>{title}</h2>
}

const Box = ({children}: {children: React.ReactNode}) => (
  <div style={{
    padding: '1rem',
    fontWeight: 'bold'
  }}>{children}</div>
)

const List:React.FunctionComponent<{
  items: string[];
  onClick?: (item: string) => void
}> = ({ items, onClick }) => {
  return(
  <ul>
    {items.map((item, i) => (
      <li key={i} onClick={() => onClick?.(item)}>{item}</li>
    ))}
  </ul>)
}
interface Payload {
  text: string;
}

interface Todo {
  id: number;
  done: boolean;
  text: string;
}

type ActionType = 
  | { type: "ADD", text: string }
  | { type: "DELETE", id: number }


// To avoid the React.Dispatch<React.SetStateAction<number>> line 
// follow the next 3 lines (const, type, type) then use the types
// in the generic spot of the react.functioncomponent
const useNumber = (initialValue: number) => useState<number>(initialValue)
type UseNumberValue = ReturnType<typeof useNumber>[0]
type UseNumberSetValue = ReturnType<typeof useNumber>[1]

// const Incrementor:React.FunctionComponent<{
//   value: number,
//   setValue: React.Dispatch<React.SetStateAction<number>>,
// }> = ({ value, setValue }) => (
//   <button onClick={() => setValue(value + 1)}>
//     Add - {value}
//   </button>
// )

const Incrementor:React.FunctionComponent<{
  value: UseNumberValue,
  setValue: UseNumberSetValue,
}> = ({ value, setValue }) => (
  <button onClick={() => setValue(value + 1)}>
    Add - {value}
  </button>
)

function App() {
  const onListClick = useCallback((item: string) => {
    alert(item)
  }, []);

  

  const [payload, setPayload] = useState<Payload | null>(null)

  useEffect(() => {
    fetch('/data.json')
    .then(res => res.json())
    .then(data => {setPayload(data)})
    .catch(e => console.log(e))
  },[])

  const [todos, dispatch] = useReducer(
    (state: Todo[], action: ActionType) => {
      switch(action.type){
        case "ADD":
          return [
            ...state,
            {
              id: state.length,
              text: action.text,
              done: false,
            }
          ]
        case "DELETE":
          return state.filter(({ id }) => id !== action.id)
        default: 
          throw new Error();
      }
  }, [])

  const newTodoRef = useRef<HTMLInputElement>(null)
  
  const onAddTodo = useCallback(() => {
    if(newTodoRef.current){
      dispatch({
        type: "ADD",
        text: newTodoRef.current.value
      })
      newTodoRef.current.value = "";
    }
  }, [dispatch])
  
  const [value, setValue] = useNumber(0)

  return (
    <div>
      <Heading title="Introduction"/>
      <Box>
        Hello there
      </Box>
      <List items={["one", "two", "three"]} onClick={onListClick}/>
      <Box>{JSON.stringify(payload)}</Box>
      <Incrementor value={value} setValue={setValue}/>
      <Heading title="Todos"/>
      {todos.map((todo) => (
        <div key={todo.id}>
          {todo.text}
          <button onClick={() => dispatch({
            type: "DELETE",
            id: todo.id,
          })}>Remove</button>
        </div>))}
        <div>
          <input type="text" ref={newTodoRef}/>
          <button onClick={onAddTodo}>AddTodo</button>
        </div>
    </div>
  );
}

export default App;
