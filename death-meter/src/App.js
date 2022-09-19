import './App.css';

const App = () => {
  return(
    <div className="App">
      <div className='app-container'>
        <header className="App-header">
          <img src='./twitch-logo.svg' className="App-logo" alt="logo" />
          <p>Death Meter</p>
        </header>
        <main>
          <article>
            <span>☠️</span>
            <h2>35</h2>
            <p>Morts sur KH III</p>
          </article>
          <div className='number'>
            <button>⚔️</button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
