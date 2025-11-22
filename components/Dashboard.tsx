import React from 'react';
import { Subject } from '../types';
import { TrendingUp, Award, Clock, AlertCircle, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Welcome back, Aspirant!</h2>
          <p className="text-gray-500 mt-1">"Success is the sum of small efforts, repeated day in and day out."</p>
        </div>
        <Link to="/practice" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all font-medium flex items-center gap-2">
          Take Quick Mock <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-green-100 text-green-600 rounded-full">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Overall Accuracy</p>
            <p className="text-2xl font-bold text-gray-800">78%</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-yellow-100 text-yellow-600 rounded-full">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Topics Mastered</p>
            <p className="text-2xl font-bold text-gray-800">42/150</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Study Hours</p>
            <p className="text-2xl font-bold text-gray-800">124h</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-red-100 text-red-600 rounded-full">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Weak Area</p>
            <p className="text-lg font-bold text-gray-800">Legal GK</p>
          </div>
        </div>
      </div>

      {/* Study Plan Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-lg text-gray-800 mb-4">Today's Goals</h3>
          <div className="space-y-4">
            {[
              { subject: Subject.LegalAptitude, task: "Law of Torts: Vicarious Liability", completed: true },
              { subject: Subject.GK, task: "Current Affairs: Oct 2023 Highlights", completed: false },
              { subject: Subject.LogicalReasoning, task: "Syllogisms Practice Set 2", completed: false },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    checked={item.completed} 
                    readOnly
                    className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300" 
                  />
                  <div>
                    <p className={`font-medium ${item.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>{item.task}</p>
                    <span className="text-xs text-indigo-500 font-medium bg-indigo-50 px-2 py-0.5 rounded">{item.subject}</span>
                  </div>
                </div>
                <button className="text-sm text-gray-400 hover:text-indigo-600">
                  Details
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-indigo-900 text-white p-6 rounded-xl shadow-lg flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="font-bold text-lg mb-2">Rank 1 Tip</h3>
            <p className="text-indigo-200 text-sm mb-4">
              "For Legal Aptitude, stick strictly to the principle provided in the question. Do not apply your external knowledge of law unless asked."
            </p>
            <button className="text-yellow-400 text-sm font-bold hover:text-yellow-300 flex items-center gap-1">
              View All Strategies <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="absolute -bottom-4 -right-4 opacity-10">
            <Award className="w-32 h-32 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;