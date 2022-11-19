import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import { Section } from "../Section/Section";
import { PhoneForm } from "../PhoneForm/PhoneForm";
import { Contacts } from "../Contacts/Contacts";
import { Filter } from '../Filter/Filter';

export class Phonebook extends Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
  }

  componentDidMount() {
    const savedLS = localStorage.getItem('contacts');
    const contacts = JSON.parse(savedLS);

    if (contacts) {
      this.setState({contacts});
    }
  }

  componentDidUpdate(prevProp, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  onLeaveContact = (e) => {
    e.preventDefault();
    const {elements: { name, number }}  = e.currentTarget;
    const { contacts } = this.state;

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
    
    this.setState(({ contacts }) => ({ contacts : [contactNew, ...contacts]}));
      

    this.reset(name, number);
  }

  reset = (name, number) => {
    name.value = ''; 
    number.value = '';
  }

  findContact = (e) => {
    const { value } = e.currentTarget;
    this.setState({filter: value});
  }

  renderContacts = () => {
    const { contacts, filter } = this.state;
    let filtered = contacts;
    if (filter) {
      filtered = contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase()),
      );
    }
    return filtered;
  };

  deleteContact = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(contact => contact.id !==id),
    }))
  }

  render() {
    return <div> <Section title='Phonebook'>
                    <PhoneForm onLeaveContact={this.onLeaveContact} />
                  </Section>                 

                  <Section title='Contacts'>
                    <Filter findContact={this.findContact} />
                    <Contacts
                    contacts={this.renderContacts()} 
                    onDeleteContact={this.deleteContact}/>
                  </Section>
            </div>
  }
}