import React, { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';

const getDataformLS = () => {
  let data = localStorage.getItem('taskData');
  return data ? JSON.parse(data) : [];
};

function MyList() {
  const [name, setName] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [when, setWhen] = useState('');
  const [search, setsearch] = useState('');
  const [taskData, setTaskData] = useState(getDataformLS());

  const handleSubmit = e => {
    e.preventDefault();
    let newId = uuidv4();
    let newData = { id: newId, name, todo: to, date, when };

    if (!name || !to || !date || !when) {
      return alert('You have to fillup all');
    }

    if (when <= 0 || when > 24) {
      return alert('Time should be between 1 and 24 hours.');
    }

    setTaskData([...taskData, newData]);
    setDate('');
    setName('');
    setTo('');
    setWhen('');
  };

  useEffect(() => {
    localStorage.setItem('taskData', JSON.stringify(taskData));
  }, [taskData]);

  const handleDelete = id => {
    const itemdelete = taskData.filter(item => item.id !== id);
    return setTaskData(itemdelete);
  };

  const handleSearch = e => {
    setsearch(e.target.value.toLocaleLowerCase());
  };

  const filteredTask = taskData.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col items-center bg-slate-900 min-h-screen py-10">
        {/* Title */}
        <h1 className="text-purple-400 text-3xl font-bold mb-8">
          Task Management App
        </h1>

        {/* Form Section */}
        <div className="bg-slate-700 w-[80%] p-6 rounded-lg shadow-md text-gray-100 mb-10">
          <form
            onSubmit={handleSubmit}
            className="flex flex-wrap justify-between"
          >
            {/* Search */}
            <div className="w-[48%] mb-4">
              <label className="block text-sm font-bold mb-2">Search</label>
              <input
                className="w-full px-4 py-2 bg-gray-800 text-gray-100 border border-gray-500 rounded focus:outline-none focus:border-purple-400"
                type="text"
                value={search}
                placeholder="Search..."
                onChange={handleSearch}
              />
            </div>
            {/* Name Input */}
            <div className="w-[48%] mb-4">
              <label className="block text-sm font-bold mb-2">Name</label>
              <input
                className="w-full px-4 py-2 bg-gray-800 text-gray-100 border border-gray-500 rounded focus:outline-none focus:border-purple-400"
                type="text"
                placeholder="Jane"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>

            {/* Time Input */}
            <div className="w-[48%] mb-4">
              <label className="block text-sm font-bold mb-2">Time</label>
              <input
                className="w-full px-4 py-2 bg-gray-800 text-gray-100 border border-gray-500 rounded focus:outline-none focus:border-purple-400"
                type="number"
                placeholder="0.00"
                value={when}
                onChange={e => setWhen(e.target.value)}
              />
            </div>

            {/* To do input */}
            <div className="w-[48%] mb-4">
              <label className="block text-sm font-bold mb-2">To Do</label>
              <input
                className="w-full px-4 py-2 bg-gray-800 text-gray-100 border border-gray-500 rounded focus:outline-none focus:border-purple-400"
                type="text"
                placeholder="Task"
                value={to}
                onChange={e => setTo(e.target.value)}
              />
            </div>

            {/* Day Selector */}
            <div className="w-full mb-4">
              <label className="block text-sm font-bold mb-2">Day</label>
              <select
                className="w-full px-4 py-2 bg-gray-800 text-gray-100 border border-gray-500 rounded focus:outline-none focus:border-purple-400"
                value={date}
                onChange={e => setDate(e.target.value)}
              >
                <option>Saturday</option>
                <option>Sunday</option>
                <option>Monday</option>
                <option>Tuesday</option>
                <option>Wednesday</option>
                <option>Thursday</option>
                <option>Friday</option>
              </select>
            </div>

            <button className="w-full text-center bg-green-600 rounded hover:bg-green-700">
              Add
            </button>
          </form>
        </div>

        {/* Table Section */}
        <div className="bg-slate-700 w-[80%] p-6 rounded-lg shadow-md text-gray-100">
          <div className="overflow-x-auto">
            {filteredTask.length > 0 ? (
              <table className="w-full border-collapse border border-gray-500">
                <thead>
                  <tr className="bg-gray-800">
                    <th className="border border-gray-600 px-4 py-2">Name</th>
                    <th className="border border-gray-600 px-4 py-2">To Do</th>
                    <th className="border border-gray-600 px-4 py-2">Day</th>
                    <th className="border border-gray-600 px-4 py-2">Time</th>
                    <th className="border border-gray-600 px-4 py-2">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTask.map(item => (
                    <tr key={item.id}>
                      <td className="border border-gray-600 px-4 py-2">
                        {item.name}
                      </td>
                      <td className="border border-gray-600 px-4 py-2">
                        {item.todo}
                      </td>
                      <td className="border border-gray-600 px-4 py-2">
                        {item.date}
                      </td>
                      <td className="border border-gray-600 px-4 py-2">
                        {item.when}
                      </td>
                      <td className="border border-gray-600 px-4 py-2">
                        <button onClick={() => handleDelete(item.id)}>
                          <MdDelete className="text-red-500 text-xl" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <h2 className="text-gray-300">No data added yet!</h2>
            )}
          </div>
        </div>
        <button
          onClick={() => {
            setTaskData([]);
            localStorage.removeItem('taskData');
          }}
          className="w-[500px] text-center bg-red-600 rounded hover:bg-red-800"
        >
          Remove All
        </button>
      </div>
    </div>
  );
}

export default MyList;
