import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Create = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const router = useRouter()
    const handleNameChange = (e: any) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const response = await fetch('https://6603f1662393662c31d02f1b.mockapi.io/crudapp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email
                })
            });
            console.log(response, 'res');


            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Data:', data);
            router.push('/about')


            setName('');
            setEmail('');
        } catch (error) {
            console.error('Error:', error);

        }
    };

    return (
        <>
            <div className='flex justify-center items-center align-baseline h-full  w-full py-10 text-center'>

                <div className='w-[500px] h-[400px] ml-[100px] bg-slate-900 rounded-3xl ' >
                    <h2 className='text-white  font-bold text-3xl py-2 text-center '>Create</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block font-medium text-white text-lg py-1">Name</label>
                            <input
                                type="text"
                                className="block py-3 mx-auto rounded-md border-0  pl-7 pr-20 text-black ring-1 ring-inset ring-gray-300 placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm text-lg sm:leading-6 w-[400px]"
                                placeholder="Name"
                                value={name}
                                onChange={handleNameChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-lg font-medium text-white py-1">Email address</label>
                            <input
                                type="email"
                                className="block   w-[400px] mx-auto rounded-md border-0 py-3 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm text-lg sm:leading-6"
                                placeholder="Email"
                                value={email}
                                onChange={handleEmailChange}
                            />
                            <p id="emailHelp" className="mt-2 text-lg text-white py-1">We'll never share your email with anyone else.</p>
                        </div>
                        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Create;

