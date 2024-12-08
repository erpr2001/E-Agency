import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Layout from '@/app/components/layout';
import axios from 'axios';
import BookingsManager from '@/app/components/admin/bookingsmanager';
import ProjectsManager from '@/app/components/admin/projectsmanager';
import TeamManager from '@/app/components/admin/teammanager';
import withAuth from '@/app/components/withauth';


const AdminDashboard: React.FC = () => {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('bookings');

  if (!session || session.user.role !== 'admin') {
    return (
      <Layout>
        <p>Access denied. Admin only.</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <div className="mb-4">
          <button
            className={`mr-4 px-4 py-2 rounded ${activeTab === 'bookings' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('bookings')}
          >
            Manage Bookings
          </button>
          <button
            className={`mr-4 px-4 py-2 rounded ${activeTab === 'projects' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('projects')}
          >
            Manage Projects
          </button>
          <button
            className={`px-4 py-2 rounded ${activeTab === 'team' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('team')}
          >
            Manage Team
          </button>
        </div>
        {activeTab === 'bookings' && <BookingsManager />}
        {activeTab === 'projects' && <ProjectsManager />}
        {activeTab === 'team' && <TeamManager />}
      </div>
    </Layout>
  );
};

export default withAuth(AdminDashboard);