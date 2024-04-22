import React from "react";

const SECURITY_CODE = 'paradigma';

function UseState({ name }) {
    const [state, setState] = React.useState({
        value: '',
        error: false,
        loading: false,
        confirmed: false,
        deleted: false,
    })

    const onConfirm = () => {
        setState({
            ...state,
            error: false,
            loading: false,
            confirmed: true,
        })
    };

    const onError = () => {
        setState({
            ...state,
            error: true,
            loading: false
        });
    };

    const onWrite = (newValue) => {
        setState({
            ...state, value: newValue,
        });
    };

    const onCheck = () => {
        setState({
            ...state, loading: true,
        });
    };

    const onDeleted = () => {
        setState({
            ...state, deleted: true,
        });
    };

    const onReset = () => {
        setState({
            ...state,
            deleted: false,
            confirmed: false,
            value: '',
        })
    };

    React.useEffect(() => {
        if (!!state.loading) {
            setTimeout(() => {
                if (state.value === SECURITY_CODE) {
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
                    onChange={(event) => {
                        onWrite(event.target.value);
                    }}
                />

                <button
                    onClick={() => {
                        onCheck();
                    }}
                >Comprobar</button>
            </div>
        );
    } else if (state.confirmed && !state.deleted) {
        return (
            <>
                <p>¿Seguro que quieres eliminar UseState?</p>
                <button
                    onClick={() => onDeleted()}>
                    Sí, eliminar
                </button>
                <button
                    onClick={() => onReset()}>
                    No, regresar
                </button >
            </>
        )
    } else {
        return (
            <>
                <p>Eliminado con éxito</p>
                <button
                    onClick={() => {onReset()}}>
                    Recuperar useState
                </button>
            </>
        )
    }
}

export { UseState };