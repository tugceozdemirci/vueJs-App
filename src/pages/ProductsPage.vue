<template>
  <div class="content">
    <div class="q-pa-md">
    <q-table
      title="Projects"
      :data="products"
      :columns="columns"
      :key="products"
    />
  </div>
  </div>
</template>

<script>
export default {
  name: 'ProductsPage',
  data() {
      return {
        selectedItem: null,
        new_product: [],
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
          { name: "id", label: "#", field: "id" },
          { name: "title", label: "Title", field: "title" },
          { name: "price", label: "Price", field: "price" },
          { name: "discountPercentage", label: "Discount Percentage", field: "discountPercentage" },
          { name: "rating", label: "Rating", field: "rating" },
          { name: "stock", label: "Stock", field: "stock" },
          { name: "brand", label: "Brand", field: "brand" },
          { name: "category", label: "Category", field: "category" },
          { name: "description", label: "Description", field: "description" },

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
