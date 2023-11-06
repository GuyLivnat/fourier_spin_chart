import ChartPage from './components/chart/ChartPage';
import {Route} from 'react-router-dom';
import { TooltipProvider } from './components/general_components/TooltipWithContext';


function App() {

  return (
    <main className='text-bg-dark' style={{height:'100%', minHeight:'100vh'}}>
      <section className="container-fluid">
        <TooltipProvider>
          <ChartPage/>
        </TooltipProvider>
      </section>
    </main>
)
};

export default App
