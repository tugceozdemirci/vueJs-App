<template>
  <div class="content">
    <div class="q-pa-md">
    <q-table
      title="Products"
      :data="products"
      :columns="columns"

    />
  </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'ProductsPage',
  data() {
      return {
        products: [
          {
            id:'',
            title: '',
            description: '',
            price:'',
            discountPercentage:'',
            rating:'',
            stock:'',
            brand: '',
            category: '',
            thumbnail: '',
            images: '',
          }
        ],
        columns: [
          { name: "id", label: "#", field: "id" ,align: "center",},
          { name: "title", label: "Title", field: "title" ,align: "center",},
          { name: "price", label: "Price", field: "price",align: "center", },
          { name: "discountPercentage", label: "Discount Percentage", field: "discountPercentage",align: "center", },
          { name: "rating", label: "Rating", field: "rating",align: "center", },
          { name: "stock", label: "Stock", field: "stock",align: "center", },
          { name: "brand", label: "Brand", field: "brand",align: "center", },
          { name: "category", label: "Category", field: "category", align: "center",},
          { name: "description", label: "Description", field: "description", align: "left",},

        ],
      }
    },

  mounted() {
    this.getProducts();
    console.log("uygulama mounted oldu");
  },
  methods: {
    async getProducts() {
      const response = await axios.get("https://dummyjson.com/products");
      console.log(response);
      this.products = response.data.products;
      console.log(this.products);
    },
  },

}
</script>

<style scoped>
.content {
height: 50px;
width: 100%;
background-color: #fff;
padding-top: 20px;
text-align: center;
}
</style>
