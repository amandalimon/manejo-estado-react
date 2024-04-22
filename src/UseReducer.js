import React from "react";

const SECURITY_CODE = 'paradigma';

function UseReducer({ name }) {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const onConfirm = () => dispatch({ type: actionTypes.confirm });
    const onError = () => dispatch({ type: actionTypes.error });    
    const onCheck = () => dispatch({ type: actionTypes.check});
    const onDeleted = () => dispatch({ type: actionTypes.deleted});
    const onReset = () => dispatch({ type: actionTypes.reset});
    const onWrite = (event) => {
        dispatch({ type: actionTypes.write, payload: event.target.value })
    };
    
    React.useEffect(() => {
        if(!!state.loading) {
            setTimeout(() => {
                if(state.value === SECURITY_CODE) {
                    onConfirm();
                } else {
                    onError();
                }
            }, 2000);
        }   
    }, [state.loading]);

    if (!state.deleted && !state.confirmed) {
        return (
            <div>
                <h2>Eliminar {name}</h2>

                <p>Por favor, escribe el código de seguridad.</p>


                {(state.error && !state.loading) && (
                    <p>Error: Código Incorrecto</p>
                )}

                {state.loading && (
                    <p>Cargando...</p>
                )}

                <input
                    placeholder="Código de seguridad"
                    value={state.value}
                    onChange={onWrite}
                />

                <button onClick={onCheck}>
                    Comprobar
                </button>
            </div>
        );
    } else if (state.confirmed && !state.deleted) {
        return (
            <>
                <p>¿Seguro que quieres eliminar UseState?</p>
                <button onClick={onDeleted}>
                    Sí, eliminar
                </button>
                <button onClick={onReset}>
                    No, regresar
                </button >
            </>
        )
    } else {
        return (
            <>
                <p>Eliminado con éxito</p>
                <button onClick={onReset}>
                    Recuperar UseReducer
                </button>
            </>
        )
    }
}

const initialState = {
    value: '',
    error: false,
    loading: false,
    confirmed: false,
    deleted: false,
};

const actionTypes = {
    confirm: 'CONFIRM',
    error: 'ERROR',
    write: 'WRITE',
    check: 'CHECK',
    deleted: 'DELETED',
    reset: 'RESET',
};

const reducerObject = (state, payload) => ({
    [actionTypes.confirm]: {
        ...state,
        error: false,
        loading: false,
        confirmed: true,
    },
    [actionTypes.error]: {
        ...state,
        error: true,
        loading: false
    },
    [actionTypes.write]: {
        ...state,
        value: payload,
    },
    [actionTypes.check]: {
        ...state,
        loading: true,
    },
    [actionTypes.deleted]: {
        ...state,
        deleted: true,
    },
    [actionTypes.reset]: {
        ...state,
        deleted: false,
        confirmed: false,
        value: '',
    },
});

const reducer = (state, action) => {
    if (reducerObject(state)[action.type]) {
        return reducerObject(state, action.payload)[action.type];
    } else {
        return state;
    }
}

export { UseReducer };