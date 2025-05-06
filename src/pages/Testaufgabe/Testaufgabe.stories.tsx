import type { Meta } from '@ladle/react';
import Testaufgabe from './Testaufgabe';
import './../../index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Contexts
import { UIContextProvider } from '@contexts/UI';
import { PageContextProvider } from '@contexts/Page';
import { CMSContextProvider } from '@contexts/CMS';
import { KiwiContextProvider } from '@contexts/Kiwi';
import { DiscordContextProvider } from '@contexts/Discord';
import ModalProvider from '@hooks/modals/ModalProvider';

// Components
import OffCanvas from '@components/OffCanvas/OffCanvas';
import ModalManager from '@components/ModalManager/ModalManager';
import SiteContainer from '@components/SiteContainer/SiteContainer';

export default {
  title: 'Testaufgabe Page',
  component: Testaufgabe,
} satisfies Meta;

export const Default = () => (
    /* 
        TODO | Preview purposes
        index.css body styles just refuses to apply. 
        This temporary work-around has to be cleaned up.
    */
    <div style={{ backgroundColor: "rgb(8,8,8)"}}>

        <Router>
            <UIContextProvider>
                <ModalProvider>
                    <CMSContextProvider>
                        <KiwiContextProvider>
                            <DiscordContextProvider>
                                <PageContextProvider>
                                    <ModalManager />
                                    <OffCanvas />
                                    <SiteContainer>
                                        <Routes>
                                            <Route path="/" element={<Testaufgabe />} />
                                        </Routes>
                                    </SiteContainer>
                                </PageContextProvider>
                            </DiscordContextProvider>
                        </KiwiContextProvider>
                    </CMSContextProvider>
                </ModalProvider>
            </UIContextProvider>
        </Router>
    </div>
);
