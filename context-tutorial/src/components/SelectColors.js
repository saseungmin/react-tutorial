import React, { Component } from 'react';
import { ColorConsumer } from '../contexts/color';

const colors = ['red','orange','yellow','green','blue','indigo','violet'];
const SelectColors = () => {
    return (
        <div>
            <h2>색상을 선택하세요.</h2>
            <ColorConsumer>
                {({actions}) => (
                    <div style={{display:'flex'}}>
                        {colors.map(color => (
                            <div key={color} style={{
                                background : color,
                                width: '100px',
                                height : '100px',
                                cursor :'pointer'
                            }}
                            onClick={() => actions.setColor(color)}
                            // 마우스 오른쪽 버튼 클릭 이벤트
                            onContextMenu={e => {
                                e.preventDefault(); //마우스 오른쪽 버튼 클릭 시 메뉴가 뜨는 것을 무시함.
                                actions.setSubcolor(color);
                            }}
                            />
                        ))}
                    </div>
                )}
            </ColorConsumer>
            <hr/>
        </div>
    );
};

export default SelectColors;


// static contextType 클래스형 컴포넌트 일때
// class SelectColors extends Component {
//     static contextType = ColorContext;

//     handleSetColor = color =>{
//         this.context.actions.setColor(color)
//     }
//     handleSetSubcolor = subcolor =>{
//         this.context.actions.setSubcolor(subcolor)
//     }
//     render(){
//         return (
//             <div>
//                 <h2>색상을 선택하세요.</h2>
//                 <ColorConsumer>
//                     {({actions}) => (
//                         <div style={{display:'flex'}}>
//                             {colors.map(color => (
//                                 <div key={color} style={{
//                                     background : color,
//                                     width: '100px',
//                                     height : '100px',
//                                     cursor :'pointer'
//                                 }}
//                                 onClick={() => this.handleSetColor(color)}
//                                 // 마우스 오른쪽 버튼 클릭 이벤트
//                                 onContextMenu={e => {
//                                     e.preventDefault(); //마우스 오른쪽 버튼 클릭 시 메뉴가 뜨는 것을 무시함.
//                                     this.handleSetSubcolor(color);
//                                 }}
//                                 />
//                             ))}
//                         </div>
//                     )}
//                 </ColorConsumer>
//                 <hr/>
//             </div>
//         );
//     }
// };

