// var pizzaTypes = [];
// var vegePizza = ["onion", "broccoli", "tomato", "pepper"];
// var meatPizza = ["chicken", "pepperoni", "ham"];
// var pepperoni = ["pepperoni"];
// var hawaiian = ["ham", "pinapple"];

function Pizza(size, pizzaType, extraToppings, note){
  this.size = size;
  this.pizzaType = pizzaType;
  this.extraToppings = extraToppings.slice(0);
  this.note = note;
}
Pizza.prototype.getPrice = function(){
  var totalCost = 0;
  switch (parseInt(this.size)) {
    case 8:
    totalCost = 6;
    break;
    case 12:
    totalCost = 9;
    break;
    case 16:
    totalCost = 13;
    break;
    default:
  }
  return totalCost += this.extraToppings.length * 1;
}

Pizza.prototype.toString = function(){
  var str = "";
  str += "Size: " + this.size;
  str += ", Type: " + this.pizzaType;
  if (this.extraToppings.length > 0){
  str += ", Extra Toppings: " + this.extraToppings.toString();
  }
  if (this.note){
    str += "//Special Request:" + this.note;
  }
  return str;
}

function CostumerInfo(firstName, lastName, phone, address){
  this.firstName = firstName;
  this.lastName = lastName;
  this.phone = phone;
  this.address = address;
}

CostumerInfo.prototype.toString = function(){
  var str = "";
  str += this.firstName + " " + this.lastName + "; " + this.phone + "; " + this.address.toString();
  return str;
}

function Address(street, city, state, zip){
  this.street = street;
  this.city = city;
  this.state = state;
  this.zip = zip;
}

Address.prototype.toString = function(){
  var str = this.street + ", " + this.city + ", " + this.state + ", " + this.zip;
  return str;
}

function ItemList(){
  this.pizzas = [];
  this.itemCounter = 0;
}

ItemList.prototype.addPizza = function(pizza){
  pizza.id = this.itemCounter;
  this.pizzas.push(pizza);
  this.itemCounter++;
}

ItemList.prototype.toString = function(){
  var str = "Pizzas: ";
  this.pizzas.forEach(function(pizza){
    str += "\n";
    str += pizza.toString();
  });
  return str;
}

function OrderForm(costumerInfo, itemList){
  this.costumerInfo = costumerInfo;
  this.orderStatus = "placed";
  this.itemList = itemList;
}

OrderForm.prototype.toString = function(){
  var str = "";
  str += this.costumerInfo.toString();
  str += "\n";
  str += this.itemList.toString();
  return str;
}

OrderForm.prototype.getId = function(){
  return this.id;
}

function OrderList(branchName){
  this.branchName = branchName;
  this.orders = [];
  this.orderIdCounter = 1000;
}

OrderList.prototype.addOrder = function(orderForm){
  orderForm.id = this.orderIdCounter;
  this.orders.push(orderForm);
  this.orderIdCounter++;
}

OrderList.prototype.getOrderById = function(id){
  for (var i = 0; i < this.orders.length; i++){
    if (this.orders[i].id){
      if (this.orders[i].id === id){
        return this.orders[i];
      }
    }
  }
  console.log("did not find order with id: " + id);
}

OrderList.prototype.deleteOrderById = function(id){
  for (var i = 0; i < this.orders.length; i++){
    if (this.orders[i].id){
      if (this.orders[i].id === id){
        delete this.orders[i];
      }
    }
  }
  console.log("did not find order to delete with id: " + id);
}

OrderList.prototype.toString = function(){
  var str = "";
  str += "ORDERS: "
  this.orders.forEach(function(order){
    str += "\n\n[" + order.getId() +"] " + order.toString();
  });
  return str;
}

magOrders = new OrderList("MagnoliaBranch");

var address1 = new Address("4200 N Diego", "Seattle", "WA", "98124");
//console.log(address1.toString());
var person1 = new CostumerInfo("John", "Smith", "24035203", address1);
//console.log(person1.toString());
var toppings1 = ["spinach, tomato, cheese"];
var piz1 = new Pizza(8, "meatPizza", toppings1, "no chicken, extra sausage");
var piz2 = new Pizza(16, "vegePizza", toppings1);
//console.log(piz1.toString());
var order1 = new OrderForm(person1);
var order2 = new OrderForm(person1);
//no longer automatically makes itemlist
// order1.itemList.addPizza(piz1);
// order2.itemList.addPizza(piz1);
// order2.itemList.addPizza(piz2);
// //console.log(order1.toString());
// magOrders.addOrder(order1);
// magOrders.addOrder(order2);
// console.log(magOrders.toString());
//instantly makes new item list, that is the cart

//choose type, choose specific pizza, costumize, choose size, add to cart which creates the pizza and adds to itemList
//then when you go to checkout it asks for user info, creates userInfo
//then when you go place order it creates an order form passing in userInfo and itemList, and adds that to do orderList
//we can have some local variables for client: cart
//step 1: create nav system between pizza types
//ASSUME DATABASE IS INCLUDED
var totalExtraToppings = 3;
var currentPizzaType;
var cart = new ItemList();
var meatPizzaTypes = ["Meatlover", "Anchovy", "Pepperoni", "Hawaiian", "VegeLover", "LotsMushrooms", "Treehugger", "SpicyOnion"];

//MEAT PIZZA PAGE
$(function(){
  //makes click function for each pizza type
  meatPizzaTypes.forEach(function(pizzaType){
    $("#" + pizzaType).click(function(event){
      bringOutPizzaForm(pizzaType);
      //this is a bad system
      currentPizzaType = pizzaType;

    });
  });
  //makes submit function
  $(".makePizzaForm").submit(function(event){
    event.preventDefault();
    var pizzaSize = $(".pizzaSize option:selected").val();
    var extraToppings = [];
    //collects extra toppings and puts in extratoppings array
    $("input:checkbox[name=extraToppings]:checked").each(function(){
      extraToppings.push($(this).val());
    });
    var extraNote = $("#note").val();
    var newPizza;

      newPizza = new Pizza(pizzaSize, currentPizzaType, extraToppings, extraNote);
      //delete form fields data
      $(".check").prop("checked", false);
      $("#note").val("");

    cart.addPizza(newPizza);
    console.log(cart.toString());
    $("#pizzaForm").hide();
    updateCartView(cart);
  });
});

function bringOutPizzaForm(pizzaType){
  $(".currentPizzaTypeHeader").text(pizzaType);
  //did not work with slideDown()
  $("#pizzaForm").show();
  window.scrollBy(0, 700);
}


function updateCartView(itemList){
  //delete everything from cart, then add items again
  $(".cart ol").html("");
  for(var i = 0; i < itemList.pizzas.length; i++){
    if (i === itemList.pizzas.length - 1){
      $(".cart ol").append("<li id = 'lastItem'></li>");
      setTimeout(function(){
        slowType(itemList.pizzas[itemList.pizzas.length - 1], itemList.pizzas[itemList.pizzas.length - 1].toString());
      }, 500);
    } else {
      $(".cart ol").append("<li>" + itemList.pizzas[i].toString() +
       "<br>" + "$" +  itemList.pizzas[i].getPrice() + "</li>");
    }
  }
  // itemList.pizzas.forEach(function(item){
  //   $(".cart ol").append("<li>" + item.toString() + "<br>" + "$" +  item.getPrice() + "</li>");
  // });
  setTimeout(function(){
    $(".totalPrice").text("Total: $" + getTotalPrice(itemList));
  }, 3000)

}

function getTotalPrice(itemList){
  var price = 0;
  itemList.pizzas.forEach(function(item){
    price+=item.getPrice();
  });
  return price;
}

function slowType(pizza, pizzaStr, totalStr){
  if (pizzaStr.length === 0){
    $("#lastItem").html(totalStr + "<br>" + "$" +  pizza.getPrice());
  } else {
    newStr = totalStr + pizzaStr.substring(0,1);
    $("#lastItem").text(newStr);
    setTimeout(function(){
      slowType(pizza, pizzaStr.slice(1), newStr);
    },30);
  }

}
// + item.toString() + "<br>" + "$" +  item.getPrice() +
