import styles from './Title.module.scss';

// Components
import Text from '@components/Text/Text';
import Icon from '@components/Icon/Icon';

// Utils
import decoration from '@utils/decoration';

interface ITitle {
    headline: string;
    subline?: string;
    style?: 'standard' | 'handwritten';
    size?: 'lg' | 'xl' | 'xxl';
    isCentered?: boolean;
    isWinged?: boolean;
}

export default function Title({ 
    headline, 
    subline, 
    size = 'lg', 
    style = 'standard', 
    isCentered = false, 
    isWinged = false 
}: ITitle) {
    return (
        <div className={`${styles.container} ${isCentered ? styles.centered : ''}`}>

            <h1 className={`${styles.headline} ${styles[size]} ${styles[`font-${style}`]}`}>
                {isWinged &&
                    <img className={styles.wing} src={decoration.wingLeftWhite} />
                }

                { headline }

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
