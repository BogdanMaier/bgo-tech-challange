import * as React from 'react';
import { useHistory } from 'react-router-dom';

function BackButton() {
    const history = useHistory();

    return <button onClick={history.goBack}>
        {'<'}
    </button>;
};


export default BackButton;
