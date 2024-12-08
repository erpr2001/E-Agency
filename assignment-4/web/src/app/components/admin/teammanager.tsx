import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface TeamMember {
  id: string;
  name: string;
  role: string;
}

const TeamManager: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [newMember, setNewMember] = useState({ name: '', role: '' });
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    const response = await axios.get('/api/team');
    setTeamMembers(response.data);
  };

  const addTeamMember = async () => {
    await axios.post('/api/team', newMember);
    setNewMember({ name: '', role: '' });
    fetchTeamMembers();
  };

  const updateTeamMember = async () => {
    if (editingMember) {
      await axios.put(`/api/team/${editingMember.id}`, { name: editingMember.name, role: editingMember.role });
      setEditingMember(null);
      fetchTeamMembers();
    }
  };

  const deleteTeamMember = async (id: string) => {
    await axios.delete(`/api/team/${id}`);
    fetchTeamMembers();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Team</h2>
      <div className="mb-4">
        <input
          type="text"
          value={newMember.name}
          onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
          className="border p-2 mr-2"
          placeholder="Name"
        />
        <input
          type="text"
          value={newMember.role}
          onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
          className="border p-2 mr-2"
          placeholder="Role"
        />
        <button onClick={addTeamMember} className="bg-green-500 text-white px-4 py-2 rounded">
          Add Team Member
        </button>
      </div>
      <ul>
        {teamMembers.map((member) => (
          <li key={member.id} className="mb-2 flex items-center">
            {editingMember && editingMember.id === member.id ? (
              <>
                <input
                  type="text"
                  value={editingMember.name}
                  onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                  className="border p-2 mr-2"
                />
                <input
                  type="text"
                  value={editingMember.role}
                  onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value })}
                  className="border p-2 mr-2"
                />
                <button onClick={updateTeamMember} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                  Save
                </button>
                <button onClick={() => setEditingMember(null)} className="bg-gray-500 text-white px-4 py-2 rounded">
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span className="mr-2">{member.name} - {member.role}</span>
                <button onClick={() => setEditingMember(member)} className="bg-yellow-500 text-white px-4 py-2 rounded mr-2">
                  Edit
                </button>
                <button onClick={() => deleteTeamMember(member.id)} className="bg-red-500 text-white px-4 py-2 rounded">
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

export default TeamManager;