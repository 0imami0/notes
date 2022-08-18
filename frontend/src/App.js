import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import NotesLisPage from './pages/NotesLisPage';
import NotePage from './pages/NotePage';

function App() {
  return (
    <Router>
      <div className='container dark'>
        <div className='app'>
          <Header/>
          <Routes>
            <Route path='/' exact element={<NotesLisPage/>}/>
            <Route path='/note/:id' element={<NotePage/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
