import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import DashboardLayout from './src/layout/DashboardLayout';
import RootLayout from './src/layout/RootLayout';
import Login from './src/pages/login';
import Certificates from './src/components/dashboard/certificates';
import MasterGame from './src/components/dashboard/MasterGame';
import ContactUs from './src/components/dashboard/ContactUs';
import GamePage from './src/components/dashboard/GamePage';
import Homepage from './src/components/dashboard/Homepage';
import DetailGame from './src/components/dashboard/DetailGame';
import FolderUploader from './src/components/dashboard/fileUploader';
import AssetsDocument from './src/components/dashboard/AssestsDocs';
import Users from './src/components/dashboard/Users';
import ForgotPassword from './src/pages/ForgotPassword';
import ProtectedRoute from './src/components/auth/ProtectedRoute';
import GameFilesUpload from './src/components/dashboard/GameFilesUpload';
import GameForm from './src/components/dashboard/GameForm';
const Route = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <RootLayout/>,
            children:[
               {
                    path: '/',
                    element:<Login   />
                },

                
                {
                    path: '/forgot-password',
                    element: <ForgotPassword />
                },
                // {
                //     path: '/sign-up',
                //     element: <SignUp />
                // },
                        {
                            path: '/dashboard',
                            element: <DashboardLayout />,
                            children:[
                                {
                                    path: '/dashboard',
                                    element:<ProtectedRoute>  <Homepage />,</ProtectedRoute>
                                },
                               
                                {
                                    path:'/dashboard/certificates',
                                    element:<ProtectedRoute><Certificates/></ProtectedRoute>
                                },
                                {
                                    path:'/dashboard/master-game-list',
                                    element:<ProtectedRoute><MasterGame/></ProtectedRoute>
                                },
                                {
                                    path:'/dashboard/support',
                                    element:<ProtectedRoute><ContactUs/></ProtectedRoute>
                                },
                                {
                                    path:'/dashboard/assets-documents',
                                    element:<ProtectedRoute><AssetsDocument/></ProtectedRoute>
                                },
                                {
                                    path:'/dashboard/games',
                                    element:<ProtectedRoute><GamePage/></ProtectedRoute>
                                },
                                {
                                    path:'/dashboard/games/game-form',
                                    element:<ProtectedRoute><GameForm/></ProtectedRoute>
                                },
                               
                                 {
                                    path:'/dashboard/games/files/:id',
                                    element:<ProtectedRoute><GameFilesUpload/></ProtectedRoute>
                                },
                                {
                                    path:'/dashboard/users',
                                    element:<ProtectedRoute><Users/></ProtectedRoute>
                                },
                                {
                                    path:'/dashboard/home',
                                    element:<ProtectedRoute><Homepage/></ProtectedRoute>
                                },
                                {
                                  path:"/dashboard/detail-game/:id",
                                  element:<ProtectedRoute><DetailGame /></ProtectedRoute>
                                },
                                {
                                  path:"/dashboard/test",
                                  element:<ProtectedRoute><FolderUploader /></ProtectedRoute>
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
