// export function someAction (/* context */) {
// }

export function setProject({commit}, newProject) {
    console.log('new product action', newProject);

    commit('addNewProject' , newProject);
}

export function removeProjectAct({commit}, index) {
  state.projectList = state.projectList.splice(index,1);
  commit('removeProjectMutat' , state.projectList);



}

