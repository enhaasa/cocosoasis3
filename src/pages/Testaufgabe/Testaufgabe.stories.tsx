import type { Meta } from '@ladle/react';
import Testaufgabe from './Testaufgabe';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { UIContextProvider } from '@contexts/UI';
import ModalProvider from '@hooks/modals/ModalProvider';

export default {
  title: 'Testaufgabe Page',
  component: Testaufgabe,
} satisfies Meta;

export const Default = () => (
  <BrowserRouter>
    <UIContextProvider>
        <ModalProvider>
            <Routes>
                <Route path="/" element={<Testaufgabe />} />
            </Routes>
        </ModalProvider>
    </UIContextProvider>
  </BrowserRouter>
);
