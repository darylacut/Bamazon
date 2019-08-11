// -----------------------  modules and connection setup;
//var columnify = require('columnify')
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
    //console.log("\nconnected as id " + connection.threadId);
    listAllProducts();
  });

  // ---------------    creates function for products query and logs it.;
  
  
  function listAllProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;

      console.log ("\n\nHere are our products for sale:\n");

      for (var i = 0; i < res.length; i++) {

        console.log("Product ID: "+ res[i].item_id + " | " + 
                    res[i].product_name + " | " + 
                    res[i].department_name + " | " + 
                    "Price:  $ " + res[i].price + " | " + 
                    "Stock Available: " + res[i].stock_quantity);

      }
      console.log("-------------------------------------------------------");
      productQuery();
    });
  }


  // -----------------    creates function to prompt users;
  function productQuery() {
    inquirer
    .prompt({
      name: 'action',
      type: 'input',
      message: "\nPlease enter ID of item which you would you like to buy\n\n",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    })
  
  //   .then(function(answer)
  }