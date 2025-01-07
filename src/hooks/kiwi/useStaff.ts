import { useState, useEffect } from "react";
import { KiwiClient } from "@service_clients/KiwiClient";

// Types
import { TCharacter } from "@enhasa/kiwicore";

export type UseStaff = {
    characters: TCharacter[] | null;
};

export default function useStaff(client: KiwiClient) {
    const [ characters, setCharacters ] = useState<null | TCharacter[]>(null);

    function sortByTitle(staff: TCharacter[]): TCharacter[] {
        const titles = ["Owner", "Assistant", "Head of Operations", "Head of Relations"];
        const titleOrder: { [title: string]: number } = {};
        titles.forEach((title, index) => titleOrder[title] = index);
        
        const sortedByTitle = staff.filter(item => item.title !== null)
            .sort((a, b) => {
            const titleA = a.title ?? '';
            const titleB = b.title ?? '';
            const indexA = titleOrder[titleA] ?? Infinity;
            const indexB = titleOrder[titleB] ?? Infinity;
            return indexA - indexB;
            });
        
        const sorted = sortedByTitle.concat(staff.filter(item => item.title === null));
        return sorted;
    }

    function sortByHireDate(staff: TCharacter[]): TCharacter[] {
        return staff.sort((a: TCharacter, b: TCharacter) => {
        if (a.hired_date < b.hired_date) {
            return -1;
        }
        if (b.hired_date < a.hired_date) {
            return 1;
        }
        return 0;
        });
    }

    function capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    function parsePositions(positions: string) {
        return positions.split(',')
            .map(position => capitalizeFirstLetter(position))
            .join(' & ');
    }

    function parsePositionsOfStaff(staff: TCharacter[]): TCharacter[] {
        return staff.map(character => ({
            ...character,
            positions: parsePositions(character.positions)
        }));
    }
    

    useEffect(() => {
        client.getStaff().then(res => {
            setCharacters(sortByTitle(sortByHireDate(parsePositionsOfStaff(res))));
        });
    }, []);
 
    return {
        characters
    }
}
