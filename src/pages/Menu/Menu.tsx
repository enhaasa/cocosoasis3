import styles from './Menu.module.scss';
import { useContext } from 'react';

// Contexts
import { CMSContext } from '@contexts/CMS';
import { KiwiContext } from '@contexts/Kiwi';

// Components
import Page from '@components/Page/Page';
import MenuList from '@components/MenuList/MenuList';
import Title from '@components/Title/Title';
import SpecialDiningItems from '@components/SpecialDiningItems/SpecialDiningItems';

export default function Menu() {
    const cmsMenu = useContext(CMSContext).menu;
    const { specialItems } = useContext(KiwiContext).menu;
    

    return (
        <>
            <Page background={cmsMenu.content?.background}>
                <div className={styles.container}>

                    <div className={styles.specialMenuItem}>
                        <SpecialDiningItems items={specialItems} />
                    </div>

                    <div className={styles.teaser}>
                        <Title 
                            style='handwritten'
                            size='xl'
                            isCentered={true}
                            isWinged={true}
                            headline={cmsMenu?.content?.headline}
                            subline={cmsMenu?.content?.subline}
                        />
                    </div>

                    <MenuList 

                    />
                </div>
            </Page>   
        </> 
    );
}
