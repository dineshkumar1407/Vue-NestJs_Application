<template>
   <div>
        <div class="col-md-12 form-wrapper">
          <h2> Create Customer </h2>
          <form id="create-post-form" @submit.prevent="createBlog">
               <div class="form-group col-md-12">
                <label for="title"> Blog title </label>
                <input type="text" id="title" v-model="first_name" name="blog-title" class="form-control" placeholder="Enter blog title">
               </div>
              <div class="form-group col-md-12">
                  <label for="description"> Description </label>
                  <textarea type="text" id="description" v-model="description" name="description" class="form-control" placeholder="Enter Description"></textarea>
              </div>
              <div class="form-group col-md-4 pull-right">
                  <button class="btn btn-success" type="submit"> Create Blog </button>
              </div>           </form>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import { server } from "../../helper";
import router from "../../router";

export default {

  name: 'CreateBlog',

  data() {
    return {
      title: "",
      description: "",
    };
  },
   methods: {
    createBlog() {
      let userData = {
        title: this.title,
        description: this.description,
      };
      this.__submitToServer(userData);
    },
    __submitToServer(data) {
      axios.post(`${server.baseURL}/blog/create`, data).then(data => {
        router.push({ name: "home" });
      });
    }
  }
 
  

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>



</style>