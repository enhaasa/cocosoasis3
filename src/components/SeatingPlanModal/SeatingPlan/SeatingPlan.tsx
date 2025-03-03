import styles from './SeatingPlan.module.scss';
import { useContext, useState, useRef, useEffect } from 'react';

// Contexts
import { KiwiContext } from '@contexts/Kiwi';

const ORIGINAL_HEIGHT = 700;
const ORIGINAL_WIDTH = 1000;

const SEATING_HEIGHT = 40;
const SEATING_WIDTH = 40;

export default function SeatingPlan() {
    const { seatings } = useContext(KiwiContext);
    const [selectedSection, setSelectedSection] = useState(seatings.getSections()[0]);

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

        return () => observer.disconnect();
    }, []);

    return (
        <div className={styles.container}>
            <nav>
                {seatings.getSections().map(section => (
                    <button key={section.id} onClick={() => setSelectedSection(section)}>
                        {section.name}
                    </button>
                ))}
            </nav>

            <div className={styles.section} ref={sectionRef}>
                <img 
                    src={selectedSection.image_url.trim()} 
                    alt={`Section ${selectedSection.name}`} 
                />

                {seatings.getSeatingsBySectionId(selectedSection.id).map(seating => (
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
                        {seating.number}
                    </div>                        
                ))}
            </div>
        </div>    
    );
}
