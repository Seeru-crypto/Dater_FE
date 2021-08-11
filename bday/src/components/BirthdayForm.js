import React from "react"

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class BirthdayForm extends React.Component{
    state = { name: "", reminder: false, desc:"", daysOfNotice: "" }




    render (){
        return(
            <div className="container">
                <Form>
                    <Row className="g-2">
                        <Col md>

                    <Form.Group className="mb-3" controlId="targetName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control value= { this.state.name } onChange={ (change) => this.setState({ name : change.target.value })} required maxLength="15" type="text" placeholder="Enter name" />
                        <Form.Text className="text-muted">
                        Enter a generic name!
                        </Form.Text>
                    </Form.Group>
                    </Col>
                    <Col md>

                    <Form.Group className="mb-3" controlId="targetDesc">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                    </Col>

                    </Row>
                    
                    <div key={`default-checkbox`} className="mb-3">
                        <Form.Check
                            required 
                            type='checkbox'
                            id={`default-checkbox`}
                            label='Do you want reminders?'
                        />
                    </div>
                    <Form.Group className="mb-3" controlId="targetReminderDays">
                        <Form.Label>Days of notice.</Form.Label>
                        <Form.Control type="number" min="1" max="31" placeholder="Enter number" />
                        <Form.Text className="text-muted">
                        Between 0 and n.
                        </Form.Text>
                    </Form.Group>





  
  
                </Form>

            </div>

        )
    }

    
}
export default BirthdayForm;
