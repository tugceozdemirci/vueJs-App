<template>
  <div class="q-pa-md">
    <q-page-container>
      <div class="content">
         <!-- CREATE PROJECT -->
      <q-btn label="Create Project" color="accent" @click="prompt = true" />

      <q-dialog v-model="prompt" persistent>
        <q-card style="width: 600px">
          <q-card-section>
            <div class="text-h6">Create Project</div>
          </q-card-section>
          <q-separator color="gray" />
          <q-card-section>
            <div class="title">
              <label style="font-size: 18px; font-weight: bold;">Project Name</label>
              <q-input color="accent" outlined v-model="title" type="text" placeholder="Your project title..." />
            </div>
            <q-space style="height: 30px;" />
            <div class="description">
              <label style="font-size: 18px; font-weight: bold;">Description</label>
            <q-input
              color="accent" style="max-width: 600px; background-color: white;"  outlined  type="textarea" placeholder="Short description about your project..." v-model="description"/>
          </div>
          </q-card-section>
          <q-separator color="gray" />
          <q-card-actions align="right" class="text-primary">
            <q-btn no-caps label="Create" color="accent" @click="createTask" v-close-popup />
            <q-btn no-caps label="Cancel" color="accent" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
    <!-- TASK LİST -->
    <div class="content-card">
    <div class="card-wraps">
      <div class="row justify-evenly items-baseline q-col-gutter-md q-pa-md q-gutter-md">
      <q-card class="my-card q-py-sm " v-for="(task, index) in taskList" :key="index">
        <q-card-section class="card-header">
          <div class="text-h6">{{ task.title }}</div>
          <q-separator inset />
        </q-card-section>
        <q-card-section class="text-black">
          <div class="text-subtitle2 text-black">
            {{ task.description }}
          </div>
        </q-card-section>
  <!-- ADD CARD ITEM -->
        <q-card-section class="text-white">
          <div class="add-item-input" vertical align="right">
            <q-input outlined type="text" color="accent" placeholder="Add a item." v-model="task.taskInput" />
            <q-btn color="accent" class="add-item-btn" icon="add" @click="addItem(task.taskInput, task.id)"></q-btn>
          </div>
        </q-card-section>
        <q-card-section>
          <q-scroll-area :thumb-style="thumbStyle" :bar-style="barStyle" style="height: 200px; max-width: 300px;">
            <div class="q-pa-md">
            <q-list v-for="i, itemID in task.itemList" :key="itemID" class="q-pa-md justify-between" >
              <q-item >
                <q-item-section>{{ i.item }}</q-item-section>
                <q-item-section >
                  <q-btn color="black" flat icon="close" @click="deleteItem(index, itemID)"></q-btn>
                </q-item-section>
              </q-item>
            </q-list>
            </div>
          </q-scroll-area>
        </q-card-section>
        <q-card-actions align="right" class="q-py-md" style="position: absolute; bottom: 0; ; ">
          <!-- Edit - Delete buton yeri -->
          <q-btn flat icon="edit" class="icons" @click="prompt2 = true; openEditTask(task.id)"></q-btn>
          <!-- Edit Dialog -->
          <q-dialog v-model="prompt2" persistent>
        <q-card style="width: 600px">
          <q-card-section>
            <div class="text-h6">Update Project</div>
          </q-card-section>
          <q-separator color="gray" />
          <q-card-section>
            <div class="title">
              <label style="font-size: 18px; font-weight: bold;">Project Name</label>
              <q-input outlined color="accent" v-model="editTitle" type="text" />
            </div>
            <q-space style="height: 30px;" />
            <div class="description">
              <label style="font-size: 18px; font-weight: bold;">Description</label>
            <q-input color="accent"
              style="max-width: 600px; background-color: white;"
              outlined
              type="textarea"
              v-model="editDescription"
            />
          </div>
          </q-card-section>
          <q-separator color="gray" />
          <q-card-actions align="right" class="text-primary">
            <q-btn no-caps label="Create" color="accent" @click="editTask()" v-close-popup />
            <q-btn no-caps label="Cancel" color="accent" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
          <q-btn flat icon="delete" class="icons" @click="deleteTask(index)"></q-btn>
        </q-card-actions>
      </q-card>
    </div>
    </div>
  </div>
</q-page-container>
</div>
</template>

<script>
export default {
components: {},
name: "Home",

data() {
return {
  thumbStyle: {
    right: '4px',
    borderRadius: '5px',
    backgroundColor: '#6c63ff',
    width: '5px',
    opacity: 0.75
  },

  barStyle: {
    right: '2px',
    borderRadius: '9px',
    backgroundColor: '#6c63ff',
    width: '9px',
    opacity: 0.2
  },
  prompt: false,
  prompt2: false,
  selectedItem: "",
  editTitle: "",
  editDescription: "",
  title: "",
  description: "",
  item: "",
  newItem: "",
  itemArr: [],
  taskList: [],
};
},

methods: {
createTask() {
  let id = this.taskList.length;
  this.taskList = [...this.taskList,{
    id: id,
    title: this.title,
    description: this.description,
    itemList: [],
    taskInput: "",
  }];
  // this.taskList.push({
  //   id: this.index,
  //   title: this.title,
  //   description: this.description,
  //   itemList: [],
  // });
  this.title = "";
  this.description = "";
},

openEditTask(id) {
  this.selectedItem = id;
  let foundId = this.taskList.findIndex(x => x.id == this.selectedItem);

  this.editTitle = this.taskList[foundId].title;
  this.editDescription = this.taskList[foundId].description;
  console.log(this.selectedItem);
},

editTask() {
  let foundId = this.taskList.findIndex((x) => x.id == this.selectedItem);
  console.log(foundId);
  let editedTask = {
    id: this.selectedItem,
    title: this.editTitle,
    description: this.editDescription,
  };
  console.log(editedTask);
  this.taskList[foundId] = editedTask;
  this.selectedItem = null;
  editedTask = "";
  this.editTitle = "";
  this.editDescription = "";
},

deleteTask(index) {
  this.taskList.splice(index,1);
},

addItem(newItem,id) {
  let index = this.taskList[id].itemList.length;
  this.taskList[id].itemList = [...this.taskList[id].itemList, {
    id: index,
    item: newItem,
  }];
  this.taskList[id].taskInput = "";
  index = null;

},

deleteItem(index, itemID) {
  this.taskList[index].itemList.splice(itemID,1);
},
},
};
</script>

<style scoped>
.btn {
width: 140px;
background-color: #6c63ff;
border: none;
outline: none;
height: 49px;
border-radius: 49px;
color: #fff;
text-transform: uppercase;
font-weight: 600;
margin: 10px 0;
cursor: pointer;
transition: 0.5s;
}

.content {
height: 100px;
width: 100%;
background-color: #fff;
padding-top: 20px;
text-align: center;
}
.content-card {
height: 200px;
width: 100%;
background-color: #fff;
padding-top: 20px;
text-align: start;
text-transform: capitalize;

}
.content-card .card-wraps {

padding: 10px;
width: 100%;
display: flex;
justify-content: space-evenly;
}

.card-wraps .my-card {
height: 500px;
width: 330px;
box-shadow: 0px 5px 30px #a5a5a5;
justify-content: space-between;

}

.card-header {
margin-top: 10px;
margin-bottom: 10px;
max-width: 100%;
height: 30px;
padding: 1px 1px 1px;
text-align: center;
overflow: hidden;
text-transform: uppercase;

}

.task-container {
height: 100vh;
width: 100%;
display: flex;
flex-wrap: wrap;
background-color: #f6f7f8;
padding: 40px 50px;
}

.icons {
cursor: pointer;
color: #6c63ff;
}

.card-item{
margin-top: 5px;
margin-left: 5px;
margin-bottom: 5px;
width: 100%;
display: flex;
justify-content: space-between;
}

.add-item-input {
display: flex;
justify-content: space-evenly;
}

</style>




