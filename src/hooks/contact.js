import { useContext, useRef } from 'react';
import {
    ContactStateContext,
    ContactDispatchContext,
    INITIAL_CONTACT_COUNT,
} from '../components/ContactContext';

export function useContactState() {
    const contacts = useContext(ContactStateContext);

    if(!contacts) {
        throw new Error("useContactState should be called inside ContactProvider");
    }

    return contacts;
}

export function useContactDispatch() {
    const idRef = useRef(INITIAL_CONTACT_COUNT);
    const dispatch = useContext(ContactDispatchContext);

    if(!dispatch) {
        throw new Error(
            "useContactDispatch should be called inside ContactProvider"
        );
    }
    
    const onCreate = ({ name, contact }) => {
        dispatch({
            type: "CREATE",
            data: {
                id: idRef.current++,
                name,
                contact,
                favorite: false,
            },
        });
    };

    const onDelete = (targetId) => {
        dispatch({
            type: "DELETE",
            targetId,
        });
    };

    const onUpdate = (targetId) => {
        dispatch({
            type: "FAVORITE",
            targetId,
        });
    };

    return { onCreate, onDelete, onUpdate }
}

