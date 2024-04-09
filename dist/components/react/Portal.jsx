'use client';
import ReactDOM from 'react-dom';
export default function Portal(props) {
    return ReactDOM.createPortal(props.children, props.dom);
}
