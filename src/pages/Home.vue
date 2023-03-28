<template>
    <q-page-container>
      <div class="content">
        <!-- CREATE PROJECT -->
      <q-btn label="Create Project" color="accent" @click="prompt = true" class="btn" />
      <q-dialog v-model="prompt" persistent>
        <q-card style="width: 600px">
          <q-card-section>
            <div class="text-h6">Create Project</div>
          </q-card-section>
          <q-separator color="gray" />
          <q-card-section>
            <div class="title">
              <label style="font-size: 18px; font-weight: bold;">Project Name</label>
              <q-input color="accent" outlined v-model="createProject.title" type="text" placeholder="Your project title..." />
            </div>
            <q-space style="height: 30px;" />
            <div class="description">
              <label style="font-size: 18px; font-weight: bold;">Description</label>
            <q-input
              color="accent" v-model="createProject.description" style="max-width: 600px; background-color: white;"  outlined  type="textarea" placeholder="Short description about your project..." />
          </div>
          </q-card-section>
          <q-separator color="gray" />
          <q-card-actions align="right" class="text-primary">
            <q-btn no-caps label="Create" color="accent" @click="addNewProject" v-close-popup />
            <q-btn no-caps label="Cancel" color="accent" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
      <div class="q-pa-md">
        <q-table
      grid

      :data="projectList"
      :columns="columns"
      row-key="name"

      hide-header
    >
    </q-table>
      </div>

    <!-- PROJECT LİST -->
    <!-- <div class="content-card">
    <div class="card-wraps">
      <div class="row justify-evenly items-baseline q-col-gutter-md q-pa-md q-gutter-md">
      <q-card class="my-card q-py-sm " v-for="(project, index) in projectList" :key="index">
        <q-card-section class="card-header">
          <div class="text-h6">{{ project.title }}</div>
          <q-separator inset />
        </q-card-section>
        <q-card-section class="text-black">
          <div class="text-subtitle2 text-black">
            {{ project.description }}
          </div>
        </q-card-section>
          ----ADD CARD TASK --------
        <q-card-section class="text-white">
          <div class="add-item-input" vertical align="right">
            <q-input outlined type="text" color="accent" placeholder="Add a item." v-model="project.taskInput" />
            <q-btn color="accent" class="add-item-btn" icon="add" @click="addTask(project.taskInput, project.id)"/>
          </div>
        </q-card-section>
        <q-card-section class="text-white">
          <div class="add-item-input" vertical align="right">
          <q-scroll-area :thumb-style="thumbStyle" :bar-style="barStyle" style="height: 200px; max-width: 300px;">
            <div class="q-pa-md">
            <q-list v-for="i, taskID in project.taskList" :key="taskID" class="q-pa-md justify-between">
              <q-item >
                <q-item-section>{{ i.task }}</q-item-section>
                <q-item-section>
                  <q-btn color="black" flat icon="close" @click="deleteTask(index, taskID)"></q-btn>
                </q-item-section>
              </q-item>
            </q-list>
            </div>
          </q-scroll-area>
        </div>
        </q-card-section>
        <q-card-actions align="right" class="q-py-md" style="position: absolute; bottom: 0; ; ">
          -------- Edit - Delete buton yeri -------
          <q-btn flat icon="edit" class="icons" @click="prompt2 = true; openEditProject(project.id)"></q-btn>
          ------------------ Edit Dialog -------------------
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
            <q-btn no-caps label="Update" color="accent" @click="editProject()" v-close-popup />
            <q-btn no-caps label="Cancel" color="accent" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
          <q-btn flat icon="delete" class="icons" @click="confirm = true"></q-btn>
          <q-dialog v-model="confirm" persistent>
            <q-card style="width: 300px">
              <q-card-section class="row items-center">
                <span class="q-ml-sm">delete</span>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn flat label="Update" color="accent" @click="deleteProject(index)" v-close-popup />
                <q-btn flat label="Cancel" color="accent" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </q-card-actions>
      </q-card>
    </div>
    </div>
  </div> -->
</q-page-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';

export default {
components: {},
name: "Home",

data() {
return {
  prompt: false,
  prompt2: false,
  confirm: false,
  selectedItem: "",
  editTitle: "",
  editDescription: "",
  title: "",
  description: "",
  task: "",
  newTask: "",
  taskArr: [],
  taskList: [],
  createProject:{
    id: null,
    title: "",
    description: "",
  },
};
},
computed: {
  ...mapState('app', ['projectList']),
  ...mapActions('app', ['setProject']),
  ...mapGetters('app', ['allProjects']),
},

methods: {

  addNewProject(){
    let id = this.projectList.length;
    this.createProject.id = id;
    this.$store.dispatch("app/setProject", this.createProject);
    console.log('addnew home page create', this.createProject );

    console.log('addnew home page projects', this.projectList );

    this.createProject = {
      id: null,
      title: "",
      description: "",
    };
  },


// createProject() {
//   let id = this.projectList.length;
//   this.projectList = [...this.projectList, {
//     id: id,
//     title: this.title,
//     description: this.description,
//     taskList: [],
//     taskInput: "",
//   }];
//   this.title = "";
//   this.description = "";
// },

openEditProject(id) {
  this.selectedItem = id;
  let foundId = this.projectList.findIndex(x => x.id == this.selectedItem);

  this.editTitle = this.projectList[foundId].title;
  this.editDescription = this.projectList[foundId].description;
  taskArr = this.projectList[foundId].taskList;
  console.log(this.selectedItem);
},

editProject() {
  let foundId = this.projectList.findIndex((x) => x.id == this.selectedItem);
  console.log(foundId);
  let editedTask = {
    id: this.selectedItem,
    title: this.editTitle,
    description: this.editDescription,
    taskInput: "",
    taskList : taskArr,
  };
  console.log(editedTask);
  this.taskList[foundId] = editedTask;
  this.selectedItem = null;
  editedTask = "";
  this.editTitle = "";
  this.editDescription = "";
  taskArr = [];
},

deleteProject(index) {
  this.projectList.splice(index,1);
},

addTask(newTask,id) {
  let index = this.projectList[id].taskList.length;
  this.projectList[id].taskList = [...this.projectsList[id].taskList, {
    id: index,
    task: newTask,
  }];
  this.projectList[id].taskInput = "";
  index = null;

},

deleteTask(index, itemID) {
  this.projectList[index].taskList.splice(itemID,1);
},
},
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800&display=swap");

body,
input {
  font-family: "Poppins", sans-serif;
}
.btn {
width: 170px;
background-color: #6c63ff;
border: none;
outline: none;
height: 49px;
border-radius: 15px;
color: #fff;
text-transform: uppercase;
font-weight: 600;
margin: 10px 0;
cursor: pointer;
transition: 0.5s;
}

.content {
height: 60px;
width: 100%;
background-color: #fff;
padding-top: 20px;
text-align: center;
}
.content-card {
height: 200px;
width: 100%;
background-color: #fff;
padding-top: 10px;
text-align: start;
text-transform: capitalize;

}
.content-card .card-wraps {
padding: 50px;
width: 100%;
display: flex;
justify-content: space-evenly;
}

.card-wraps .my-card {
height: 470px;
width: 330px;
box-shadow: 0px 3px 3px  #a5a5a5;
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




