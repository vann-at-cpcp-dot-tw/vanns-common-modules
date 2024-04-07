'use client';
import ReactDOM from 'react-dom';
function Portal(props) {
    return ReactDOM.createPortal(props.children, props.dom);
}
export default Portal;
