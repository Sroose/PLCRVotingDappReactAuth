import { connect } from 'react-redux'
import ProfileForm from './ProfileForm'
import { updateUser } from './ProfileFormActions'

const mapStateToProps = (state, ownProps) => {
  return {
    username: state.user.data.username,
    firstname: state.user.data.firstname,
    lastname: state.user.data.lastname,
    title: state.user.data.title,
    phone: state.user.data.phone,
    email: state.user.data.email,
    orgs: state.user.data.orgs
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onProfileFormSubmit: (username, firstname, lastname,  title, phone, email, orgs) => {
      event.preventDefault();

      dispatch(updateUser(username, firstname, lastname,  title, phone, email, orgs))
    }
  }
}

const ProfileFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileForm)

export default ProfileFormContainer
