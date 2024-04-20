import { memo, useContext } from 'react';
import styles from './ContactItem.module.css';
import iconFavorite from '../assets/icon_favorite.png';
import iconBlankFavorite from '../assets/icon_blank_favorite.png';
import { ContactDispatchContext } from '../App';

const ContactItem = ({id, name, favorite, contact}) => {
    const { onUpdate, onDelete } = useContext(ContactDispatchContext);

    return (
        <li className={styles.li}>
                <img
                    src={favorite ? iconFavorite : iconBlankFavorite}
                    alt='favorite icon'
                    onClick={() => onUpdate(id)}
                />
                <span className={styles.wrapper}>
                    <span className={styles.name}>{name}</span>
                    <span className={styles.contact}>{contact}</span>
                </span>
            <button 
                className={styles.removeButton}
                onClick={() => onDelete(id)}
            >
            🗑 Remove
            </button>
        </li>
    );
};

export default memo(ContactItem);