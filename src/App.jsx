import React, { useEffect, useState } from "react";
import 'boxicons/css/boxicons.min.css';

const App = () => {
  const [data, setData] = useState([]);
  const [val, setValue] = useState("");
  const [update, setUpdate] = useState(null);
  const [color, setColor] = useState(false);

  const handlechange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (val.trim() === "") {
      alert("Please enter a task");
      return;
    }

    if (update !== null) {
      const updatedData = data.map((item, i) => (i === update ? val : item));
      setData(updatedData);
      localStorage.setItem("mydata", JSON.stringify(updatedData));
      setUpdate(null);
      setValue("");
    } else {
      const newData = [...data, val];
      setData(newData);
      alert("Task saved");
      localStorage.setItem("mydata", JSON.stringify(newData));
      setValue("");
    }
  };

  useEffect(() => {
    const savedata = JSON.parse(localStorage.getItem("mydata"));
    if (savedata) {
      setData(savedata);
    } else {
      setData([]);
    }
    const savedColor = JSON.parse(localStorage.getItem("change"));
    if (savedColor !== null) setColor(savedColor);
  }, []);

  const del = (index) => {
    if (window.confirm(`Are you sure you want to delete "${data[index]}"?`)) {
      const updatedData = data.filter((_, i) => i !== index);
      setData(updatedData);
      localStorage.setItem("mydata", JSON.stringify(updatedData));
    }
  };

  const replacedata = (e, i) => {
    alert("You are updating an item");
    setUpdate(i);
    setValue(e);
  };

  const change = () => {
    const newColor = !color;
    setColor(newColor);
    localStorage.setItem("change", JSON.stringify(newColor));
  };

  return (
    <div
      className={`min-h-screen w-full flex flex-col items-center px-4 py-6 transition-all duration-500 ${
        color ? "bg-pink-400 text-black" : "bg-black text-white"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center w-full max-w-3xl mb-6">
        <h1 className="text-3xl md:text-5xl font-bold">Todo List</h1>
        <div className="flex gap-3 text-2xl">
          <i
            onClick={change}
            className="bx bx-brightness-half cursor-pointer text-yellow-300 hover:scale-110 transition-transform"
          ></i>
          <i
            onClick={change}
            className="bx bx-moon cursor-pointer hover:scale-110 transition-transform"
          ></i>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row w-full max-w-3xl gap-3 mb-6"
      >
        <textarea
          className="border-2 rounded-lg p-2 w-full md:flex-1 resize-none text-black"
          placeholder="Enter your task..."
          value={val}
          onChange={handlechange}
        ></textarea>
        <button className="focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg px-5 py-2 md:w-auto w-full">
          {update !== null ? "Update" : "Save"}
        </button>
      </form>

      {/* Task List */}
      <ol className="w-full max-w-3xl space-y-3 overflow-y-auto max-h-[60vh] scrollbar-thin scrollbar-thumb-gray-400">
        {data.length === 0 ? (
          <p className="text-center text-gray-300">No tasks yet 😴</p>
        ) : (
          data.map((e, i) => (
            <li
              key={i}
              className="flex justify-between items-center bg-white/10 p-3 rounded-lg hover:bg-white/20 transition-all"
            >
              <span className="flex-1 text-left break-words">
                {i + 1}. {e}
              </span>
              <div className="flex gap-4 text-xl">
                <i
                  className="bx bx-edit text-green-400 cursor-pointer hover:scale-110 transition-transform"
                  onClick={() => replacedata(e, i)}
                ></i>
                <i
                  className="bx bx-trash text-red-400 cursor-pointer hover:scale-110 transition-transform"
                  onClick={() => del(i)}
                ></i>
              </div>
            </li>
          ))
        )}
      </ol>
    </div>
  );
};

export default App;
