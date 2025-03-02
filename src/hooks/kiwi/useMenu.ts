import { useState, useEffect } from "react";

import { KiwiClient } from "@service_clients/KiwiClient";

// Types
import { TDiningItem } from "@enhasa/kiwicore";

type DiningCategories = {
    [key: string]: TDiningItem[];
}

type SpecialDiningItems = {
    [key: string]: TDiningItem;
}

export type UseMenu = {
    categories: null | DiningCategories;
    specialItems: null | SpecialDiningItems;
};

enum CategoryId {
    Luxe = 1,
    Drinks = 2,
    Cocktails = 3,
    Meals = 4,
    Desserts = 5,
    Legacy = 6
}

const CATEGORIES_WITH_SPECIAL_ITEM = [
    CategoryId.Meals,
    CategoryId.Cocktails,
];

const MENU_SORTING_ORDER = ['Meals', 'Drinks', 'Cocktails', ];

export default function useMenu(client: KiwiClient) {
    const [ categories, setCategories ] = useState<null | DiningCategories>(null);
    const [ specialItems, setSpecialItems ] = useState<null | SpecialDiningItems>(null);

    useEffect(() => {
        (async () => {
            const menuResult: TDiningItem[] = await client.getMenu();
            const specialItemPromises = CATEGORIES_WITH_SPECIAL_ITEM.map(categoryId => (
                client.getSpecialItem(categoryId)
            ));
            const specialItems = await Promise.all(specialItemPromises);

            const parsedMenu: DiningCategories = {};
            const parsedSpecialItems: SpecialDiningItems = {};

            menuResult.forEach((item) => {
                if (!parsedMenu[item.type]) {
                    parsedMenu[item.type] = [];
                }
                
                const specialItem = specialItems.find(specialItem => specialItem.id === item.id);
                parsedMenu[item.type].push(specialItem ?? item);
            });

            specialItems.forEach(item => {
                parsedSpecialItems[item.type] = item;
            });

            const categories = _sortMenuByOrder(parsedMenu);
            const {Legacy, ...filteredCategories } = categories;



            setSpecialItems(parsedSpecialItems);
            setCategories(filteredCategories);
        })();
    }, [client]);


    return { categories, specialItems };

    function _sortMenuByOrder<T extends Record<string, unknown>>(obj: T): T {
        const sortedKeys: string[] = [];
        for (const sortKey of MENU_SORTING_ORDER) {
          if (sortKey in obj) {
            sortedKeys.push(sortKey);
          }
        }
        for (const key of Object.keys(obj)) {
          if (!MENU_SORTING_ORDER.includes(key)) {
            sortedKeys.push(key);
          }
        }
      
        const sortedObj: Record<string, unknown> = {};
      
        for (const key of sortedKeys) {
          sortedObj[key] = obj[key]; 
        }
      
        return sortedObj as T;
    }
}