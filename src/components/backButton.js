import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import {useParams, useHistory} from 'react-router-dom';
const BackButton = () =>{

    const history = useHistory(); 

    return(
        <React.Fragment>
            <button onClick={history.goBack}  className="button-back">Back</button>
        </React.Fragment>
    )
}

export default withRouter(BackButton);

