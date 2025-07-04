import Alert from "./components/Alert";
import Counters from "./components/Counter";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Modal from "./components/Modal";

const App = () => {
  return (
    <div className="app container contents">
      <Header />
      <Counters />
      <Hero />
      <Modal />
      <Alert />
    </div>
  );
};

export default App;
