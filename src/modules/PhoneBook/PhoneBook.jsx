import { Component } from "react";
import css from './PhoneBook.module.scss';
import { nanoid } from "nanoid";


class PhoneBook extends Component{

    state = {
        contacts: [],
        name: "",
        number: "",
        filter: "",
    }

    removeContact(id) {
this.setState(({contacts}) => {
    const newContacts = contacts.filter(contact => contact.id !== id);
    return {contacts:newContacts}
})
    }


    addContact = (e) => {
        e.preventDefault();
        const {name, number,} = this.state;
        if(this.isDublicate(name, number)) {    
        return alert (`${name}. number: ${number} is already in contacts.`);
        }
        this.setState(prevState => {
            const {name, number, contacts} = prevState;
            
            const newContact = {
                id: nanoid(),
                name,
                number,
            }

            return {contacts: [newContact, ...contacts], name:"", number:""}
        })
    };


    handleChange = ({target}) => {
        const {name, value} = target;
        this.setState({
            [name]: value
        })
    }

    isDublicate(name, number) {
        const normalizedName = name.toLowerCase();
        const normalizedNumber = number.toLowerCase();
        const{contacts} = this.state;
        const contact = contacts.find(({name, number}) => {
            return (name.toLowerCase() === normalizedName && number.toLowerCase() === normalizedNumber)
        })

        return Boolean(contact);
    }

    getFilteredContacts() {
        const {filter, contacts} = this.state;
        if(!filter) {
            return contacts;
        }
        const normalizedFilter = filter.toLowerCase()
        const result = contacts.filter(({name, number}) => {
            return (name.toLowerCase().includes(normalizedFilter) || number.includes(normalizedFilter))
        });

        return result;
    }

    render() {
        const {addContact, handleChange} = this;
        const { name, number} = this.state;
        const contacts = this.getFilteredContacts();

        const contactsList = contacts.map(({id, name, number}) => 
        <li key={id}>{name}: {number} 
        <button onClick={() => this.removeContact(id)} className={css.btn}>Delete Contact</button></li>) 
        
        return (
            <>
            <div className={css.wrapper}>

             <div className={css.form}>  
    <h2 className={css.title}>Phonebook</h2>
    <form action="" onSubmit={addContact}>

        <div className={css.formGroup}>
        <label>Name <br />
    <input onChange={handleChange} value={name} className={css.input}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
    />
        </label>
      </div>
      <div className={css.formGroup}>
        <label>Number <br />
    <input onChange={handleChange} value={number}  className={css.input}
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
    />
        </label>
        </div>
        <button className={css.btn}  type="submit">Add Contact</button>
    </form>
    </div> 

    <div className={css.cocntacts}>
    <h2 className={css.title}>Contacts</h2>
    <input name="filter" onChange={handleChange} className={css.form} placeholder="add name" />
    <ol className={css.list}>
     {contactsList}
    </ol>
    </div>

    </div>
            </>
    
        )
    };
}

export default PhoneBook;




