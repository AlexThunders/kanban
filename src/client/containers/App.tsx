import { Routes, Route } from 'react-router-dom';
import '../styles/index.css';
import Header from '../components/Header';
import AppSidebar from './AppSidebar';
import Board from './Board';
import IntroParagraph from './IntroParagraph';
import Trashcan from './Trashcan';

// const mainPath = process.env.REACT_APP_MAIN_PATH;
export const mainProdPath = '/appsR7/2021/kanban';
export const mainDevPath = '/';

const App: React.FC = () => {
  return (
    <div className="kanban-app">
      <Header />
      <IntroParagraph />
      <AppSidebar />
      <Routes>
        <Route>
          <Route
            path={mainDevPath}
            // path={mainProdPath}
            element={<Board />}
          />
          <Route
            // path={`${mainProdPath}/trashcan`}
            path="/trashcan"
            element={<Trashcan />}
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
