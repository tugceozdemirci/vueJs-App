export function someMutation (/* state */) {
}
export function addNewProject(state, newProject) {
  console.log("addNewProject mutation", newProject);
  let prd = state.projectList;
  prd.push(newProject);

  state.projectList = prd;
  console.log("state.projectList mutation", state.projectList);
}

export function removeProjectMutat(state, newList) {
  state.projectList = newList;

}
