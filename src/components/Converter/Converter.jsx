import "./Converter.sass"

export default props => (
  <div className="Converter">
    <div className="Converter-items">
        <div className="currency">
          <div className="result">
            <span>{!props.result.onBTC.usdVal ? "" : `BTC: ${props.result.onBTC.usdVal}`}</span>
              
            <span>{!props.result.onETH.usdVal ? "" : `ETH: ${props.result.onETH.usdVal}`}</span>
          </div>
          <label className="label">Dollar</label>
          <span className="small">USD</span>
          <input onChange={event => props.inputHandler(event.target)} type="number" className="usdInput"/>
        </div>

        <div className="currency">
          <div className="result">
            <span>{!props.result.onUSD.btcVal ? "" : `USD: ${props.result.onUSD.btcVal}`}</span>
            
            <span>{!props.result.onETH.btcVal ? "" : `ETH: ${props.result.onETH.btcVal}`}</span>
          </div>
          <label className="label" >Bitcoin</label>
          <span className="small">BTC</span>
          <input onChange={event => props.inputHandler(event.target)} type="number" className="btcInput"/>
        </div>

        <div className="currency">
          <div className="result">
            <span>{!props.result.onBTC.ethVal ? "" : `BTC: ${props.result.onBTC.ethVal}`}</span>
              
            <span>{!props.result.onUSD.ethVal ? "" : `USD: ${props.result.onUSD.ethVal}`}</span>
          </div>
          <label className="label" >Ether</label>
          <span className="small">ETH</span>
          <input onChange={event => props.inputHandler(event.target)} type="number" className="ethInput"/>
        </div>
    </div>
    
    <input type="button" onClick={props.onCalcButton} className="calc-btn" value="КОНВЕРТИРОВАТЬ"/>  
  </div>
)
