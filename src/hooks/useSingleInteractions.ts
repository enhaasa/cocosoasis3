import { useState } from 'react';

type StartScreen = {
    hasSeenStartScreen: boolean;
    setHasSeenStartScreen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IUseSingleInteractions {
    startScreen: StartScreen;
}

export default function useSingleInteractions() {
    const [ hasSeenStartScreen, setHasSeenStartScreen ] = useState<boolean>(false);

    return {
        startScreen: {
            hasSeenStartScreen,
            setHasSeenStartScreen
        }
        
    }
}

