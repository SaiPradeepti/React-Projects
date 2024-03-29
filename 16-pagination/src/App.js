
import React, {useState} from 'react'
import Users from './Users'
import {useFetch} from './useFetch'
const paginationBtns  =[1,2, 3, 4, 5, 6, 7, 8, 9, 10];

const App = () => {
  const [displayindex,setDisplayIndex] = useState(0);
  const {loading, data} = useFetch();

   const handleClick = (e) => {
    e.preventDefault();
    let page = e.target.dataset.label;
    setDisplayIndex(page)
  }

  const handlePrevClick = () => {
    if(displayindex === 0)
      setDisplayIndex(9)
    else
      setDisplayIndex(displayindex => displayindex - 1)
    
  }
  const handleNextClick = () => {
    if(displayindex >= 9)
      setDisplayIndex(0)
    else
      setDisplayIndex(displayindex => parseInt(displayindex) + 1)
  }  
  
  return (
    <div className="main">
      <div className='heading'>
      <h1 className='title'>Pagination</h1>
      <div className="underline"></div>
    </div>
    <Users data={data} displayindex={displayindex} loading={loading}/>
    <div className="pagination">
      <div className="prev" onClick={handlePrevClick}>Prev</div>
      {
        paginationBtns.map((item,index) => {
          return (
            <div key={index} className={`btn ${index === parseInt(displayindex) ? 'active' : ''}`} data-label={index} onClick={handleClick}>
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
