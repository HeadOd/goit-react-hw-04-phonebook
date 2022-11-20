import { Component, useState, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';

import { Section } from "../Section/Section";
import { PhoneForm } from "../PhoneForm/PhoneForm";
import { Contacts } from "../Contacts/Contacts";
import { Filter } from '../Filter/Filter';

export const Phonebook = () => {
  const [contacts, setContacts] = useState([
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  ]);
  const [filter, setFilter] = useState('');
  const isFirstRender = useRef(true)

  useEffect(() => {
    const savedLS = localStorage.getItem('contacts');
    const test = JSON.parse(savedLS);

    if (test) {
      setContacts([...test]);
    }
  }, [])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
      localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onLeaveContact = (e) => {
    e.preventDefault();
    const {elements: { name, number }}  = e.currentTarget;

    let contactNew = {
      number: number.value,
      name: name.value,
      id: nanoid(),
    }
    
    const isExist = contacts.find( contact => contact.name.toLowerCase() === name.value.toLowerCase());

    if (isExist) {
      alert(`${name.value} is alredy in contacts`);
      return;
    } 
    
    setContacts([contactNew, ...contacts]);
      
    reset(name, number);
  }

  const reset = (name, number) => {
    name.value = ''; 
    number.value = '';
  }

  
  const findContact = (e) => {
    const { value } = e.currentTarget;
    setFilter(value);
  }

  const  renderContacts = () => {
    let filtered = contacts;
    if (filter) {
      filtered = contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase()),
      );
    }
    return filtered;
  };

  const deleteContact = (id) => {
    setContacts(prevContacts => {
      return prevContacts.filter(contact => contact.id !==id)
    })
  }

  return <div> <Section title='Phonebook'>
                    <PhoneForm onLeaveContact={onLeaveContact} />
                  </Section>                 

                  <Section title='Contacts'>
                    <Filter findContact={findContact} />
                    <Contacts
                    contacts={renderContacts()} 
                    onDeleteContact={deleteContact}
                    />
                  </Section>
            </div>
}

export class oldPhonebook extends Component {
  // state = {
  //   contacts: [
  //     {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
  //     {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
  //     {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
  //     {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  //   ],
  //   filter: '',
  // }

  // componentDidMount() {
  //   const savedLS = localStorage.getItem('contacts');
  //   const contacts = JSON.parse(savedLS);

  //   if (contacts) {
  //     this.setState({contacts});
  //   }
  // }

  // componentDidUpdate(prevProp, prevState) {
  //   if (this.state.contacts !== prevState.contacts) {
  //     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  //   }
  // }

  // onLeaveContact = (e) => {
  //   e.preventDefault();
  //   const {elements: { name, number }}  = e.currentTarget;
  //   const { contacts } = this.state;

  //   let contactNew = {
  //     number: number.value,
  //     name: name.value,
  //     id: nanoid(),
  //   }
    
  //   const isExist = contacts.find( contact => contact.name.toLowerCase() === name.value.toLowerCase());

  //   if (isExist) {
  //     alert(`${name.value} is alredy in contacts`);
  //     return;
  //   } 
    
  //   this.setState(({ contacts }) => ({ contacts : [contactNew, ...contacts]}));
      

  //   this.reset(name, number);
  // }

  // reset = (name, number) => {
  //   name.value = ''; 
  //   number.value = '';
  // }

  // findContact = (e) => {
  //   const { value } = e.currentTarget;
  //   this.setState({filter: value});
  // }

  // renderContacts = () => {
  //   const { contacts, filter } = this.state;
  //   let filtered = contacts;
  //   if (filter) {
  //     filtered = contacts.filter(contact =>
  //       contact.name.toLowerCase().includes(filter.toLowerCase()),
  //     );
  //   }
  //   return filtered;
  // };

  // deleteContact = (id) => {
  //   this.setState((prevState) => ({
  //     contacts: prevState.contacts.filter(contact => contact.id !==id),
  //   }))
  // }

  // render() {
  //   return <div> <Section title='Phonebook'>
  //                   <PhoneForm onLeaveContact={this.onLeaveContact} />
  //                 </Section>                 

  //                 <Section title='Contacts'>
  //                   <Filter findContact={this.findContact} />
  //                   <Contacts
  //                   contacts={this.renderContacts()} 
  //                   onDeleteContact={this.deleteContact}/>
  //                 </Section>
  //           </div>
  // }
}