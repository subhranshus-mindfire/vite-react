import Counters from "./components/Counter";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Modal from "./components/Modal";

const App = () => {
  return (
    <div className="app container">
      <Header />
      <Counters />
      <Hero />
      <Modal />
    </div>
  );
};

export default App;
