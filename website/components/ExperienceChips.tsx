type ExperienceChipsProps = {
  experiences: string[];
};

export default function ExperienceChips({
  experiences,
}: ExperienceChipsProps) {
  if (!experiences.length) return null;

  return (
    <div className="mt-6">
      <h3 className="mb-4 text-xl font-bold text-white">
        🎭 Experiences
      </h3>

      <div className="flex flex-wrap gap-3">
        {experiences.map((experience) => (
          <span
            key={experience}
            className="rounded-full bg-heritage/20 px-4 py-2 text-sm font-medium text-heritage"
          >
            {experience}
          </span>
        ))}
      </div>
    </div>
  );
}