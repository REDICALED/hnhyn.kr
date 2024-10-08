// import React, { useState } from 'react'
import {  RouterProvider } from 'react-router-dom'
import AppRouter from './router/AppRouter.tsx'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  RecoilRoot,
} from 'recoil';
import ModalProvider from './providers/ModalProvider.tsx';

function App() {

  return (
    <>
      <RecoilRoot>
        <ModalProvider>
          <RouterProvider router={AppRouter}/>
        </ModalProvider>
      </RecoilRoot>
    </>
  )
}

export default App;
