import { connect } from 'react-redux'
import PollCreateForm from './PollCreateForm'
import { createPoll } from './PollCreateFormActions'

const mapStateToProps = (state, ownProps) => {
  return {
    supply: state.poll.supply,
    name: state.poll.name,
    decimals: state.poll.decimals,
    symbol: state.poll.symbol,
    quorum: state.poll.quorum,
    commitTime: state.poll.commitTime,
    revealTime: state.poll.revealTime
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPollCreateFormSubmit: (supply, name, decimals, symbol, quorum, commitTime, revealTime) => {
      event.preventDefault();

      dispatch(createPoll(supply, name, decimals, symbol, quorum, commitTime, revealTime))
    }
  }
}

const PollCreateFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PollCreateForm)

export default PollCreateFormContainer
