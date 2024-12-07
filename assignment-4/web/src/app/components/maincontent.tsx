'use client'
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

const MainContent = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);

  interface Project {
    id: string;
    name: string;
  }

  interface TeamMember {
    id: string;
    name: string;
    role: string;
    description: string;
  }

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Here you would typically send the data to your backend
  };
  interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
  }

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data));

    fetch('/api/team')
      .then(res => res.json())
      .then(data => setTeam(data));
  }, []);

  return (
    <>
      <section id="projects" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold mb-8 pb-2 border-b border-gray-300">Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {projects.map((project) => (
              <button key={project.id} className="w-full bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 transition duration-300">
                {project.name}
              </button>
            ))}
          </div>
        </div>
      </section>



      <section id="about" className="py-16">
        <div className="container mx-auto px-4">
          <h4 className="text-2xl font-bold text-center mb-4">About</h4>
          <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
            ex ea commodo consequat.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold mb-8 text-center">Our Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((person) => (
              <div key={person.id} className="bg-white p-6 rounded-lg shadow-md text-center">
                <Image src="https://via.placeholder.com/100" alt={person.name} width={100} height={100} className="rounded-full mx-auto mb-4" />
                <h5 className="font-bold text-xl mb-2">{person.name}</h5>
                <p className="text-gray-600 mb-2">{person.role}</p>
                <p className="text-gray-700 mb-4">{person.description}</p>
                <button className="bg-transparent hover:bg-gray-800 text-gray-800 font-semibold hover:text-white py-2 px-4 border border-gray-800 hover:border-transparent rounded transition duration-300">
                  Contact
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section id="contact" className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold mb-8 text-center">Contact</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto">
            <div className="mb-4">
              <input {...register("name", { required: "Name is required" })} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-200" placeholder="Name" />
              {errors.name && <span className="text-red-500">{errors.name.message}</span>}
            </div>
            <div className="mb-4">
              <input {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-200" placeholder="Email" />
              {errors.email && <span className="text-red-500">{errors.email.message}</span>}
            </div>
            <div className="mb-4">
              <input {...register("subject", { required: "Subject is required" })} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-200" placeholder="Subject" />
              {errors.subject && <span className="text-red-500">{errors.subject.message}</span>}
            </div>
            <div className="mb-4">
              <textarea {...register("message", { required: "Message is required" })} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-200" placeholder="Comment" rows={3}></textarea>
              {errors.message && <span className="text-red-500">{errors.message.message}</span>}
            </div>
            <button type="submit" className="w-full bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 transition duration-300">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default MainContent;