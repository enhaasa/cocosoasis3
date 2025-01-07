import styles from './Title.module.scss';

// Components
import Text from '@components/Text/Text';

// Utils
import decoration from '@utils/decoration';

interface ITitle {
    headline: string;
    subline?: string;
    style?: 'standard' | 'handwritten' | 'signature';
    size?: 'md' | 'lg' | 'xl' | 'xxl';
    icon?: string;
    isNeon?: boolean;
    isCentered?: boolean;
    isWinged?: boolean;
}

export default function Title({ 
    headline, 
    subline, 
    size = 'lg', 
    style = 'standard', 
    icon = undefined,
    isNeon = false,
    isCentered = false, 
    isWinged = false 
}: ITitle) {
    return (
        <div className={`${styles.container} ${isCentered ? styles.centered : ''}`}>
            <h1 className={`${styles.headline} ${styles[size]} ${styles[`font-${style}`]} ${isNeon ? styles.neon : ''}`}>
                {isWinged &&
                    <img className={styles.wing} src={decoration.wingLeftWhite} />
                }                    
                    { headline }
                    {icon &&
                        <img src={icon} className={`${styles.icon} ${styles[size]}`} />
                    }
                {isWinged &&
                    <img className={styles.wing} src={decoration.wingRightWhite} />
                }
            </h1>

            {subline &&
                <h3 className={styles.subline}>
                    <Text>{ subline }</Text>
                </h3>
            }
        </div>    
    );
}
