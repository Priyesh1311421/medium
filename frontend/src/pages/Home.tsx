import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Appbar } from '../components/Appbar';

const Home: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div>
            <Appbar/>
            <div className="bg-gray-100 min-h-screen flex items-center justify-center">
                <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold text-gray-900 mb-4">Welcome to Medium</h1>
                        <p className="text-lg text-gray-700 mb-6">
                            Discover stories, thinking, and expertise from writers on any topic.
                        </p>
                        <button onClick={()=>{navigate('/signup')}} className="bg-green-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-600 transition duration-300">
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;