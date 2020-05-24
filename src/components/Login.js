import React, {Component} from 'react';
import AuthenticationService from '../service/AuthenticationService';
import { Form, Input, Button, message } from 'antd';
import './Login.css';

const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 9,
      span: 16,
    },
  };

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password: ''};

    }

    login = (values) => {   
        const user = {userName: values.username, password: values.password};  

        AuthenticationService
            .executeBasicAuthenticationService(user)
            .then((response) => {
                if(!response.ok) throw new Error(response.status);
                else {
                    const jwtToken = response.headers.get('Authorization');
                    AuthenticationService.registerSuccessfulLogin(jwtToken, user.userName);
                    this.props.history.push('/grocerylist');
                };
              })
              .catch((error) => {
                console.log('error: ' + error);
                message.error("Please enter correct username and password", 2);
                // this.setState({ requestFailed: true });
              });

            // .then(res => {
            //     alert("then")
            //     const jwtToken = res.headers.get('Authorization');
            //     AuthenticationService.registerSuccessfulLogin(jwtToken);
            //     this.props.history.push('/currencies');
            // })
            // .catch(err => console.error(err));  
    };

    render() {     
        return (     
            <div className="login-form">

                <h2 className="login-message">Welcome Back</h2>

                <Form
                {...layout}
                name="login"
                initialValues={{
                  remember: true,
                }}
                onFinish={this.login}
                // onFinishFailed={this.login}
              >
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your username!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
          
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
          
                <Form.Item {...tailLayout}>
                  <Button className="login-submit" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>
        );
    }
}

export default Login; 