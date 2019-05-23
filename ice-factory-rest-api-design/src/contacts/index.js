// import makeContactList from './contact-list'
// import makeContactEndPointHandler from './contacts-endpoint'
// import ContactModel from '../model/contact'

const makeContactList = require('./contact-list')
const makeContactEndPointHandler = require('./contacts-endpoint')
const ContactModel = require('../model/contact')

const contactList = makeContactList(ContactModel)
const contactsEndpointHandler = makeContactEndPointHandler({ contactList })

module.exports = contactsEndpointHandler
