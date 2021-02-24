import React from "react";
import BaseComponent from '../baseComponent'
import RestaurentComponent from './restaurentComponent'
import data from './restaurentData.json'
import moment from 'moment'

class Restaurent extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            restaurentArray: [],
            itemArray: [],
            startTime: moment().valueOf(),
        }
    }

    async componentDidMount() {
        await this.getRestaurentData();
        this.parseData(this.state.startTime);
    }

    getRestaurentData = async () => {
        await fetch("https://run.mocky.io/v3/b0f3e975-b815-4e88-8a6a-84af59fe32eb", { method: "GET" })
            .then((response) => {
                return response.json()
            })
            .then((responseData) => {
                let data = this.parseResData(responseData)
                this.setState({ restaurentArray: data, itemArray: data });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    parseResData = (request) => {
        let parsedData = []
        for (let index = 0; index < request.length; index++) {
            parsedData.push({
                "Kushi Tsuru": request[index]["Kushi Tsuru"],
                "Mon-Sun 11:30 am - 9 pm": request[index]["Mon-Sun 11:30 am - 9 pm"],
                "isClosed": "Closed"
            })
        }
        return parsedData;
    }

    parseData = (timestamp) => {
        let day = moment(timestamp).format("ddd").toLowerCase();
        let time = moment(timestamp).format("HH:mm A");
        let filteredRestaurents = data.filter((item) => {
            if (item.day[day])
                return (item.day[day].startTime <= time && time <= item.day[day].endTime)
        })

        if (!filteredRestaurents.length) {
            this.state.itemArray.map((item, index) => {

                this.state.itemArray[index].isClosed = "Closed"
            })
        } else {
            let diffArray = this.state.itemArray.filter(item1 =>
                !filteredRestaurents.some(item2 => item2.name === item1['Kushi Tsuru']))

            this.state.itemArray.map((item, index) => {
                diffArray.map((restaurent) => {
                    if (item['Kushi Tsuru'] === restaurent['Kushi Tsuru']) {
                        this.state.itemArray[index].isClosed = "Closed"
                    }
                })
            })
            this.state.itemArray.map((item, index) => {
                filteredRestaurents.map((restaurent) => {
                    if (item['Kushi Tsuru'] === restaurent.name) {
                        this.state.itemArray[index].isClosed = "Open"
                    }
                })
            })
        }
        this.setState({ restaurentArray: this.state.itemArray })
    }

    onChangeEvent = (event) => {
        let value = event.target.value.toLowerCase();
        if (value && value.length) {
            let filterList = this.state.restaurentArray && this.state.restaurentArray.filter(userObject => {
                return userObject['Kushi Tsuru'].toLowerCase().includes(value)
            })
            if (filterList && filterList.length) {
                this.setState({ restaurentArray: filterList })
            } else {
                this.setState({ restaurentArray: [] })
            }
        } else {
            this.setState({ restaurentArray: this.state.itemArray })
        }
    };

    applyFilter = (value, name) => {
        this.setState({ [name]: value })
        this.parseData(value)
    }

    render() {
        return (
            <RestaurentComponent state={this.state}
                onChangeEvent={this.onChangeEvent}
                applyFilter={this.applyFilter}
            />
        );
    }
}

export default Restaurent;