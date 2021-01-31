import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { Mutation } from 'react-apollo';


import { SIGNIN_USER } from '../../queries'


import Error from '../Error';


const initialState = {

    username: "",

    password: "",

};

class Signin extends React.Component {

    state = { ...initialState };

    clearState = () => {

        this.setState({ ...initialState });

    }

    handleChange = event => {

        const { name, value } = event.target;

        this.setState({

            [name]: value

        })
    };

    handleSubmit = (event, signinUser) => {

        event.preventDefault();

        signinUser().then(async ({ data }) => {

            localStorage.setItem('token', data.signinUser.token);

            // var user = this.state.username;


            await this.props.refetch();

            this.clearState();



            this.props.history.push('/profile')

        });

    }

    validateForm = () => {

        const { username, password } = this.state;

        const isInvalid = !username || !password;

        return isInvalid;

    }

    render() {

        const { username, password } = this.state;


        return (

 
                <div className='signin-form'>

                    <h2 >Signin</h2>

                    <Mutation mutation={SIGNIN_USER} variables={{ username, password }}>

                        {
                            (signinUser, { data, loading, error }) => {

                                return (

                                    <form className='form' onSubmit={event => this.handleSubmit(event, signinUser)}>

                                        <TextField  style={{marginTop:10}} type="text" name="username" value={username} onChange={this.handleChange} label="Username" variant="outlined" />

                                        <TextField style={{marginTop:20}} type="password" name="password" value={password} onChange={this.handleChange} label="password" variant="outlined" />

                                        <Button type="submit" disabled={loading || this.validateForm()} style={{ marginTop: 20 }} variant="contained">Submit</Button>

                                        {error && <Error error={error} />}

                                    

                                        <Link to={`/signup`} style={{margin:10}} ><h4>Create account</h4></Link> 
                                    </form>

                            

                                )
                            }
                        }



                    </Mutation>

                </div>
    
        )
    }

}


export default withRouter(Signin);