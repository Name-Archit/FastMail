function EmailCard({
  senderName,
  senderEmail,
  category,
  timestamp,
  subject,
  summary,
  tags,
  priority,
}) {
  const handleMouseEnter = () => {
    console.log("Accessing record...");
  };

  const priorityColor = {
    high: "bg-red-600",
    medium: "bg-yellow-400",
    normal: "bg-green-500",
  }[priority || "normal"];

  return (
    <article
      onMouseEnter={handleMouseEnter}
      className="bg-surface p-8 relative border-l-4 border-primary-container hover:bg-[#1a1a1a] group transition-all duration-300"
    >
      <div
        className={`absolute top-5 right-12 h-3 w-3 rounded-full ${priorityColor}`}
      ></div>
      <div className="absolute top-4 right-4 text-primary-container font-bold text-xl group-hover:scale-125 transition-transform">
        +
      </div>

      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h4 className="font-headline-lg text-headline-lg text-white tracking-tight">
              {senderName}
            </h4>

            <span className="bg-primary-container text-white px-2 py-0.5 text-[10px] font-bold tracking-tighter uppercase">
              {category}
            </span>
          </div>

          <p className="font-mono-sm text-mono-sm text-on-surface-variant opacity-60">
            {senderEmail}
          </p>
        </div>

        <span className="font-mono-sm text-mono-sm text-primary-container mt-2 md:mt-0">
          {timestamp}
        </span>
      </div>

      <div className="mb-4">
        <h5 className="font-headline-lg-mobile text-headline-lg-mobile text-white mb-2 uppercase">
          {subject}
        </h5>

        <p className="font-body-md text-body-md text-secondary leading-relaxed max-w-2xl">
          {summary}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        {tags.map((tag) => (
          <div
            key={tag}
            className="px-3 py-1 border border-outline-variant text-mono-sm text-on-surface-variant uppercase tracking-widest"
          >
            {tag}
          </div>
        ))}
      </div>
    </article>
  );
}

export default EmailCard;
