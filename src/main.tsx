import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const root = document.getElementById('root');
if (root) {
  console.log("first")
  ReactDOM.createRoot(root).render(<App />);
}
