import React from 'react';
// import NewsList from './components/NewsList';
// import Categories from './components/Categories';
import {Route} from 'react-router-dom';
import NewsPage from './pages/NewsPage';

const App = () => {
  // 리액트 라우터 적용전 
  // const [category,setCategory] = useState('all');
  // const onSelect = useCallback(category => setCategory(category), [])

  // const onClick = () => {
  //   axios.get('https://jsonplaceholder.typicode.com/todos/1').then(response => {
  //     setData(response.data);
  //   });
  // } 
  //async/await 적용
  // const onClick = async() => {
  //   try {  
  //     const response = await axios.get('http://newsapi.org/v2/top-headlines?country=kr&apiKey=13aa2124041b46969720f94915ea8c08');
  //     setData(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // } 
  return (
    // 리액트 라우터 적용전
    // <>
    //   <Categories category={category} onSelect={onSelect}/>
    //   <NewsList category={category}/>
    // </>
    <Route path="/:category?" component={NewsPage}/>
  );
};

export default App;