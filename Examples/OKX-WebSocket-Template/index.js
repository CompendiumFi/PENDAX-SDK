import { OkxSocket } from "../PENDAX/package/sockets/okxsocket.js"
// Standalone implementation of OKX sockets

let okxSocket;
let subscriptions = {}
// Create config object - we will only use this object once - when the socket is originally started
const okxSocketConfig = {
    name: 'okxSocket',
    key: "",
    secret: "",
    passphrase: "",
    clientReconnect: socketReconnect,
    clientOnOpen: okxOnOpen,
    clientOnMessage: okxOnMessage,
    clientOnError: okxOnError,
    clientOnClose: okxOnClose,
    pingInterval: 10000,
    autoReconnectOnClose: true,
    reconnectWaitTime: 3000,
    maxRetries: 3,
    socket: okxSocket,
    isPrivate: false
}

//Then, for convenience we define a function called startSocket - when called it will take our socketConfig OR the config object from the socket being retried as a parameter
function startSocket(socketConfig) {
    // connect
    try {
        // From this point forward we will access and manage the socket using the returned mySocket object
        okxSocket = new OkxSocket(socketConfig)
        // setTimeout(
        //     function (subscriptions, okxSocket) { cancelSubscriptions(subscriptions, okxSocket) }, 30000, subscriptions, okxSocket
        // );
    }
    catch (error) {
        // handle error
    }
}
function cancelSubscriptions(subscriptionsToCancel, theSocket) {
    for (const subscription in subscriptionsToCancel) {
        theSocket.unsubscribe(subscription)
    }
}
// Reconnection/retry handler
function socketReconnect(oldSocket) {
    // Retrieve the most recent retry number from the old socket
    let currentRetry = oldSocket.getRetryNumber();
    // Retrieve the max retries value from the old socket
    let maxRetries = oldSocket.getOptions().maxRetries;
    // Test to see if we should retry the connection
    if (currentRetry <= maxRetries) {
        console.log('***************** reconnecting **********************')
        console.log('Retry = ', currentRetry)
        // Now retrieve the options object from the old socket
        const oldSocketOptions = oldSocket.getOptions()
        // Finally attempt to restart the socket, passing in oldSocketOptions instead of mySocketConfig as we did the on first startup
        startSocket(oldSocketOptions);
    }
    else {
        // We ran out of retries...let the socket die
        console.log('max socket reconnect retries exceeded - socket terminated')
    }
}
// Event handlers
function okxOnOpen(socketInfo) {
    // upon opening we will login (since we are going to subscribe to private data)
    // there will be no response in any case
    socketInfo.socket.login();
    console.log('Socket opened - attempting login')
}
function placeOrders(socket){
    const orders = {
        id: '2637251',
        args: [
            {
                "side": "buy",
                "instId": "BTC-USDT",
                "tdMode": "cross",
                "ordType": "market",
                "sz": "0.01"
            }
        ]
    }
    socket.placeOrders(orders)
}
function amendOrders(socket){
    
}
function cancelOrders(socket){
    
}
function doSubscriptions(socket) {
    // create our first subscription
    // subscriptions.orders = {
    //     name: 'orders',
    //     args:
    //         [{ channel: 'orders'}]
    // }
    subscriptions.tickers = {
        name: 'tickers',
        args:
            [{ channel: 'tickers', instId: 'BTC-USDT-SWAP' }]
    }
    // subscriptions.myBalances = {
    //     name: 'myBalances',
    //     args:
    //         [{ channel: 'balance_and_position'}]
    // }
    // subscriptions.ob = {
    //     name: 'orderbook',
    //     args:
    //         [{ channel: 'books', instId: 'BTC-USDT-SWAP' }]
    // }
    // subscribe
    //socket.subscribe(subscriptions.myOrders)
    //socket.subscribe(subscriptions.myBalances)
    socket.subscribe(subscriptions.tickers)
    //socket.subscribe(subscriptions.orders)
    console.log('Attempting subscriptions')
}
function okxOnMessage(socketInfo, msg) {
    switch (msg.event) {
        case 'login':
            console.log('login successful');
            doSubscriptions(socketInfo.socket);            
            //placeOrders(socketInfo.socket)
            break;
        case 'error':
            if (msg.msg.includes('"op":"login"') || msg.msg.includes('Please log in')) {
                socketInfo.socket.loggedOut()
            }
            console.log('Error code: ', msg.code, ' Message: ', msg.msg)
            break;
        case 'subscribe':
            console.log('Subscribed to channel: ', msg.arg)
            break;
        case 'unsubscribe':
            // test to see if socket has any remaining subscriptions
            if (Object.keys(okxSocket.getSubscriptions()).length == 0) {
                // if not then kill socket - you must pass the socket instance itself into the kill routine
                okxSocket.kill(okxSocket)
            }
            console.log('Unsubscribed from channel: ', msg.channel)
            break;
        // case 'info':
        //     console.log('Info received: Code: ', msg.code, ' Message: ', msg.msg)
        //     break;
        // case 'partial':
        //     console.log('Market snapshot: ', msg.data)
        //     break;
        // case 'update':
        //     console.log('Market data: ', msg.data)
        //     break;
        default:
            if (msg.event) {
                console.log('Unknown event: ', msg.event)
            }
            else {
                handleMessage(msg)
            }
            break;
    }
}
function handleMessage(msg) {
    switch (getMessageType(msg)) {
        case 'order':
            console.log(msg.data)
            break;
        case 'batch-orders':
            console.log(msg.data)
            break;
        case 'cancel-order':
            console.log(msg.data)
            break;
        case 'batch-cancel-orders':
            console.log(msg.data)
            break;
        case 'amend-order':
            console.log(msg.data)
            break;
        case 'batch-amend-orders':
            console.log(msg.data)
            break;
        case 'account':
            console.log(msg.data)
            break;
        case 'positions':
            console.log(msg.data)
            break;
        case 'balance_and_position':
            console.log(msg.data)
            break;
        case 'orders':
            console.log(msg.data)
            break;
        case 'orders-algo':
            console.log(msg.data)
            break;
        case 'algo-advance':
            console.log(msg.data)
            break;
        case 'liquidation-warning':
            console.log(msg.data)
            break;
        case 'account-greeks':
            console.log(msg.data)
            break;
        case 'rfqs':
            console.log(msg.data)
            break;
        case 'quotes':
            console.log(msg.data)
            break;
        case 'struc-block-trades':
            console.log(msg.data)
            break;
        case 'grid-orders-spot':
            console.log(msg.data)
            break;
        case '"grid-orders-contract':
            console.log(msg.data)
            break;
        case 'grid-positions':
            console.log(msg.data)
            break;
        case 'grid-sub-orders':
            console.log(msg.data)
            break;
        case 'instruments':
            console.log(msg.data)
            break;
        case 'tickers':
            console.log(msg.data)
            break;
        case 'open-interest':
            console.log(msg.data)
            break;
        case 'candle1D':
            console.log(msg.data)
            break;
        case 'trades':
            console.log(msg.data)
            break;
        case 'estimated-price':
            console.log(msg.data)
            break;
        case 'mark-price':
            console.log(msg.data)
            break;
        case 'mark-price-candle1D':
            console.log(msg.data)
            break;
        case 'price-limit':
            console.log(msg.data)
            break;
        case 'books':
            console.log(msg.data[0])
            break;
        case 'opt-summary':
            console.log(msg.data)
            break;
        case 'funding-rate':
            console.log(msg.data)
            break;
        case 'index-candle1Y':
            console.log(msg.data)
            break;
        case 'index-candle6M':
            console.log(msg.data)
            break;
        case 'index-candle3M':
            console.log(msg.data)
            break;
        case 'index-candle1M':
            console.log(msg.data)
            break;
        case 'index-candle1W':
            console.log(msg.data)
            break;
        case 'index-candle1D':
            console.log(msg.data)
            break;
        case 'index-candle2D':
            console.log(msg.data)
            break;
        case 'index-candle3D':
            console.log(msg.data)
            break;
        case 'index-candle5D':
            console.log(msg.data)
            break;
        case 'index-candle12H':
            console.log(msg.data)
            break;
        case 'index-candle6H':
            console.log(msg.data)
            break;
        case 'index-candle4H':
            console.log(msg.data)
            break;
        case 'index-candle2H':
            console.log(msg.data)
            break;
        case 'index-candle1H':
            console.log(msg.data)
            break;
        case 'index-candle30m':
            console.log(msg.data)
            break;
        case 'index-candle15m':
            console.log(msg.data)
            break;
        case 'index-candle5m':
            console.log(msg.data)
            break;
        case 'index-candle3m':
            console.log(msg.data)
            break;
        case 'index-candle1m':
            console.log(msg.data)
            break;
        case 'index-candle1Yutc':
            console.log(msg.data)
            break;
        case 'index-candle3Mutc':
            console.log(msg.data)
            break;
        case 'index-candle1Mutc':
            console.log(msg.data)
            break;
        case 'index-candle1Wutc':
            console.log(msg.data)
            break;
        case 'index-candle1Dutc':
            console.log(msg.data)
            break;
        case 'index-candle2Dutc':
            console.log(msg.data)
            break;
        case 'index-candle3Dutc':
            console.log(msg.data)
            break;
        case 'index-candle5Dutc':
            console.log(msg.data)
            break;
        case 'index-candle12Hutc':
            console.log(msg.data)
            break;
        case 'index-candle6Hutc':
            console.log(msg.data)
            break;
        case 'index-tickers':
            console.log(msg.data)
            break;
        case 'status':
            console.log(msg.data)
            break;
        case 'public-struc-block-trades':
            console.log(msg.data)
            break;
        case 'block-tickers':
            console.log(msg.data)
            break;
    }
}
function getMessageType(msg) {
    if (msg.op) {
        return msg.op;
    }
    else if (msg.arg) {
        return msg.arg.channel
    }
}
function okxOnError(err, socketInfo) {
    console.log(err);
}
function okxOnClose(code, msg, socketInfo) {
    // This is where you should end up after 60 seconds
    console.log('Code: ', code, ' Message: ', msg);
}

// start it up
startSocket(okxSocketConfig)

