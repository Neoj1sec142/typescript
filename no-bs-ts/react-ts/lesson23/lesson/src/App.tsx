import React, {useCallback, useEffect, useReducer, useRef, useState} from 'react'
import './App.css';
import { useTodos } from './useTodos';
const Heading = ({title}: {title: string}) => {
  return <h2>{title}</h2>
}

const Box = ({children}: {children: React.ReactNode}) => (
  <div style={{
    padding: '1rem',
    fontWeight: 'bold'
  }}>{children}</div>
)

const Button: React.FunctionComponent<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & {
    title?: string;
  }
> = ({title, style, children, ...rest}) => <button {...rest} style={{
  ...style,
  backgroundColor: 'red', 
  color: 'white', 
  fontSize: 'xx-large'
}}>{title ?? children}</button>;

// const List:React.FunctionComponent<{
//   items: string[];
//   onClick?: (item: string) => void
// }> = ({ items, onClick }) => {
//   return(
//   <ul>
//     {items.map((item, i) => (
//       <li key={i} onClick={() => onClick?.(item)}>{item}</li>
//     ))}
//   </ul>)
// }

// interface Payload {
//   text: string;
// }

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
// const useNumber = (initialValue: number) => useState<number>(initialValue)

// type UseNumberValue = ReturnType<typeof useNumber>[0]
// type UseNumberSetValue = ReturnType<typeof useNumber>[1]

// const Incrementor:React.FunctionComponent<{
//   value: number,
//   setValue: React.Dispatch<React.SetStateAction<number>>,
// }> = ({ value, setValue }) => (
//   <button onClick={() => setValue(value + 1)}>
//     Add - {value}
//   </button>
// )

// const Incrementor:React.FunctionComponent<{
//   value: UseNumberValue,
//   setValue: UseNumberSetValue,
// }> = ({ value, setValue }) => (
//   <Button onClick={() => setValue(value + 1)} title={`Add - ${value}`}/>
// )

function UL<T>({
  items, 
  render,
  itemClick,
}: React.DetailedHTMLProps<
React.HTMLAttributes<
HTMLUListElement>, HTMLUListElement
> & {
  items: T[];
  render: (item: T) => React.ReactNode;
  itemClick: (item: T) => void;
}){
  return(
    <ul>
      {items.map((item, i) => (
        <li onClick={() => itemClick(item)} key={i}>{render(item)}</li>
      ))}
    </ul>
  )
}



function App() {
  // const onListClick = useCallback((item: string) => {
  //   alert(item)
  // }, []);

  const {todos, addTodo, removeTodo} = useTodos([
    {id: 0, text: "hey there", done: false}
  ])

  // const [payload, setPayload] = useState<Payload | null>(null)

  // useEffect(() => {
  //   fetch('/data.json')
  //   .then(res => res.json())
  //   .then(data => {setPayload(data)})
  //   .catch(e => console.log(e))
  // },[])

  // const [todos, dispatch] = useReducer(
  //   (state: Todo[], action: ActionType) => {
  //     switch(action.type){
  //       case "ADD":
  //         return [
  //           ...state,
  //           {
  //             id: state.length,
  //             text: action.text,
  //             done: false,
  //           }
  //         ]
  //       case "DELETE":
  //         return state.filter(({ id }) => id !== action.id)
  //       default: 
  //         throw new Error();
  //     }
  // }, [])

  const newTodoRef = useRef<HTMLInputElement>(null)
  
  const onAddTodo = useCallback(() => {
    if(newTodoRef.current){
        addTodo(newTodoRef.current.value)
        newTodoRef.current.value = "";
      }
  }, [addTodo])
  
  // const [value, setValue] = useNumber(0)

  return (
    <div>
      <Heading title="Introduction"/>
      <Box>
        Hello there
      </Box>


      {/* <List items={["one", "two", "three"]} onClick={onListClick}/> */}
      {/* <Box>{JSON.stringify(payload)}</Box> */}
      {/* <Incrementor value={value} setValue={setValue}/> */}
      <Heading title="Todos"/>
      <UL 
        itemClick={(item) => alert(item.id)}
        items={todos}
        render={(todo) => (
          <>
            {todo.text}
            <button onClick={() => removeTodo(todo.id)}>Remove</button>
          </>
        )}
      />

      {/* {todos.map((todo) => (
        <div key={todo.id}>
          {todo.text}
          <button onClick={() => removeTodo(todo.id)}>Remove</button>
        </div>))} */}
        <div>
          <input type="text" ref={newTodoRef}/>
          <Button onClick={onAddTodo}>AddTodo</Button>
        </div>
    </div>
  );
}

export default App;
