import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import DashboardLayout from './src/layout/DashboardLayout';
import RootLayout from './src/layout/RootLayout';
import Login from './src/pages/login';
import Certificates from './src/components/dashboard/certificates';
import MasterGame from './src/components/dashboard/MasterGame';
import ContactUs from './src/components/dashboard/ContactUs';
import Roadmaps from './src/components/dashboard/Roadmaps';
import GamePage from './src/components/dashboard/GamePage';
import EngagementTools from './src/components/dashboard/EngagementTools';
import Homepage from './src/components/dashboard/Homepage';
import DetailGame from './src/components/dashboard/DetailGame';
import FolderUploader from './src/components/dashboard/fileUploader';
import AristocratInteractive from './src/components/dashboard/AristocratInteractive';
import AristocratInterPublish from './src/components/dashboard/AristocratInterPublish';
import AssetsDocument from './src/components/dashboard/AssestsDocs';
import Users from './src/components/dashboard/Users';

const Route = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <RootLayout/>,
            children:[
                {
                    path: '/',
                    element:<Login />
                },

                
                {
                    path: '/forgot-password',
                    element: <Login type={"forgot pass"}/>
                },
                        {
                            path: '/dashboard',
                            element: <DashboardLayout />,
                            children:[
                                {
                                    path: '/dashboard',
                                    element:  <Homepage />,
                                },
                               
                                {
                                    path:'/dashboard/certificates',
                                    element:<Certificates/>
                                },
                                {
                                    path:'/dashboard/master-game-list',
                                    element:<MasterGame/>
                                },
                                {
                                    path:'/dashboard/support',
                                    element:<ContactUs/>
                                },
                                {
                                    path:'/dashboard/assets-documents',
                                    element:<AssetsDocument/>
                                },
                                {
                                    path:'/dashboard/games',
                                    element:<GamePage/>
                                },
                                {
                                    path:'/dashboard/add-games/:id',
                                    element:<AristocratInteractive/>
                                },
                                 {
                                    path:'/dashboard/games/aristocrat-interactive/aristocrat-interactive-publish/:id',
                                    element:<AristocratInterPublish/>
                                },
                                {
                                    path:'/dashboard/users',
                                    element:<Users/>
                                },
                                {
                                    path:'/dashboard/home',
                                    element:<Homepage/>
                                },
                                {
                                  path:"/dashboard/detail-game/:id",
                                  element:<DetailGame />
                                },
                                {
                                  path:"/dashboard/test",
                                  element:<FolderUploader />
                                },
                               

                                
                              
                                // {
                                //     path: '/dashboard/manage-categories',
                                //     element: <AllTables  type="categories"/>
                                // },
                                // {
                                //     path: '/dashboard/questions',
                                //     element:<QuestionSection/>
                                // }
                            ]
                        },
                
            ]
        },
       
       
        
    ]);

    return (
            <RouterProvider router={router} />
    );
}

export default Route;
