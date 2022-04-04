
Vue.createApp({
  data() {
    return {
      products: [
        {
          type: "product",
          kind: "hoodie",
          title: "Grateful Dead Hoodie",
          titleStyle: "uppercase",
          description: "<p>A nice, soft Grateful Dead 'bear' hoodie</p>",
          price: 45,
          inventory: 5,
          image: "./images/hoodie.png",
        },
        {
          type: "product",
          kind: "hat",
          title: "Grateful Dead Hat",
          titleStyle: "uppercase",
          description: "<p>A nice, stylish Grateful Dead 'Bertha' hat</p>",
          price: 20,
          inventory: 5,
          image: "./images/dead-hat.png",
        },
        {
          type: "product",
          kind: "shirt",
          title: "ACDC Shirt",
          titleStyle: "uppercase",
          description: "<p>A soft, classic ACDC shirt</p>",
          price: 30,
          inventory: 5,
          image: "./images/acdc.png",
        }
      ],
      cart: {},
      cartLen: 0,
      totalPrice: 0,
      isProductPage: true
    }
  },
  methods: {
    /*
     * Returns whether or not the given product is in stock
     */
    outOfStock(product) {
      return product.inventory < 1;
    },
    /*
     * Updates the proper amonut of each item in the cart if it is available
     */
    addToCart(product) {
      if (!this.outOfStock(product)) {
        this.cartLen++;
        product.inventory--;
        this.totalPrice += product.price;
        if (product.title in this.cart) {  // check if item is in the cart
          this.cart[product.title]++;      // if item in cart increase by 1
        } else {                           // if item not in cart, add it
          this.cart[product.title] = 1;
        }
      } else {
        alert("Not enough items in stock");
      }
    },
    /*
     * Returns the amount of items available and provides a low inventory message
     * if necessary
     */
    displayAvailable(product) {
      if (this.outOfStock(product)) {
        return "Out of Stock";
      } else if (product.inventory < 3) {
        return "Low inventory - " + product.inventory + " available - buy this item before it's out of stock!";
      } else {
        return "Available: " + product.inventory;
      }
    },
    /*
     * Shows the items in the cart, the total for each item, and total for all items
     */
    displayCart(name, value) {
      let prod = this.products.find(p => p.title === name);
      return "Product: " + prod.title + " - Quantity: " + value + " - Price: $" + prod.price + " - Available: "+ prod.inventory + " - Total: $" + prod.price * value;
    },
    /*
     * Gets the image source for the item in the cart
     */
    cartImg(name) {
      let prod = this.products.find(p => p.title === name);
      return prod.image;
    },
    /*
     * Removes one of the given item from the cart
     */
    removeItem(name, value) {
      let prod = this.products.find(p => p.title === name);
     
      if (this.cart[name] === 1) {
        delete this.cart[name];
      } else {
        this.cart[name]--;
      } 

      this.cartLen--;
      this.totalPrice -= prod.price;
      prod.inventory++;
    },
  },
  computed: {
    /*
     * Returns number of items offered
     */
    numItems() {
      return this.products.length;
    },
  }
}).mount('#app');