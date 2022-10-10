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

// interface Todo {
//   id: number;
//   done: boolean;
//   text: string;
// }

// type ActionType = 
//   | { type: "ADD", text: string }
//   | { type: "DELETE", id: number }

// const onListClick = useCallback((item: string) => {
  //   alert(item)
  // }, []);

  

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

  // const [value, setValue] = useNumber(0)


import React, {useCallback, useRef} from 'react'
import './App.css';
import { TodosProvider, useTodosManager } from './useTodos';
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
  

  const {todos, addTodo, removeTodo} = useTodosManager([
    {id: 0, text: "hey there", done: false}
  ])

  const newTodoRef = useRef<HTMLInputElement>(null)
  
  const onAddTodo = useCallback(() => {
    if(newTodoRef.current){
        addTodo(newTodoRef.current.value)
        newTodoRef.current.value = "";
      }
  }, [addTodo])
  
  

  return (
    <div>
      <Heading title="Introduction"/>
      <Box>Hello there</Box>
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
        <div>
          <input type="text" ref={newTodoRef}/>
          <Button onClick={onAddTodo}>AddTodo</Button>
        </div>
    </div>
  );
}

const AppWrapper = () => (
  <TodosProvider initialTodos={[{id: 0, text: "Hey there useContext", done: false}]}>
  <div style={{
    display:"grid",
    gridTemplateColumns: "50% 50%"
  }}><App/><App/></div>
  </TodosProvider>
)

export default AppWrapper;
