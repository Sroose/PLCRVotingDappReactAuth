import { connect } from 'react-redux'
import VoteOverviewForm from './VoteOverviewForm'
import { pledgeTokens } from './VoteOverviewFormActions'

const mapStateToProps = (state, ownProps) => {
  return {
    tokens: state.tokens
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPledgeSubmit: (tokens) => {
      event.preventDefault();

      dispatch(pledgeTokens(tokens))
    }
  }
}

const VoteOverviewFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(VoteOverviewForm)

export default VoteOverviewFormContainer
