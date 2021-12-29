import React, {useState, useEffect} from 'react'
import Users from './Users'
const url = 'https://api.github.com/users/john-smilga/followers?per_page=100';
const paginationBtns  =[1,2, 3, 4, 5, 6, 7, 8, 9, 10];

const App = () => {
  const [users,setUsers] = useState([]);
  const [displayindex,setDisplayIndex] = useState(0);

  const getUsers = async () => {
    const data = await fetch(url);
    const users = await data.json();
    setUsers(users)
    return users;
  }

  const handleClick = (e) => {
    e.preventDefault();
    let page = e.target.dataset.label;
    // let indexToDisplay = page;
    // if(page === -1){
    //   if(displayindex !== 0)
    //     indexToDisplay = displayindex - 1;
    //   else
    //     indexToDisplay = 10;
    // }
    // if(page === 11){
    //   if(displayindex !== 9)
    //     indexToDisplay = displayindex + 1;
    //   else
    //     indexToDisplay = 0;
    // }
    setDisplayIndex(page)
    // console.log(displayindex)
  }

  const handlePrevClick = () => {
    if(displayindex === 0)
      setDisplayIndex(9)
    else
      setDisplayIndex(displayindex => displayindex - 1)
    
  }
  const handleNextClick = () => {
    if(displayindex === 9)
      setDisplayIndex(0)
    else
      setDisplayIndex(displayindex => parseInt(displayindex) + 1)
  }

  useEffect(() =>{
    getUsers();
  },[]);
  
  return (
    <div className="main">
      <div className='heading'>
      <h1 className='title'>Pagination</h1>
      <div className="underline"></div>
    </div>
    <Users users={users} displayindex={displayindex}/>
    <div className="pagination">
      <div className="prev" onClick={handlePrevClick}>Prev</div>
      {
        paginationBtns.map((item,index) => {
          return (
            <div key={index} className="btn" data-label={index} onClick={handleClick}>
              {item}
            </div>
          )
        })
      } 
      <div className="next" onClick={handleNextClick}>Next</div>
    </div>
    </div>
  )
}

export default App
