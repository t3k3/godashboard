import { useState, useEffect, useRef } from 'react';

const options = [
  { id: 1, label: 'Seçenek 1' },
  { id: 2, label: 'Seçenek 2' },
  { id: 3, label: 'Seçenek 3' },
];

export default function MultipleSelect({ fixedValue }) {
  const [selectedValues, setSelectedValues] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleCheckboxChange = (optionId) => {
    if (selectedValues.includes(optionId)) {
      setSelectedValues((prevValues) =>
        prevValues.filter((val) => val !== optionId)
      );
    } else {
      setSelectedValues((prevValues) => [...prevValues, optionId]);
    }
  };

  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setSelectedValues((prevValues) =>
      prevValues.filter((val) => options.find((option) => option.id === val))
    );
  }, []);

  const handleInputChange = (e) => {
    const inputValues = e.target.value
      .split(',')
      .map((val) => Number(val.trim()));

    const filteredValues = inputValues.filter((val) =>
      options.find((option) => option.id === val)
    );

    setSelectedValues(filteredValues);
  };

  const handleOptionClick = (optionId) => {
    if (!selectedValues.includes(optionId)) {
      setSelectedValues((prevValues) => [...prevValues, optionId]);
    }
  };

  return (
    <div className='relative'>
      <div className='relative inline-block w-64' ref={dropdownRef}>
        {fixedValue && (
          <div className='absolute top-2 left-4 text-black border border-black p-1 rounded-md'>
            {fixedValue}
          </div>
        )}
        <input
          type='text'
          className='w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded shadow appearance-none'
          value={selectedValues.join(', ')}
          readOnly
          onClick={handleDropdownClick}
          onChange={handleInputChange}
          style={{ paddingLeft: fixedValue ? '80px' : '40px' }}
        />
        {isOpen && (
          <div className='absolute top-0 left-0 w-full mt-12 bg-white rounded-md shadow-lg'>
            <ul className='py-2'>
              {options.map((option) => (
                <li key={option.id} className='px-4 py-2 hover:bg-gray-100'>
                  <label className='flex items-center'>
                    <input
                      type='checkbox'
                      value={option.id}
                      className='form-checkbox'
                      checked={selectedValues.includes(option.id)}
                      onChange={() => handleCheckboxChange(option.id)}
                    />
                    <span
                      className='ml-2 cursor-pointer'
                      onClick={() => handleOptionClick(option.id)}
                    >
                      {option.label}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
