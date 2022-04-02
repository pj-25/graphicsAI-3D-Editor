import './style.css';
import Editor from './editor/Editor';


const viewportCanvas = document.getElementById('webgl');

//create editor
const editor = new Editor(viewportCanvas);

//rendering the editor.viewport
editor.viewport.render();

