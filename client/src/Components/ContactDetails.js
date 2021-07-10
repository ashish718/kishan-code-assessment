import React, { useState, useEffect } from 'react';
import {Form, Button, Tabs, Tab} from 'react-bootstrap';
//import tab pages
import MessageSent from '../pages/MessageSent';
import Contacts from '../pages/Contacts'

function ContactDetails(){


    return(
        <div>
            <Tabs defaultActiveKey="contacts" transition={false} id="noanim-tab-example">
                <Tab eventKey="contacts" title="contacts">
                    <Contacts />
                </Tab>
                <Tab eventKey="message-list" title="mesages">
                    <MessageSent />
                </Tab>
            </Tabs>
        </div>
    )
}

export default ContactDetails