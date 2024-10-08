import { Outlet, ScrollRestoration, createBrowserRouter } from 'react-router-dom'
// import MainPage from '../pages/MainPage'
import FashionMain from '../pages/FashionMain'
import FineMain from '../pages/FineMain'
import AdminPage from '../pages/AdminPage'
import TestPage from '../pages/TestPage'
import FashionPostPage from '../pages/FashionPostPage'

const ScrollRestorationProvider = () => {
  return <><ScrollRestoration /><Outlet /></>
}

const AppRouter = createBrowserRouter([
  {element: <ScrollRestorationProvider />,
    children: [
    { path: '/', element:<FashionMain/> },
    { path: '/fashion/:tags?', element:<FashionMain/> },
    { path: '/fine', element:<FineMain/> },
    { path: '/Admin', element:<AdminPage/> },
    { path: '/TestPage', element:<TestPage/> },
    { path: '/fashion/post/:title', element:<FashionPostPage/> },
    ]}

  ]);

export default AppRouter;