import { defaultState, resetState } from './initialState';

const storageReducer = (state, action) => {
    switch (action.type) {
        case 'add_graph': {
            return {
                ...state,
                graphs: state.graphs.concat(action.payload),
            };
        }
        case 'remove_graph_by_title': {
            if (typeof action.payload !== "string") return state;
            return {
                ...state,
                graphs: state.graphs.filter(graph => graph.title !== action.payload),
            };
        }
        case 'replace_graph': {  
            return {
                ...state,
                graphs: state.graphs.map(graph => graph.title === action.payload.title ? action.payload : graph ),
            }
        }
        case 'remove_all_graphs': {
            return {
                ...state,
                graphs: [],
            };
        }
        case 'set_current_graph': {
            return {
                ...state,
                currentSelection: action.payload,
            };
        }

        // Modal reducers
        case 'open_modal': {
            return {
                ...state,
                modalOpen: true
            }
        }
        case 'close_modal': {
            return {
                ...state,
                modalOpen: false
            }
        }
        case 'set_modal_content': {
            return {
                ...state,
                modalContent: action.payload,
            }
        }
        case 'reset_state': {
            return { ...defaultState, ...resetState };
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
};

export default storageReducer;