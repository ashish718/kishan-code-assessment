import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {Form, Button, Tabs, Table, Row, Col} from 'react-bootstrap';
import { WorkspaceCumulativeStatisticsPage } from 'twilio/lib/rest/taskrouter/v1/workspace/workspaceCumulativeStatistics';

function MessageSent(){
    const [messageArr, setMessageArr] = useState([])
    const [searchName, setSearchName] = useState('')
    const [searchOtp, setSearchOtp] = useState('')
    useEffect(()=>{
        fetch_messages()
    },[])

    let fetch_messages = async()=>{
        let get_data = await axios.get('/message')
        .then(data=>{
            console.log(data.data, "data get")
            setMessageArr(data.data.data)
            return data
        })
        .catch(error=>{
            console.log("get error api", error)
            return error
        })
    }

    // let filterData = (e, f_type) =>{
    //     let filter_data = messageArr.filter(result=>{
    //         return result.f_type.includes(e.target.value) != -1
    //     })
    // }
let filterData = (e, f_type) =>{

    if(e.target.value===''){
        setSearchName('')
        setSearchOtp('')
        fetch_messages()
    }
    else if(f_type==="name"){
        setSearchName(e.target.value)
        const lowercasedFilter = e.target.value
        const filteredData = messageArr.filter(item => {
            return item[f_type].toLowerCase().includes(lowercasedFilter.toLowerCase())
        });
        setMessageArr(filteredData)
    }
    else if(f_type==="gen_otp"){
        setSearchOtp(e.target.value)
        const lowercasedFilter = e.target.value
        const filteredData = messageArr.filter(item => {
            return item[f_type].includes(lowercasedFilter)
        });
        setMessageArr(filteredData)
    }    
}

    return(
        <div>
            <Form>
                <Row>
                    <Col>
                    <Form.Control placeholder="Search by name" value={searchName} onChange={(e)=>filterData(e, "name")}/>
                    </Col>
                    <Col>
                    <Form.Control placeholder="Search by OTP" value={searchOtp} onChange={(e)=>filterData(e, "gen_otp")}/>
                    </Col>
                    
                </Row>
            </Form>
            {messageArr.length===0?<p>No OTP sent yet.</p>:
                            <Table striped bordered hover>
                            <thead>
                                <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>OTP</th>
                                <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                            {messageArr.map((item, i)=>(
                            <tr>
                                <td>{i+1}</td>
                                <td>{item.name}</td>
                                <td>{item.gen_otp}</td>
                                <td>{item.timestamp}</td>
                            </tr>
                            ))}
                        </tbody>
                        </Table>
            }
        </div>
    )
}

export default MessageSent