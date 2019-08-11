# Bamazon
  
Running this application will first display all of the items available for sale (10 items prepopulated by me, the coder) with the ff:

   * item_id (unique id for each product)
   * product_name (Name of product)
   * department_name
   * price (cost to customer)
   * stock_quantity (how much of the product is available in stores)

The app will then prompt users with two messages.

   * The first will ask them the ID of the product they would like to buy.
   * The second message will ask how many units of the product they would like to buy.

Once the customer has placed the order, the application will check if your store has enough of the product to meet the customer's request.

   * If not, the app will log the phrase "Sorry, out of stock!", and then prevent the order from going through.

However, if your store has enough of the product, it will fulfill the customer's order.

   * SQL database will be updated to reflect the remaining quantity.
   * Once the update goes through, show the customer the total cost of their purchase.

See it in action here: https://github.com/darylacut/Bamazon/blob/master/bamazon.gif
