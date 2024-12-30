### Drop item:
Will cause an item to drop. The item stock will be reduced by 1.
### Print text:
Will cause the display to render the given text


Expected behavior:

Users will input the code of their targeted item.
If enough credit is present, the machine will drop the selected item. 
The item is not guaranteed to drop, and when it doesn't the machine will refund the item price into the credit.
When users will use the refund button, the machine should return the exact currency and subtract it from the credit.
If the machine has not enough currency to fullfill the refund, it should emit the receipt.
If there's not enough credit, it will display the price of the item and the current credit.

- 