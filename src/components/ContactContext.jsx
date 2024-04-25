import { createContext, useReducer } from 'react';
import Chance from 'chance';

const chance = new Chance();
export const INITIAL_CONTACT_COUNT = 6;

const initialContacts = Array.from({ length: INITIAL_CONTACT_COUNT }).map(
    (_, i) => {
        const isEven = (i%2 === 0);
        return ({
            id: i,
            name: chance.name({ prefix: isEven }),
            contact: chance.email({ domain: isEven ? "naver.com" : "gmail.com"}),
            favorite: false,
        });
    }
);

const contactReducer = (state, action) => {
    switch (action.type) {
        case "CREATE":
            return [ action.data, ...state ];
        case "DELETE":
            return state.filter((contact) => contact.id !== action.targetId);
        case "FAVORITE":
            return state.map((contact) => 
                contact.id === action.targetId
                ? {...contact, favorite: !contact.favorite}
                : contact
            );
        default:
            throw new Error(`Undefined Action Type: ${action.type}`)
    }
};

export const ContactStateContext = createContext(undefined); // default: null
export const ContactDispatchContext = createContext(undefined);

export default function ContactProvider ({ children }) {
    const [contacts, dispatch] = useReducer(contactReducer, initialContacts);
    
    return (
        <ContactStateContext.Provider value={contacts}>
            <ContactDispatchContext.Provider value={dispatch}>
                { children }
            </ContactDispatchContext.Provider>
        </ContactStateContext.Provider>
    );
}