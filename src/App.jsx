import ContactProvider from './components/ContactContext';
import ContactEditor from './components/ContactEditor';
import ContactList from './components/ContactList';
import './App.css';


function App() {
  return (
    <div className='App'>
      <h1>Contact List</h1>
      <ContactProvider>
        <ContactEditor />
        <ContactList />
      </ContactProvider>
    </div>
  )
}

export default App;
