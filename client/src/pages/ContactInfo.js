import React, {useState} from 'react'
import {Form, Button, Tabs, Row, Col} from 'react-bootstrap';
import Message from './Message'

function ContactInfo(props){

 
    const [state, setState] = useState(0)

    let onHandlerClick = (e)=>{
        setState(1)
    }

    return(
        <div>
            {state===1?(<Message data={props.props}/>):
            <Form>
                <Row>
                    <Col>
                    <Form.Control value={props.props.first_name +' '+ props.props.last_name} readOnly/>
                    </Col>
                    <Col>
                    <Form.Control value={props.props.phone} readOnly/>
                    </Col>
                    
                </Row>
                <Button variant="primary" type="submit" onClick={()=>onHandlerClick()}>
                    Submit
                </Button>
            </Form>
        }
        </div>
    )

}

export default ContactInfo