type FollowUpQuestionsProps = {
  questions: string[];
  onSelect: (question: string) => void;
};

export default function FollowUpQuestions({
  questions,
  onSelect,
}: FollowUpQuestionsProps) {
  if (!questions.length) return null;

  return (
    <div className="mt-8">
      <h3 className="mb-4 text-lg font-semibold text-white">
        💬 Continue Exploring
      </h3>

      <div className="flex flex-wrap gap-3">
        {questions.map((question) => (
          <button
            key={question}
            onClick={() => onSelect(question)}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:border-heritage hover:bg-heritage/10"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
}