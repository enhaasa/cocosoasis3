import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Contexts
import { UIContextProvider } from './contexts/UI';
import { PageContextProvider } from '@contexts/Page';
import { CMSContextProvider } from '@contexts/CMS';
import { KiwiContextProvider } from '@contexts/Kiwi';
import { DiscordContextProvider } from '@contexts/Discord';
import ModalProvider from '@hooks/modals/ModalProvider';

// Components
import Header from './components/Header/Header';
import OffCanvas from '@components/OffCanvas/OffCanvas';
import ModalManager from '@components/ModalManager/ModalManager';
import SiteContainer from '@components/SiteContainer/SiteContainer';

// Pages
import Event from '@pages/Event/Event';
import ContentPage from '@pages/ContentPage/ContentPage';

// Config
import navbar from '@config/navbar';

function App() {
  return (
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
                    <Header />
                    <Routes>
                      {
                        navbar.map((item, index) => (
                          <Route key={`Route-${index}`} path={item.target} element={item.component} />
                        ))
                      }
                      <Route path={'/e/:slug'} element={<Event />}/>
                      <Route path={'/p/:slug'} element={<ContentPage />}/>
                    </Routes>
                  </SiteContainer>
                </PageContextProvider>
              </DiscordContextProvider>
            </KiwiContextProvider>
          </CMSContextProvider>
        </ModalProvider>
      </UIContextProvider>
    </Router>
  )
}

export default App
