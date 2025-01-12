// Components
import Location from '../Location';

// Config
import location from '@config/location';

interface IOasisLocation {
    isCentered?: boolean;
}

export default function OasisLocation({ isCentered }: IOasisLocation) {

    return (
        <Location
            server={location.server}
            area={location.area}
            ward={location.ward}
            plot={location.plot}
            closestAetheryte={location.closestAetheryte}
            isCentered={isCentered}
        />    
    );
}
