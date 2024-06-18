import React, { useState, useRef, useEffect } from 'react';
import { searchFilter } from './searchFilter';
import './App.css';
import { cityNames } from './cityNames';

const CustomTextField = ({ value, onChange }) => {
  const [visible, setVisible] = useState(false);
  const dropdownRef = useRef(null);

  const handleClick = e => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick, false);
    return () => {
      document.removeEventListener('mousedown', handleClick, false);
    };
  }, []);

  const handleChange = e => {
    onChange(e);
    if (!visible) {
      setVisible(true);
    }
  };

  const selectItem = item => {
    onChange({ target: { value: item.name } });
    setVisible(false);
  };

  return (
    <div className="container">
      <div tabIndex="0" className="input_container">
        <input
          className="input"
          type="text"
          placeholder="city name"
          value={value}
          onChange={handleChange}
          onFocus={() => setVisible(true)}
        />
      </div>
      <div ref={dropdownRef} className={`dropdown ${visible ? 'v' : ''}`}>
        {visible && (
          <ul>
            {cityNames && searchFilter(value, cityNames).map(x => (
              <li
                key={x.id}
                onClick={() => selectItem(x)}
                className="dropdown_item"
              >
                <div className="item_text1">{x.name}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CustomTextField;

