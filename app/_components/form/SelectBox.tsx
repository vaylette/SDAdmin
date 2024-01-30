import React, { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/16/solid'

interface SelectBoxProps {
    options: { name: string }[]
}
  
const SelectBox: React.FC<SelectBoxProps> = ({ options }) => {
    const [selected, setSelected] = useState(options[0])
  
    const handleChange = (value: { name: string }) => {
      setSelected(value)
    }
  
    return (
      <>
        <div className="w-full">
            <Listbox value={selected} onChange={handleChange}>
                <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-default rounded-[4px] bg-black-500 h-[60px] text-start py-2 pl-3 pr-10 text-black-400 shadow-md focus:outline-none focus:ring-0">
                    <span className="block truncate">{selected.name}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                        className="h-5 w-5 text-black-400"
                        aria-hidden="true"
                    />
                    </span>
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white-100 py-1 shadow-lg ring-1 ring-black-200 focus:outline-none text-sm">
                    {options.map((item, index) => (
                        <Listbox.Option
                        key={index}
                        className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? 'bg-orange-default text-white-default' : 'text-black-400'
                            }`
                        }
                        value={item}
                        >
                        {({ selected }) => (
                            <>
                            <span
                                className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                                }`}
                            >
                                {item.name}
                            </span>
                            {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-100">
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                </span>
                            ) : null}
                            </>
                        )}
                        </Listbox.Option>
                    ))}
                    </Listbox.Options>
                </Transition>
                </div>
            </Listbox>
        </div>
      </>
    )
}
  
  export default SelectBox;
  
