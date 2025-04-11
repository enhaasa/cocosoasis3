import styles from './Syncshell.module.scss';
import syncshell from '@config/syncshell';

// Icons
import icon from '@utils/icon';

// Components
import Text from '@components/Text/Text';
import Separator from '@components/Separator/Separator';
import Icon from '@components/Icon/Icon';
import Title from '@components/Title/Title';

const SYNCSHELL_TEXT_SIZE = 'lg';

export default function Syncshell() {

    return (
        <div className={styles.container}>

            <div className={styles.content}>
                <Title 
                    headline='Syncshell'
                    style='handwritten'
                    size='xl'
                />

                <Separator />
                
                <div className={styles.login}>
                    <div className={styles.row}>
                        <span className={styles.key}><Text size={SYNCSHELL_TEXT_SIZE}>ID:</Text></span>
                        <span className={styles.val}><Text size={SYNCSHELL_TEXT_SIZE}>{syncshell.id}</Text></span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.key}><Text size={SYNCSHELL_TEXT_SIZE}>Password:</Text></span>
                        <span className={styles.val}><Text size={SYNCSHELL_TEXT_SIZE}>{syncshell.password}</Text></span>
                    </div>
                </div>

                <Separator />

                <div className={styles.disclaimer}>
                    <div className={styles.headline}>
                        <Text size='lg'>
                            <Icon size='lg' icon={icon.warning} /> <b>Mare rules</b>
                        </Text>
                    </div>
                    <p>
                        <ul>
                            <li><Text>Nudity is not tolerated.</Text></li>
                            <li><Text>Loud, repetitive, or otherwise disruptive VFX or SFX is not tolerated.</Text></li>
                        </ul>
                    </p>
                    <div className={styles.headline}>
                        <Text size='lg'>
                            <Icon size='lg' icon={icon.info} /> <b>Please be mindful of your memory usage</b>
                        </Text>
                    </div>
                    <p>
                        <Text>
                            We love to see your beautiful outfits and characters, but please consider the memory usage of your fellow guests.
                            Avoiding 4K textures, and/or compressing your mods can help significantly reduce the resource usage for everyone in the syncshell.
                        </Text>
                        
                    </p>
                </div>
            </div>
        </div>    
    );
}
