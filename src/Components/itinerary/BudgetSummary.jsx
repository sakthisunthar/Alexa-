import '../../styles/itinerary.css';

const CATEGORY_COLORS = {
  accommodation: '#2563EB',
  food: '#F59E0B',
  transportation: '#10B981',
  activities: '#8B5CF6',
  other: '#64748B',
};

const CATEGORY_LABELS = {
  accommodation: 'Accommodation',
  food: 'Food',
  transportation: 'Transportation',
  activities: 'Activities',
  other: 'Others',
};

function BudgetSummary({ budget }) {
  if (!budget) return null;

  const breakdown = budget.breakdown || {};
  const categories = Object.keys(CATEGORY_LABELS);
  const total = budget.totalEstimated || 0;

  return (
    <div className="budget-card">
      <h3>Budget Summary</h3>

      <div className="budget-total">
        <span className="budget-total-amount">
          ${total.toLocaleString()}
        </span>
        <span className="budget-total-label">Total Estimated Cost</span>
      </div>

      <div className="budget-breakdown">
        {categories.map((key) => {
          const item = breakdown[key];
          if (!item) return null;
          const amount = typeof item === 'object' ? item.amount : item;
          const pct = typeof item === 'object'
            ? item.percentage
            : total > 0 ? Math.round((amount / total) * 100) : 0;
          const color = CATEGORY_COLORS[key] || '#64748B';

          return (
            <div key={key} className="budget-row">
              <div className="budget-row-header">
                <span className="budget-row-dot" style={{ background: color }} />
                <span className="budget-row-label">{CATEGORY_LABELS[key]}</span>
                <span className="budget-row-amount">
                  ${amount.toLocaleString()} ({pct}%)
                </span>
              </div>
              <div className="budget-bar">
                <div
                  className="budget-bar-fill"
                  style={{ width: `${pct}%`, background: color }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {budget.remaining != null && (
        <div className="budget-remaining">
          <span>Remaining Budget</span>
          <span className={budget.remaining < 0 ? 'budget-over' : 'budget-ok'}>
            ${Math.abs(budget.remaining).toLocaleString()}
            {budget.total > 0 &&
              ` (${Math.round((Math.abs(budget.remaining) / budget.total) * 100)}%)`}
          </span>
        </div>
      )}
    </div>
  );
}

export default BudgetSummary;
