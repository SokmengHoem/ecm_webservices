import React, { useEffect, useState } from 'react'
import { request } from '../../share/request'
import {Button, FloatingLabel, Modal, Form, Table} from "react-bootstrap";
import { getUserId } from '../../share/Helper';

const CategoryPage = () => {

    const [list, setList] = useState([])
    const [visible, setVisible] = useState(false)
    const [id,setId] = useState("")
    const [name,setName] = useState("")
    const [description,setDescriptoin] = useState("")
    const [parent, setParent] = useState("")
    const [status,setStatus] = useState("")

    useEffect(() => {
        getList();
    }, [])
    const getList = () => {
      request("category","get", {}).then(res=>{
      console.log(res.lists) 
      setList(res.lists);
      })
    }
    const onOpenModal = () => {
        setVisible(true)
    }

    const onCloseModal = () => {
        setVisible(false)
        setId("")
        setName("")
        setDescriptoin("")
        setStatus("")
    }

    const onSave = async () => {
      
        if(id === ""){
            var data = {
                name: name,
                description: description,
                parent: null,
                status:status
            }

            const res = await request("category","post",data)
            onCloseModal()
            if(res){
                getList();
            }else{
                alert("Error!")
            }
        }else{
            var data = {
                category_id: id,
                name: name,
                description: description,
                parent:null,
                status:status
            }
            const res = await request("category", "put",data)
            onCloseModal()
            if(res){
                getList();
            }else{
                alert("Error!")
            }
        }
    }

    const onChangeName = (e) => {
        setName(e.target.value)
    }

    const onChangeDes = (e) => {
        setDescriptoin(e.target.value)
    }

    const onChangeParent = (e) => {
        setParent(e.target.value)
    }

    const onChangeStatus = (e) => {
        setStatus(e.target.value)
    }

    const onDelete = async (id) => {
        const res = await request("category/"+id, "delete", {})
        console.log(id)
        if(res){
            getList();

        }else{
            alert("Error!")
        }
    }

    const onClickEdit = (item) => {
        setId(item.category_id);
        setName(item.name);
        setDescriptoin(item.description);
        setParent(item.parent)
        setStatus(item.status)
        setVisible(true)
    }
  return (
    <>
     <div className=' flex justify-between p-3'>
        <h1 className=' font-bold text-2xl'>Category Page</h1>
        <Button variant="outline-primary" onClick={onOpenModal}>New Category</Button>
     </div>
     <Table striped bordered hover>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Descrition</th>
                {/* <th>Parent</th> */}
                <th>Status</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {
                list.map((item, index) => (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.status}</td>
                        <td>
                            <Button  className=' mr-2' variant="outline-success" onClick={()=>onClickEdit(item)}>Edit</Button>
                            <Button variant="outline-danger" onClick={() => onDelete(item.category_id)}>Delete</Button>
                        </td>
                    </tr>
                ))
            }
        </tbody>
     </Table>
     <Modal show={visible}>
        <Modal.Header>
             <Modal.Title>{(id === "") ? "New Category" : "Update Categor"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <FloatingLabel controlId='name' label="Category Name" className='mb-3'>
                <Form.Control onChange={onChangeName} value={name}  type='text' placeholder='enter name'></Form.Control>
                {/*  */}
            </FloatingLabel>
            <FloatingLabel controlId='description' label="Description" className='mb-3'>
                <Form.Control onChange={onChangeDes} value={description} type='text' placeholder='enter  description'></Form.Control>
                {/*  */}
            </FloatingLabel>
            <FloatingLabel controlId='status' label="Status" className='mb-3'>
                <Form.Control onChange={onChangeStatus} value={status} type='text' placeholder='enter status'></Form.Control>
                {/*   */}
            </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
             <Button variant='outline-secondary' onClick={onCloseModal}>Cancel</Button>
             <Button variant='outline-primary' onClick={onSave}>{id === "" ? "Save" : "Update"}</Button>
        </Modal.Footer>
     </Modal>

    </>
  )
}

export default CategoryPage