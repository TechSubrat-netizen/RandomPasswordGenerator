import { useState, useCallback, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(true);
  const [character, setCharacter] = useState(true);
  const [password, setPassword] = useState("");
  
  const passwordRef = useRef(null);

  const passwordGenerated = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijjklmnopqrstuyvwxyz";
    if (number) str += "1234567890";
    if (character) str += "!@#$%^&*()_+-={}[]|:;";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, number, character, setPassword]);

  const copyPasswordToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 99);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerated();
  }, [length, number, character, passwordGenerated]);

  return (
    <div className="app-wrapper">
      <div className='password-generator'>
        <h1 className='text-white text-center'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
            type="text" 
            value={password}  
            className='outline-none w-full py-1 px=3 my-3' 
            placeholder='password' 
            readOnly
            ref={passwordRef}
          />
          <button className='outline-none bg-red-600 text-white px-3 py-0.5 shrink-0' onClick={copyPasswordToClipBoard}>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
              type="range" 
              min={6} 
              max={100} 
              value={length} 
              className='cursor-pointer' 
              onChange={(e) => setLength(Number(e.target.value))}
            />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
              type="checkbox"
              defaultChecked={number}
              id="numberInput"
              onChange={() => setNumber(prev => !prev)} 
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
              type="checkbox"
              defaultChecked={character}
              id="characterInput"
              onChange={() => setCharacter(prev => !prev)} 
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
