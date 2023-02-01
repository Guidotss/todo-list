import { RunCircle } from "@mui/icons-material";
import { UIState } from "./UIProvider";



type UIType = 
    |{type:'UI - open Sidebar'}
    |{type:'UI - close Sidebar'}
    |{type:'UI - Set isAddingEntry', payload:boolean}
    |{type:'UI - Start Dragging', payload:boolean}
    |{type:'UI - Start Dragging'}
    |{type:'UI - End Dragging'}


export const UIReducer = (state:UIState, action:UIType): UIState => {
    switch(action.type){
        
        case 'UI - open Sidebar':
            return {
                ...state,
                isSidebarOpen:true,
            }
        case 'UI - close Sidebar':
            return {
                ...state,
                isSidebarOpen:false,
            }
        case 'UI - Set isAddingEntry':
            return {
                ...state,
                isAddingEntry:action.payload,
            }
        case 'UI - Start Dragging':
            return {
                ...state,
                isDragging:true,
            }
        case 'UI - End Dragging':
            return {
                ...state,
                isDragging:false,
            }
        default:

            return state;
            
    }
}
