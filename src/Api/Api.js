import { TodoistApi } from "@doist/todoist-api-typescript";

const token = "ba4670f35a223378da9949c14bf9ca4fda065168";

export const getProjects = async () => {
  const api = new TodoistApi(token);
  const response = await api.getProjects();
  return response;
};

export const createProject = async (name) => {
  const api = new TodoistApi(token);
  const response = api.addProject({ name: name });
  return response;
};

export const getTasks = async () => {
  const api = new TodoistApi(token);
  const response = await api.getTasks();
  return response;
};

export const deleteTask = async (taskid) => {
  const api = new TodoistApi(token);
  const response = await api.deleteTask(taskid);
  return response;
};

export const createTask = async (content, projectId) => {
  const api = new TodoistApi(token);
  const response = api.addTask({
    content: `${content}`,
    projectId: `${projectId}`,
  });

  return response;
};

// export const CrateSectiontask = async (content, projectid, sectionId) => {
//   let response
//   if (id && sectionId) {
//     response = await api.addTask({
//       content: `${content}`,
//       projectId: `${projectid}`,
//       sectionId: `${sectionId}`
//     })
//   }
//   return response
// }

export const getsections = async (projectid) => {
  const api = new TodoistApi(token);
  const response = api.getSections(projectid);
  return response;
};

export const createSection = async ({ projectid, name }) => {
  const api = new TodoistApi(token);
  const response = api.addSection({
    name: `${name}`,
    projectId: `${projectid}`,
  });
  return response;
};

