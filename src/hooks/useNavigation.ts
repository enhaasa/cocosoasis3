import { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Contexts
import { UIContext } from "@contexts/UI";

// Config
import navbar from "@config/navbar";

const PAGE_NAVIGATION_DELAY = 500;
const EXTERNAL_LINK_TRIGGERS = [
    'https://',
    'http://'
];

export interface IUseNavigation {
    currentPageIndex: {
        get: number;
        set: React.Dispatch<React.SetStateAction<number>>
    },
    isCurrentPath: (T: string) => boolean;
    getCurrentPath: () => string;
    internalNavigate: (T: string) => void;
    externalNavigate: (T: string, R: boolean) => void;
    dynamicNavigate: (path: string, isNewTab: boolean) => void;
    getPageIndexByPath: (T: string) => number;
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

export default function useNavigation() {
    const navigate = useNavigate();
    const location = useLocation();

    const { offCanvas, page } = useContext(UIContext);
    const [ currentPageIndex, setCurrentPageIndex ] = useState(getPageIndexByPath(location.pathname));

    function isExternalLink(path: string) {
        let isExternal = false;

        for (const link of EXTERNAL_LINK_TRIGGERS) {
            if (path.startsWith(link)) {
                isExternal = true;
                break;
            }
        }

        return isExternal;
    }

    function isCurrentPath(path: string) {
        return (location.pathname === `/${path}` || location.pathname === path);
    }

    function getCurrentPath() {
        return location.pathname;
    }

    function getPageIndexByPath(path: string) {
        return navbar.findIndex((item) => (item.target === path));
    }

    function internalNavigate(path: string) {
        offCanvas.hide();

        if (isCurrentPath(path)) return;
        
        setCurrentPageIndex(getPageIndexByPath(path));
        page.hide();

        scrollToTop();

        setTimeout(() => {
            navigate(path);
            page.show();
        }, PAGE_NAVIGATION_DELAY);        
    }

    function externalNavigate(path: string, isNewTab: boolean = false) {
        if (isNewTab) {
            window.open(path, '_blank');
        } else {
            window.location.href = path;
        }
    }

    function dynamicNavigate(path: string, isNewTab: boolean = false) {
        if (isExternalLink(path)) {
            externalNavigate(path, isNewTab);
        } else {
            internalNavigate(path);
        }
    }

    return {
        currentPageIndex: {
            get: currentPageIndex,
            set: setCurrentPageIndex
        },
        isCurrentPath,
        getCurrentPath,
        internalNavigate,
        externalNavigate,
        dynamicNavigate,
        getPageIndexByPath
    }
}