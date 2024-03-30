import React, { useEffect } from 'react'
import { useState } from 'react'
import {request } from '../../share/request';
import { Table , Button, Modal,FloatingLabel, Form} from 'react-bootstrap';
import { formatDateClient } from '../../share/Helper';

const CustomerPage = () => {

  const [list, setList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    getList();
  }, [])

  const getList = async () => {
    const res = await request("customer", "get", {})
    if(res){
      setList(res.list)
      console.log(res.list)
    }
  }

  const onDelete = (id) => {
    const res = request("customer/"+id, "delete", {})
    if(res){
      getList();
    }
  }

  const onSave = async () => {
    if(id === ""){
      var data = {
        firstname: firstname,
        lastname: lastname,
        gender:gender,
        dob:dob,
        tel:tel,
        email:email,
        status:status
      }
      const res = await request("customer", "post", data);
      onCloseModal()
      if(res){
        getList()
      }else{
        alert(Error);
      }
    }else{
      var data = {
        customer_id:id,
        firstname: firstname,
        lastname: lastname,
        gender:gender,
        dob:dob,
        tel:tel,
        email:email,
        status:status
      }
      const res = await request("customer", "put", data);
      onCloseModal();
      onClear();
      if(res){
        getList();
      }else{
        alert(Error);
      }
    }
  }

  const onClickEdit = (item) => {
    setId(item.customer_id)
    setFirstname(item.firstname);
    setLastname(item.lastname);
    setGender(item.gender);
    setDob(item.dob);
    setTel(item.tel);
    setEmail(item.email);
    setStatus(item.status);
    onOpenModal();
  }

  const onOpenModal = () => {
    setVisible(true)
  }

  const onCloseModal = () => {
    setVisible(false)
  }

  const onCancel = () => {
    onClear();
    onCloseModal();
  }

  const onClear = () => {
    setId("");
    setFirstname("");
    setLastname("");
    setGender("");
    setDob("");
    setTel("");
    setEmail("");
    setStatus("");
  }
  return (
    <div>
      <div className=' flex justify-between p-3'>
        <h1 className=' font-bold text-2xl'>Customer Page</h1>
        <Button variant="outline-primary" onClick={onOpenModal}>New Category</Button>
     </div>
      <Table bordered hover>
          <thead>
              <tr>
                  <th>No</th>
                  <th>Firstname</th>
                  <th>Lastname</th>
                  <th>Gender</th>
                  <th>DOB</th>
                  <th>Tel</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Action</th>
              </tr>
          </thead>
          <tbody>
            {list.map((item,index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{item.firstname}</td>
                <td>{item.lastname}</td>
                <td>{item.gender == 1 ? "Male" : "Female"}</td>
                <td>{formatDateClient(item.dob)}</td>
                <td>{item.tel}</td>
                <td>{item.email}</td>
                <td>{item.status == 1 ? "Actived": "Disabled"}</td>
                <td>
                   <Button  className=' mr-2' variant="outline-success" onClick={()=>onClickEdit(item)}>Edit</Button>
                   <Button variant="outline-danger" onClick={() => onDelete(item.customer_id)}>Delete</Button>
                </td>
              </tr>
            ))

            }
          </tbody>
      </Table>
      <Modal show={visible}>
          <Modal.Header>
              <Modal.Title>{(id === "") ? "New Customer" : "Update Customer"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FloatingLabel controlId='firstname' label="First Name" className='mb-3'>
                  <Form.Control onChange={(e) => setFirstname(e.target.value)} value={firstname}  type='text' placeholder='firstname'></Form.Control>
            </FloatingLabel>
            <FloatingLabel controlId='lastname' label="Last Name" className='mb-3'>
                  <Form.Control onChange={(e) => setLastname(e.target.value)} value={lastname}  type='text' placeholder='lastname'></Form.Control>
            </FloatingLabel>
            <FloatingLabel controlId='gender' label="Gender" className='mb-3'>
                  <Form.Control onChange={(e) => setGender(e.target.value)} value={gender}  type='text' placeholder='gender'></Form.Control>
            </FloatingLabel>
            <FloatingLabel controlId='dob' label="Dob" className='mb-3'>
                  <Form.Control onChange={(e) => setDob(e.target.value)} value={dob}  type='text' placeholder='dob'></Form.Control>
            </FloatingLabel>
            <FloatingLabel controlId='tel' label="Tel" className='mb-3'>
                  <Form.Control onChange={(e) => setTel(e.target.value)} value={tel}  type='text' placeholder='tel'></Form.Control>
            </FloatingLabel>
            <FloatingLabel controlId='email' label="Email" className='mb-3'>
                  <Form.Control onChange={(e) => setEmail(e.target.value)} value={email}  type='text' placeholder='email'></Form.Control>
            </FloatingLabel>
            <FloatingLabel controlId='status' label="Status" className='mb-3'>
                  <Form.Control onChange={(e) => setStatus(e.target.value)} value={status}  type='text' placeholder='status'></Form.Control>
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
              <Button variant='outline-secondary' onClick={onCancel}>Cancel</Button>
              <Button variant='outline-danger' onClick={onClear}>Clear</Button>
              <Button variant='outline-primary' onClick={onSave}>{id === "" ? "Save" : "Update"}</Button>
          </Modal.Footer>
      </Modal>
    </div>
  )
}

export default CustomerPage;