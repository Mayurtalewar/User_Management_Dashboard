import React from 'react';
import { UserPlus, Sun, Moon } from 'lucide-react';
import UserTable from './components/UserTable';
import UserForm from './components/UserForm';
import Toast from './components/Toast';
import type { User, UserFormData } from './types';

function App() {
  const [users, setUsers] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<User | undefined>();
  const [toast, setToast] = React.useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [darkMode, setDarkMode] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [currentFilter, setCurrentFilter] = React.useState('');
  const [page, setPage] = React.useState(1);
  const usersPerPage = 10;

  // Fetch users
  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error('Failed to fetch users');
        const data = await response.json();
        
        // Transform the data to match our schema and ensure unique IDs
        const transformedData = data.map((user: any, index: number) => ({
          id: index + 1, // Use index + 1 to ensure unique IDs
          firstName: user.name.split(' ')[0],
          lastName: user.name.split(' ')[1] || '',
          email: user.email,
          department: ['HR', 'Engineering', 'Sales', 'Marketing'][Math.floor(Math.random() * 4)],
        }));
        
        setUsers(transformedData);
      } catch (err) {
        setError('Failed to load users');
        showToast('Failed to load users', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };

  const handleAddUser = async (data: UserFormData) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json',
        },
      });
      
      if (!response.ok) throw new Error('Failed to add user');
      
      // Generate a unique ID for the new user
      const newId = Math.max(...users.map(u => u.id)) + 1;
      const newUser = {
        ...data,
        id: newId,
      };
      
      setUsers([...users, newUser]);
      setIsFormOpen(false);
      showToast('User added successfully', 'success');
    } catch (err) {
      showToast('Failed to add user', 'error');
    }
  };

  const handleEditUser = async (data: UserFormData) => {
    if (!selectedUser) return;
    
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${selectedUser.id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json',
        },
      });
      
      if (!response.ok) throw new Error('Failed to update user');
      
      // Update user locally
      setUsers(users.map(user => 
        user.id === selectedUser.id ? { ...user, ...data } : user
      ));
      
      setIsFormOpen(false);
      setSelectedUser(undefined);
      showToast('User updated successfully', 'success');
    } catch (err) {
      showToast('Failed to update user', 'error');
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete user');
      
      // Remove user locally
      setUsers(users.filter(user => user.id !== id));
      showToast('User deleted successfully', 'success');
    } catch (err) {
      showToast('Failed to delete user', 'error');
    }
  };

  // Filter and search users
  const filteredUsers = users.filter(user => {
    const matchesSearch = (
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const matchesFilter = !currentFilter || user.department === currentFilter;
    
    return matchesSearch && matchesFilter;
  });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * usersPerPage,
    page * usersPerPage
  );

  return (
    <div className={`min-h-screen transition-colors ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-3xl font-bold transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            User Management Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg transition-colors ${
                darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'
              } hover:bg-orange-500 hover:text-white`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => {
                setSelectedUser(undefined);
                setIsFormOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <UserPlus size={20} />
              Add User
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <>
            <UserTable
              users={paginatedUsers}
              onEdit={(user) => {
                setSelectedUser(user);
                setIsFormOpen(true);
              }}
              onDelete={handleDeleteUser}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              currentFilter={currentFilter}
              onFilterChange={setCurrentFilter}
              darkMode={darkMode}
            />

            {totalPages > 1 && (
              <div className="flex flex-wrap justify-center mt-6 gap-2">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className={`px-3 py-1 rounded transition-colors
                    ${page === 1
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : darkMode
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  Previous
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={`page-${pageNum}`}
                    onClick={() => setPage(pageNum)}
                    className={`px-3 py-1 rounded transition-colors
                      ${page === pageNum
                        ? 'bg-orange-500 text-white'
                        : darkMode
                          ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className={`px-3 py-1 rounded transition-colors
                    ${page === totalPages
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : darkMode
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        <UserForm
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedUser(undefined);
          }}
          onSubmit={selectedUser ? handleEditUser : handleAddUser}
          initialData={selectedUser}
        />

        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </div>
  );
}

export default App;