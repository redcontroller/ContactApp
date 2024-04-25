import { useState } from 'react';
import { useContactState } from "../hooks/contact";
import ContactItem from './ContactItem';
import styles from './ContactList.module.css';

const ContactList = () => {
    const contacts = useContactState();
    const [search, setSearch] = useState("");
    // (RegExp.prototype.ignoreCase) "i" 플래그는 문자열 매칭에서 대소문자를 구분하지 않음
    const searchPattern = new RegExp(search, "i");

    const onSearch = (e) => {
        setSearch(e.target.value)
    };

    const filteredData = (
        search === ""
            ? contacts
            : contacts.filter((contact) => searchPattern.test(contact.name))
    ).sort((a, b) => b.favorite - a.favorite);

    return (
        <ul className={styles.ul}>
            <h2>📒 Contact List ({contacts.length}개)</h2>
            <input
                placeholder='🔍 이름으로 검색할 수 있어요'
                value={search}
                onChange={onSearch}
            />
            {filteredData.map((contact) =>
                <ContactItem key={contact.id} {...contact} />
            )}
        </ul>
    );
};

export default ContactList;