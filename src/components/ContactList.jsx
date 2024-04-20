import { useState, useContext } from 'react';
import ContactItem from './ContactItem';
import styles from './ContactList.module.css';
import { ContactStateContext } from '../App';


const ContactList = () => {
    const [search, setSearch] = useState("");
    const contacts = useContext(ContactStateContext);

    const onSearch = (e) => {
        setSearch(e.target.value)
    };

    const filteredData = () => {
        if (search === "") {
            return contacts;
        } else {
            return contacts.filter(contact => contact.name.toLowerCase().includes(search.toLowerCase()));
        }
    };

    return (
        <ul className={styles.ul}>
            <h2>📒 Contact List ({contacts.length}개)</h2>
            <input
                placeholder='🔍 이름으로 검색할 수 있어요'
                value={search}
                onChange={onSearch}
            />
            {filteredData().map((contact) =>
                <ContactItem
                    key={contact.id}
                    {...contact}
                />
            )}
        </ul>
    );
};

export default ContactList;