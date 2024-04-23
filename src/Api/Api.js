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
  todaydate
) => {
  const api = new TodoistApi(token);
  console.log(
    `${content} pid: ${projectId} date : ${date}  string: ${dueString}`,
    "From api"
  );
  let response;
  if (projectId) {
    response = await api.addTask({
      content: `${content}`,
      projectId: `${projectId}`,
      due_date: `${date}`,
      due_string: `${dueString}`,
    });
  } else {
    response = await api.addTask({
      content: `${content}`,
      due_date: `${todaydate}`,
      due_string: `${`Today`}`,
    });
  }
  return response;
};

export const createSectionTask = async (
  content,
  projectId,
  date,
  sectionid,
  string
) => {
  let response;
  if (projectId && !sectionid) {
    response = await api.addTask({
      content: `${content}`,
      projectId: `${projectId}`,
      sectionId: null,
      due_date: `${date}`,
      due_string: `${string}`,
    });
  } else if (projectId && sectionid) {
    response = await api.addTask({
      content: `${content}`,
      sectionId: `${sectionid}`,
      due_date: `${date}`,
      due_string: `${string}`,
    });
  } else if (!projectId && !sectionid) {
    response = await api.addTask({
      content: `${content}`,
      due_date: `${date}`,
    });
  }
  return response;
};
export const updateTask = async (taskid, data) => {
  const { content, duedate, dueString } = data;
  const response = await api.updateTask(taskid, {
    content: content,
    due_date: duedate,
    due_string: dueString,
  });
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

export const DeleteSection = async (id) => {
  const api = new TodoistApi(token);
  const response = await api.deleteSection(id);
  return response;
};
