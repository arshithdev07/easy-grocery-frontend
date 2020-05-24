import React, {Component} from 'react';
import { Button, Modal, Form, Input, Checkbox } from 'antd';
import HelperService from '../service/HelperService';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

class AddItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            disabled: true,
            visible: props.visible,
            groceryItem: {
                item: '',
                count: '',
                addAnother: false
            }
        }
    }

    formRef = React.createRef();

    componentWillReceiveProps(props) {
        this.setState({
            ...this.state,
            visible: props.visible
        }, this.onReset)
      }
    
      handleSubmit = () => {
        this.props.addItem(this.state.groceryItem);
        // this.setState({ loading: true });
        // setTimeout(() => {
        //   this.setState({ loading: false, visible: false });
        // }, 3000);
      };
    
      handleCancel = () => {
        this.setState({ visible: false });
      };

      handleChange = (e) => {
          this.setState({
              ...this.state, 
              groceryItem: {
                  ...this.state.groceryItem,
                  [e.target.id]: e.target.value
              }
          }, this.checkSubmit)
      }

      handleCheckboxChange = (e) => {
        this.setState({
          ...this.state,
          groceryItem: {
            ...this.state.groceryItem,
            [e.target.id]: e.target.checked
          }
        })
      }

      checkSubmit = () => {
        console.log("check submit",this.state)
          if(this.state.groceryItem.item && this.state.groceryItem.count && HelperService.isInt(this.state.groceryItem.count) && this.state.groceryItem.count > 0) {
              this.setState({
                  ...this.state,
                  disabled: false
              })
          } else {
            this.setState({
                ...this.state,
                disabled: true
            })
          }
          
      }

      checkNumber = (rule, value, callback) => {
        if(!(HelperService.isInt(value)) || value < 1) {
            callback('Enter a positive value');
        } else {
            callback();
        }
      }

      onReset = () => {
        if(this.formRef.current) {
          this.formRef.current.setFieldsValue({
            item: '',
            count: '',
          });
        }
        this.setState({
          ...this.state, 
          groceryItem: {
              ...this.state.groceryItem,
              item: '',
              count: ''
          }
        },console.log("all done", this.state));
      }
    
      render() {
        const { visible, loading, disabled } = this.state;
        
        return (
          <div>
            <Modal
              visible={visible}
              title="Add new item"
              onOk={this.handleSubmit}
              onCancel={this.handleCancel}
              footer={[
                <Button key="back" onClick={this.handleCancel}>
                  Return
                </Button>,
                <Button key="submit" type="primary" loading={loading} disabled={disabled} onClick={this.handleSubmit}>
                  Submit
                </Button>,
              ]}
            >
            <Form {...layout} ref={this.formRef}>
                <Form.Item name="item" label="Item" rules={[{ required: true }]}>
                    <Input onChange={this.handleChange}/>
                </Form.Item>
                <Form.Item name="count" label="Count" rules={[{ required: true },{validator: this.checkNumber}]}>
                    <Input type="number" onChange={this.handleChange}/>
                </Form.Item>
                <Form.Item {...tailLayout} name="addAnother" >
                    <Checkbox onChange={this.handleCheckboxChange}>Add another Item</Checkbox>
                </Form.Item>
            </Form>
            </Modal>
          </div>
        );
      }
    }
    

export default AddItem; 