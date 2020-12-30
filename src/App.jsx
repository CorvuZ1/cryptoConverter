import React, { Component } from "react";
import "./App.sass";
import "./reset/reset.sass";
import Converter from "./components/Converter/Converter";
import Chart from "./components/Chart/Chart";

class App extends Component {
constructor(props) {
  super(props)

  this.state = {
    btc: null,
    usd: null,
    eth: null,

    usdValue: "",
    btcValue: "",
    ethValue: "",

    coins: [
      "bitcoin",
      "uniswap-state-dollar",
      "ethereum"
    ],
    result: null
  }
}

inputHandler(currency="random") {
  switch(currency.className) {
    case "usdInput": this.setState({usdValue: currency.value});
    break;

    case "btcInput": this.setState({btcValue: currency.value});
    break;

    case "ethInput": this.setState({ethValue: currency.value});
    break;
  }
}

onCalcButton = () => {
  const result = {
    onUSD: {
      btcVal: this.state.usd.btc * this.state.usdValue,
      ethVal: this.state.usd.eth * this.state.usdValue
    },
    onBTC: {
      usdVal: this.state.btc.usd * this.state.btcValue,
      ethVal: this.state.btc.eth * this.state.btcValue
    },
    onETH: {
      usdVal: this.state.eth.usd * this.state.ethValue,
      btcVal: this.state.eth.btc * this.state.ethValue
    }
  }
  this.setState({result})
}

componentDidMount() {
  this.requestAPI().then(() => {
    this.onCalcButton();
  })
}

requestAPI() {
  let btcInfo = new Promise(resolve => 
    fetch(`https://api.coingecko.com/api/v3/coins/${this.state.coins[0]}`) // BTC
    .then(data => data.json())
    .then(btc => {
      let value = btc.market_data.current_price
      btc = {usd: value.usd, eth: value.eth}
      this.setState({btc})
      resolve()
    })
  )

  let usdInfo = new Promise(resolve => 
    fetch(`https://api.coingecko.com/api/v3/coins/${this.state.coins[1]}`) // USD
    .then(data => data.json())
    .then(usd => {
      let value = usd.market_data.current_price
      usd = {btc: value.btc, eth: value.eth}
      this.setState({usd})
      resolve()
    })
  )

  let ethInfo = new Promise(resolve => 
    fetch(`https://api.coingecko.com/api/v3/coins/${this.state.coins[2]}`) // ETH
    .then(data => data.json())
    .then(eth => {
      let value = eth.market_data.current_price
      eth = {btc: value.btc, usd: value.usd}
      this.setState({eth})
      resolve()
    })
  )
  return Promise.all([btcInfo, usdInfo, ethInfo])
}

render() {
  return (
    <div className="App">
          <span className="page-name">Конвертер валют</span>

          <Chart/>

          {this.state.result 
          ? <Converter
            result={this.state.result} 
            inputHandler={this.inputHandler.bind(this)} 
            onCalcButton={this.onCalcButton}/> 
          : null}
    </div>
    )
  }
}

export default App;
//route4
