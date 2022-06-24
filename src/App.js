import React, {useEffect, useState} from 'react';
import Alert from './Comps/Alert';
import Lists from './Comps/Lists';
import './App.css';

const getLocalStorage=() =>{
  let list= localStorage.getItem("list");
  if(list){
    return (list=JSON.parse(localStorage.getItem('list')));
  }else{
    return [];
  }
}
const App = () => {
  const [name,setName]=useState("");
  const [list,setList]=useState(getLocalStorage());
  const [isEdit,setIsEdit]=useState(false);
  const [editID,setEditID]=useState(null);
  const [alert,setAlert]=useState({show: false, msg:"",type:""}); 

  useEffect(()=>{
    localStorage.setItem("list",JSON.stringify(list));
  },[list])
  const handleSubmit=(e) =>{
    e.preventDefault();
    if(!name){
      showAlert(true,"danger", "please enter a value")
    }else if(name && isEdit){
      setList(
        list.map((item)=>{
          if(item.id==editID){
            return {...item, title:name}
          }
          return item
        })
      );
      setName("")
      setEditID(null)
      setIsEdit(false)
      showAlert(true,"success","value changes")
    }else{
      showAlert(true, "success","item added to list")
      const newItem={id:new Date().getTime().toString(), title: name};
      setList([...list,newItem]);
      setName("");

    }
  }
  const showAlert=(show=false,type='',msg='') =>{
    setAlert({show,type,msg});
  }
  const removeItem=(id) =>{
    showAlert(true,"danger","Item Removed ");
    setList(list.filter((item)=>item.id!== id));

  };
  const editItem=(id) =>{
    const editItem= list.find((item)=>item.id===id);
    setIsEdit(true)
    setEditID(id)
    setName(editItem.title)
  }
  const clearList=() =>{
    showAlert(true, "danger","empty list")
    setList([])
  }

  return (
    <section className="section-center">
      <form onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list}></Alert>}
        <h3 style={{marginBottom:"1.5 rem",textAlign:'center'}}>
          Todo List
        </h3>
        <div className='mb-3 form'>
          <input type="text" className='from-control' placeholder='Enter!'onChange={(e)=>setName(e.target.value)} value={name}>            
          </input>
          <button type='submit' className="btn btn-success">
            {isEdit?"Edit":"Submit"}
          </button>
        </div>
      </form>
      {list.length > 0 &&(
        <div style={{marginTop:"2rem"}}>
          <Lists items={list} removeItem={removeItem} editItem={editItem}></Lists>
          <div className='text-center'>
            <button className='btn btn-warning' onClick={clearList}>
              Clear Items
            </button>
          </div>
        </div>  
      )}
    </section>
  );
};

export default App;
