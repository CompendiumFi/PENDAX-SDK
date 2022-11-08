# OKX Websocket Template built with PENDAX-SDK 
https://github.com/CompendiumFi/PENDAX-SDK

install required packages with ```npm install```


run with ```npm index.js```

## This application is a fully functional template for okx websockets utilizing PENDAX-SDK

Add your api key, secret, and passphrase in index.js under the socket config. adjust parameters as neccesary. If the endpoint you are trying to
use is private, change isPrivate: true. For market data and other public endpoints, isPrivate: false.

This sample code is using a single okxSubscription, however to add more just declare a new variable and a new socket config. You can refrence more
than one at a time inside the try block in startSocket function.

<img width="903" alt="Screenshot 2022-11-03 at 4 13 41 AM" src="https://user-images.githubusercontent.com/81376325/199673473-d4dbd5b9-7af5-4809-ac17-8beb173d1180.png">

create a subscription inside the doSubscriptions function.

ex:
```    
function doSubscriptions(socket) {
subscriptions.tickers = {
        name: 'tickers',
        args:
            [{ channel: 'tickers', instId: 'BTC-USDT-SWAP' }]
    }
    socket.subscribe(subscriptions.tickers)
    console.log('Attempting subscriptions')
}
```

Edit what you want to happen when a message comes in on this channel inside the handleMessage function:
```        
case 'tickers':
            console.log(msg.data)
            break;
```
## Result

<img width="266" alt="Screenshot 2022-11-03 at 4 08 31 AM" src="https://user-images.githubusercontent.com/81376325/199672680-b661c51d-50c3-4d82-9828-78de1e52aba6.png">

            
All websocket functionality available from OKX at time of writing is present in this template     
