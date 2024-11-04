import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Analytics from './components/Analytics';
import Clients from './components/Clients';
import BryntumGanttScheduler from './components/BryntumGanttScheduler';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<BryntumGanttScheduler />} />
                    <Route path="analytics" element={<Analytics />} />
                    <Route path="clients" element={<Clients />} />
                    <Route path="*" element={<div>Not Found</div>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;