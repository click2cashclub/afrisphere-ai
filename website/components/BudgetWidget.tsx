type BudgetProps = {
  budget?: string;
  accommodation?: string;
  transport?: string;
  food?: string;
  activities?: string;
  dailyEstimate?: string;
};

export default function BudgetWidget({
  budget,
  accommodation,
  transport,
  food,
  activities,
  dailyEstimate,
}: BudgetProps) {
  return (
    <section className="mt-10 rounded-3xl border border-heritage/20 bg-gradient-to-br from-heritage/10 to-sunrise/5 p-6">

      <div className="mb-6 flex items-center gap-3">

        <span className="text-3xl">
          💰
        </span>

        <div>
          <h3 className="text-2xl font-bold text-white">
            Estimated Budget
          </h3>

          <p className="text-sm text-white/50">
            AI-generated travel estimate
          </p>
        </div>

      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

        <BudgetCard
          label="Overall"
          value={budget || "Mid-range"}
        />

        <BudgetCard
          label="Accommodation"
          value={accommodation || "$$$$"}
        />

        <BudgetCard
          label="Activities"
          value={activities || "$$$"}
        />

        <BudgetCard
          label="Transport"
          value={transport || "$$"}
        />

        <BudgetCard
          label="Food"
          value={food || "$$"}
        />

        <BudgetCard
          label="Daily Estimate"
          value={dailyEstimate || "US$150–250"}
        />

      </div>

    </section>
  );
}

type CardProps = {
  label: string;
  value: string;
};

function BudgetCard({
  label,
  value,
}: CardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">

      <p className="text-xs uppercase tracking-wider text-white/40">
        {label}
      </p>

      <p className="mt-2 text-xl font-bold text-white">
        {value}
      </p>

    </div>
  );
}