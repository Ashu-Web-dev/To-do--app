import React, { useEffect, useState } from "react";
import 'boxicons/css/boxicons.min.css';


const App = () => {
  const [data, setData] = useState([])
  const [val, setValue] = useState("")
  const [update,setUpdate]=useState(null)
  const [color,setColor]=useState(false)

  const handlechange = (e) => {
    // console.log(e.target.value)
    setValue(e.target.value)
    console.log("value", val)

  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (val.trim() == "") {
      alert("plz eter some list")
      return
    }
     if(update!==null){
      const userdate=data.map((item,i)=>i===update?val:item)
      setData(userdate)
      localStorage.setItem("mydata",JSON.stringify(userdate))
      setUpdate(null)
      setValue("")
    }else{ const newData = [...data, val]
    setData(newData)
    alert("datais saved")
    localStorage.setItem("mydata", JSON.stringify(newData))
    setValue("")}
   
  }
  useEffect(() => {
    const savedata = JSON.parse(localStorage.getItem("mydata"))
    setData(savedata)
     const savedColer= JSON.parse(localStorage.getItem("change"))
     if(savedColer!==null)
     setColor(savedColer)
    
  }, [])
   const del=(index)=>{
    if(window.confirm(`are you sure you want delete this item "${data[index]}"`)){
const upatedata=data.filter((_,i)=>i!==index)
    setData(upatedata)
    localStorage.setItem("mydata",JSON.stringify(upatedata))
    }
   
   }
 const replacedata=(e,i)=>{
alert(e)
setUpdate(i)
setValue(e)
    }
   
    const change=()=>{
      alert("change")
      const news=!color
      setColor(news)
      localStorage.setItem("change",JSON.stringify(news))
    }
    
    
  return (<>

    <div className={` h-[100vh] w-[100vw]  text-center ${color?"bg-pink-400 ":"bg-black text-white"}`}>
      <div className="flex justify-evenly">
        <h1 className="text-4xl ml-5"> Todo List</h1>
     <span className="text-2xl border-1 rounded-2xl flex items-center"> <i onClick={()=>change()} className='bx  bx-brightness-half cursor-pointer text-yellow-300'   ></i>
     <i onClick={()=>change()} className='bx  bx-moon cursor-pointer'  ></i>  </span>
      </div>
      

      <form action="" onSubmit={handleSubmit}>

        <textarea className="border-2 h-[50px] w-2xl" name="" id=""
          value={val}
          onChange={handlechange}></textarea>
        <button  className="focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">save</button>
      </form><ol className="border-2 display-flex  justify-around" >
        {data.map((e, i) => (
          <li  className="flex  justify-around text-2xl  overflow-y-scroll" key={i} >{i + 1}. {e} <span><i className ='bx  bx-trash cursor-pointer '  onClick={(e)=>{alert("you are clicking deleting buttion"),del(i)} }></i><i onClick={()=>{alert("you are click on update buttion"),replacedata(e,i)}} class='bx  bx-edit'  ></i> </span> </li>

        ))}
      </ol>
    </div>

  </>);
};

export default App;
