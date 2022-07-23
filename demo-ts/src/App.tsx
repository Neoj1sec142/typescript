import { Greet } from './components/Greet'
import { Person } from './components/Person';
import { PersonList } from './components/PersonList';
import './App.css';

const App = () => {
  const personName = {
    first: 'Bruce',
    last: 'Wayne'
  }
  const personList = [
    {
      first: 'Bruce',
      last: 'Wayne'
    },
    {
      first: 'Clark',
      last: 'Kent'
    },
    {
      first: 'Princess',
      last: 'Diana'
    }
  ]
  return (
    <div className="App">
      <Greet name='Neo' messageCount={20} isLoggedIn={false}/>
      <Person name={personName}/>
      <PersonList names={personList}/>
    </div>
  );
}

export default App;
