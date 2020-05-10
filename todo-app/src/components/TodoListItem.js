import React from 'react';
import { MdCheckBox, MdCheckBoxOutlineBlank,MdRemoveCircleOutline} from "react-icons/md";
import cn from 'classnames';
import './TodoListItem.scss';

const TodoListItem = ({todo, onRemove , onToggle, style}) => {
    const {id, text, checked} =todo;

    return (

        // 컴포넌트 사이사이에 테두리를 쳐주고, 홀수/ 짝수 번째 항목에 다른 색상을 설정하기 위함
        <div className="TodoListItem-virtualized" style={style}>
            <div className="TodoListItem">
                <div className={cn('checkbox',{checked})} onClick={() => onToggle(id)}>
                    {checked ? <MdCheckBox/> :<MdCheckBoxOutlineBlank/>}
                    <div className="text">{text}</div>
                </div>
                <div className="remove" onClick={() => onRemove(id)}>
                    <MdRemoveCircleOutline/>
                </div>
            </div>
        </div>
    );
};


// React.memo를 사용ㅇ해서 컴포넌트 성능 최적화 시키기.
// 컴포넌트 props가 바뀌지 않는다면, 리렌더링을 하지 않도록 설정해준다.
export default React.memo(TodoListItem, (prevProps, nextProps) => prevProps.todo === nextProps.todo);