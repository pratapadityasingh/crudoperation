import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface IData {
  id: string;
  name: string;
  email: string;
}

const Page: React.FC = () => {
  const [data, setData] = useState<IData[]>([]);
  const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://6603f1662393662c31d02f1b.mockapi.io/crudapp');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = (id: string) => {
    setEditMode(prevState => ({
      ...prevState,
      [id]: true,
    }));
  };

  const handleSave = async (id: string, newName: string, newEmail: string) => {
    try {
      const response = await fetch(`https://6603f1662393662c31d02f1b.mockapi.io/crudapp/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newName, email: newEmail }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const updatedData = data.map(item => {
        if (item.id === id) {
          return { ...item, name: newName, email: newEmail };
        }
        return item;
      });

      setData(updatedData);
      setEditMode(prevState => ({
        ...prevState,
        [id]: false,
      }));

      console.log('Item with ID:', id, 'edited successfully');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`https://6603f1662393662c31d02f1b.mockapi.io/crudapp/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setData(prevData => prevData.filter(item => item.id !== id));
      console.log('Item with ID:', id, 'deleted successfully');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='w-full flex  items-center justify-center pt-[100px] '>
      <div className=' w-[1200px] py-5 rounded-3xl bg-black h-[600px] '>
        <table className='mx-auto rounded-3xl'>
          <thead className='  pb-2 '>
            <tr className='border-b-4 border-white mb-3 '>
              <th className='w-[280px]  text-white py-3'>Number</th>
              <th className='w-[280px]  text-white py-3'>Name</th>
              <th className='w-[280px]  text-white py-3'>Email</th>
              <th className='w-[280px]  text-white py-3'>Actions</th>
            </tr>
          </thead>

          <tbody className=' w-[900px] py-2  '>
            {data.map(item => (
              <tr key={item.id} className='  border-b border-white text-center '>
                <td className='w-[180px]  text-white h-[50px]'>{item.id}</td>
                <td className='w-[180px] text-white h-[50px]'>
                  {editMode[item.id] ? (
                    <input type="text" placeholder='' className='  mx-auto bg-transparent placeholder:text-white ring-1 ring-inset ring-gray-300  px-7 py-2 rounded-3xl focus:ring-2 focus:ring-inset  focus:ring-white ' defaultValue={item.name} onChange={(e) => item.name = e.target.value} />
                  ) : (
                    <span>{item.name}</span>
                  )}
                </td>
                <td className='w-[180px] text-white h-[50px]'>
                  {editMode[item.id] ? (
                    <input type="email" placeholder='' className='  mx-auto bg-transparent placeholder:text-white ring-1 ring-inset ring-gray-300  px-7 py-2 rounded-3xl focus:ring-2 focus:ring-inset  focus:ring-white ' defaultValue={item.email} onChange={(e) => item.email = e.target.value} />
                  ) : (
                    <span>{item.email}</span>
                  )}
                </td>
                <td className='flex justify-evenly py-2'>
                  {editMode[item.id] ? (
                    <button className='bg-green-800 p-2 rounded-full ' onClick={() => handleSave(item.id, item.name, item.email)}>SAVE</button>
                  ) : (
                    <button className='bg-green-800 p-2 rounded-full ' onClick={() => handleEdit(item.id)}>EDIT</button>
                  )}
                  <button className='bg-red-800 p-2 rounded-full ' onClick={() => handleDelete(item.id)}>DELETE</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>
    </div>
  );
};

export default Page;
