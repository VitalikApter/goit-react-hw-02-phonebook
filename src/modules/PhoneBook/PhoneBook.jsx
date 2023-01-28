import { Component } from "react";
import css from './PhoneBook.module.scss';
import { nanoid } from "nanoid";

class PhoneBook extends Component{

    state = {
        items: [
            {
            id: nanoid(),
            name: "Wayn Amanda",
            number: "9688713",
        },
        {
            id: nanoid(),
            name: "Brown John",
            number: "4503509",
        },
        
    ],
    name: "",
    number: "",
    }

    removeContact(id) {
this.setState(({items}) => {
    const newContacts = items.filter(item => item.id !== id);
    return {items:newContacts}
})
    }


    addContact = (e) => {
        e.preventDefault();
        const {name, number,} = this.state;
        if(this.isDublicate(name, number)) {
            return alert (`${name}. number: ${number} is already ixist`);
        }
        this.setState(prevState => {
            const {name, number, items} = prevState;
            
            const newContact = {
                id: nanoid(),
                name,
                number,
            }

            return {items: [newContact, ...items], name:"", number:""}
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
        const{items} = this.state;
        const contact = items.find(({name, number}) => {
            return (name.toLowerCase() === normalizedName && number.toLowerCase() === normalizedNumber)
        })

        return Boolean(contact);
    }

    render() {
        const {addContact, handleChange} = this;
        const {items, name, number} = this.state;
        const contacts = items.map(({id, name, number}) => 
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
                <input onChange={handleChange} value={name} placeholder="Name" className={css.input}
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
                <input onChange={handleChange} value={number} placeholder="Number" className={css.input}
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
    <input className={css.form} placeholder="add name" />
    <ul className={css.list}>
     {contacts}
      
    </ul>
    </div>
    </div>
            </>
    
        )
    };
}

export default PhoneBook;




