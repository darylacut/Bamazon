// -----------------------  modules and connection setup;
//var columnify = require('columnify');
var mysql = require("mysql");
var inquirer = require('inquirer');


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

// -----------------    creates connection function;
connection.connect(function(err) {
    if (err) throw err;
    listAllProducts();
  });

  // ---------------    creates function for products query and logs it.;
  
  
  function listAllProducts() {
    connection.query("SELECT * FROM products", function(err, result) {
      if (err) throw err;

      console.log ("\n\nHere are our products for sale:\n");

      for (var i = 0; i < result.length; i++) {

       
        console.log("Product ID: "+ result[i].item_id + "   |   " + 
                    result[i].product_name + "    |   " + 
                    result[i].department_name + "   |   " + 
                    "Price: $" + result[i].price + "    |   " + 
                    "Stock Available: " + result[i].stock_quantity);
        
      }
      console.log("-------------------------------------------------------");
     
      productQuery();
    });
  }


  // -----------------    creates function to prompt users;

  function productQuery() {
    inquirer
    .prompt([
      {
      name: 'item_id',
      type: 'input',
      message: "\nPlease enter ID of item which you would you like to buy\n\n",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        } 
        return false;
      }
    },
    {
      name: 'stock_quantity',
      type: 'input',
      message: "\nHow many would you like to buy?\n\n",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        } 
        return false;
      }
    }
  ])
    .then(function(answer) {
      // creating variable for user's item choice to carry over to decrease stock function;
      var itemChoice = answer.item_id;
      
      connection.query("SELECT * FROM products WHERE ?", {item_id: answer.item_id}, 
      function(err, result) {
        // creating variable for updated stock, to carry over to decrease stock function;
        var updatedStock = result[0].stock_quantity - answer.stock_quantity;
        if (updatedStock < 0) {
          console.log("\n\nSorry, we are out of stock!\n\n");
          //connection.end();
          process.abort();
        } else if (err) throw err;
        console.log("\n\nYou selected:\n\n   Item # " + result[0].item_id +
                    "\n   " + result[0].product_name +
                    "\n   Price: $" + result[0].price + 
                    "\n   Quantity: " + answer.stock_quantity + "pcs" + 
                    "\n\n   Total Cost is: $" + result[0].price * answer.stock_quantity);
        decreaseStock(itemChoice, updatedStock);
        });
    });
  }

 
  // ------------  a function to update the stock quantity;

  function decreaseStock(itemChoice, updatedStock) {
    connection.query("UPDATE products SET ? WHERE ?",
    [
      {
        stock_quantity: updatedStock
      },
      {
        item_id: itemChoice
      }
    ]
    );
    console.log("\nThank you very much for shopping with us!\n\n");
    continueShopping();
  }


  // ------------  function to ask the users if they want to continue

  function continueShopping() {
    inquirer
    .prompt ({
      name: 'continue',
      type: 'list',
      message: "Would you like to continue shopping?",
      choices: ["   Yes/Continue", "   No/Exit"]

    }).then(function(answer) {
      switch (answer.continue) {
        case "   Yes/Continue": listAllProducts();
        break;
        
        case "   No/Exit": connection.end();
        break;
      }
    })
  }