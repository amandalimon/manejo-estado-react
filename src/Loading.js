import React from "react";

class Loading extends React.Component {

    componentWillUnmount(){
        console.log("Unmount")
    }

    render() {
        return (
            <p>Cargando...</p>
        );
    }
}

export { Loading };

