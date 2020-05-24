import React, {Component} from 'react';

class Currencies extends Component {
    constructor(props) {
        super(props);
        this.state = {currencies: []};
    }

    componentDidMount() {
        const jwtToken = sessionStorage.getItem("jwt");    
        fetch('http://localhost:8080/currencies',    
            {headers: {"Authorization": jwtToken, "Content-Type": "application/json"}}    
        ) 
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                currencies: responseData
            })
        })
        .catch(err => console.error(err))
    }

    render() {
        const tableRows = this.state.currencies.map((currency, index) =>
            <tr key={index}>
                <td>{currency.name}</td>
                <td>{currency.code}</td>
                <td>{currency.amount}</td>
                <td>{currency.rate}</td>
            </tr>
        );
        return (
            <div className="App">
                <table>
                    <tbody>{tableRows}</tbody>
                </table>
            </div>
        );
    }
}

export default Currencies; 