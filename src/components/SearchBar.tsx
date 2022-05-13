import { useState } from 'react';
import { RiSearch2Line } from 'react-icons/ri';

export default function SearchBar() {
  const [focused, setFocused] = useState(false);

  return (
    <div
      className={'flex search items-center pb2' + (focused ? ' focused' : '')}
    >
      <label htmlFor="search" className="flex mr2">
        <RiSearch2Line className={'gray' + (focused ? ' light-purple' : '')} />
      </label>
      <input
        onBlur={() => setFocused(false)}
        onFocus={() => setFocused((focus) => !focus)}
        id="search"
        name="search"
        className="bn outline-0"
        type="search"
        placeholder="Find items..."
      />
    </div>
  );
}
