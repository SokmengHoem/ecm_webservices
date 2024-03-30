
import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { request } from '../../share/request'

const LoginPage = () => {

  const onFinish = async(values) => {
    const param = {
      "tel": values.username,
      "password": values.password
    }
    const res = await request("employee/login", "post", param)
    console.log(param)
    if(res.isSuccess){
     
      //JSON.stringify(0bj) convert obj to string
      //JSON.parase(obj) convert string obj to json
      localStorage.setItem("profile",JSON.stringify(res.profile))
      localStorage.setItem("isLogin", "1")
      window.location.href = "/"
    }else{
      message.warning("Username or password incorrect!");
    }
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" ghost htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a href="">register now!</a>
      </Form.Item>
    </Form>
  );
};

export default LoginPage;

//     <div className='bg-gray-300 w-[500px] mx-auto rounded-sm shadow-md'>
//         <h1 className=' text-center font-bold text-xl py-2'>LoginPage</h1>
//         <div className='flex flex-col px-4 mb-3'>
//           <label htmlFor="" className=' mb-2'>Username</label>
//           <input type="text" placeholder='username' className=' rounded-sm py-2 px-2'
//             onChange={(e) => {
//               setUsername(e.target.value);
//             }}
//           />
//         </div>
//         <div className='flex flex-col px-4 mb-3'>
//           <label htmlFor=""  className=' mb-2'>Password</label>
//           <input type="text" placeholder='password' className=' rounded-sm py-2 px-2'
//             onChange={(e) => {
//               setPassword(e.target.value)
//             }}
//           />
//         </div>
//         <div className=' flex justify-between px-5 py-3'>
//           <button onClick={()=>onLogin(values)} className=' bg-indigo-700 text-white px-4 py-2 rounded-sm hover:bg-indigo-300'>Login</button>
//           <button className=' bg-fuchsia-700 text-white px-4 py-2 rounded-sm hover:bg-fuchsia-300'>Register</button>
//         </div>
//     </div>
//   )
// }