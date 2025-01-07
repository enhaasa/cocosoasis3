// Components
import Location from '../Location';

// Config
import location from '@config/location';

export default function OasisLocation() {

    return (
        <Location
            server={location.server}
            area={location.area}
            ward={location.ward}
            plot={location.plot}
            closestAetheryte={location.closestAetheryte}
        />    
    );
}
