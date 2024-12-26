import styles from './Menu.module.scss';
import { useContext } from 'react';

// Contexts
import { CMSContext } from '@contexts/CMS';

// Components
import Page from '@components/Page/Page';
import MenuList from '@components/MenuList/MenuList';
import Title from '@components/Title/Title';

export default function Menu() {
    const { menu } = useContext(CMSContext);

    console.log(menu.content)

    return (
        <>
            <Page>
                <div className={styles.container}>
                    <div className={styles.teaser}>
                        <Title 
                            style='handwritten'
                            size='xl'
                            isCentered={true}
                            isWinged={true}
                            headline={menu?.content?.headline}
                            subline={menu?.content?.subline}
                        />
                    </div>

                    <MenuList />
                </div>

            </Page>   
            
            <div 
                className={styles.background} 
                style={{ backgroundImage: `url("${menu.content?.background}")` }} 
            />
        </> 
    );
}
