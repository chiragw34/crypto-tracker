# Crypto-Tracker

## Description
This is a tracker which will help you to track the value of crypto. The crypto coins that are available on WazirX only can be tracked.

## Configuration

### Data

Create a file data.json in directory ```'src/utils/'```

The data should be in the format:
```javascript
{
  "Coins":[
    {
      "Id": "1",            // unique number
      "Coin": "BTC",        // Coin Name
      "Amount": "0.00018",  // Quantity of Coin you own
      "Invested": "502"     // Ammount you invested 
    },
    {
      "Id": "2",
      "Coin": "ETH",
      "Amount": "0.00018",
      "Invested": "502"
    },
    .
    .
    .
  ]
}
```

### Install Dependencies

This tracker uses [WazirX Public API](https://github.com/WazirX/wazirx-api)
You may find CORS error while running tracker. You can use chrome extension like [this](https://chrome.google.com/webstore/detail/cross-domain-cors/mjhpgnbimicffchbodmgfnemoghjakai) to avoid error.

Use command "npm install" to install dependencies


## Running the Tracker

Use command "npm start" to run locally

