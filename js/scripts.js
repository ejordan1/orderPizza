function Pizza(size, toppings, note){
  this.size = size;
  this.toppings = toppings.slice(0);
  this.note = note;
}
Pizza.prototype.cost = function(){
  var totalCost = 0;
  switch (this.size) {
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
  totalCost += toppings.length * 1;
}

Pizza.prototype.toString = function(){
  var str = "";
  str += "Size: " + this.size;
  str += "; Toppings: " + this.toppings.toString();
  if (this.note){
    str += "; note: " + this.note;
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
    str += pizza.toString();
  });
  return str;
}

function OrderForm(costumerInfo){
  this.costumerInfo = costumerInfo;
  this.orderStatus = "placed";
  this.itemList = new ItemList();
}

OrderForm.prototype.toString = function(){
  var str = "";
  str += this.costumerInfo.toString();
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
var piz1 = new Pizza(8, toppings1);
var piz2 = new Pizza(16, toppings1);
//console.log(piz1.toString());
var order1 = new OrderForm(person1);
var order2 = new OrderForm(person1);
order1.itemList.addPizza(piz1);
order2.itemList.addPizza(piz1);
//console.log(order1.toString());
magOrders.addOrder(order1);
magOrders.addOrder(order2);
console.log(magOrders.toString());


//how to create an object inside an object? do this form itemslist inside orderform
