import React, {useState, useEffect} from 'react'
import {Form, Button, Tabs, Row, Col} from 'react-bootstrap';
import axios from 'axios'

function Message(data){

    const [otp, setOtp] = useState('')
    const [messageString, setMessageString] = useState('')
    const [state, setState] = useState('true')

    useEffect(async ()=>{
        let gen_otp =await generateOTP()
        setOtp(gen_otp)
        setMessageString(`Hi. Your OTP is ${gen_otp}`)
    },[])

    let sendSms = async(e)=>{
        e.preventDefault()
        setState('false')
        let send_sms = await axios({
            async: true,
			crossDomain: true,
			method: 'post',
            url:'/send', 
            data:{"otp":otp, "phone":data.data.phone, "full_name":data.data.first_name+' '+data.data.last_name},
            cache:false
    }).then(result=>{
        if(result.data.status==="200"){
            return alert('OTP sent successfully')
        }
        alert('SMS balance over')
        console.log(result)
    })
    .catch(error=>{
        console.log(error, "---")
    })
}

    function generateOTP() {
        var digits = '0123456789';
        let OTP = '';
        for (let i = 0; i < 6; i++ ) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }
        return OTP;
    }
    
    

    return(
        <div>
            <Form>
            <Form.Control as="textarea" rows={3} value={messageString}  readOnly/>
            <Button variant="primary" onClick={(e)=>sendSms(e)} enabled={state}>Submit</Button>
            </Form>
            
        </div>
    )

}

export default Message