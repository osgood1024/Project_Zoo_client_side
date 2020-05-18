import React from 'react'
import { Button, Form, Segment, TextArea } from 'semantic-ui-react'
import styled from 'styled-components'

const Styles =styled.div `
.form_layout{
    margin:50px !important;
}
p{
    font-size: .92857143em;
    font-weight: 700;
}

.button{
    float: right;
}

.form{
    padding: 10px;
}

`

 export const SubmitProject = () => (

<Styles>

  <Segment inverted padded={"very"} className={'form_layout'}>

    <Form inverted>

        <Form.Group widths='equal'>
            <Form.Input fluid label='Project Name:' placeholder='what is your project topic?' />
        </Form.Group>
            <Form.Input fluid label='# Tag :' placeholder='#todolist #react #web_dev....' />
        <Form.Group widths="grouped">
            <Form.Input fluid label='Website live link or Github Repo:' placeholder='your project link/ Github repo..' />
        </Form.Group>
        <Form.Group widths="grouped">
            <Form.Input fluid label='Picture for project: ' placeholder='copy image address' />
        </Form.Group>

        <p>Description:</p>
        <Form.Group widths ="grouped">
        <TextArea  placeholder='Tell us more' />
        </Form.Group>

     
      <Button type='submit' className={"button"} >Submit</Button>

    </Form>

  </Segment>

</Styles>
)
