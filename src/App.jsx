import { useReducer, useRef, useMemo, useCallback, createContext } from 'react';
import './App.css';
import ContactEditor from './components/ContactEditor';
import ContactList from './components/ContactList';
import Chance from 'chance';

const chance = new Chance();
const mockData = [];
const startIdex = 6;
for (let i=0; i<startIdex; i++) {
  if (i%2 === 0) {
    mockData.push({
    id: i,
    favorite: false,
    name: chance.name({ prefix: true }),
    contact: chance.email({ domain: "naver.com"}),
    });
  } else {
    mockData.push({
    id: i,
    favorite: false,
    name: chance.name(),
    contact: chance.email({ domain: "gmail.com"}),
    });
  }
}

function reduce (state, action) {
  switch (action.type) {
    case "CREATE":
      return [ action.data, ...state ];
    case "DELETE":
      return state.filter((contact) => contact.id !== action.targetId);
    case "FAVORITE":
      return state.map((contact) => 
        contact.id === action.targetId
        ? {...contact, favorite: !contact.favorite}
        : contact
      );
    case "UPDATE":
      return [
        ...state.filter((contact) => contact.favorite),
        ...state.filter((contact) => !contact.favorite)
      ];
    default:
      return state;
  }
}

export const ContactStateContext = createContext();
export const ContactDispatchContext = createContext();

function App() {
  const [contacts, dispatch] = useReducer(reduce, mockData);
  const idRef = useRef(startIdex);

  const onCreate = useCallback((name, contact) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        favorite: false,
        name: name,
        contact: contact,
      },
    });
    dispatch({
      type: "UPDATE"
    });
  }, []);

  const onDelete = useCallback((targetId) => {
    dispatch({
      type: "DELETE",
      targetId: targetId
    });
  }, []);

  const onUpdate = useCallback((targetId) => {
    dispatch({
      type: "FAVORITE",
      targetId: targetId
    });
    dispatch({
      type: "UPDATE"
    });
  }, []);

  // Provider에 value props에 들어갈 객체 리터럴을 memoization
  const memoizedDispatch = useMemo(() => {
    return { onCreate, onDelete, onUpdate };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='App'>
      <h1>Contact List</h1>
      <ContactStateContext.Provider value={contacts}>
        <ContactDispatchContext.Provider value={memoizedDispatch}>
            <ContactEditor />
            <ContactList />
        </ContactDispatchContext.Provider>
      </ContactStateContext.Provider>
    </div>
  )
}

export default App;
