import { useRef, useCallback, useContext } from 'react';
import { useContactDispatch } from '../hooks/contact';
import styles from "./ContactEditor.module.css";

const ContactEditor = () => {
    const { onCreate } = useContactDispatch();

    const inputRefMap = useRef(new Map());
    // useCallback을 사용하여 setInputRef 메모이제이션
    const setInputRef = useCallback((node) => {
        if (node !== null) inputRefMap.current.set(node.name, node);
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget); // [object FormData]

        // formData Web API 활용 (fields/values 쌍들의 set 구조)
        for (const [name, value] of formData) {
            if (value === "") return inputRefMap.current.get(name)?.focus();
        }

        const newContact = Object.fromEntries(formData.entries());
        onCreate(newContact);
        e.currentTarget.reset();
    };

    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <h2>💡 Add Contact</h2>
            <div className={styles.wrap}>
                <input
                    ref={setInputRef}
                    name="name"
                    placeholder="이름 ..." 
                    required
                />
                <input
                    ref={setInputRef}
                    name="contact"
                    placeholder="연락처(이메일) ..."
                    required
                />
            </div>
            <button type='submit'>Add</button>
        </form>
    );
};

export default ContactEditor;
