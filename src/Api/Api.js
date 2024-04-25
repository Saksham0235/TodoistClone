import { TodoistApi } from "@doist/todoist-api-typescript";

const token = "ba4670f35a223378da9949c14bf9ca4fda065168";
let api = new TodoistApi(token);

export const getProjects = async () => {
  const response = await api.getProjects();
  return response;
};

export const createProject = async (name) => {
  const response = await api.addProject({ name: `${name}` });
  console.log(response, "From Projectapi");
  return response;
};

export const DeleteProject = async (Projectid) => {
  try {
    const response = api.deleteProject(Projectid);
    console.log("From Projectapi", response);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getTasks = async () => {
  const response = await api.getTasks();
  return response;
};

export const deleteTask = async (taskid) => {
  const response = await api.deleteTask(taskid);
  return response;
};

export const createTask = async (
  content,
  projectId,
  date,
  dueString,
  todaydate,
  description
) => {
  const api = new TodoistApi(token);
  let response;
  // if (projectId) {
    response = await api.addTask({
      content: `${content}`,
      projectId: `${projectId}`,
      due_date: `${date}`,
      due_string: `${dueString}`,
      description: `${description}`,
      
    });
  // } 
  // else {
  //   response = await api.addTask({
  //     content: `${content}`,
  //     due_date: `${date ? date : todaydate}`,
  //     due_string: `${dueString}`,
  //     description: `${description}`,
  //   });
  // }
  console.log("From api ", response);
  return response;
};

export const createSectionTask = async (
  content,
  projectId,
  date,
  sectionid,
  string,
  description
) => {
  console.log(description, "before task created");
  let response;
  if (projectId && !sectionid) {
    response = await api.addTask({
      content: `${content}`,
      projectId: `${projectId}`,
      sectionId: null,
      due_date: `${date}`,
      due_string: `${string}`,
      description: `${description}`,
    });
  } else if (projectId && sectionid) {
    response = await api.addTask({
      content: `${content}`,
      sectionId: `${sectionid}`,
      due_date: `${date}`,
      due_string: `${string}`,
      description: `${description}`,
    });
  } else if (!projectId && !sectionid) {
    response = await api.addTask({
      content: `${content}`,
      due_date: `${date}`,
      description: `${description}`,
    });
  }
  return response;
};
export const updateTask = async (taskid, data) => {
  const { content, due_date, due_string, description, projectId } = data;
  console.log(projectId, "projid before response");
  console.log(due_date, "date before response");

  const response = await api.updateTask(taskid, {
    content: content,
    due_date: due_date,
    due_string: due_string,
    description: description,
    projectId: projectId,
  });
  console.log(response, "after submitted");
  return response;
};

export const getsections = async (id) => {
  const response = await api.getSections(id);
  return response;
};

export const createSection = async (name, projectid) => {
  const response = await api.addSection({
    name: `${name}`,
    projectId: `${projectid}`,
  });
  return response;
};

export const deleteSection = async (id) => {
  const api = new TodoistApi(token);
  const response = await api.deleteSection(id);
  return response;
};

export const getLabels = async () => {
  const response = await api.getLabels();
  return response;
};

export const deleteLabel = async (id) => {
  console.log(id, "From api");
  const response = await api.deleteLabel(id);
  console.log(response, "From response");
  return response;
};

export const createLabel = async (name) => {
  const response = await api.addLabel({
    name: `${name}`,
  });
  return response;
};

export const updateSectionAction = async (id, name) => {
  console.log(`${id} name : ${name}`, "From api");
  const response = await api.updateSection(id, { name: `${name}` });
  console.log(response, "api");
  return response;
};
