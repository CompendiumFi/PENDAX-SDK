# PENDAX SOURCE DEVELOPER KIT (SDK)

A Javascript library allowing simplified interaction with advanced commands on a growing list of cryptocurrency exchanges and financial applications. Built and maintained by the team at [Compendium](https://compendium.finance).

Simplified exchange commands and interoperability. Our underlying high-frequency trading engine, PENDAX, is available for all developers, traders, financial analysts, and data scientists to build custom integrations on. It provides simple access to a variety of different use cases revolving around trading and data deployments.

Visit The [Official PENDAX Website](https://pendax.pro).
## Installation

Install The PENDAX SDK

```bash
  npm i @compendiumfi/pendax
```
    
## Current Supported Exchange Platforms

- [FTX International](https://ftx.com/referrals#a=cmfi)
- [FTX.US](https://ftx.us/home/#a=cmfi)
- [OKX (Formerly OKex)](https://www.okx.com/join/COMPENDIUM)
- [ByBit](https://www.bybit.com/en-US/invite?ref=LPMYYV) - *Partially Deployed*

#### Integration Roadmap Includes: 
Binance, Binance US, BitGet, BitMex, Coinbase Pro, Crypto.com, Gate.io, Huobi, Kraken, Kucoin, MEXC, & More.


## Features

For a complete capability and usage guidelines list please visit [PENDAX Usage Capabilities](https://docs.compendium.finance/pendax/pendax-capabilities).
- Full Public and Private HTTP REST APIs for all supported platforms are integrated in an efficient manner for secondary deployment.
- Aggregated commands are normalized between systems in the unified package making PENDAX extremely easy to integrate.
- WebSocket and live data capabilities are included for all supported exchanges.
- No subscription is needed for a "Professional" version of PENDAX. All commands and capabilities are free to use for all developers, traders, and integrators.

PENDAX consists of both public and private integrations. A public integration can be accessed immediately after integration and provides unrestricted access to data for all supported exchange markets and integrations without an API key. Private integrations feature the ability to interact with an account or post trades and require authorization methods in order to complete command tasks. Users will need to create an API key on their selected exchange. Documentation within the Connect An Exchange Account segment can help you find how to create keys for each integrated exchange.
### Public API Capabilities
Public APIs provide immediate and unrestricted access to the following commands without the need for authorization.
- Fetch all market pairs from each integrated platform and exchange
- Fetch tickers and trading parameters for all market pairs
- Live and historical price feeds and exchange rates for each market pair
- Live order book data for each market pair
- Fetch trade history for all market pairs
- Live and historical charting capabilities utilizing trading data
- Other supported public endpoints for individual exchanges outside of this list
> Capabilities may vary depending on the specific exchange integrations and their public access data feeds. Each exchange also has its own rate limiting guidelines that each user will be required to follow.

### Private API Capabilities
Authorized commands provide the ability to interact with trade orders, account data, and more. As mentioned before you will need to generate an API key from the selected exchange and then insert the authorization parameters into PENDAX to access these commands.
- Fetch and manage personal account information
- Create and edit subaccounts associated with the main account on supported exchanges
- Query account and subaccount balances
- Ability to deposit and withdraw from accounts and subaccounts
- Query current orders and historical personal orders
- Fetch personal ledger history for accounts and subaccounts
- Transfer funds between exchanges, accounts, and subaccounts
- Trade with all supported order types on supported exchanges
- Trade on all supported markets on supported exchanges
- Open and manage WebSockets on supported exchanges
> Capabilities may vary depending on the specific exchange integrations and their documented capabilities for authorized API calls. Each exchange also has its own rate limiting guidelines that each user will be required to follow.

### Example Use Cases
- Aggregated order books and optimal trade routing
- Fully customized private trading bot strategy
- Dollar-Cost Averaging strategies
- Cryptocurrency arbitrage strategies
- Grid-Trading Strategies
- Market Making for Cryptocurrency exchange markets
- Customized graphical interfaces for trading
- New market or statistics notifications
- Discord, Telegram, & Slack bots (or any other platform!)
- Custom hardware macro development (Streamdeck, etc)
- Compiling custom market charts
- Portfolio management, Trade journals, and PnL% tracking
- Data visualization and analytics interface
- Custom low-latency command-line interfaces (CLI)
- Advanced trading strategy indicators
- Tax Reporting Software
## Documentation


Full instructions for utilizing the PENDAX SDK and tooling can be found by visiting the [Documentation](https://docs.compendium.finance/pendax/using-pendax-sdk).

Functions within the PENDAX SDK are separate into two main core groups: "Common Functions" and "Exchange Specific Functions".

### Common Functions
Our team has done an excellent job in aggregating what we will refer to as "Common Functions" for a plethora of integrated platforms. Common functions are widely used calls available on different platforms and will work by just changing the "exchange" parameter and making edits to API credential layouts (depending on the selected exchange).
Examples of common functions include calls like placing trade orders or getting account balances.

By normalizing these commands developers can work in a more efficient manner while customizing integrations or code bases for multiple or different supported platforms.

Documentation relating to "Common Functions" can be found [here](https://docs.compendium.finance/pendax/using-pendax-sdk).

### Exchange Specific Functions
While there are a large variety of commonly normalized functions, there also may be a number of exchange-specific calls available for your selected platform. Many exchanges may include API features native to their interface and not found on other platforms so designating a common function is difficult in this manner.
We recommend browsing both the Common Functions and exchange-specific documentation pages while creating any instrument with PENDAX to ensure your code is designed to interact with the SDK in the correct manner.

To explore "Exchange Specific Functions" please visit the [Using The PENDAX SDK](https://docs.compendium.finance/pendax/using-pendax-sdk) page and select the supported exchange of your choice.

## FAQ

#### Do I Need Coding Knowledge To Use This Product?

Current PENDAX deployments are optimized for traders familiar with coding so we would recommend ample experience to utilize the full potential of our SDK and libraries. We have however focused on simplifying commands and other functions in comparison to comparable libraries so traders with less coding experience may find PENDAX easier to comprehend.

#### What Coding Languages is PENDAX currently available for?

PENDAX is currently available as a Javascript library and SDK. Hosted REST APIs will be available shortly for users more familiar with integrating traditional API setups.

#### Are All Facets Of The PENDAX SDK Free To Use?

Yes, the full PENDAX SDK is completely free to use for all developers, traders, analysts and more in accordance with our licensing and guidelines.

#### Where Can I See The PENDAX SDK In Action Or Find Coding Examples?

The best way to showcase capabilities is to build on PENDAX. We've released the new version of Compendium utilizing the latest PENDAX SDK capabilities. Our team will also add examples and code snippets to this repository to help speed up development.

#### Can I Request New Exchange Or Additions To The SDK?

The PENDAX tool suite is maintained by the team at Compendium. We are always looking for new community requests and additions that users would find useful to add in the next iterations. Join our Discord or email us at support@compendium.finance.


## Support & Contact Information

The PENDAX SDK/API's are built and maintained by the team at Compendium (Formerly branded as Compendium.Fi / Compendium Finance). Developers can use one of the following official channels for support.

- Discord: https://discord.gg/64r2xtqczs
- Telegram: https://t.me/CompendiumFinanceOfficial 
- Email: Support@Compendium.Finance

### Social Pages

- Compendium Twitter: https://twitter.com/CompendiumFi
- Pendax Twitter: https://twitter.com/PendaxPro 
- Youtube Channel: https://www.youtube.com/channel/UC749uyBnzwgTegYa0LkSj5w 



## License Agreement

[Click Here To View The License Agreement.](https://docs.compendium.finance/pendax/license-agreement) This Agreement becomes effective as of the date you first access, download, or use the API or SDK. This Agreement shall continue until terminated either by us or by you. Even after termination of this Agreement, certain provisions will survive, as discussed herein. This Agreement also incorporates Compendium's Terms of Service and Privacy Policy which terms shall also govern your use of the Service.
