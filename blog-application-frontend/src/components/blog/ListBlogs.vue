<template>
  <div class='blog container'>
    <h2>{{title}}</h2>
    <hr>
    <div class="row">
    <div class="col-sm-6 col-md-4" v-for="post in posts" v-bind:key="post">
      <div class="thumbnail">
        <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80">
        <div class="caption">
          <h3>{{post.title}}</h3>
          <p>{{post.body}}</p>
          <p><a href="#" class="btn btn-primary" role="button">Read More</a> <a href="#" class="btn btn-danger" role="button">Delete</a></p>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>

export default {

  name: 'CreateBlog',

  data () {

   return {
      title: 'Blog App',
      posts: [{
        'userId': 1,
        'id': 1,
        'title': 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
        'body': 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
      },
      {
        'userId': 1,
        'id': 2,
        'title': 'qui est esse',
        'body': 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla'
      },
      {
        'userId': 1,
        'id': 3,
        'title': 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
        'body': 'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut'
      }]
    }

  },
 
  

}

</script>
