import { ArrowUp, ArrowDown, Check } from 'lucide-react'
import EmptyState from '../common/EmptyState.jsx'
import { FEEDBACK_TYPE } from '../../utils/constants'

const RESULT_LABEL = {
  [FEEDBACK_TYPE.HIGHER]: 'Higher',
  [FEEDBACK_TYPE.LOWER]: 'Lower',
  [FEEDBACK_TYPE.CORRECT]: 'Correct',
}

const RESULT_ICON = {
  [FEEDBACK_TYPE.HIGHER]: ArrowUp,
  [FEEDBACK_TYPE.LOWER]: ArrowDown,
  [FEEDBACK_TYPE.CORRECT]: Check,
}

export default function GuessHistory({ history }) {
  if (!history || history.length === 0) {
    return (
      <EmptyState
        icon={Check}
        title="No guesses yet"
        description="Submit your first guess to start building your history."
      />
    )
  }

  return (
    <div className="guess-history">
      <table className="guess-history-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Guess</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {history.map((entry, index) => {
            const Icon = RESULT_ICON[entry.result]
            return (
              <tr key={`${entry.guess}-${index}`}>
                <td>{index + 1}</td>
                <td>{entry.guess}</td>
                <td>
                  <span className={`history-badge history-badge-${entry.result}`}>
                    <Icon size={14} aria-hidden="true" />
                    {RESULT_LABEL[entry.result]}
                  </span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <ul className="guess-history-list">
        {history.map((entry, index) => {
          const Icon = RESULT_ICON[entry.result]
          return (
            <li key={`${entry.guess}-${index}`} className="guess-history-item">
              <span className="guess-history-item-number">#{index + 1}</span>
              <span className="guess-history-item-guess">{entry.guess}</span>
              <span className={`history-badge history-badge-${entry.result}`}>
                <Icon size={14} aria-hidden="true" />
                {RESULT_LABEL[entry.result]}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
