import React, {Component} from 'react';
import { Row, Col, Button, Space } from 'antd';
import { PlusOutlined, MinusOutlined, DeleteFilled } from '@ant-design/icons';
import './GroceryList.css';

class GroceryItem extends Component {

    constructor(props) {
        super(props);
    }

    add = () => {
        this.props.increaseCount(this.props.item, this.props.count);
    }

    subtract = () => {
        this.props.decreaseCount(this.props.item, this.props.count);
    }

    delete = () => {
        this.props.deleteItem(this.props.item);
    }

    render() {
        const {item, count, increaseCount, decreaseCount} = (this.props);
        const lessCount = count<10?true:false;
        return (
            
            <>
            <Row className="item-row">
                <Col span={12}>{item.toUpperCase()}</Col>
                <Col span={12}>
                    <Space>
                        <Button icon={<MinusOutlined />} disabled={count<1?true:false} onClick={this.subtract}/>
                        <div style={lessCount?{marginRight:"16px"}:{marginRight:"8px"}}>{count}</div>
                        <Button icon={<PlusOutlined />} onClick={this.add}/>
                        <br/><br/>
                        <Button className="item-delete" icon={<DeleteFilled />} onClick={this.delete}/>
                    </Space>
                </Col>
            </Row>
            </>
                    
        )
    }
}

export default GroceryItem; 