"use client"
import { Button } from '@/components/ui/button'
import { Consultation } from '@/utils/types';
import { SearchIcon } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form'

type Props = {
    searchValues: Consultation[]
};

export const SearchBar = ({ searchValues }: Props) => {
    const { 
        control, handleSubmit, watch, setValue 
    } = useForm<{searchValue: string}>();
    const searchTerm = watch('searchValue') || "";
    
    return (
        <div>
            <Controller
                name={'searchValue'}
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input
                            {...field} 
                            type="search" 
                            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50" 
                            placeholder="Search by Condition and Healthcare..." 
                        />
                        {searchTerm?.length !== 0 && 
                            <div id="search details" className="w-full z-50 select-none h-[20rem] px-3 pt-2 bg-gray-200 absolute top-[2.2rem] max-lg:top-10 max-md:top-11 left-0 rounded-md animate-[fadeIn_0.1s_ease-out]">
                                <ul className="text-black text-base font-semibold">
                                    {searchValues
                                        .filter(
                                            (item) => 
                                            item.condition.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                            item.healthcare.toLowerCase().includes(searchTerm.toLowerCase())
                                        ) 
                                        ?.map((item, idx) => (
                                            <li 
                                                key={idx} 
                                                className="hover:underline cursor-pointer" 
                                                onClick={()=>{}}
                                            >
                                                {/* {item.condition} */}
                                                {item.healthcare}
                                            </li>
                                    ))}
                                </ul>
                            </div>
                        }
                    </div>  
                )}
            />
        </div>
    )
}



 {/* <form className="max-w-md mx-auto">
            <Controller
                name="firstName"
                control={control}
                rules={{ required: true}}
                render={({ field: { onChange, onBlur, value } }) => (
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input 
                            type="search"
                            onBlur={onBlur}
                            // onChangeText={onChange}
                            value={value} 
                            id="default-search" 
                            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50" 
                            placeholder="Search..." 
                            required 
                        />
                        <Button 
                            type="submit" 
                            className="text-white absolute end-2.5 bottom-2"
                        >
                            Search
                        </Button>
                    </div>  
                )} 
            />   
            </form> */}