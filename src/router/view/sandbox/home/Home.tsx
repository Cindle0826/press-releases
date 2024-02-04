import { Button } from '@mui/material';
import axios from 'axios'

const Home = () => {

  /*
    json-server 
    關聯 
    posts?_embed=comments
    comments?_embed=post
  */
  const handleData = () => {
    axios.get('http://localhost:8000/posts?_embed=comments').then(e => console.log(e.data));
  }

  const handleInserData = () => {
    axios.post('http://localhost:8000/posts', {
      title : 'test',
      views : 'ok~'
    }).then(e => {
      alert("新增成功")
    })
    
  }
  
  const handleUpdateData = () => {
    // patch 局部修改 
    axios.patch('http://localhost:8000/posts/9c64', {
      title : '123 ~'
    }).then(e => {
      alert("修改成功")
    })
  }
  
  const handleDeleteData = () => {
    axios.delete('http://localhost:8000/posts/1').then(e => {
      alert("刪除成功")
    }).catch(console.log)
  }

  return (
    <>
      <div style={{ margin : '10px'}}>
        <Button variant="contained" onClick={handleData}>獲取資料</Button>
      </div>
      <div style={{ margin : '10px'}}>
        <Button variant="contained" onClick={handleInserData}>新增資料</Button>
      </div>
      <div style={{ margin : '10px'}}>
        <Button variant="contained" onClick={handleUpdateData}>修改資料</Button>
      </div>
      <div style={{ margin : '10px'}}>
        <Button variant="contained" onClick={handleDeleteData}>刪除資料</Button>
      </div>
    </>
  )
}

export default Home