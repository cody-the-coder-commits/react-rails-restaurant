import { connect } from 'react-redux'
import { updateToken } from '../redux/actions'
import ACTIONS from "../redux/actions";
import axios from 'axios'

const mapStateToProps = (state, ownProps) => ({
  tokenAuthHeaders: state.tokenAuthHeaders,
  ownProps: ownProps
});

const mapDispatchToProps = dispatch => ({
  updateToken: token => dispatch(ACTIONS.updateToken(token))
});

const mergeProps = (state, actions) => ({
  ...state,
  ...actions,
  signIn: function(email, password) {
    axios.post('http://localhost:3001/auth/sign_in.json', {
      email: email,
      password: password
    }).then((response) => {
      this.updateToken({
        'client' : response.headers.client,
        'access-token' : response.headers['access-token'],
        'expiry' : response.headers.expiry,
        'uid' : response.headers.uid,
        'role' : response.data.data.role
      })
    })
    .catch((error) => {
      console.log(error);
    });
  },
  createAccount: function(user) {
    axios.post('http://localhost:3001/auth', user)
    .then((response) => {
      this.signIn(user.email, user.password)
      console.log(response);
})
    .catch(function (error) {
      console.log(error);
    });
  },
  postRequest: function (url, body) {
    const axiosRequest = axios.create({
      headers: this.tokenAuthHeaders
    });

    return axiosRequest.post("http://localhost:3001" + url, body).then((response) => {
      if ('access-token' in response.headers && response.headers['access-token'].length > 0){
        this.updateToken({'access-token' : response.headers['access-token']});
      }
      console.log("post request")
      console.log(response)
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
  },
  patchRequest: function (url, body) {
    const axiosRequest = axios.create({
      headers: this.tokenAuthHeaders
    });

    return axiosRequest.patch("http://localhost:3001" + url, body).then((response) => {
      if ('access-token' in response.headers && response.headers['access-token'].length > 0){
        this.updateToken({'access-token' : response.headers['access-token']});
      }
      console.log("post request")
      console.log(response)
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
  },
  deleteRequest: function (url, body) {
    const axiosRequest = axios.create({
      headers: this.tokenAuthHeaders
    });

    return axiosRequest.delete("http://localhost:3001" + url, body).then((response) => {
      if ('access-token' in response.headers && response.headers['access-token'].length > 0){
        this.updateToken({'access-token' : response.headers['access-token']});
      }
      console.log("post request")
      console.log(response)
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
  },
  getRequest: function (url) {
    const axiosRequest = axios.create({
      headers: this.tokenAuthHeaders
    });

    return axiosRequest.get("http://localhost:3001" + url).then((response) => {
      if ('access-token' in response.headers && response.headers['access-token'].length > 0){
        this.updateToken({'access-token' : response.headers['access-token']});
      }
      console.log("get request")
      console.log(response)
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
  },
});

const ContainerCreator = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
  )

  export default ContainerCreator