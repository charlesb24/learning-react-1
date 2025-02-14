import ProjectSidebar from "./components/ProjectSidebar.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import { useState } from "react";
import NewProject from "./components/NewProject.jsx";
import ProjectDetails from "./components/ProjectDetails.jsx";

function App() {
  const [projectState, setProjectState] = useState({
    projects: [],
    tasks: [],
    selectedProjectId: undefined
  });

  function handleAddTask(taskInfo) {
    setProjectState(prevState => {
      const newTask = {
        id: Math.random(),
        projectId: prevState.selectedProjectId,
        text: taskInfo
      }

      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask]
      };
    });
  }

  function handleDeleteTask(taskId) {
    setProjectState(prevState => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter(
          task => task.id !== taskId
        ),
      };
    });
  }

  function handleSelectProject(projectId) {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: projectId
      }
    });
  }

  function handleStartAddProject() {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null
      };
    });
  }

  function handleCancelAddProject() {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectState(prevState => {
      const newProject = {
        id: Math.random(),
        ...projectData
      }

      return {
        ...prevState,
        selectedProjectId: newProject.id,
        projects: [...prevState.projects, newProject]
      };
    });
  }

  function handleDeleteProject() {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          project => project.id !== prevState.selectedProjectId
        ),
      };
    });
  }

  const selectedProject = projectState.projects.find(project => project.id === projectState.selectedProjectId);

  let content = (
    <ProjectDetails
      project={ selectedProject }
      onDelete={ handleDeleteProject }
      onAddTask={ handleAddTask }
      onDeleteTask={ handleDeleteTask }
      tasks={ projectState.tasks }
    />
  );

  if (projectState.selectedProjectId === undefined) {
    content  = (<NoProjectSelected onNewProject={ handleStartAddProject } />)
  } else if (projectState.selectedProjectId === null) {
    content = <NewProject onSave={ handleAddProject } onCancel={ handleCancelAddProject } />
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar
        onNewProject={ handleStartAddProject }
        projects={ projectState.projects }
        onSelectProject={ handleSelectProject }
        selectedProjectId={ projectState.selectedProjectId }
      />
      { content }
    </main>
  );
}

export default App;
