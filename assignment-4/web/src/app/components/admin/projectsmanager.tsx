'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Project {
  id: string;
  name: string;
}

const ProjectsManager: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProjectName, setNewProjectName] = useState('');
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const response = await axios.get('/api/projects');
    setProjects(response.data);
  };

  const addProject = async () => {
    await axios.post('/api/projects', { name: newProjectName });
    setNewProjectName('');
    fetchProjects();
  };

  const updateProject = async () => {
    if (editingProject) {
      await axios.put(`/api/projects/${editingProject.id}`, { name: editingProject.name });
      setEditingProject(null);
      fetchProjects();
    }
  };

  const deleteProject = async (id: string) => {
    await axios.delete(`/api/projects/${id}`);
    fetchProjects();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Projects</h2>
      <div className="mb-4">
        <input
          type="text"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          className="border p-2 mr-2"
          placeholder="New Project Name"
        />
        <button onClick={addProject} className="bg-green-500 text-white px-4 py-2 rounded">
          Add Project
        </button>
      </div>
      <ul>
        {projects.map((project) => (
          <li key={project.id} className="mb-2 flex items-center">
            {editingProject && editingProject.id === project.id ? (
              <>
                <input
                  type="text"
                  value={editingProject.name}
                  onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })}
                  className="border p-2 mr-2"
                />
                <button onClick={updateProject} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                  Save
                </button>
                <button onClick={() => setEditingProject(null)} className="bg-gray-500 text-white px-4 py-2 rounded">
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span className="mr-2">{project.name}</span>
                <button onClick={() => setEditingProject(project)} className="bg-yellow-500 text-white px-4 py-2 rounded mr-2">
                  Edit
                </button>
                <button onClick={() => deleteProject(project.id)} className="bg-red-500 text-white px-4 py-2 rounded">
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectsManager;