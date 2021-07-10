import React, { useState } from 'react'
import {Form, Button, Tabs, Table} from 'react-bootstrap';
import ContactInfo from './ContactInfo'

function Contacts(){
    let ContactJsonData = [
        {"id":1,
        "first_name":"First",
        "last_name":"One",
        "phone":"+917988783588"
        },
        {"id":2,
        "first_name":"Second",
        "last_name":"Two",
        "phone":"+919999752044"},
        {"id":3,
        "first_name":"Third",
        "last_name":"Three",
        "phone":"+919911111111"},
        {"id":4,
        "first_name":"Fourth",
        "last_name":"Four",
        "phone":"+919888888888"},
        {"id":5,
        "first_name":"Fifth",
        "last_name":"Five",
        "phone":"+9191111111111"},
        {"id":6,
        "first_name":"Sixth",
        "last_name":"Six",
        "phone":"+919000000000"},
    ]
    const [state, setState] = useState(0)
    const [singleData, setSingledata] = useState({})

    let showContactInfo = (item)=>{
        setSingledata(item)
        setState(1)
    }

    return(
        <div>
            {state===1?(<div><ContactInfo props={singleData}/></div>):
                <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ContactJsonData.map((item, i)=>(
                                <tr>
                                <td>{i+1}</td>
                            <td>{item.first_name}</td>
                            <td>{item.last_name}</td>
                            <td><button onClick={()=>showContactInfo(item)}>View</button></td>
                            </tr>
                            )
                            )}
                    </tbody>
                </Table>
            }
        </div>
    )
}

export default Contacts