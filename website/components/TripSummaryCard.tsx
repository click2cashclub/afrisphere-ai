type TripSummaryProps = {
  country?: string;
  duration?: number;
  travelStyle?: string;
  transport?: string;
  budget?: string;
  bestFor?: string;
  matchScore?: string;
};

export default function TripSummaryCard({
  country,
  duration,
  travelStyle,
  transport,
  budget,
  bestFor,
  matchScore,
}: TripSummaryProps) {
  return (
    <div className="mt-6 rounded-3xl border border-heritage/20 bg-gradient-to-br from-heritage/10 to-sunrise/5 p-6 backdrop-blur">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-white">
            🌍 Trip Snapshot
          </h3>

          <p className="mt-1 text-sm text-white/50">
            AI-generated overview of your journey
          </p>
        </div>

        <div className="rounded-full bg-heritage/20 px-4 py-2 text-sm font-semibold text-heritage">
          ⭐ {matchScore || "Excellent Match"}
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <InfoCard
          icon="📍"
          label="Country"
          value={country || "Not specified"}
        />

        <InfoCard
          icon="🗓"
          label="Duration"
          value={duration ? `${duration} Days` : "Flexible"}
        />

        <InfoCard
          icon="🦁"
          label="Travel Style"
          value={travelStyle || "Explorer"}
        />

        <InfoCard
          icon="🚗"
          label="Transport"
          value={transport || "Private Transfer"}
        />

        <InfoCard
          icon="💰"
          label="Budget"
          value={budget || "Mid-range"}
        />

        <InfoCard
          icon="👥"
          label="Best For"
          value={bestFor || "All Travellers"}
        />
      </div>
    </div>
  );
}

type InfoCardProps = {
  icon: string;
  label: string;
  value: string;
};

function InfoCard({
  icon,
  label,
  value,
}: InfoCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-heritage/40 hover:bg-white/10">
      <div className="mb-2 flex items-center gap-2">
        <span className="text-xl">{icon}</span>

        <p className="text-xs uppercase tracking-wider text-white/45">
          {label}
        </p>
      </div>

      <p className="text-lg font-semibold text-white">
        {value}
      </p>
    </div>
  );
}