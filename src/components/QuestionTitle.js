import React from 'react';

const QuestionTitle = (props) => {
  return (
    <div className="questionTitle">
      <p>{props.current_question}</p>
    </div>
  )
}

export default QuestionTitle;
