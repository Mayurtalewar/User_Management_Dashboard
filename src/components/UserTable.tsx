import React from 'react';
import { Edit2, Trash2, Search, Filter } from 'lucide-react';
import type { User } from '../types';

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  currentFilter: string;
  onFilterChange: (value: string) => void;
  darkMode: boolean;
}

export default function UserTable({
  users,
  onEdit,
  onDelete,
  searchTerm,
  onSearchChange,
  currentFilter,
  onFilterChange,
  darkMode,
}: UserTableProps) {
  // Use Set to ensure unique departments and convert back to sorted array
  const departments = Array.from(new Set(users.map(user => user.department))).sort();

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} size={20} />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors
              ${darkMode 
                ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'}`}
          />
        </div>
        <div className="relative flex-1 md:max-w-xs">
          <Filter className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} size={20} />
          <select
            value={currentFilter}
            onChange={(e) => onFilterChange(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none transition-colors
              ${darkMode 
                ? 'bg-gray-800 border-gray-700 text-white' 
                : 'bg-white border-gray-200 text-gray-900'}`}
          >
            <option value="">All Departments</option>
            {departments.map(dept => (
              <option key={`dept-${dept}`} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={`overflow-x-auto rounded-lg border transition-colors
        ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <table className="min-w-full divide-y transition-colors
          ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}">
          <thead className={`transition-colors ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <tr>
              <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors
                ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>ID</th>
              <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors
                ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>First Name</th>
              <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors
                ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Last Name</th>
              <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors
                ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Email</th>
              <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors
                ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Department</th>
              <th className={`px-6 py-3 text-right text-xs font-medium uppercase tracking-wider transition-colors
                ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Actions</th>
            </tr>
          </thead>
          <tbody className={`divide-y transition-colors
            ${darkMode 
              ? 'bg-gray-900 divide-gray-700' 
              : 'bg-white divide-gray-200'}`}>
            {users.map((user) => (
              <tr key={`user-${user.id}`} className={`transition-colors
                ${darkMode 
                  ? 'hover:bg-gray-800' 
                  : 'hover:bg-gray-50'}`}>
                <td className={`px-6 py-4 whitespace-nowrap text-sm transition-colors
                  ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>{user.id}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm transition-colors
                  ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>{user.firstName}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm transition-colors
                  ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>{user.lastName}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm transition-colors
                  ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>{user.email}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm transition-colors
                  ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>{user.department}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onEdit(user)}
                    className="text-orange-500 hover:text-orange-400 mr-4"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(user.id)}
                    className="text-red-500 hover:text-red-400"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}