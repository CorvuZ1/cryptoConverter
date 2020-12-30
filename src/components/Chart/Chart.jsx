import {Component} from "react"
import "./Chart.sass" ;
import {Line} from "react-chartjs-2"

class Chart extends Component {
  constructor(props) {
    super(props)

    this.controller = new AbortController()
    this.signal = this.controller.signal

    this.state = {
      chartData: {
        labels: [
          "-14 дней",
          "-13 дней",
          "-12 дней",
          "-11 дней",
          "-10 дней",
          "-9 дней",
          "-8 дней",
          "-7 дней",
          "-6 дней",
          "-5 дней",
          "-4 дня",
          "-3 дня",
          "-2 дня",
          "-1 день",
          "Сегодня"
        ],
        datasets: [
          {
            label: "Bitcoin",
            data: [],
            fill: false,
            yAxisID: "A",
            pointBorderWidth: 8,
            pointHoverBackgroundColor: "black",
            pointBackgroundColor: "rgba(0,0,0,0.6)" ,
            borderColor: ["rgb(199, 201, 0)"]
          },
          {
            label: "Ethereum",
            data: [],
            fill: false,
            yAxisID: "B",
            pointBorderWidth: 8,
            pointHoverBackgroundColor: "black",
            pointBackgroundColor: "rgba(0,0,0,0.6)" ,
            borderColor: ["rgba(154, 31, 255)"]
          }
        ]
      }
    }
  }

  unixDateRange() {
    return [
      Math.round(new Date().getTime() / 1000 - 1209600), // Две недели 
      Math.round(new Date().getTime() / 1000) // Сегодняшний день
    ];
  }

  sortedDatesAndPrices(dates, prices) {
    let sorted = {}
    for(let i = 0; i < dates.length; i++) {
      let twoFirstNumbers = dates[i][0] + dates[i][1]
      if (!sorted.hasOwnProperty(twoFirstNumbers)) {
        sorted[twoFirstNumbers] = Math.round(prices[i]) // { дата: значение в долларах }
      }
    }
    return sorted
  }

  chartInfo = (currencyName) => {
    const [from, to] = this.unixDateRange()
    fetch(`https://api.coingecko.com/api/v3/coins/${currencyName}/market_chart/range?vs_currency=usd&from=${from}&to=${to}`,
    {method: "get", signal: this.signal})
    .then(data => data.json())
    .then(dates => {
      let fullDates = dates.prices.map(item => new Date(item[0]).toLocaleString()) // 336
      let prices = dates.prices.map(item => item[1])

      let chartData = {...this.state.chartData}
      if (currencyName === "bitcoin") {
        chartData.datasets[0].data = Object.values(this.sortedDatesAndPrices(fullDates,prices))
        this.setState({chartData})
      } 
      if (currencyName === "ethereum") {
        chartData.datasets[1].data = Object.values(this.sortedDatesAndPrices(fullDates,prices))
        this.setState({chartData})
      }
    })
    .catch(err => console.log(err))
  }

  componentDidMount() {
    this.chartInfo("bitcoin") 
    this.chartInfo("ethereum")
  }

  componentWillUnmount() {
    this.controller.abort()
  }

  render() {
    return (
      <div className="Chart">
        <h1 className="Chart-title">Изменение курса криптовалют за последние 2 недели в $</h1>
        <Line
          data={this.state.chartData}

          height={40}
          width={150}
          options={{

            maintainAspectRatio: false,

            scales: {
              yAxes: [
              {
                id: 'A',
              }, 
              {
                id: 'B',
              }
            ]
            },

            title: {
              display: false,
              text: "Изменение курса криптовалют за последние 2 недели в $",
              fontSize: 17,
              fontColor: "#000",
              fontFamily: "Arial"
            },

            legend: {
              display: true,
              labels: {
                fontColor: "#000"
              }
            },

            layout: {
              padding: {
                top: 0,
                bottom: 0
              }
            }
            
          }}
        />
      </div>
    )
  }
}

export default Chart