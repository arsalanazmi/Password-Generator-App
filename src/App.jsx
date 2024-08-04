import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const passwordRef = useRef(null);
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [charactersAllowed, setCharactersAllowed] = useState(false);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numbersAllowed) str += "0123456789";
    if (charactersAllowed) str += "?><,./{}][+=_-)(*&^%$#@!";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numbersAllowed, charactersAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    generatePassword();
  }, [length, numbersAllowed, charactersAllowed, generatePassword]);
  
  return (
    <div className="pt-20  h-screen bg-gray-900">
      <div className="flex flex-col justify-center items-start md:items-center flex-wrap gap-5 rounded-2xl bg-slate-600 text-orange-400 md:w-[75%] w-[100%] m-auto p-5">
        <h1 className="md:text-4xl text-2xl text-center m-auto">
          Password Generator App
        </h1>
        <div className="flex flex-wrap m-auto">
          <input
            type="text"
            value={password}
            placeholder="Password"
            readOnly
            ref={passwordRef}
            className="rounded-md md:w-80 h-[30px] border-none outline-none px-2"
          />
          <button
            className="bg-blue-600 text-white md:w-[70px] rounded-md"
            onClick={copyPasswordToClipboard}
          >
            Copy
          </button>
        </div>
        <div className=" flex flex-wrap md:flex-row flex-col items-start gap-5 m-auto">
          <span>
            <input
              type="range"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              min={8}
              max={16}
              id="length"
              className="mr-2 cursor-pointer"
            />
            <label htmlFor="length">Length ({length})</label>
          </span>
          <span>
            <input
              type="checkbox"
              defaultChecked={numbersAllowed}
              id="numbers"
              onChange={() => {
                setNumbersAllowed((prev) => !prev);
              }}
              className="mr-2 cursor-pointer"
            />
            <label htmlFor="numbers">Numbers</label>
          </span>
          <span>
            <input
              type="checkbox"
              defaultChecked={charactersAllowed}
              id="characters"
              onChange={() => setCharactersAllowed((prev) => !prev)}
              className="mr-2 cursor-pointer"
            />
            <label htmlFor="characters">Characters</label>
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
