/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLayoutEffect, useRef } from 'react';

// Utils
import gsap from 'gsap';

interface IChainSpawn {
    items: any[];
}

const DELAY = 0.15; 

export default function ChainSpawn({ items }: IChainSpawn) {
    const containerRefs = useRef<(HTMLDivElement | null)[]>([]);

    useLayoutEffect(() => {
        if (containerRefs.current.length > 0) {
            gsap.fromTo(
                containerRefs.current.filter((ref) => ref !== null), 
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 0.5, 
                    stagger: DELAY, 
                    ease: "power2.out",
                }
            );
        }
    }, [items]);

    return (
        <>
            {items.map((item, index) => (
                <div
                    key={`ChainSpawnItem-${index}`}
                    ref={(el) => {
                        containerRefs.current[index] = el;
                    }}
                    style={{ opacity: 0 }}
                >
                    <div>
                        {item}
                    </div>
                </div>
            ))}
        </>
    );
}
