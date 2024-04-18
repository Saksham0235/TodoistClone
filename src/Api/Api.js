import { TodoistApi } from "@doist/todoist-api-typescript";

const token = "ba4670f35a223378da9949c14bf9ca4fda065168";
let api = new TodoistApi(token);

export const getProjects = async () => {
  const response = await api.getProjects();
  return response;
};

export const createProject = async (name) => {
  const response = api.addProject({ name: name });
  return response;
};

export const getTasks = async () => {
  const response = await api.getTasks();
  return response;
};

export const deleteTask = async (taskid) => {
  const response = await api.deleteTask(taskid);
  return response;
};

export const createTask = async (content, projectId) => {
  const response =await api.addTask({
    content: `${content}`,
    projectId: `${projectId}`,
  });

  return response;
};






export const getsections = async (projectId) => {
 
  const response = await api.getSections(projectId)
  return response;
};

export const createSection = async ({ projectid, name }) => {
  const api = new TodoistApi(token);
  const response =await api.addSection({
    name: `${name}`,
    projectId: `${projectid}`,
  });
  return response;
};


export const DeleteSection=async(id)=>{
  const api = new TodoistApi(token);
  const response=await api.deleteSection(id)
  return response;
}