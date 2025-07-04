import Counters from "./components/Counter";
import Header from "./components/Header";
import Hero from "./components/Hero";

const App = () => {
  return (
    <div className="app container">
      <Header />
      <Counters />
      <Hero />
    </div>
  );
};

export default App;
