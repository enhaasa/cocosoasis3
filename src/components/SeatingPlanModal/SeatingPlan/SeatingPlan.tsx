import styles from './SeatingPlan.module.scss';
import { useContext, useState, useRef, useEffect } from 'react';

// Contexts
import { KiwiContext } from '@contexts/Kiwi';

// Components
import Spinner from '@components/Spinner/Spinner';
import Text from '@components/Text/Text';
import icon from '@utils/icon';
import MultiToggle from '@components/MultiToggle/MultiToggle';

// Utils
import { getEpochTimeSinceInHoursAndMinutes } from '@utils/time';

const ORIGINAL_HEIGHT = 700;
const ORIGINAL_WIDTH = 1000;

const SEATING_HEIGHT = 40;
const SEATING_WIDTH = 40;

const LAST_REFRESHED_UPDATE_INTERVAL = 60000; // Milliseconds

export default function SeatingPlan() {
    const { seatings } = useContext(KiwiContext);
    const [selectedSection, setSelectedSection] = useState(seatings.getSections()[0]);
    const [ lastRefreshed, setLastRefreshed ] = useState<string>(getEpochTimeSinceInHoursAndMinutes(seatings.lastRefreshed));

    const [seatingOffset, setSeatingOffset] = useState({ scaleX: 1, scaleY: 1 });

    const sectionRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const observer = new ResizeObserver(entries => {
            for (let entry of entries) {
                const { width, height } = entry.contentRect;

                const scaleX = width / ORIGINAL_WIDTH;
                const scaleY = height / ORIGINAL_HEIGHT;

                setSeatingOffset({ scaleX, scaleY });
            }
        });

        observer.observe(sectionRef.current);

        seatings.refresh();

        const lastRefreshedInterval = setInterval(() => {
            updateLastRefreshed();
        }, LAST_REFRESHED_UPDATE_INTERVAL);

        return () => {
            clearInterval(lastRefreshedInterval);
            observer.disconnect()
        };
    }, []);

    useEffect(() => {
        updateLastRefreshed();
    }, [ seatings.lastRefreshed ]);

    function getImage() {
        return selectedSection.image_url.trim()
    }

    function updateLastRefreshed() {
        setLastRefreshed(getEpochTimeSinceInHoursAndMinutes(seatings.lastRefreshed));
    }

    return (
        <div className={styles.container}>
            <nav className={styles.topNav}>
                <nav className={styles.sectionSelection}>
                    <MultiToggle 
                        options={seatings.getSections().map(s => s.name)} 
                        onSelect={(name: string) => {
                            setSelectedSection(seatings.getSections().find(s => s.name === name)!)
                        }}
                        initSelected={selectedSection.name}
                        size='sm'
                    />
                </nav>
                <span className={styles.refresh}>
                    <button onClick={seatings.refresh}>
                        <span className={styles.lastRefreshed}>Updated {lastRefreshed}</span>
                        <img src={icon.refresh} />
                    </button>
                </span>
            </nav>

            <div className={styles.section} ref={sectionRef}>
                <img 
                    src={getImage()} 
                    alt={`Section ${selectedSection.name}`} 
                />

                {!seatings.isLoading
                    ? seatings.getSeatingsBySectionId(selectedSection.id).map(seating => (
                        <div 
                            key={seating.id}
                            className={`${styles.seating} ${styles[seating.availability]}`}
                            style={{
                                left: (seating.pos_x * seatingOffset.scaleX),
                                top: (seating.pos_y * seatingOffset.scaleY),
                                height: SEATING_HEIGHT,
                                width: SEATING_WIDTH
                            }}
                        >
                            <Text>{seating.number}</Text>
                        </div>                        
                    ))
                    : <div className={styles.spinnerContainer}>
                        <Spinner />
                    </div>
                }
            </div>
        </div>    
    );
}
