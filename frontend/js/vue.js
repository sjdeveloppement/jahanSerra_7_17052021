const app = new Vue({
    el: '#app',
    data: {
        message: "Vue Mart",
        shoppingCart: [
        { label: 'Pommes', cost: 6, url:'/apples.html' },
        { label: 'Bananes', cost: 2, url: '/bananas.html' },
        { label: 'Noix de coco', cost: 8, url: '/coconuts.html' }
    ]
    },
    computed: {
        totalPrice() {
            let total = 0
            this.shoppingCart.forEach(item => {
                total += item.cost
            })
            return total
        }
    }
})