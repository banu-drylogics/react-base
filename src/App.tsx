import './App.css';
import DonutChart from './components/dount/Dount';
import { updatedData } from './components/dount/chartData';


function App() {

  return (
    <div className="container">
      < DonutChart data={updatedData} />
    </div>
  );
}

export default App;
