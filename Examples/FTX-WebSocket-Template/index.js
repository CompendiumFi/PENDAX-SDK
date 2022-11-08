import { FtxSocket } from "./node_modules/@compendiumfi/pendax/sockets/ftxsocket.js"
// Standalone implementation of FTX sockets

let ftxSocket;
let subscriptions = {}
// Create config object - we will only use this object once - when the socket is originally started
const SocketConfigOne = {
    name: '',
    key: "",
    secret: "",
    subaccount: "",
    clientReconnect: socketReconnect,
    clientOnOpen: ftxOnOpen,
    clientOnMessage: ftxOnMessage,
    clientOnError: ftxOnError,
    clientOnClose: ftxOnClose,
    pingInterval: 10000,
    autoReconnectOnClose: true,
    reconnectWaitTime: 2000,
    maxRetries: 3,
    socket: ftxSocket
}

//Then, for convenience we define a function called startSocket - when called it will take our socketConfig OR the config object from the socket being retried as a parameter
function startSocket(socketConfig) {
    // connect
    try {
        // From this point forward we will access and manage the socket using the returned mySocket object
        ftxSocket = new FtxSocket(socketConfig)
        // setTimeout(
        //     function(subscriptions, ftxSocket){cancelSubscriptions(subscriptions, ftxSocket)} , 30000, subscriptions, ftxSocket
        // );
    }
    catch (error) {
        // handle error
    }
}
function cancelSubscriptions(subscriptionsToCancel, theSocket){
    for(const subscription in subscriptionsToCancel){
        theSocket.unsubscribe(subscription)
    }
}
// Reconnection/retry handler
function socketReconnect (oldSocket) {
    // Retrieve the most recent retry number from the old socket
    let currentRetry = oldSocket.getRetryNumber();
    // Retrieve the max retries value from the old socket
    let maxRetries = oldSocket.getOptions().maxRetries;
    // Test to see if we should retry the connection
    if (currentRetry <= maxRetries){
        console.log('reconnecting')
        // Now retrieve the options object from the old socket
        const oldSocketOptions = oldSocket.getOptions()
        // Finally attempt to restart the socket, passing in oldSocketOptions instead of mySocketConfig as we did the on first startup
        startSocket(oldSocketOptions);
    }
    else{
        // We ran out of retries...let the socket die
        console.log('max socket reconnect retries exceeded - socket terminated')
    }
}
// Event handlers
function ftxOnOpen(socketInfo){
    // upon opening we will login (since we are going to subscribe to private data)
    // there will be no response in any case
    ftxSocket.login();
    console.log('Socket opened - attempting login')
    // create our first subscription
    subscriptions.myOrders = {
        name: 'myOrders',
        args: 
            { channel: 'orders', market: 'BTC-PERP'}
    }
    // create our second subscription
    subscriptions.myFills = {
        name: 'myFills',
        args: {channel: 'fills', market: 'BTC-PERP'}
    }
    // create our third subscription
    subscriptions.myTickers = {
        name: 'myTickers',
        args: {channel: 'ticker', market: 'BTC-PERP'}
    }


    // subscribe
    // ftxSocket.subscribe(subscriptions.myOrders)
    // ftxSocket.subscribe(subscriptions.myFills)
   ftxSocket.subscribe(subscriptions.myTickers)
    console.log('Attempting subscriptions')
}
function ftxOnMessage(socketInfo, msg){
    switch(msg.type){
        case 'error':
            console.log('Error code: ', msg.code, ' Message: ', msg.msg)
            break;
        case 'subscribed':
            console.log('Subscribed to channel: ', msg.channel)
            break;
        case 'unsubscribed':
            // test to see if socket has any remaining subscriptions
            if (Object.keys(ftxSocket.getSubscriptions()).length == 0){
                // if not then kill socket - you must pass the socket instance itself into the kill routine
                ftxSocket.kill(ftxSocket)
            }
            console.log('Unsubscribed from channel: ', msg.channel)
            break;
        case 'info':
            console.log('Info received: Code: ', msg.code, ' Message: ', msg.msg)
            break;
        case 'partial':
            console.log('Market snapshot: ', msg.data)
            break;
        case 'update':
            console.log('Market data: ', msg.data)
            break;
    }
}
function ftxOnError(err, socketInfo){
    console.log(err);
}
function ftxOnClose(code, msg, socketInfo){
    // This is where you should end up after 60 seconds
    console.log('Code: ', code, ' Message: ', msg);
}

// start it up
startSocket(SocketConfigOne)

