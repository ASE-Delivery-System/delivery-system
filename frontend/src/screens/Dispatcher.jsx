import React, { useEffect, useState } from 'react'
import DispatcherService from '../services/dispatcher.service';

const Dispatcher = () => {

    const [content, setContent] = useState("");


  useEffect(() => {
      // here you get the content from backend needed for dispatcher
    DispatcherService.getDispatcherView().then(
      (response) => {
        setContent(response.data);
      }
    ).catch(error => {
        setContent(error.response.data.message);
    });
  }, []);
    return (
        <div>
            <p>dispatcher</p>
            <h1>{content}</h1>
        </div>
    )
}

export default Dispatcher
