import React, {Component} from 'react';
import GroceryItem from './GroceryItem';
import './GroceryList.css';
import { Button, Row, Col, Tooltip, message } from 'antd';
import { PlusSquareFilled, SaveFilled } from '@ant-design/icons';
import MediaQuery from 'react-responsive';
import AddItem from './AddItem';

const API_URL = process.env.REACT_APP_BACKEND_URL;

class GroceryList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            groceryList:{},
            addItemVisible: false,
            addAnotherItem: false
        };
    }

    componentDidMount() {
        const jwtToken = sessionStorage.getItem("jwt");  
        const username = sessionStorage.getItem("user");
        fetch(API_URL + 'groceries?username='+username,    
            {headers: {"Authorization": jwtToken, "Content-Type": "application/json"}}    
        ) 
        .then((response) => response.json())
        .then((responseData) => {
            console.log(responseData);
            var groceryObj = JSON.parse(responseData.currentList);
            console.log(groceryObj);
            this.setState({
                ...this.state,
                groceryList: groceryObj
            });
            console.log(this.state.groceryList)
        })
        .catch(err => console.error(err))
    }

    increaseCount(item, count) {
        console.log( item);
        this.setState(prevState => ({
            ...this.state,
            groceryList: {
                ...prevState.groceryList,
                [item]: count+1
            }
        }));
    }

    decreaseCount(item, count) {
        console.log( item);
        this.setState(prevState => ({
            ...this.state,
            groceryList: {
                ...prevState.groceryList,
                [item]: count-1
            }
        }));
    }

    addItem(groceryItem) {
        
        console.log("asdf",groceryItem);
        const existingList = this.state.groceryList;
        existingList[groceryItem.item.toUpperCase()] = parseInt(groceryItem.count);
        this.setState({
            ...this.state,
            groceryList: existingList,
            addAnotherItem: groceryItem.addAnother
        }, this.updateList);
    }

    deleteItem(item) {
        const updatedList = this.removeByKey(this.state.groceryList, item);
        this.setState({
            ...this.state,
            groceryList: updatedList
        })
        
    }

    removeByKey (myObj, deleteKey) {
        return Object.keys(myObj)
          .filter(key => key !== deleteKey)
          .reduce((result, current) => {
            result[current] = myObj[current];
            return result;
        }, {});
    }

    updateList = () => {
        const jwtToken = sessionStorage.getItem("jwt");  
        const username = sessionStorage.getItem("user");
        const groceryList = { currentList:JSON.stringify(this.state.groceryList), userName:username };
        console.log(JSON.stringify(groceryList)  );
        fetch(API_URL + 'currentList',
            {    
                method: 'POST',   
                headers: {"Authorization": jwtToken, "Content-Type": "application/json"}, 
                body: JSON.stringify(groceryList)    
            } 
        ) 
        .then((response) => response.json())
        .then((responseData) => {
            console.log("updatedList",responseData);
            message.success("Grocery List has been successfully updated")
            this.closeAddItemModal(this.state.addAnotherItem, this.state.addAnotherItem);
        })
        .catch(err => {
            console.error(err);
            message.error("Error updating the list")
        })
    }

    showAddItemModal = () => {
        this.setState({
            ...this.state,
            addItemVisible: true
        });
    }

    closeAddItemModal = (visible, addAnother) => {
        console.log("close item model", this.state)
        this.setState({
            ...this.state,
            addItemVisible: visible,
            addAnotherItem: addAnother
        });
    }

    render() {
        const GL = this.state.groceryList;
        
        return (
            <>
            <AddItem visible={this.state.addItemVisible} closeModel={this.closeAddItemModal.bind(this)} addItem={this.addItem.bind(this)}/>
            <Row className="current-list-header">
            <MediaQuery minDeviceWidth={992}>
                <Col span={8}></Col>
                <Col span={8}>
                    <h2 className="list-title">List of available items</h2>
                </Col>
                <Col span={8} className="update-action-col">
                    <Tooltip placement="top" title="Add new item">
                        <Button icon={<PlusSquareFilled className="add-icon"/>} onClick={this.showAddItemModal} className="add-item" />
                    </Tooltip>
                    <Tooltip placement="top" title="Save updated list">
                        <Button icon={<SaveFilled className="save-icon"/>} onClick={this.updateList} className="save-list" />
                    </Tooltip>
                </Col>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={992}>
                <Col span={2}></Col>
                <Col span={16}>
                    <h2 className="list-title">List of available items</h2>
                </Col>
                <Col span={6} className="update-action-col">
                    <Tooltip placement="top" title="Add new item">
                        <Button icon={<PlusSquareFilled className="add-icon"/>} onClick={this.showAddItemModal} className="add-item" />
                    </Tooltip>
                    <Tooltip placement="top" title="Save updated list">
                        <Button icon={<SaveFilled className="save-icon"/>} onClick={this.updateList} className="save-list" />
                    </Tooltip>
                </Col>
            </MediaQuery>
                
            </Row>
            <div className="item-list">
                
                {
                 Object.keys(GL).map((e, i) => {
                    return (
                        <GroceryItem key={i} item={e} count={GL[e]} increaseCount={this.increaseCount.bind(this)} decreaseCount={this.decreaseCount.bind(this)} deleteItem={this.deleteItem.bind(this)}/>
                    )
                  })
                }
            </div>
            </>
        );
    }
}

export default GroceryList; 