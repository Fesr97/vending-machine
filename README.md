# VENDING MACHINE 3000

This project simulates (to some extents) an incomplete vending machine.
The machine won't work by itself. The different components do not have a shared logic, some of them communicate with internal messages, but most of the logic to handle the user flow is missing.

## Messaging API

The API works via _messages_.
The messages follow this schema:

```ts
type Message = { channel: "vending-machine"; type: TYPE; data: DATA };
```

The vending machine will emit the following messages through [`window.postMessage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage):

### Message types


#### Print to display
Type: `print`
Parameters (1): A string.

Will display the string to the LCD display.

#### Drop an item 
Type: `drop-item`
Parameters (1): The item's code in string form (eg. "01") 

Will prompt the vending machine to drop an item. Will throw an error if the item is out of stock.

#### Drop a coin
Type: `drop-coin`
Parameters (1): The value of the coin to drop (eg. "200","100","10","2"...etc)

Will prompt the vending machine to drop an item. Will throw an error if the item is out of stock.

#### Emit a receipt
Type: `emit-receipt`
Parameters (1): The due refund amount (eg. 200 means 2€)

The vending machine will emit the receipt, which will include the due amount in its content.

#### Get the amount of available coins of each type
Type: `get-available-currency`
Parameters (NONE)

Will prompt the vending machine to send a message containing the current amount of coins for each type of currency.
The vending machine will send a message of type `available-currency`, the `data` field contains a JSON like this:
```json
{ "1": 1, "2": 4, "5": 8, "10": 5, "20": 6, "50": 1, "100": 6, "200": 3 }
```
An event handler must be set in place to handle this response.