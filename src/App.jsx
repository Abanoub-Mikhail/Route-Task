import './App.css';
import Header from './Components/Header/Header';
import MainNav from './Components/MainNav/MainNav';

function App() {
  return (
    <>
    <MainNav/>
    <div className='container mt-4 bg-white-50 py-3 rounded-3 mb-4 px-3'>
    <Header/>
    </div>
    </>
  );
}

export default App;
