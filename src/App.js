import "semantic-ui-css/semantic.min.css";
import "./App.css";
// Components
import CryptoTable from "./CryptoTable";
import Charts from "./Charts";

import axios from "axios";
axios.defaults.baseURL = "https://api.wazirx.com/api";
// axios.defaults.headers.get["Accepts"] = "application/json";
// axios.defaults.headers.common["Access-Control-Allow-Origin"] =
//   "http://localhost:3000/";
// axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
// axios.defaults.proxy = {
//   host: "localhost",
//   port: 3000,
// };

function App() {
  return (
    <>
      <div className="main">
        {/* <h1 className="main-header">Crypto Tracker - Portfolio</h1> */}
        <CryptoTable />
      </div>
      <div className="main charts">
        {/* <h1 className="main-header">Crypto Tracker - Portfolio</h1> */}
        <Charts />
      </div>
    </>
  );
}

export default App;
